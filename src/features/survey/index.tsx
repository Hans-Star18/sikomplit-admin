import { Main } from '@/components/partials/main';
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
import axiosInstance from '@/lib/axios';
import { IconDeviceFloppy, IconLoader } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const getSurveyLink = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['survey-link'],
        queryFn: () => {
            return axiosInstance.get<{ data: { link: string } }>(
                `/admin/surveys`,
            );
        },
    });

    return {
        data: data?.data.data,
        isLoading,
    };
};

export default function SurveyIndex() {
    const { data: surveyLink } = getSurveyLink();
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    const form = useForm<{
        link: string;
    }>({
        defaultValues: {
            link: '',
        },
    });

    useEffect(() => {
        if (surveyLink) {
            form.setValue('link', surveyLink?.link ?? '');
        }
    }, [surveyLink]);

    async function onSubmit(data: { link: string }) {
        setIsLoadingForm(true);

        try {
            await axiosInstance.patch(`/admin/surveys/1`, {
                link: data.link,
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

    return (
        <Main>
            <div className="mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
                <div className="flex w-full items-center justify-between gap-2">
                    <h2 className="flex-1 text-2xl font-bold tracking-tight">
                        Survei Link
                    </h2>
                </div>
            </div>

            <Form {...form}>
                <form>
                    <div className="mb-4 w-full">
                        <FormField
                            control={form.control}
                            name="link"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Link</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            id="link"
                                            placeholder="Link"
                                            className="w-full"
                                            defaultValue={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            className="flex items-center"
                            disabled={isLoadingForm}
                            type="submit"
                            onClick={form.handleSubmit(onSubmit)}
                        >
                            <IconDeviceFloppy className="h-4 w-4" />
                            Simpan{' '}
                            {isLoadingForm && (
                                <IconLoader className="animate-spin" />
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </Main>
    );
}
