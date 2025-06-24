import { Main } from '@/components/partials/main';
import { columns } from '@/features/user/components/column';
import { DataTable } from '@/features/user/components/data-table';
import { type User } from '@/features/user/components/types';
import axiosInstance from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

const getUsers = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: () => {
            return axiosInstance.get<{ data: User[] }>('/admin/users');
        },
    });

    return {
        data: data?.data.data,
        isLoading,
    };
};

export default function UserIndex() {
    const { data: users, isLoading } = getUsers();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Main>
            <div className="mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Daftar Pengguna
                    </h2>
                </div>
            </div>
            <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                <DataTable data={users ?? []} columns={columns} />
            </div>
        </Main>
    );
}
