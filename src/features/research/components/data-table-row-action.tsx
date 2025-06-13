import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { router } from '@/main';
import { IconDots, IconEye, IconPencil } from '@tabler/icons-react';
import { type Row } from '@tanstack/react-table';

interface DataTableRowActionsProps<TData extends { slug: string }> {
    row: Row<TData>;
}

export function DataTableRowActions<TData extends { slug: string }>({
    row,
}: DataTableRowActionsProps<TData>) {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
                >
                    <IconDots className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem
                    onClick={() => {
                        router.navigate({
                            to: '/research/$slug',
                            params: { slug: String(row.original.slug) },
                        });
                    }}
                >
                    Lihat
                    <DropdownMenuShortcut>
                        <IconEye size={16} />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        router.navigate({
                            to: '/research/$slug/edit',
                            params: { slug: String(row.original.slug) },
                        });
                    }}
                >
                    Ubah
                    <DropdownMenuShortcut>
                        <IconPencil size={16} />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
