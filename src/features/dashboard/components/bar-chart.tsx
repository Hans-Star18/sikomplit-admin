'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

import type { RecommendationTimeRange } from './types';

// const chartData = [
//     { range: '< 1 hari', letter: 186 },
//     { range: '1 hari', letter: 305 },
//     { range: '2 hari', letter: 237 },
//     { range: '3 hari', letter: 73 },
//     { range: '> 3 hari', letter: 209 },
// ];

const chartConfig = {
    letter: {
        label: 'Surat',
        color: 'var(--chart-1)',
    },
} satisfies ChartConfig;

const chartRanges = [
    { label: '< 1 hari', match: (n: number) => n === 0 },
    { label: '1 hari', match: (n: number) => n === 1 },
    { label: '2 hari', match: (n: number) => n === 2 },
    { label: '3 hari', match: (n: number) => n === 3 },
    { label: '> 3 hari', match: (n: number) => n >= 4 },
];

export function BarChartComponent({
    recommendationTimeRange,
}: {
    recommendationTimeRange: RecommendationTimeRange[];
}) {
    const recommendationTimeRangeArray = Object.values(recommendationTimeRange);

    const chartData = chartRanges.map(({ label, match }) => {
        const total = recommendationTimeRangeArray
            .filter((item) => match(item.label))
            .reduce((sum, item) => sum + item.count, 0);

        return {
            range: label,
            letter: total,
        };
    });

    const totalSurat = recommendationTimeRangeArray.reduce(
        (sum, item) => sum + item.count,
        0,
    );
    const totalHari = recommendationTimeRangeArray.reduce(
        (sum, item) => sum + item.label * item.count,
        0,
    );
    const rataRata = totalSurat === 0 ? 0 : totalHari / totalSurat;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Monitoring waktu proses</CardTitle>
                <CardDescription>
                    Monitoring waktu proses surat rekomendasi
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="range"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="letter"
                            fill="var(--color-letter)"
                            radius={8}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Rata-rata waktu proses surat rekomendasi adalah{' '}
                    {rataRata.toFixed(2)} hari
                </div>
            </CardFooter>
        </Card>
    );
}
