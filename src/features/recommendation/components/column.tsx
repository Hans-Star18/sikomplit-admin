import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/features/recommendation/components/data-table-column-header';
import { DataTableRowActions } from '@/features/recommendation/components/data-table-row-action';
import { type Recommendation } from '@/features/recommendation/components/types';
import { type ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Recommendation>[] = [
    {
        id: 'index',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="No" />
        ),
        cell: ({ row }) => <div className="w-[30px]">{row.index + 1}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'request_number',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nomor Permohonan" />
        ),
        cell: ({ row }) => (
            <div className="w-[60px]">{row.getValue('request_number')}</div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'research_type',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Jenis Penelitian" />
        ),
        cell: ({ row }) => (
            <div className="w-[200px] truncate">
                {row.getValue('research_type')}
            </div>
        ),
    },
    {
        accessorKey: 'progress_status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const statusColor: Record<string, string> = {
                'Permohonan Diajukan': 'bg-blue-500/20',
                'Verifikasi Administrasi': 'bg-blue-500/20',
                'Revisi Dokumen': 'bg-yellow-500/20',
                'Proses Disposisi': 'bg-blue-500/20',
                'Disetujui & Diterbitkan': 'bg-green-500/20',
                'Hasil Penelitian Diupload': 'bg-blue-500/20',
                Selesai: 'bg-green-500/20',
            };

            return (
                <Badge
                    variant="outline"
                    className={`${statusColor[row.getValue('progress_status') as string]}`}
                >
                    {row.getValue('progress_status')}
                </Badge>
            );
        },
        filterFn: (row, id, filterValue) => {
            return filterValue.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'gender',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Gender" />
        ),
        cell: ({ row }) => (
            <div className="w-[80px] capitalize">{row.getValue('gender')}</div>
        ),
        filterFn: (row, id, filterValue) => {
            return filterValue.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama" />
        ),
        cell: ({ row }) => (
            <div className="w-[120px] truncate">{row.getValue('name')}</div>
        ),
    },
    {
        accessorKey: 'phone',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="No. HP" />
        ),
        cell: ({ row }) => (
            <div className="w-[150px]">{row.getValue('phone')}</div>
        ),
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
