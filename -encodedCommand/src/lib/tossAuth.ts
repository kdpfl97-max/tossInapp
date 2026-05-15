export interface TossUser {
  userKey: number;
  name?: string;
  email?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// 웹 환경인지 확인
const isWebEnvironment = typeof window !== 'undefined' && !window.ReactNativeWebView;

/**
 * 1단계: 토스앱 인증으로 authorizationCode 받기
 * 웹 환경에서는 mock으로 처리
 */
async function getAuthorizationCode(): Promise<string> {
  if (isWebEnvironment) {
    // 웹 환경에서는 mock authorizationCode 반환
    console.log('[TossAuth] 웹 환경 - mock authorizationCode 사용');
    return 'mock-authorization-code-' + Date.now();
  }

  // 실제 토스앱 환경
  const { appsInTossSignTossCert } = await import('@apps-in-toss/web-framework');
  return new Promise((resolve, reject) => {
    appsInTossSignTossCert({
      onSuccess: (result: any) => {
        const code = result?.authorizationCode ?? result?.code;
        if (code) resolve(code);
        else reject(new Error('authorizationCode를 받지 못했어요'));
      },
      onFail: (error: any) => {
        reject(new Error(error?.message ?? '토스 인증 실패'));
      },
    });
  });
}

/**
 * 2단계: authorizationCode로 accessToken + refreshToken 발급
 * 웹 환경에서는 mock 토큰 반환
 */
async function generateToken(authorizationCode: string): Promise<AuthTokens> {
  if (isWebEnvironment || authorizationCode.startsWith('mock-')) {
    // 웹 환경에서는 mock 토큰 반환
    console.log('[TossAuth] 웹 환경 - mock 토큰 사용');
    return {
      accessToken: 'mock-access-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
    };
  }

  const res = await fetch('/api/auth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ authorizationCode }),
  });

  if (!res.ok) throw new Error('토큰 발급 실패');
  return await res.json();
}

/**
 * 3단계: accessToken으로 사용자 정보 조회
 * 웹 환경에서는 mock 유저 반환
 */
export async function getMe(accessToken: string): Promise<TossUser> {
  if (isWebEnvironment || accessToken.startsWith('mock-')) {
    console.log('[TossAuth] 웹 환경 - mock 유저 사용');
    return { userKey: 999999, name: '테스트 유저', email: 'test@toss.im' };
  }

  const res = await fetch('/api/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('사용자 정보 조회 실패');
  return await res.json();
}

/**
 * refreshToken으로 accessToken 재발급
 */
export async function refreshAccessToken(): Promise<string> {
  const refreshToken = sessionStorage.getItem('toss_refresh_token');
  if (!refreshToken) throw new Error('refreshToken이 없어요');

  if (isWebEnvironment || refreshToken.startsWith('mock-')) {
    const newToken = 'mock-access-token-' + Date.now();
    sessionStorage.setItem('toss_access_token', newToken);
    return newToken;
  }

  const res = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) throw new Error('토큰 재발급 실패');
  const data = await res.json();
  sessionStorage.setItem('toss_access_token', data.accessToken);
  return data.accessToken;
}

/**
 * 전체 토스 로그인 플로우
 */
export async function runTossAuth(): Promise<{ success: boolean; user?: TossUser }> {
  try {
    const authorizationCode = await getAuthorizationCode();
    const tokens = await generateToken(authorizationCode);

    sessionStorage.setItem('toss_access_token', tokens.accessToken);
    sessionStorage.setItem('toss_refresh_token', tokens.refreshToken);
    sessionStorage.setItem('toss_auth_done', 'true');

    const user = await getMe(tokens.accessToken);
    sessionStorage.setItem('toss_user_key', String(user.userKey));

    return { success: true, user };
  } catch (error: any) {
    console.error('토스 로그인 오류:', error);
    throw error;
  }
}

/**
 * 로그인 완료 여부 확인
 */
export function isTossAuthDone(): boolean {
  return sessionStorage.getItem('toss_auth_done') === 'true';
}

/**
 * 저장된 accessToken 가져오기
 */
export function getAccessToken(): string | null {
  return sessionStorage.getItem('toss_access_token');
}
