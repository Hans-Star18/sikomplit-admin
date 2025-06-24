import { Main } from '@/components/partials/main';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { BarChartComponent } from '@/features/dashboard/components/bar-chart';
import CardOverview from '@/features/dashboard/components/card-overview';
import { PieChartComponent } from '@/features/dashboard/components/pie-chart';
import type {
    LastEducationDistribution,
    PageViewBrowser,
    RecommendationAverage,
    RecommendationCount,
    RecommendationTimeRange,
    Statistics,
} from '@/features/dashboard/components/types';
import type { Research } from '@/features/research/components/types';
import axiosInstance from '@/lib/axios';
import { formatDate } from '@/lib/utils';
import { IconFileText, IconLink, IconPhoto } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

const getStatistics = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['statistics'],
        queryFn: () => {
            return axiosInstance.get<{ data: Statistics }>('/admin/statistics');
        },
    });

    return {
        data: data?.data.data,
        isLoading,
    };
};

const getPageViews = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['page-views'],
        queryFn: () => {
            return axiosInstance.get<{ data: PageViewBrowser }>(
                '/admin/page-views/browser',
            );
        },
    });

    return {
        data: data?.data.data,
        isLoading,
    };
};

const getResearch = () => {
    const { data } = useQuery({
        queryKey: ['research'],
        queryFn: () => {
            return axiosInstance.get<{ data: Research[] }>(
                '/admin/research-uploads',
            );
        },
    });

    return {
        data: data?.data.data,
    };
};

const getRecommendationTimeRange = () => {
    const { data } = useQuery({
        queryKey: ['recommendation-time-range'],
        queryFn: () => {
            return axiosInstance.get<{
                data: RecommendationTimeRange[];
            }>('/admin/request/statistics?by=time_to_approve');
        },
    });

    return {
        data: data?.data.data,
    };
};

const getRecommendationAverageByAge = () => {
    const { data } = useQuery({
        queryKey: ['recommendation-average-by-age'],
        queryFn: () => {
            return axiosInstance.get<{ data: RecommendationAverage }>(
                '/admin/request/statistics/average?by=age',
            );
        },
    });

    return {
        data: data?.data.data,
    };
};

const getLastEducationDistribution = () => {
    const { data } = useQuery({
        queryKey: ['last-education-distribution'],
        queryFn: () => {
            return axiosInstance.get<{
                data: { distribution: LastEducationDistribution[] };
            }>('/admin/request/statistics/average?by=last_education');
        },
    });

    return {
        data: data?.data.data,
    };
};

const getRecommendationCount = () => {
    const { data } = useQuery({
        queryKey: ['recommendation-count'],
        queryFn: () => {
            return axiosInstance.get<{
                data: RecommendationCount;
            }>('/admin/request/statistics/counts');
        },
    });

    return {
        data: data?.data.data,
    };
};

