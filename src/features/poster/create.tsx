import { Main } from '@/components/partials/main';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { SelectLabel } from '@/components/ui/select';
import { SelectItem } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { PosterCreate } from '@/features/poster/components/types';
import type { Research } from '@/features/research/components/types';
import axiosInstance from '@/lib/axios';
import { router } from '@/main';
import { DialogTitle } from '@radix-ui/react-dialog';
import {
    IconArrowLeft,
    IconDeviceFloppy,
    IconLoader,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const getResearch = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['research'],
        queryFn: () => {
            return axiosInstance.get<{ data: Research[] }>(
                '/admin/research-uploads',
            );
        },
    });

    return {
        data: data?.data.data,
        isLoading,
    };
};

export default function PosterCreate() {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<PosterCreate>({
        defaultValues: {
            image: null,
            research_upload_id: null,
        },
    });

    const { data: research, isLoading: isLoadingResearch } = getResearch();

    async function onSubmit(data: PosterCreate) {
        setIsLoading(true);

        if (!data.image && !data.research_upload_id) {
            toast.error(
                'Pilih salah satu: upload gambar ATAU pilih dari flyer',
            );
            setIsLoading(false);
            return;
        }

        try {
            await axiosInstance.post(`/admin/posters`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Berhasil menambahkan poster.');
            router.navigate({ to: '/posters' });
        } catch (error: any) {
            if (error.response?.status === 422) {
                const errors = error.response?.data?.errors;
                for (const key in errors) {
                    form.setError(key as keyof PosterCreate, {
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
                        Poster
                    </h2>

                    <Button className="flex items-center" type="button">
                        <Link to="/posters" className="flex items-center gap-2">
                            <IconArrowLeft className="h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                >
                    <Tabs
                        defaultValue="upload_poster"
                        className="mb-4 w-full md:w-1/2"
                    >
                        <TabsList>
                            <TabsTrigger value="upload_poster">
                                Upload Poster
                            </TabsTrigger>
                            <TabsTrigger value="select_from_flyer">
                                Pilih dari Flyer
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="upload_poster">
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                id="image"
                                                placeholder="Image"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    form.setValue(
                                                        'image',
                                                        e.target.files?.[0] ||
                                                            null,
                                                    );
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </TabsContent>
                        <TabsContent value="select_from_flyer">
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="research_upload_id"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>
                                                Pilih dari Flyer
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={(value) => {
                                                        form.setValue(
                                                            'research_upload_id',
                                                            value,
                                                        );
                                                    }}
                                                    value={
                                                        form.watch(
                                                            'research_upload_id',
                                                        ) ?? ''
                                                    }
                                                    disabled={isLoadingResearch}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue
                                                            placeholder={
                                                                isLoadingResearch
                                                                    ? 'Loading...'
                                                                    : 'Pilih dari Flyer'
                                                            }
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>
                                                                Pilih dari Flyer
                                                            </SelectLabel>
                                                            {research?.map(
                                                                (research) => (
                                                                    <SelectItem
                                                                        key={
                                                                            research.id
                                                                        }
                                                                        value={research.id.toString()}
                                                                    >
                                                                        <img
                                                                            src={
                                                                                research.flyer ??
                                                                                ''
                                                                            }
                                                                            alt={
                                                                                research.title
                                                                            }
                                                                            className="h-5 w-5 object-cover"
                                                                        />
                                                                        {research.title.slice(
                                                                            0,
                                                                            50,
                                                                        )}
                                                                        {research
                                                                            .title
                                                                            .length >
                                                                            50 &&
                                                                            '...'}
                                                                    </SelectItem>
                                                                ),
                                                            )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {form.watch('research_upload_id') && (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-fit"
                                            >
                                                Lihat Flyer dipilih
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Flyer dipilih
                                                </DialogTitle>
                                                <DialogDescription className="flex items-center justify-center">
                                                    <img
                                                        src={
                                                            research?.find(
                                                                (research) =>
                                                                    research.id ===
                                                                    Number(
                                                                        form.watch(
                                                                            'research_upload_id',
                                                                        ),
                                                                    ),
                                                            )?.flyer ?? ''
                                                        }
                                                        alt="Flyer"
                                                        className="h-auto max-h-[600px] w-full object-contain"
                                                    />
                                                </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div className="flex items-center gap-2">
                        <Button
                            className="flex items-center"
                            disabled={isLoading}
                            type="button"
                        >
                            <Link
                                to="/posters"
                                className="flex items-center gap-2"
                            >
                                <IconArrowLeft className="h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            onClick={() => {
                                form.handleSubmit(onSubmit);
                            }}
                        >
                            <IconDeviceFloppy className="h-4 w-4" />
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
