import AuthLayout from '@/components/layout/auth-layout';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router';

import { UserAuthForm } from './components/user-auth-form';

export const Route = createFileRoute('/(auth)/login')({
    component: () => {
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
    },
});
