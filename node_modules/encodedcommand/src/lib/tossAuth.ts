// 토스 인증 연동 (Vercel Serverless Functions 사용)
import { appsInTossSignTossCert } from "@apps-in-toss/web-framework";

let cachedToken: string | null = null;

/**
 * 1단계: AccessToken 발급
 */
async function getAccessToken(): Promise<string> {
  if (cachedToken) return cachedToken;

  const res = await fetch('/api/auth/token', { method: 'POST' });
  if (!res.ok) throw new Error('토큰 발급 실패');

  const data = await res.json();
  cachedToken = data.access_token;
  return cachedToken!;
}

/**
 * 2단계: 인증 요청 → txId 받기
 */
async function requestAuth(accessToken: string): Promise<string> {
  const res = await fetch('/api/auth/request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessToken }),
  });

  if (!res.ok) throw new Error('인증 요청 실패');

  const data = await res.json();
  if (data.resultType !== 'SUCCESS') throw new Error(data.error?.reason || '인증 요청 실패');

  return data.success.txId;
}

/**
 * 3단계: 인증 상태 폴링 (완료될 때까지 확인)
 */
async function pollAuthStatus(accessToken: string, txId: string): Promise<boolean> {
  const MAX_TRIES = 20;
  const INTERVAL_MS = 3000;

  for (let i = 0; i < MAX_TRIES; i++) {
    await new Promise((r) => setTimeout(r, INTERVAL_MS));

    const res = await fetch('/api/auth/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken, txId }),
    });

    const data = await res.json();

    if (data.resultType === 'SUCCESS') {
      const status = data.success.status;
      if (status === 'COMPLETED') return true;
      if (status === 'EXPIRED') throw new Error('인증 시간이 만료됐어요');
    }
  }

  throw new Error('인증 시간 초과');
}

/**
 * 전체 토스 인증 플로우 실행
 */
export async function runTossAuth(): Promise<{ success: boolean; txId?: string }> {
  try {
    const accessToken = await getAccessToken();
    const txId = await requestAuth(accessToken);

    // txId 저장
    sessionStorage.setItem('toss_txId', txId);
    sessionStorage.setItem('toss_access_token', accessToken);

    // ✅ 토스앱 인증 화면 호출 (SDK)
    await appsInTossSignTossCert({ txId });

    // 인증 상태 폴링
    const completed = await pollAuthStatus(accessToken, txId);

    if (completed) {
      sessionStorage.setItem('toss_auth_done', 'true');
      return { success: true, txId };
    }

    return { success: false };
  } catch (error) {
    console.error('토스 인증 오류:', error);
    throw error;
  }
}

/**
 * 인증 완료 여부 확인
 */
export function isTossAuthDone(): boolean {
  return sessionStorage.getItem('toss_auth_done') === 'true';
}