export default function Dashboard() {
    const { data: statistics, isLoading } = getStatistics();
    const { data: pageViews, isLoading: isLoadingPageViews } = getPageViews();
    const { data: research } = getResearch();
    const researchData = [...(research || [])].reverse().slice(0, 5);
    const { data: recommendationTimeRange } = getRecommendationTimeRange();
    const { data: recommendationAverageByAge } =
        getRecommendationAverageByAge();
    const { data: lastEducationDistributionRaw } =
        getLastEducationDistribution();
    const lastEducationDistribution =
        lastEducationDistributionRaw?.distribution ?? [];
    const { data: recommendationCount } = getRecommendationCount();

    if (isLoading || isLoadingPageViews) {
        return <div>Loading...</div>;
    }

    return (
        <Main>
            <div className="mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Dashboard
                    </h2>
                </div>
            </div>
            <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                <div>
                    <CardOverview
                        statistics={statistics}
                        recommendationCount={recommendationCount}
                        recommendationAverageByAge={recommendationAverageByAge}
                    />
                    <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {pageViews && (
                            <PieChartComponent
                                pageViews={pageViews}
                                isLoading={isLoadingPageViews}
                            />
                        )}
                        <Card>
                            <CardHeader>
                                <CardTitle>Penelitian Terbaru</CardTitle>
                                <CardDescription>
                                    Penelitian terbaru yang telah diunggah oleh
                                    pengguna.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    {researchData.length === 0 ? (
                                        <div className="flex items-center justify-center">
                                            <p className="text-muted-foreground text-sm">
                                                Tidak ada penelitian terbaru
                                            </p>
                                        </div>
                                    ) : (
                                        researchData?.map((research) => (
                                            <div
                                                key={research.slug}
                                                className="flex items-center gap-4"
                                            >
                                                <div className="flex flex-1 flex-wrap items-center justify-between">
                                                    <div className="max-w-[200px] space-y-1 truncate md:max-w-full">
                                                        <p className="text-sm leading-none font-medium">
                                                            {research.title}
                                                        </p>
                                                        <p className="text-muted-foreground flex items-center gap-1 text-xs md:text-sm">
                                                            <span className="hidden md:inline">
                                                                {formatDate(
                                                                    research.created_at,
                                                                )}{' '}
                                                            </span>
                                                            {research.is_published ===
                                                            'Published' ? (
                                                                <Badge
                                                                    variant="outline"
                                                                    className="bg-green-500/20"
                                                                >
                                                                    Diterbitkan
                                                                </Badge>
                                                            ) : (
                                                                <Badge
                                                                    variant="outline"
                                                                    className="bg-red-500/20"
                                                                >
                                                                    Belum
                                                                    Diterbitkan
                                                                </Badge>
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-1 font-medium">
                                                        <a
                                                            href={
                                                                typeof research.flyer ===
                                                                    'string' &&
                                                                research.flyer !==
                                                                    null
                                                                    ? research.flyer
                                                                    : undefined
                                                            }
                                                            download
                                                            target="_blank"
                                                            className="cursor-pointer"
                                                        >
                                                            <IconPhoto
                                                                size={20}
                                                                className="text-blue-500"
                                                            />
                                                        </a>
                                                        <a
                                                            href={
                                                                typeof research.research_summary ===
                                                                    'string' &&
                                                                research.research_summary !==
                                                                    null
                                                                    ? research.research_summary
                                                                    : undefined
                                                            }
                                                            download
                                                            target="_blank"
                                                            className="cursor-pointer"
                                                        >
                                                            <IconFileText
                                                                size={20}
                                                                className="text-blue-500"
                                                            />
                                                        </a>
                                                        <Link
                                                            to="/research/$slug/edit"
                                                            params={{
                                                                slug: research.slug,
                                                            }}
                                                            className="cursor-pointer"
                                                        >
                                                            <IconLink
                                                                size={20}
                                                                className="text-blue-500"
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {recommendationTimeRange && (
                            <BarChartComponent
                                recommendationTimeRange={
                                    recommendationTimeRange
                                }
                            />
                        )}
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Distribusi Pendidikan Pemohon
                                </CardTitle>
                                <CardDescription>
                                    Distribusi pendidikan pemohon rekomendasi.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {lastEducationDistribution.length === 0 ? (
                                        <div className="flex items-center justify-center">
                                            <p className="text-muted-foreground text-sm">
                                                Tidak ada data
                                            </p>
                                        </div>
                                    ) : (
                                        lastEducationDistribution.map(
                                            (
                                                education: LastEducationDistribution,
                                                index: number,
                                            ) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2"
                                                >
                                                    <div className="border-border flex flex-1 flex-wrap items-center justify-between border-b pb-2">
                                                        <p className="text-sm leading-none font-medium">
                                                            {education.label}
                                                        </p>
                                                        <p className="text-muted-foreground text-base">
                                                            {education.count}
                                                        </p>
                                                    </div>
                                                </div>
                                            ),
                                        )
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Main>
    );
}
