import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 로그인된 유저의 userKey를 반환
 * 없으면 guest 키 반환
 */
export async function getAccountStorageKey(): Promise<string> {
  const userKey = sessionStorage.getItem('toss_user_key');
  return userKey ?? 'guest';
}

export async function persistGetNumber(key: string): Promise<number> {
  const val = await AsyncStorage.getItem(key);
  return Number(val ?? 0);
}

export async function persistSetNumber(key: string, value: number): Promise<void> {
  await AsyncStorage.setItem(key, String(value));
}
