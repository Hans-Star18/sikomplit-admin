import { Main } from '@/components/partials/main';
import { columns } from '@/features/recommendation/components/column';
import { DataTable } from '@/features/recommendation/components/data-table';
import { type Recommendation } from '@/features/recommendation/components/types';
import axiosInstance from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export default function RecommendationIndex() {
    const { data: response, isLoading } = useQuery({
        queryKey: ['recommendations'],
        queryFn: () => {
            return axiosInstance.get<{ data: Recommendation[] }>(
                '/admin/recommendations',
            );
        },
    });

    const { data: statusesResponse } = useQuery({
        queryKey: ['statuses'],
        queryFn: () => {
            return axiosInstance.get<{
                data: {
                    name: string;
                }[];
            }>('/options/progress-statuses');
        },
    });

    const recommendations = response?.data.data ?? [];
    const statuses =
        statusesResponse?.data.data.map((status) => ({
            label: status.name,
            value: status.name,
        })) ?? [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Main>
            <div className="mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Permohonan Surat Rekomendasi
                    </h2>
                </div>
            </div>
            <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                <DataTable
                    data={recommendations}
                    columns={columns}
                    statuses={statuses}
                />
            </div>
        </Main>
    );
}
