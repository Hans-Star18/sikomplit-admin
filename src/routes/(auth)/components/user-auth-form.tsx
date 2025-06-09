import { PasswordInput } from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { type HTMLAttributes, useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance, { setAccessToken } from '@/lib/axios';

type UserAuthFormProps = HTMLAttributes<HTMLFormElement>;

type LoginData = {
    email: string;
    password: string;
};

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<LoginData>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(data: LoginData) {
        setIsLoading(true);

        try {
            const response = await axiosInstance.post('/admin/auth/login', data);

            const { access_token, expires_in } = response.data;
            setAccessToken(access_token, expires_in);

            console.log('Login berhasil', response.data);
            // TODO: Redirect user ke dashboard atau halaman utama setelah login
            // Misalnya: router.push('/dashboard');
        } catch (error: any) {
            if (error.response?.status === 422) {
                const errors = error.response?.data?.errors;
                for (const key in errors) {
                    form.setError(key as keyof LoginData, {
                        type: 'server',
                        message: errors[key][0],
                    });
                }
            } else {
                form.setError('email', {
                    type: 'server',
                    message: error.response?.data?.message || 'Terjadi kesalahan saat login.',
                });
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn('grid gap-3', className)}
                {...props}
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="name@example.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="relative">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    placeholder="********"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="mt-2" disabled={isLoading}>
                    Login
                </Button>
            </form>
        </Form>
    );
}