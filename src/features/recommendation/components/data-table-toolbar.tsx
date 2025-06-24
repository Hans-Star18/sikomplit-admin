import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableFacetedFilter } from '@/features/recommendation/components/data-table-faceted-filter';
import { type DataTableToolbarProps } from '@/features/recommendation/components/types';
import { IconRefresh } from '@tabler/icons-react';

export function DataTableToolbar<TData>({
    statuses,
    table,
    researchTypes,
}: DataTableToolbarProps<TData>) {
    const isFiltered =
        table.getState().columnFilters.length > 0 ||
        table.getState().globalFilter.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    placeholder="Cari Permohonan"
                    value={(table.getState().globalFilter as string) ?? ''}
                    onChange={(event) =>
                        table.setGlobalFilter(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                <div className="flex gap-x-2">
                    {table.getColumn('progress_status') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('progress_status')}
                            title="Status Proses"
                            options={statuses}
                        />
                    )}
                </div>
                <div className="flex gap-x-2">
                    {table.getColumn('gender') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('gender')}
                            title="Gender"
                            options={[
                                {
                                    label: 'Pria',
                                    value: 'Pria',
                                },
                                {
                                    label: 'Wanita',
                                    value: 'Wanita',
                                },
                            ]}
                        />
                    )}
                </div>
                <div className="flex gap-x-2">
                    {table.getColumn('research_type') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('research_type')}
                            title="Tipe Penelitian"
                            options={researchTypes}
                        />
                    )}
                </div>
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => {
                            table.resetColumnFilters();
                            table.setGlobalFilter('');
                        }}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <IconRefresh className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
