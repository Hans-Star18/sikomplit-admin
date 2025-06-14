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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import axiosInstance from '@/lib/axios';
import { IconDots, IconTrash } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { type Row } from '@tanstack/react-table';
import { useState } from 'react';
import { toast } from 'sonner';

interface DataTableRowActionsProps<TData extends { id: number }> {
    row: Row<TData>;
}

export function DataTableRowActions<TData extends { id: number }>({
    row,
}: DataTableRowActionsProps<TData>) {
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    async function onDelete() {
        try {
            setIsLoading(true);
            await axiosInstance.delete(`/admin/feedbacks/${row.original.id}`);
            await queryClient.invalidateQueries({ queryKey: ['feedback'] });
            toast.success('Berhasil menghapus feedback.');
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                    'Terjadi kesalahan saat menghapus feedback.',
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
                >
                    <IconDots className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            disabled={isLoading}
                            variant="ghost"
                            className="flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1 text-sm font-normal outline-hidden select-none"
                        >
                            Hapus
                            <DropdownMenuShortcut>
                                <IconTrash size={16} />
                            </DropdownMenuShortcut>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Feedback</AlertDialogTitle>
                            <AlertDialogDescription>
                                Apakah anda yakin ingin menghapus feedback ini?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={onDelete}
                                disabled={isLoading}
                            >
                                Hapus
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
