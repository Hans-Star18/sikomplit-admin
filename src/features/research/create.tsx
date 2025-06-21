import { Main } from '@/components/partials/main';
import TextEditor from '@/components/text-editor';
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
import type { Research } from '@/features/research/components/types';
import { IconArrowLeft, IconLoader, IconPencil } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ResearchCreate() {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<Research>({
        defaultValues: {
            title: '',
            research_summary: '',
            flyer: '',
            abstract: '',
        },
    });

    async function onSubmit(data: Research) {
        setIsLoading(true);
        console.log(data);
        setIsLoading(false);
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
                        <Button variant="outline">
                            <Link
                                to="/research"
                                className="flex items-center gap-2"
                            >
                                <IconPencil className="h-4 w-4" />
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
                    <div className="mb-4">
                        <FormField
                            control={form.control}
                            name="abstract"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Abstrak</FormLabel>
                                    <FormControl>
                                        <TextEditor
                                            value={field.value}
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
                    </div>

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
