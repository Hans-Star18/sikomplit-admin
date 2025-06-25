import { Main } from '@/components/partials/main';
// import TextEditor from '@/components/text-editor';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { ResearchCreate } from '@/features/research/components/types';
import axiosInstance from '@/lib/axios';
import { router } from '@/main';
import { IconArrowLeft, IconLoader } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ResearchCreate() {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<ResearchCreate>({
        defaultValues: {
            title: '',
            research_summary: null,
            flyer: null,
            // abstract: '',
        },
    });

    async function onSubmit(data: ResearchCreate) {
        setIsLoading(true);

        try {
            await axiosInstance.post(`/admin/research-uploads`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Berhasil menambahkan penelitian.');
            router.navigate({ to: '/research' });
        } catch (error: any) {
            if (error.response?.status === 422) {
                const errors = error.response?.data?.errors;
                for (const key in errors) {
                    form.setError(key as keyof ResearchCreate, {
                        type: 'server',
                        message: errors[key][0],
                    });
                }
            } else {
                toast.error(
                    error.response?.data?.message ||
                        'Terjadi kesalahan saat menambahkan data.',
                );
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Main>
            <div className="mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
                <div className="flex w-full items-center justify-between gap-2">
                    <h2 className="flex-1 text-2xl font-bold tracking-tight">
                        Tambah Penelitian
                    </h2>
                    <div className="flex items-center gap-2">
                        <Button>
                            <Link
                                to="/research"
                                className="flex items-center gap-2"
                            >
                                <IconArrowLeft className="h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                >
                    <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Judul</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            id="title"
                                            placeholder="Judul"
                                            defaultValue={field.value}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                form.setValue(
                                                    'title',
                                                    e.target.value,
                                                );
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="flyer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Flyer</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            id="flyer"
                                            placeholder="Flyer"
                                            onChange={(e) => {
                                                field.onChange(e);
                                                form.setValue(
                                                    'flyer',
                                                    e.target.files?.[0] || null,
                                                );
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="research_summary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ringkasan Penelitian</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            id="research_summary"
                                            placeholder="Ringkasan Penelitian"
                                            onChange={(e) => {
                                                field.onChange(e);
                                                form.setValue(
                                                    'research_summary',
                                                    e.target.files?.[0] || null,
                                                );
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* <div className="mb-4">
                        <FormField
                            control={form.control}
                            name="abstract"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Abstrak</FormLabel>
                                    <FormControl>
                                        <TextEditor
                                            value={field.value || ''}
                                            onChange={(value) => {
                                                field.onChange(value);
                                                form.setValue(
                                                    'abstract',
                                                    value,
                                                );
                                            }}
                                            returnPlainText={true}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div> */}

                    <div className="flex gap-4">
                        <Button
                            className="mt-2 flex items-center"
                            disabled={isLoading}
                            type="button"
                        >
                            <Link
                                to="/research"
                                className="flex items-center gap-2"
                            >
                                <IconArrowLeft className="h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>

                        <Button
                            className="mt-2 flex items-center bg-blue-500 text-white hover:bg-blue-600"
                            disabled={isLoading}
                            type="submit"
                            onClick={() => {
                                form.handleSubmit(onSubmit);
                            }}
                        >
                            Simpan{' '}
                            {isLoading && (
                                <IconLoader className="animate-spin" />
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </Main>
    );
}
