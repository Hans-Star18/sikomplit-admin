import { Main } from '@/components/partials/main';
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { type User, type UserEditForm } from '@/features/user/components/types';
import axiosInstance from '@/lib/axios';
import {
    IconArrowLeft,
    IconDeviceFloppy,
    IconLoader,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const getUser = (id: string) => {
    const { data, isLoading } = useQuery({
        queryKey: ['user', id],
        queryFn: () => {
            return axiosInstance.get<{ data: User }>(`/admin/users/${id}`);
        },
    });

    return {
        data: data?.data.data,
        isLoading,
    };
};

export default function UserEdit({ id }: { id: string }) {
    const { data: user } = getUser(id);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<UserEditForm>({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            role_id: 0,
        },
    });

    useEffect(() => {
        if (user) {
            form.setValue('name', user.name);
            form.setValue('email', user.email);
            form.setValue('phone', user.phone);
            form.setValue('role_id', user.role.id);
        }
    }, [user]);

    const roles = [
        {
            id: 1,
            name: 'Admin',
        },
        {
            id: 2,
            name: 'User',
        },
    ];

    async function onSubmit(data: UserEditForm) {
        setIsLoading(true);

        try {
            await axiosInstance.put(`/admin/users/${id}`, data);

            toast.success('Berhasil memperbarui data.');
        } catch (error: any) {
            if (error.response?.status === 422) {
                const errors = error.response?.data?.errors;
                for (const key in errors) {
                    form.setError(key as keyof UserEditForm, {
                        type: 'server',
                        message: errors[key][0],
                    });
                }
            } else {
                toast.error(
                    error.response?.data?.message ||
                        'Terjadi kesalahan saat mengubah data.',
                );
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Main>
            <div className="mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
                <div className="flex items-center gap-2 justify-between w-full">
                    <h2 className="text-2xl font-bold tracking-tight flex-1">
                        Edit User
                    </h2>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <Button>
                                <Link
                                    to="/users/$id"
                                    params={{ id }}
                                    className="flex items-center gap-2"
                                >
                                    <IconArrowLeft className="h-4 w-4" />
                                    Ke Detail
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            id="name"
                                            placeholder="Nama"
                                            defaultValue={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            id="email"
                                            placeholder="Email"
                                            defaultValue={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>No. HP</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            id="phone"
                                            placeholder="No. HP"
                                            defaultValue={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={
                                                field.value?.toString() ?? ''
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Role
                                                    </SelectLabel>
                                                    {roles.map((role) => (
                                                        <SelectItem
                                                            key={role.id}
                                                            value={role.id.toString()}
                                                        >
                                                            {role.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button>
                            <Link
                                to="/users"
                                className="flex items-center gap-2"
                            >
                                <IconArrowLeft className="h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            onClick={() => {
                                form.handleSubmit(onSubmit);
                            }}
                        >
                            <IconDeviceFloppy className="h-4 w-4" />
                            Simpan{' '}
                            {isLoading && (
                                <IconLoader className="animate-spin" />
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </Main>
    );
}
