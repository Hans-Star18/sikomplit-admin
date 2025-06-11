import type { ColumnDef, Table } from '@tanstack/react-table';

export interface Recommendation {
    id: string;
    request_number: string;
    research_type: string;
    progress_status: string | null | number;
    application_letter: string;
    research_proposal: string;
    ethics_clearance_letter: string;
    final_report_statement_letter: string;
    recommendation_letter: string;
    name: string;
    email: string;
    phone: string;
    national_identity_number: string;
    date_of_birth: string;
    gender: string;
    last_education: string;
    file_url: string;
    occupation: string;
    created_at: string;
    updated_at: string;
}

export interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    statuses: {
        label: string;
        value: string;
        icon?: React.ComponentType<{ className?: string }>;
    }[];
}

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    statuses: {
        label: string;
        value: string;
        icon?: React.ComponentType<{ className?: string }>;
    }[];
}

export interface RecommendationEditForm extends Recommendation {
    progress_status_id: number | null;
    file: File | null;
}
