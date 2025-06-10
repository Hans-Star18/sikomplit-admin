import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableFacetedFilter } from '@/features/recommendation/components/data-table-faceted-filter';
import { type DataTableToolbarProps } from '@/features/recommendation/components/types';
import { IconRefresh } from '@tabler/icons-react';

export function DataTableToolbar<TData>({
    statuses,
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    placeholder="Cari Surat"
                    value={
                        (table
                            .getColumn('request_number')
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('request_number')
                            ?.setFilterValue(event.target.value)
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
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
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
