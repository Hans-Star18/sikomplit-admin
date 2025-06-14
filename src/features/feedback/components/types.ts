import type { ColumnDef, Table } from '@tanstack/react-table';

export interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export interface Feedback {
    id: number;
    email: string;
    comment: string;
    created_at: Date;
    updated_at: Date;
}
