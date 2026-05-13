import AsyncStorage from "@react-native-async-storage/async-storage";

export interface PointResult {
  success: boolean;
  balance: number;
  message?: string;
}

async function getStoredPoints(): Promise<number> {
  const val = await AsyncStorage.getItem("toss_points");
  return Number(val ?? 0);
}

async function setStoredPoints(value: number): Promise<void> {
  await AsyncStorage.setItem("toss_points", String(value));
}

export async function getPoints(): Promise<PointResult> {
  const balance = await getStoredPoints();
  return { success: true, balance };
}

export async function addPoints(amount: number): Promise<PointResult> {
  const current = await getStoredPoints();
  const next = current + amount;
  await setStoredPoints(next);
  return { success: true, balance: next, message: `${amount}P 적립됐어요` };
}

export async function usePoints(amount: number): Promise<PointResult> {
  const current = await getStoredPoints();
  if (current < amount) {
    throw { success: false, balance: current, message: "포인트가 부족해요" };
  }
  const next = current - amount;
  await setStoredPoints(next);
  return { success: true, balance: next, message: `${amount}P 사용됐어요` };
}
