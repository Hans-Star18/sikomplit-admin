import axiosInstance from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: () => axiosInstance.get('/user/auth/check'),
    });

    return data?.data.data;
};
