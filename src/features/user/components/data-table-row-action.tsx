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
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import axiosInstance from '@/lib/axios';
import { router } from '@/main';
import { IconDots, IconEye, IconPencil, IconTrash } from '@tabler/icons-react';
import { type Row } from '@tanstack/react-table';
import { useState } from 'react';
import { toast } from 'sonner';

interface DataTableRowActionsProps<
    TData extends { id: string | number; role: { slug: string }; name: string },
> {
    row: Row<TData>;
}

export function DataTableRowActions<
    TData extends { id: string | number; role: { slug: string }; name: string },
>({ row }: DataTableRowActionsProps<TData>) {
    const [isLoading, setIsLoading] = useState(false);

    async function onDelete() {
        try {
            setIsLoading(true);
            await axiosInstance.delete(`/admin/users/${row.original.id}`);
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
                <DropdownMenuItem
                    onClick={() => {
                        router.navigate({
                            to: '/users/$id',
                            params: { id: String(row.original.id) },
                        });
                    }}
                >
                    Lihat
                    <DropdownMenuShortcut>
                        <IconEye size={16} />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        router.navigate({
                            to: '/users/$id/edit',
                            params: { id: String(row.original.id) },
                        });
                    }}
                >
                    Ubah
                    <DropdownMenuShortcut>
                        <IconPencil size={16} />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
                {row.original.role.slug !== 'admin' && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                disabled={isLoading}
                                variant="ghost"
                                className="flex cursor-default items-center gap-2 rounded-sm px-2 py-1 text-sm outline-hidden select-none w-full font-normal"
                            >
                                Hapus
                                <DropdownMenuShortcut>
                                    <IconTrash size={16} />
                                </DropdownMenuShortcut>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Hapus User</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Apakah anda yakin ingin menghapus user ini?{' '}
                                    <span className="font-bold">
                                        {row.original.name}
                                    </span>
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
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
