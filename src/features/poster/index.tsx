import { Main } from '@/components/partials/main';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import type { Poster } from '@/features/poster/components/types';
import axiosInstance from '@/lib/axios';
import { router } from '@/main';
import { IconPlus } from '@tabler/icons-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

const getPoster = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['poster'],
        queryFn: () => {
            return axiosInstance.get<{ data: Poster[] }>(`/admin/posters`);
        },
    });

    return {
        data: data?.data.data,
        isLoading,
    };
};

export default function PosterIndex() {
    const { data: posters, isLoading: isLoadingPoster } = getPoster();
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    if (isLoadingPoster) {
        return <div>Loading...</div>;
    }

    function handleAddPoster() {
        router.navigate({
            to: '/posters/create',
        });
    }

    async function onDelete(id: number) {
        setIsLoading(true);
        try {
            await axiosInstance.delete(`/admin/posters/${id}`);
            await queryClient.invalidateQueries({ queryKey: ['poster'] });
            toast.success('Berhasil menghapus data.');
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                    'Terjadi kesalahan saat menghapus data.',
            );
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

                    <Button variant="outline" onClick={handleAddPoster}>
                        <IconPlus size={16} />
                        Tambah Poster
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-8">
                {posters && posters.length > 0 ? (
                    posters.map((poster: Poster) => (
                        <div key={poster.id} className="space-y-4">
                            <Dialog>
                                <DialogTrigger className="w-full">
                                    <img
                                        src={poster?.image_url}
                                        alt="Poster"
                                        className="h-auto max-h-[200px] w-full object-cover"
                                    />
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Poster</DialogTitle>
                                        <DialogDescription className="flex items-center justify-center">
                                            <img
                                                src={poster?.image_url}
                                                alt="Poster"
                                                className="h-auto max-h-[500px] w-full object-contain"
                                            />
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        disabled={isLoading}
                                        variant="destructive"
                                        className="w-full cursor-pointer"
                                    >
                                        Hapus Poster
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Hapus Poster
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Apakah anda yakin ingin menghapus
                                            poster ini?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Batal
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => onDelete(poster.id)}
                                            disabled={isLoading}
                                        >
                                            Hapus
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    ))
                ) : (
                    <div className="col-span-4 flex items-center justify-center">
                        <span>Tidak ada data</span>
                    </div>
                )}
            </div>
        </Main>
    );
}
