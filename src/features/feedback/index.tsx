import { Main } from '@/components/partials/main';
import { columns } from '@/features/feedback/components/column';
import { DataTable } from '@/features/feedback/components/data-table';
import { type Feedback } from '@/features/feedback/components/types';
import axiosInstance from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

const getFeedback = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['feedback'],
        queryFn: () => {
            return axiosInstance.get<{ data: Feedback[] }>('/admin/feedbacks');
        },
    });

    return {
        data: data?.data.data,
        isLoading,
    };
};

export default function FeedbackIndex() {
    const { data: feedback, isLoading } = getFeedback();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Main>
            <div className="mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Daftar Feedback
                    </h2>
                </div>
            </div>
            <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                <DataTable data={feedback ?? []} columns={columns} />
            </div>
        </Main>
    );
}
