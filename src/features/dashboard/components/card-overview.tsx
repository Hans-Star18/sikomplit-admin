import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type {
    RecommendationAverage,
    RecommendationCount,
    Statistics,
} from '@/features/dashboard/components/types';
import {
    IconEye,
    IconFile,
    IconFileCheck,
    IconUsers,
} from '@tabler/icons-react';

export default function CardOverview({
    statistics,
    recommendationCount,
    recommendationAverageByAge,
}: {
    statistics?: Statistics;
    recommendationCount?: RecommendationCount;
    recommendationAverageByAge?: RecommendationAverage;
}) {
    return (
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Pengguna
                    </CardTitle>
                    <IconUsers className="text-muted-foreground size-5 font-light" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {statistics?.users.total} Pengguna
                    </div>
                    <p className="text-muted-foreground text-xs">
                        + {statistics?.users.last_30_days}{' '}
                        {statistics?.users.label_id}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Pengajuan Rekomendasi
                    </CardTitle>
                    <IconFile className="text-muted-foreground size-5 font-light" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {statistics?.recommendationRequests.total} Pengajuan
                    </div>
                    <p className="text-muted-foreground text-xs">
                        + {statistics?.recommendationRequests.last_7_days}{' '}
                        {statistics?.recommendationRequests.label_id}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Rekomendasi
                    </CardTitle>
                    <IconFileCheck className="text-muted-foreground size-5 font-light" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {statistics?.recommendationWithLetter.total} Rekomendasi
                    </div>
                    <p className="text-muted-foreground text-xs">
                        + {statistics?.recommendationWithLetter.last_7_days}{' '}
                        {statistics?.recommendationWithLetter.label_id}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Kunjungan
                    </CardTitle>
                    <IconEye className="text-muted-foreground size-5 font-light" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {statistics?.pageView.total} Kunjungan
                    </div>
                    <p className="text-muted-foreground text-xs">
                        + {statistics?.pageView.last_1_day}{' '}
                        {statistics?.pageView.label_id}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Rekomendasi Untuk Diselesaikan
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {recommendationCount?.to_be_complete} Rekomendasi
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Rekomendasi Dalam Perbaikan
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {recommendationCount?.revision} Rekomendasi
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Rekomendasi Disetujui
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {recommendationCount?.approved} Rekomendasi
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Rata - rata usia yang mengajukan
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {recommendationAverageByAge?.average} Tahun
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
