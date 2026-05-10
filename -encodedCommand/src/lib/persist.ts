// src/lib/persist.ts

export function getAccountStorageKey(key: string) {
    return `account_${key}`;
}

export function persistGetNumber(key: string): number {
    return Number(localStorage.getItem(key) ?? 0);
}

export function persistSetNumber(key: string, value: number) {
    localStorage.setItem(key, String(value));
}