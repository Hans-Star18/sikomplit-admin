import axiosInstance from '@/lib/axios';

// Cache untuk menyimpan data user
let userCache: any = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 menit

export const getUserData = async () => {
    const now = Date.now();

    // Jika cache masih valid, gunakan cache
    if (userCache && now - cacheTimestamp < CACHE_DURATION) {
        return userCache;
    }

    try {
        const response = await axiosInstance.get('/user/auth/check');
        userCache = response.data.data;
        cacheTimestamp = now;
        return userCache;
    } catch (error: any) {
        // Jika error, clear cache
        userCache = null;
        cacheTimestamp = 0;
        return null;
    }
};

// Fungsi untuk clear cache (bisa dipanggil saat logout)
export const clearUserCache = () => {
    userCache = null;
    cacheTimestamp = 0;
};

// Fungsi untuk force refresh data user (ignore cache)
export const refreshUserData = async () => {
    userCache = null;
    cacheTimestamp = 0;
    return await getUserData();
};
