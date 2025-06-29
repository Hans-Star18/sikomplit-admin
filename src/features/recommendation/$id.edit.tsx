import { Main } from '@/components/partials/main';
import { Button } from '@/components/ui/button';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { type Recommendation } from '@/features/recommendation/components/types';
import type { RecommendationEditForm } from '@/features/recommendation/components/types';
import axiosInstance from '@/lib/axios';
import {
    IconArrowLeft,
    IconDeviceFloppy,
    IconDownload,
    IconLoader,
} from '@tabler/icons-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const recommendations = (id: string) => {
    const { data, isLoading } = useQuery({
        queryKey: ['recommendations', id],
        queryFn: () => {
            return axiosInstance.get<{ data: Recommendation }>(
                `/admin/recommendations/${id}`,
            );
        },
    });

    return {
        data: data?.data.data,
        isLoading,
    };
};

const statuses = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['statuses'],
        queryFn: () => {
            return axiosInstance.get<{ data: { name: string; id: number }[] }>(
                '/options/progress-statuses',
            );
        },
    });

    return {
        data: data?.data.data.map((status) => ({
            label: status.name,
            value: status.id,
        })),
        isLoading,
    };
};

export default function RecommendationEdit({ id }: { id: string }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const { data: recommendation, isLoading: isLoadingRecommendation } =
        recommendations(id);

    const { data: statusesData, isLoading: isLoadingStatuses } = statuses();

    const form = useForm<RecommendationEditForm>({
        defaultValues: {
            progress_status_id: null,
            file: null,
        },
    });

    useEffect(() => {
        if (recommendation?.progress_status) {
            form.setValue('request_number', recommendation.request_number);
            form.setValue('research_type', recommendation.research_type);
            const status = statusesData?.find(
                (status) => status.label === recommendation.progress_status,
            );
            if (status) {
                form.setValue('progress_status_id', status.value);
            }
        }
    }, [recommendation?.progress_status]);

    async function onSubmit(data: RecommendationEditForm) {
        setIsLoading(true);

        try {
            await axiosInstance.patch(`/admin/recommendations/${id}`, {
                progress_status_id: data.progress_status_id,
            });

            if (
                data.file &&
                (data.progress_status_id == 5 || data.progress_status_id == 6)
            ) {
                await axiosInstance.post(
                    `/admin/recommendations/${id}/upload`,
                    {
                        file: data.file,
                    },
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                );
                toast.success('Berhasil memperbarui data.');
                await queryClient.invalidateQueries({
                    queryKey: ['recommendations', id],
                });
            } else {
                toast.success('Gagal memperbarui data.');
            }
        } catch (error: any) {
            if (error.response?.status === 422) {
                const errors = error.response?.data?.errors;
                for (const key in errors) {
                    form.setError(key as keyof RecommendationEditForm, {
                        type: 'server',
                        message: errors[key][0],
                    });
                }
            } else {
                toast.error(
                    error.response?.data?.message ||
                        'Terjadi kesalahan saat mengubah status.',
                );
            }
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoadingRecommendation || isLoadingStatuses) {
        return <div>Loading...</div>;
    }

    return (
        <Main>
            <div className="mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
                <div className="flex w-full items-center justify-between gap-2">
                    <div>
                        <h2 className="flex-1 text-2xl font-bold tracking-tight">
                            Edit Permohonan Surat Rekomendasi
                        </h2>
                        <p className="text-sm font-light text-gray-400 italic">
                            Hanya{' '}
                            <span className="font-semibold text-gray-500">
                                Status Proses
                            </span>{' '}
                            dan{' '}
                            <span className="font-semibold text-gray-500">
                                Surat Rekomendasi
                            </span>{' '}
                            yang bisa di edit.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button>
                            <Link
                                to="/recommendations/$id"
                                params={{ id }}
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
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                >
                    <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="request_number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nomer Permohonan</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled
                                            type="text"
                                            id="request_number"
                                            placeholder="Nomer Permohonan"
                                            defaultValue={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="research_type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Jenis Penelitian</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled
                                            type="text"
                                            id="research_type"
                                            placeholder="Jenis Penelitian"
                                            defaultValue={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="progress_status_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status Proses</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={
                                                field.value?.toString() ?? ''
                                            }
                                            disabled={
                                                isLoadingRecommendation ||
                                                isLoadingStatuses
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue
                                                    placeholder={
                                                        isLoadingRecommendation ||
                                                        isLoadingStatuses
                                                            ? 'Loading...'
                                                            : 'Pilih status'
                                                    }
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Status Proses
                                                    </SelectLabel>
                                                    {statusesData?.map(
                                                        (status) => (
                                                            <SelectItem
                                                                key={
                                                                    status.value
                                                                }
                                                                value={status.value.toString()}
                                                            >
                                                                {status.label}
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
                    </div>

                    <div>
                        <h1 className="mb-2 font-bold">Dokumen</h1>
                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="file"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Surat Rekomendasi
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={
                                                        form.watch(
                                                            'progress_status_id',
                                                        ) != 5 &&
                                                        form.watch(
                                                            'progress_status_id',
                                                        ) != 6
                                                    }
                                                    type="file"
                                                    id="file"
                                                    placeholder="Surat Rekomendasi"
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        form.setValue(
                                                            'file',
                                                            e.target
                                                                .files?.[0] ||
                                                                null,
                                                        );
                                                    }}
                                                />
                                            </FormControl>
                                            {form.watch('progress_status_id') !=
                                                5 &&
                                                form.watch(
                                                    'progress_status_id',
                                                ) != 6 && (
                                                    <FormDescription className="text-sm font-light text-gray-500 italic">
                                                        Surat Rekomendasi bisa
                                                        di tambahkan jika
                                                        statusnya sudah
                                                        disetujui atau
                                                        diterbitkan.
                                                    </FormDescription>
                                                )}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {recommendation?.recommendation_letter && (
                                    <a
                                        className="mt-2 flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700"
                                        href={
                                            recommendation?.recommendation_letter
                                        }
                                        download="surat_rekomendasi.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <IconDownload className="h-4 w-4" />
                                        Unduh Surat Rekomendasi
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button
                            className="flex items-center"
                            disabled={isLoading}
                            type="button"
                        >
                            <Link
                                to="/recommendations"
                                className="flex items-center gap-2"
                            >
                                <IconArrowLeft className="h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>

                        <Button
                            className="flex items-center"
                            disabled={isLoading}
                            type="submit"
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
