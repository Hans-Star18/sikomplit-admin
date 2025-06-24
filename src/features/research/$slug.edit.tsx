import { Main } from '@/components/partials/main';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Research } from '@/features/research/components/types';
import axiosInstance from '@/lib/axios';
import { IconArrowLeft, IconLoader } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const getResearch = (slug: string) => {
    const { data, isLoading } = useQuery({
        queryKey: ['research', slug],
        queryFn: () => {
            return axiosInstance.get<{ data: Research }>(
                `/admin/research-uploads/${slug}`,
            );
        },
    });

    return {
        data: data?.data.data,
        isLoading,
    };
};

export default function ResearchEdit({ slug }: { slug: string }) {
    const { data: research, isLoading } = getResearch(slug);
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    const form = useForm<Research>({
        defaultValues: {
            title: '',
            slug: '',
            is_published: '',
        },
    });

    useEffect(() => {
        if (research) {
            form.setValue('title', research?.title);
            form.setValue('slug', research?.slug);
            form.setValue(
                'is_published',
                research?.is_published === 'Published' ? '1' : '0',
            );
        }
    }, [research]);

    async function onSubmit(data: Research) {
        setIsLoadingForm(true);

        try {
            await axiosInstance.patch(`/admin/research-uploads/${slug}`, {
                is_published: data.is_published == '1' ? 1 : 0,
            });

            toast.success('Berhasil memperbarui data.');
        } catch (error: any) {
            if (error.response?.status === 422) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error(
                    error.response?.data?.message ||
                        'Terjadi kesalahan saat mengubah data.',
                );
            }
        } finally {
            setIsLoadingForm(false);
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Main>
            <div className="mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
                <div className="flex w-full items-center justify-between gap-2">
                    <h2 className="flex-1 text-2xl font-bold tracking-tight">
                        Detail Penelitian
                    </h2>
                    <div className="flex items-center gap-2">
                        <Button>
                            <Link
                                to="/research/$slug"
                                params={{ slug }}
                                className="flex items-center gap-2"
                            >
                                <IconArrowLeft className="h-4 w-4" />
                                Ke Detail
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Judul</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled
                                            type="text"
                                            id="title"
                                            placeholder="Judul"
                                            defaultValue={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled
                                            type="text"
                                            id="slug"
                                            placeholder="Slug"
                                            defaultValue={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="is_published"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Diterbitkan</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Checkbox
                                                checked={
                                                    field.value == '1'
                                                        ? true
                                                        : false
                                                }
                                                onCheckedChange={field.onChange}
                                            />
                                            <span>
                                                {field.value
                                                    ? 'Sudah diterbitkan'
                                                    : 'Belum diterbitkan'}
                                            </span>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex gap-4">
                        <Button
                            className="mt-2 flex items-center"
                            disabled={isLoadingForm}
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
                            disabled={isLoadingForm}
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
