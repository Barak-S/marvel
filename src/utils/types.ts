export const select = <K extends string | number, T extends unknown>(key: K, data: Record<K, T>) => data[key];