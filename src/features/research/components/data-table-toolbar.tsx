import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableFacetedFilter } from '@/features/research/components/data-table-faceted-filter';
import { type DataTableToolbarProps } from '@/features/research/components/types';
import { router } from '@/main';
import { IconPlus, IconRefresh } from '@tabler/icons-react';

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered =
        table.getState().columnFilters.length > 0 ||
        table.getState().globalFilter.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    placeholder="Cari Penelitian"
                    value={(table.getState().globalFilter as string) ?? ''}
                    onChange={(event) =>
                        table.setGlobalFilter(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                <div className="flex gap-x-2">
                    {table.getColumn('is_published') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('is_published')}
                            title="Status Publikasi"
                            options={[
                                {
                                    label: 'Diterbitkan',
                                    value: 'Published',
                                },
                                {
                                    label: 'Belum Diterbitkan',
                                    value: 'Unpublished',
                                },
                            ]}
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
            <div>
                <Button
                    variant="outline"
                    onClick={() => {
                        router.navigate({
                            to: '/research/create',
                        });
                    }}
                >
                    <IconPlus className="h-4 w-4" />
                    Tambah Penelitian
                </Button>
            </div>
        </div>
    );
}
