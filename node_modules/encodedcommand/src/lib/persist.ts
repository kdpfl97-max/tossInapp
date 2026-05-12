/**
 * 로그인된 유저의 accountKey를 반환
 * tossAuth에서 저장한 txId를 식별자로 사용
 * 없으면 guest 키 반환
 */
export async function getAccountStorageKey(): Promise<string> {
  const txId = sessionStorage.getItem("toss_txId");
  return txId ?? "guest";
}

export async function persistGetNumber(key: string): Promise<number> {
  return Number(localStorage.getItem(key) ?? 0);
}

export async function persistSetNumber(key: string, value: number): Promise<void> {
  localStorage.setItem(key, String(value));
}
