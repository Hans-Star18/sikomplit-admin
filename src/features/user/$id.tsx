import { Main } from '@/components/partials/main';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { type User } from '@/features/user/components/types';
import axiosInstance from '@/lib/axios';
import { formatDate } from '@/lib/utils';
import { IconArrowLeft, IconPencil } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

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

export default function UserDetail({ id }: { id: string }) {
    const { data: user, isLoading } = getUser(id);

    const form = useForm<User>({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            email_verified_at: new Date(),
            created_at: new Date(),
            updated_at: new Date(),
            role: {
                id: 0,
                name: '',
            },
        },
    });

    useEffect(() => {
        if (user) {
            form.setValue('name', user.name);
            form.setValue('email', user.email);
            form.setValue('phone', user.phone);
            form.setValue('email_verified_at', user.email_verified_at);
            form.setValue('created_at', user.created_at);
            form.setValue('updated_at', user.updated_at);
            form.setValue('role', user.role);
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
        {
            id: 3,
            name: 'Staff',
        },
    ];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Main>
            <div className="mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
                <div className="flex w-full items-center justify-between gap-2">
                    <h2 className="flex-1 text-2xl font-bold tracking-tight">
                        Detail User
                    </h2>
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
                        <Button variant="outline">
                            <Link
                                to="/users/$id/edit"
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

            <Form {...form}>
                <form>
                    <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled
                                            type="text"
                                            id="name"
                                            placeholder="Nama"
                                            defaultValue={field.value}
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
                                            disabled
                                            type="text"
                                            id="email"
                                            placeholder="Email"
                                            defaultValue={field.value}
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
                                            disabled
                                            type="text"
                                            id="phone"
                                            placeholder="No. HP"
                                            defaultValue={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={
                                                field.value?.id?.toString() ??
                                                ''
                                            }
                                            disabled
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
                        <FormField
                            control={form.control}
                            name="email_verified_at"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Terverifikasi</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Checkbox
                                                checked={
                                                    field.value ? true : false
                                                }
                                                onCheckedChange={field.onChange}
                                                disabled
                                            />
                                            <span>
                                                {field.value
                                                    ? `Terverifikasi pada ${formatDate(
                                                          field.value,
                                                      )}`
                                                    : 'Belum terverifikasi'}
                                            </span>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
        </Main>
    );
}
