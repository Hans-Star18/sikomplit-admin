import type { ColumnDef, Table } from '@tanstack/react-table';

export interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export interface Research {
    id: number;
    title: string;
    slug: string;
    research_summary: string | null;
    flyer: string | null;
    abstract: string | null;
    is_published: string;
    created_at: Date;
    updated_at: Date;
}

export interface ResearchCreate {
    title: string;
    research_summary: File | null;
    flyer: File | null;
    abstract: string;
}
