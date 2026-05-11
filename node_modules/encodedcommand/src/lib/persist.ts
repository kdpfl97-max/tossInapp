import { getSavedAccountKey } from "./authApi";

/**
 * 로그인된 유저의 accountKey를 반환
 * 없으면 guest 키 반환
 */
export async function getAccountStorageKey(): Promise<string> {
  const key = getSavedAccountKey();
  return key ?? "guest";
}

export async function persistGetNumber(key: string): Promise<number> {
  return Number(localStorage.getItem(key) ?? 0);
}

export async function persistSetNumber(key: string, value: number): Promise<void> {
  localStorage.setItem(key, String(value));
}
