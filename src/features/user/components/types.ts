import type { ColumnDef, Table } from '@tanstack/react-table';

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    email_verified_at: Date;
    created_at: Date;
    updated_at: Date;
    role: {
        id: number;
        name: string;
    };
}

export interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}
