type Config = {
    api: {
        base_url: string;
    };
};

const config: Config = {
    api: {
        base_url:
            import.meta.env.VITE_API_BASE_URL || 'https://localhost:8000/api',
    },
};

export function getConfig<T = any>(path: string): T {
    return path
        .split('.')
        .reduce(
            (prev, key) => (prev as Record<string, any>)?.[key],
            config,
        ) as T;
}
export { config };
