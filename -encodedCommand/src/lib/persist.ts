import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getAccountStorageKey(): Promise<string> {
  const txId = await AsyncStorage.getItem("toss_txId");
  return txId ?? "guest";
}

export async function persistGetNumber(key: string): Promise<number> {
  const val = await AsyncStorage.getItem(key);
  return Number(val ?? 0);
}

export async function persistSetNumber(key: string, value: number): Promise<void> {
  await AsyncStorage.setItem(key, String(value));
}
