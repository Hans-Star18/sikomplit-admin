import { Main } from '@/components/partials/main';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { type Recommendation } from '@/features/recommendation/components/types';
import axiosInstance from '@/lib/axios';
import { IconArrowLeft, IconDownload, IconPencil } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import { BiodataSection } from './components/biodata-section';

export default function RecommendationDetail({ id }: { id: string }) {
    const { data: response } = useQuery({
        queryKey: ['recommendations', id],
        queryFn: () => {
            return axiosInstance.get<{ data: Recommendation }>(
                `/admin/recommendations/${id}`,
            );
        },
    });

    const { data: statusesResponse } = useQuery({
        queryKey: ['statuses'],
        queryFn: () => {
            return axiosInstance.get<{
                data: {
                    name: string;
                    code: string;
                }[];
            }>('/options/progress-statuses');
        },
    });

    const statuses =
        statusesResponse?.data.data.map((status) => ({
            label: status.name,
            value: status.code,
        })) ?? [];

    const recommendation = response?.data.data;

    return (
        <Main>
            <div className="mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
                <div className="flex items-center gap-2 justify-between w-full">
                    <h2 className="text-2xl font-bold tracking-tight flex-1">
                        Detail Permohonan Surat Rekomendasi
                    </h2>
                    <div className="flex items-center gap-2">
                        <Button>
                            <Link
                                to="/recommendations"
                                className="flex items-center gap-2"
                            >
                                <IconArrowLeft className="h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>
                        <Button variant="outline">
                            <Link
                                to="/recommendations/$id/edit"
                                params={{ id }}
                                className="flex items-center gap-2"
                            >
                                <IconPencil className="h-4 w-4" />
                                Edit
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="grid w-full max-w-sm items-center gap-3 mb-4">
                    <Label htmlFor="request_number">Nomer Permohonan</Label>
                    <Input
                        disabled
                        type="text"
                        id="request_number"
                        placeholder="Nomer Permohonan"
                        value={recommendation?.request_number ?? ''}
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3 mb-4">
                    <Label htmlFor="research_type">Jenis Penelitian</Label>
                    <Input
                        disabled
                        type="text"
                        id="research_type"
                        placeholder="Jenis Penelitian"
                        value={recommendation?.research_type ?? ''}
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3 mb-4">
                    <Label htmlFor="progress_status">Status Proses</Label>
                    <Input
                        disabled
                        type="text"
                        id="progress_status"
                        placeholder="Status Proses"
                        value={recommendation?.progress_status ?? ''}
                    />
                </div>
            </div>

            {recommendation && (
                <BiodataSection recommendation={recommendation} />
            )}

            <div>
                <h1 className="font-bold mb-2">Dokumen</h1>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {recommendation?.application_letter && (
                        <div className="grid w-full max-w-sm items-center gap-3 mb-4">
                            <Label htmlFor="request_number">
                                Surat Permohonan
                            </Label>
                            <a
                                className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-2"
                                href={recommendation?.application_letter}
                                download="surat_permohonan.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IconDownload className="h-4 w-4" />
                                Unduh Surat Permohonan
                            </a>
                        </div>
                    )}
                    {recommendation?.research_proposal && (
                        <div className="grid w-full max-w-sm items-center gap-3 mb-4">
                            <Label htmlFor="research_type">
                                Proposal Penelitian
                            </Label>
                            <a
                                className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-2"
                                href={recommendation?.research_proposal}
                                download="proposal_penelitian.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IconDownload className="h-4 w-4" />
                                Unduh Proposal Penelitian
                            </a>
                        </div>
                    )}
                    {recommendation?.ethics_clearance_letter && (
                        <div className="grid w-full max-w-sm items-center gap-3 mb-4">
                            <Label htmlFor="research_type">
                                Surat Keterangan Etika
                            </Label>
                            <a
                                className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-2"
                                href={recommendation?.ethics_clearance_letter}
                                download="surat_keterangan_etika.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IconDownload className="h-4 w-4" />
                                Unduh Surat Keterangan Etika
                            </a>
                        </div>
                    )}
                    {recommendation?.final_report_statement_letter && (
                        <div className="grid w-full max-w-sm items-center gap-3 mb-4">
                            <Label htmlFor="research_type">
                                Pernyataan Penyerahan Penelitian
                            </Label>
                            <a
                                className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-2"
                                href={
                                    recommendation?.final_report_statement_letter
                                }
                                download="pernyataan_penyerahan_penelitian.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IconDownload className="h-4 w-4" />
                                Unduh Pernyataan Penyerahan Penelitian
                            </a>
                        </div>
                    )}
                    {recommendation?.recommendation_letter && (
                        <div className="grid w-full max-w-sm items-center gap-3 mb-4">
                            <Label htmlFor="research_type">
                                Surat Rekomendasi
                            </Label>
                            <a
                                className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-2"
                                href={recommendation?.recommendation_letter}
                                download="surat_rekomendasi.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IconDownload className="h-4 w-4" />
                                Unduh Surat Rekomendasi
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </Main>
    );
}
