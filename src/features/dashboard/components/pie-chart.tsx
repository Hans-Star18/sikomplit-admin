import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import type { PageViewBrowser } from '@/features/dashboard/components/types';
import { Loader2 } from 'lucide-react';
import { LabelList, Pie, PieChart } from 'recharts';

const chartConfig = {
    visitors: {
        label: 'Pengunjung',
    },
    chrome: {
        label: 'Chrome',
        color: 'var(--chart-1)',
    },
    opera: {
        label: 'Opera',
        color: 'var(--chart-2)',
    },
    ie: {
        label: 'IE',
        color: 'var(--chart-3)',
    },
    safari: {
        label: 'Safari',
        color: 'var(--chart-2)',
    },
    firefox: {
        label: 'Firefox',
        color: 'var(--chart-3)',
    },
    edge: {
        label: 'Edge',
        color: 'var(--chart-4)',
    },
    others: {
        label: 'Others',
        color: 'var(--chart-5)',
    },
} satisfies ChartConfig;

export function PieChartComponent({
    pageViews,
    isLoading,
}: {
    pageViews: PageViewBrowser;
    isLoading: boolean;
}) {
    const chartData = Object.entries(pageViews ?? {}).map(
        ([browser, visitors]) => ({
            browser,
            visitors,
            fill: `var(--color-${browser})`,
        }),
    );

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Daftar Pengunjung</CardTitle>
                <CardDescription>
                    Data pengunjung berdasarkan browser
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 px-0 pb-0">
                {isLoading ? (
                    <div className="flex h-full items-center justify-center">
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                ) : (
                    <ChartContainer
                        config={chartConfig}
                        className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[300px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        nameKey="visitors"
                                        hideLabel
                                    />
                                }
                            />
                            <Pie data={chartData} dataKey="visitors">
                                <LabelList
                                    dataKey="browser"
                                    className="fill-background"
                                    stroke="none"
                                    fontSize={12}
                                    formatter={(
                                        value: keyof typeof chartConfig,
                                    ) => chartConfig[value]?.label}
                                />
                            </Pie>
                            <ChartLegend
                                formatter={(_: string, entry: any) =>
                                    `${entry.payload?.browser} (${entry.payload?.visitors})`
                                }
                                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                            />
                        </PieChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}
