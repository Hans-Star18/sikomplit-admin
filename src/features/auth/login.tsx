import AuthLayout from '@/components/layout/auth-layout';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { UserAuthForm } from '@/features/auth/components/user-auth-form';

export default function LoginForm() {
    return (
        <AuthLayout>
            <Card className="gap-4">
                <CardHeader>
                    <CardTitle className="text-lg tracking-tight">
                        Masuk
                    </CardTitle>
                    <CardDescription>
                        Masukkan email dan password Anda di bawah ini untuk
                        <br />
                        masuk ke akun Anda
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UserAuthForm />
                </CardContent>
            </Card>
        </AuthLayout>
    );
}
