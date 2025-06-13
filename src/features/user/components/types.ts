import type { ColumnDef, Table } from '@tanstack/react-table';

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    email_verified_at: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
    role: {
        id: number;
        name: string;
    };
}

export interface UserEditForm {
    name: string;
    email: string;
    phone: string;
    role_id: number;
}

export interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}
