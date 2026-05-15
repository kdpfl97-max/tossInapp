import AsyncStorage from '@react-native-async-storage/async-storage';

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
const isWeb = typeof window !== 'undefined' && typeof window.ReactNativeWebView === 'undefined';

async function storage_get(key: string): Promise<string | null> {
  try {
    if (isWeb) return sessionStorage.getItem(key);
    return await AsyncStorage.getItem(key);
  } catch { return null; }
}

async function storage_set(key: string, value: string): Promise<void> {
  try {
    if (isWeb) sessionStorage.setItem(key, value);
    else await AsyncStorage.setItem(key, value);
  } catch {}
}

/**
 * 1단계: 토스앱 인증으로 authorizationCode 받기
 */
async function getAuthorizationCode(): Promise<string> {
  if (isWeb) {
    console.log('[TossAuth] 웹 환경 - mock authorizationCode 사용');
    return 'mock-authorization-code-' + Date.now();
  }

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
 */
async function generateToken(authorizationCode: string): Promise<AuthTokens> {
  if (isWeb || authorizationCode.startsWith('mock-')) {
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
 * 3단계: 사용자 정보 조회
 */
export async function getMe(accessToken: string): Promise<TossUser> {
  if (isWeb || accessToken.startsWith('mock-')) {
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
 * 전체 토스 로그인 플로우
 */
export async function runTossAuth(): Promise<{ success: boolean; user?: TossUser }> {
  try {
    const authorizationCode = await getAuthorizationCode();
    const tokens = await generateToken(authorizationCode);

    await storage_set('toss_access_token', tokens.accessToken);
    await storage_set('toss_refresh_token', tokens.refreshToken);
    await storage_set('toss_auth_done', 'true');

    const user = await getMe(tokens.accessToken);
    await storage_set('toss_user_key', String(user.userKey));

    return { success: true, user };
  } catch (error: any) {
    console.error('토스 로그인 오류:', error);
    throw error;
  }
}

export function isTossAuthDone(): boolean {
  try {
    if (isWeb) return sessionStorage.getItem('toss_auth_done') === 'true';
    return false;
  } catch { return false; }
}

export function getAccessToken(): string | null {
  try {
    if (isWeb) return sessionStorage.getItem('toss_access_token');
    return null;
  } catch { return null; }
}
