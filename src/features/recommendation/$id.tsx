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
import { IconArrowLeft, IconPencil } from '@tabler/icons-react';
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
                        {/* <Button variant="outline">
                            <Link
                                to={`/recommendations/${id}/edit`}
                                className="flex items-center gap-2"
                            >
                                <IconPencil className="h-4 w-4" />
                                Edit
                            </Link>
                        </Button> */}
                    </div>
                </div>
            </div>

            {/* "data": {
        "id": 1,
        "request_number": "REQ-0001-060",
        "research_type": "Penelitian Tugas Akhir",
        "progress_status": "Disetujui & Diterbitkan",
        "application_letter": "https://sikomplit-server.sirejang.com/storage/recommendation_requests/application_letter/cQNIu2MvZChSE0G61o0iXcVvbw3A1DlMLlCdvXDX.pdf",
        "research_proposal": "https://sikomplit-server.sirejang.com/storage/recommendation_requests/research_proposal/Kp9QGdMt8Z6awsUqLs8beJ1pae7sVGTuTw9I7MPF.pdf",
        "ethics_clearance_letter": "https://sikomplit-server.sirejang.com/storage/recommendation_requests/ethics_clearance_letter/V1AV0QRB7p7AiaNxR0aNS4WBbEtJkOWwNplMaKW7.pdf",
        "final_report_statement_letter": "https://sikomplit-server.sirejang.com/storage/recommendation_requests/final_report_statement_letter/VRNAifEEsaPpYJ2g5jVHCkdYFVFcsrAuKiUn6bYo.pdf",
        "name": "Setya Uwais M.M.",
        "email": "elisa.uyainah@gmail.com",
        "phone": "0686 0301 614",
        "national_identity_number": "3098015158456",
        "date_of_birth": "2000-05-13",
        "gender": "Pria",
        "last_education": "Magister / S2",
        "occupation": "TNI / Tentara Nasional Indonesia",
        "created_at": "2025-06-09 08:51:40",
        "updated_at": "2025-06-09 08:51:40"
    } */}

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
                    <Select
                        defaultValue={recommendation?.progress_status}
                        disabled
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue
                                placeholder={recommendation?.progress_status}
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status Proses</SelectLabel>
                                {statuses.map((status) => (
                                    <SelectItem
                                        key={status.value}
                                        value={status.value}
                                    >
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {recommendation && (
                <BiodataSection recommendation={recommendation} />
            )}
        </Main>
    );
}
