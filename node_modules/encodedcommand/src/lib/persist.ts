import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 로그인된 유저의 userKey를 반환
 * 없으면 guest 키 반환
 */
export async function getAccountStorageKey(): Promise<string> {
  try {
    const userKey = await AsyncStorage.getItem('toss_user_key');
    return userKey ?? 'guest';
  } catch {
    return 'guest';
  }
}

export async function persistGetNumber(key: string): Promise<number> {
  try {
    const val = await AsyncStorage.getItem(key);
    return Number(val ?? 0);
  } catch {
    return 0;
  }
}

export async function persistSetNumber(key: string, value: number): Promise<void> {
  try {
    await AsyncStorage.setItem(key, String(value));
  } catch {
    // ignore
  }
}
