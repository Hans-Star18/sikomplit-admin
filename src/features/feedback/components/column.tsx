import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { DataTableColumnHeader } from '@/features/feedback/components/data-table-column-header';
import { DataTableRowActions } from '@/features/feedback/components/data-table-row-action';
import { type Feedback } from '@/features/feedback/components/types';
import { IconEye } from '@tabler/icons-react';
import { type ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Feedback>[] = [
    {
        id: 'index',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="No" />
        ),
        cell: ({ row }) => <div className="w-[30px]">{row.index + 1}</div>,
        enableSorting: true,
        enableHiding: false,
    },
    {
        accessorKey: 'email',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => (
            <div className="w-[200px] truncate">
                {row.getValue('email') || '-'}
            </div>
        ),
        enableSorting: true,
        enableHiding: false,
    },
    {
        accessorKey: 'comment',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Komentar" />
        ),
        cell: ({ row }) => (
            <div className="flex w-[100px] items-center justify-start gap-2">
                <Dialog>
                    <DialogTrigger className="flex items-center gap-2">
                        <IconEye size={20} className="text-blue-500" />
                        <span className="text-sm text-blue-500">
                            Lihat Komentar
                        </span>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Komentar</DialogTitle>
                            <DialogDescription className="flex items-center justify-center text-sm">
                                {row.getValue('comment')}
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tanggal Dibuat" />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">
                {new Date(row.getValue('created_at')).toLocaleDateString(
                    'id-ID',
                    {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    },
                )}
            </div>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
