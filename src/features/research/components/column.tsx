import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { DataTableColumnHeader } from '@/features/research/components/data-table-column-header';
import { DataTableRowActions } from '@/features/research/components/data-table-row-action';
import { type Research } from '@/features/research/components/types';
import { IconDownload, IconFile, IconPhoto } from '@tabler/icons-react';
import { type ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Research>[] = [
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
        accessorKey: 'title',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Judul" />
        ),
        cell: ({ row }) => (
            <div className="w-[200px] truncate">{row.getValue('title')}</div>
        ),
        enableSorting: true,
        enableHiding: false,
    },
    {
        accessorKey: 'flyer',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Flyer" />
        ),
        cell: ({ row }) => (
            <div className="w-[100px] flex items-center justify-start gap-2">
                <Dialog>
                    <DialogTrigger>
                        <IconPhoto size={20} className="text-blue-500" />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Flyer</DialogTitle>
                            <DialogDescription className="flex items-center justify-center">
                                <img
                                    src={row.getValue('flyer')}
                                    alt="Flyer"
                                    className="w-full h-auto max-h-[500px] object-contain"
                                />
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <a
                    href={row.getValue('flyer')}
                    download
                    target="_blank"
                    className="cursor-pointer"
                >
                    <IconDownload size={20} className="text-blue-500" />
                </a>
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'research_summary',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Ringkasan" />
        ),
        cell: ({ row }) => (
            <div className="w-[100px] flex items-center justify-start gap-2">
                <a
                    href={row.getValue('research_summary')}
                    target="_blank"
                    className="cursor-pointer"
                >
                    <IconFile size={20} className="text-blue-500" />
                </a>
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'is_published',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status Publikasi" />
        ),
        cell: ({ row }) => (
            <div className="w-[100px]">
                {row.getValue('is_published') === 'Published' ? (
                    <Badge variant="outline" className="bg-green-500/20">
                        Diterbitkan
                    </Badge>
                ) : (
                    <Badge variant="outline" className="bg-red-500/20">
                        Belum Diterbitkan
                    </Badge>
                )}
            </div>
        ),
        filterFn: (row, id, filterValue) => {
            return filterValue.includes(row.getValue(id));
        },
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
