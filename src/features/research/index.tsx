import { Main } from '@/components/partials/main';
import { columns } from '@/features/research/components/column';
import { DataTable } from '@/features/research/components/data-table';
import { type Research } from '@/features/research/components/types';
import axiosInstance from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

const getResearch = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['research'],
        queryFn: () => {
            return axiosInstance.get<{ data: Research[] }>(
                '/admin/research-uploads',
            );
        },
    });

    return {
        data: data?.data.data,
        isLoading,
    };
};

export default function ResearchIndex() {
    const { data: research } = getResearch();

    return (
        <Main>
            <div className="mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Daftar Penelitian
                    </h2>
                </div>
            </div>
            <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                <DataTable data={research ?? []} columns={columns} />
            </div>
        </Main>
    );
}
