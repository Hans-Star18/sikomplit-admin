import { Main } from '@/components/partials/main';
import { Progress } from '@/components/ui/progress';
import axiosInstance from '@/lib/axios';
import {
    IconBrandChrome,
    IconBrandEdge,
    IconBrandFirefox,
    IconBrandOpera,
    IconBrandSafari,
    IconWorld,
    IconWorldSearch,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface PageViewBrowser {
    chrome: number;
    firefox: number;
    safari: number;
    edge: number;
    opera: number;
    ie: number;
    others: number;
}

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
        isLoading: isLoading,
    };
};

export default function PageViewIndex() {
    const { data: pageViews, isLoading } = getPageViews();
    const [totalPageViews, setTotalPageViews] = useState(0);

    const browserIcons = {
        chrome: <IconBrandChrome size={24} className="text-gray-500" />,
        firefox: <IconBrandFirefox size={24} className="text-gray-500" />,
        safari: <IconBrandSafari size={24} className="text-gray-500" />,
        edge: <IconBrandEdge size={24} className="text-gray-500" />,
        opera: <IconBrandOpera size={24} className="text-gray-500" />,
        ie: <IconWorldSearch size={24} className="text-gray-500" />,
        others: <IconWorld size={24} className="text-gray-500" />,
    };

    useEffect(() => {
        setTotalPageViews(
            Object.values(pageViews ?? {}).reduce((acc, curr) => acc + curr, 0),
        );
    }, [pageViews]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Main>
            <div className="mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Page View
                    </h2>
                </div>
            </div>
            <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                {pageViews &&
                    Object.entries(pageViews).map(([key, value]) => (
                        <div key={key} className="mx-0 mb-4">
                            <h3 className="flex items-center gap-2 text-lg font-medium capitalize">
                                {browserIcons[key as keyof typeof browserIcons]}
                                {key} ({value} kunjungan)
                            </h3>
                            <Progress
                                value={value}
                                className="h-4 w-full rounded-sm"
                            />
                        </div>
                    ))}

                <div className="flex flex-col gap-4">
                    <h3 className="text-base font-medium">
                        Total kunjungan website: {totalPageViews} kunjungan
                    </h3>
                </div>
            </div>
        </Main>
    );
}
