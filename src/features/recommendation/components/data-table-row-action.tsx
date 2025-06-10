import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconDots, IconEye, IconPencil, IconTrash } from '@tabler/icons-react';
import { type Row } from '@tanstack/react-table';

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({
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
                <DropdownMenuItem onClick={() => {}}>
                    Lihat
                    <DropdownMenuShortcut>
                        <IconEye size={16} />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {}}>
                    Ubah
                    <DropdownMenuShortcut>
                        <IconPencil size={16} />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {}}>
                    Hapus
                    <DropdownMenuShortcut>
                        <IconTrash size={16} />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
