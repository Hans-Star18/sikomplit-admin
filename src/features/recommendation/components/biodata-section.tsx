import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type Recommendation } from '@/features/recommendation/components/types';

export function BiodataSection({
    recommendation,
}: {
    recommendation: Recommendation;
}) {
    return (
        <div className="mb-4 border rounded-md p-4">
            <h1 className="font-bold mb-2">Biodata</h1>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="grid w-full max-w-sm items-center gap-3 mb-4">
                    <Label htmlFor="name">Nama</Label>
                    <Input
                        disabled
                        type="text"
                        id="name"
                        placeholder="Nama"
                        value={recommendation?.name ?? ''}
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3 mb-4">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        disabled
                        type="text"
                        id="email"
                        placeholder="Email"
                        value={recommendation?.email ?? ''}
                    />
                </div>

                <div className="grid w-full max-w-sm items-center gap-3 mb-4">
                    <Label htmlFor="phone">No. Telp</Label>
                    <Input
                        disabled
                        type="text"
                        id="phone"
                        placeholder="No. HP"
                        value={recommendation?.phone ?? ''}
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3 mb-4">
                    <Label htmlFor="national_identity_number">No. KTP</Label>
                    <Input
                        disabled
                        type="text"
                        id="national_identity_number"
                        placeholder="No. KTP"
                        value={recommendation?.national_identity_number ?? ''}
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3 mb-4">
                    <Label htmlFor="date_of_birth">Tanggal Lahir</Label>
                    <Input
                        disabled
                        type="text"
                        id="date_of_birth"
                        placeholder="Tanggal Lahir"
                        value={recommendation?.date_of_birth ?? ''}
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3 mb-4">
                    <Label htmlFor="gender">Jenis Kelamin</Label>
                    <Input
                        disabled
                        type="text"
                        id="gender"
                        placeholder="Jenis Kelamin"
                        value={recommendation?.gender ?? ''}
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3 mb-4">
                    <Label htmlFor="last_education">Pendidikan Terakhir</Label>
                    <Input
                        disabled
                        type="text"
                        id="last_education"
                        placeholder="Pendidikan Terakhir"
                        value={recommendation?.last_education ?? ''}
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3 mb-4">
                    <Label htmlFor="occupation">Pekerjaan</Label>
                    <Input
                        disabled
                        type="text"
                        id="occupation"
                        placeholder="Pekerjaan"
                        value={recommendation?.occupation ?? ''}
                    />
                </div>
            </div>
        </div>
    );
}
