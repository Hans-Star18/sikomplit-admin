import { Main } from '@/components/partials/main';
import { Button } from '@/components/ui/button';
import { type Recommendation } from '@/features/recommendation/components/types';
import axiosInstance from '@/lib/axios';
import { IconArrowLeft } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

export default function RecommendationDetail({ id }: { id: string }) {
    const { data: response } = useQuery({
        queryKey: ['recommendations', id],
        queryFn: () => {
            return axiosInstance.get<{ data: Recommendation }>(
                `/admin/recommendations/${id}`,
            );
        },
    });

    const recommendation = response?.data.data;

    return (
        <Main>
            <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
                <div className="flex items-center gap-2 justify-between w-full">
                    <h2 className="text-2xl font-bold tracking-tight flex-1">
                        Detail Permohonan Surat Rekomendasi
                    </h2>

                    <Button>
                        <Link
                            to="/recommendations"
                            className="flex items-center gap-2"
                        >
                            <IconArrowLeft className="h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <h1>{recommendation?.request_number}</h1>
                </div>
            </div>
        </Main>
    );
}
