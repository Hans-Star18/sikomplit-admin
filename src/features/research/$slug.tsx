import { Main } from '@/components/partials/main';
// import TextEditor from '@/components/text-editor';
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
import { Label } from '@/components/ui/label';
import type { Research } from '@/features/research/components/types';
import axiosInstance from '@/lib/axios';
import { IconArrowLeft, IconDownload, IconPencil } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

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

export default function ResearchDetail({ slug }: { slug: string }) {
    const { data: research, isLoading } = getResearch(slug);

    const form = useForm<Research>({
        defaultValues: {
            id: research?.id,
            title: research?.title,
            slug: research?.slug,
            research_summary: research?.research_summary,
            flyer: research?.flyer,
            // abstract: research?.abstract,
            is_published: research?.is_published,
            created_at: research?.created_at,
            updated_at: research?.updated_at,
        },
    });

    useEffect(() => {
        if (research) {
            form.setValue('title', research.title);
            form.setValue('slug', research.slug);
            form.setValue('is_published', research.is_published);
            form.setValue('abstract', research.abstract);
        }
    }, [research]);

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
                                to="/research"
                                className="flex items-center gap-2"
                            >
                                <IconArrowLeft className="h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>
                        <Button variant="outline">
                            <Link
                                to="/research/$slug/edit"
                                params={{ slug }}
                                className="flex items-center gap-2"
                            >
                                <IconPencil className="h-4 w-4" />
                                Edit
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <Form {...form}>
                <form>
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
                                                    field.value === 'Published'
                                                        ? true
                                                        : false
                                                }
                                                onCheckedChange={field.onChange}
                                                disabled
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
                        <div className="mb-4 grid w-full max-w-sm items-center gap-3">
                            <Label htmlFor="flyer">Flyer</Label>
                            {isLoading ? (
                                <div className="text-sm text-gray-500">
                                    Loading...
                                </div>
                            ) : research?.flyer ? (
                                <a
                                    className="flex cursor-pointer items-center gap-2 text-sm text-blue-500 hover:text-blue-700"
                                    href={
                                        typeof research.flyer === 'string' &&
                                        research.flyer !== null
                                            ? research.flyer
                                            : undefined
                                    }
                                    download={`${research.slug}-flyer.pdf`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <IconDownload className="h-4 w-4" />
                                    Unduh Flyer
                                </a>
                            ) : (
                                <div className="text-sm text-gray-500">
                                    Tidak ada flyer
                                </div>
                            )}
                        </div>
                        <div className="mb-4 grid w-full max-w-sm items-center gap-3">
                            <Label htmlFor="research_summary">
                                Ringkasan Penelitian
                            </Label>
                            {isLoading ? (
                                <div className="text-sm text-gray-500">
                                    Loading...
                                </div>
                            ) : research?.research_summary ? (
                                <a
                                    className="flex cursor-pointer items-center gap-2 text-sm text-blue-500 hover:text-blue-700"
                                    href={
                                        typeof research.research_summary ===
                                            'string' &&
                                        research.research_summary !== null
                                            ? research.research_summary
                                            : undefined
                                    }
                                    download={`${research.slug}-research-summary.pdf`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <IconDownload className="h-4 w-4" />
                                    Unduh Ringkasan Penelitian
                                </a>
                            ) : (
                                <div className="text-sm text-gray-500">
                                    Tidak ada ringkasan penelitian
                                </div>
                            )}
                        </div>
                        {/* <div className="col-span-3 mb-4 items-center gap-3">
                            <FormField
                                control={form.control}
                                name="abstract"
                                render={({ field }) =>
                                    field.value ? (
                                        <FormItem>
                                            <FormLabel>Abstrak</FormLabel>
                                            <FormControl>
                                                <TextEditor
                                                    value={field.value || ''}
                                                    onChange={(value) => {
                                                        field.onChange(value);
                                                    }}
                                                    disabled={true}
                                                    returnPlainText={true}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    ) : (
                                        <div className="text-sm text-gray-500">
                                            Tidak ada abstrak
                                        </div>
                                    )
                                }
                            />
                        </div> */}
                    </div>
                </form>
            </Form>
        </Main>
    );
}
