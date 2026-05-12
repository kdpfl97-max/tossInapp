// 토스 포인트 API
// 사업자 등록 후 실제 SDK로 교체하세요

export interface PointResult {
  success: boolean;
  balance: number;
  message?: string;
}

function getStoredPoints(): number {
  return Number(localStorage.getItem("toss_points") ?? 0);
}

function setStoredPoints(value: number) {
  localStorage.setItem("toss_points", String(value));
}

/**
 * 포인트 조회
 * 실제 연동 시: const res = await toss.point.getBalance();
 */
export async function getPoints(): Promise<PointResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, balance: getStoredPoints() });
    }, 300);
  });
}

/**
 * 포인트 적립
 * 실제 연동 시: const res = await toss.point.add({ amount });
 */
export async function addPoints(amount: number): Promise<PointResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const next = getStoredPoints() + amount;
      setStoredPoints(next);
      resolve({ success: true, balance: next, message: `${amount}P 적립됐어요` });
    }, 300);
  });
}

/**
 * 포인트 차감/사용
 * 실제 연동 시: const res = await toss.point.use({ amount });
 */
export async function usePoints(amount: number): Promise<PointResult> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const current = getStoredPoints();
      if (current < amount) {
        reject({ success: false, balance: current, message: "포인트가 부족해요" });
        return;
      }
      const next = current - amount;
      setStoredPoints(next);
      resolve({ success: true, balance: next, message: `${amount}P 사용됐어요` });
    }, 300);
  });
}
