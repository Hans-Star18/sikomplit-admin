import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/features/user/components/data-table-column-header';
import { DataTableRowActions } from '@/features/user/components/data-table-row-action';
import { type User } from '@/features/user/components/types';
import { type ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<User>[] = [
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
        accessorFn: (row) => row.role.name,
        id: 'role',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Role" />
        ),
        cell: ({ row }) => {
            const roleColor: Record<string, string> = {
                User: 'bg-green-500/20',
                Admin: 'bg-blue-500/20',
            };

            return (
                <div className="w-[60px]">
                    <Badge
                        variant="outline"
                        className={`${roleColor[row.original.role.name]}`}
                    >
                        {row.original.role.name}
                    </Badge>
                </div>
            );
        },
        filterFn: (row, id, filterValue) => {
            return filterValue.includes(row.getValue(id));
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama" />
        ),
        cell: ({ row }) => (
            <div className="w-[150px] truncate">{row.getValue('name')}</div>
        ),
    },
    {
        accessorKey: 'email',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => (
            <div className="w-[200px] truncate">{row.getValue('email')}</div>
        ),
    },
    {
        accessorKey: 'phone',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="No. HP" />
        ),
        cell: ({ row }) => (
            <div className="w-[150px]">{row.getValue('phone') ?? '-'}</div>
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
