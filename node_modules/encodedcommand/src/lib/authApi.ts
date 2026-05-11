// 토스 인앱 로그인 API 연동
// 실제 토스 SDK 환경에서는 toss.login() 등으로 교체하세요

export interface AuthResult {
  accountKey: string;
  accessToken: string;
}

/**
 * 토스 로그인 API 호출
 * 웹 로컬 테스트 환경에서는 mock 데이터를 반환합니다
 */
export async function loginWithToss(): Promise<AuthResult> {
  // 실제 토스 인앱 환경에서는 아래 주석을 풀고 사용하세요
  // const result = await toss.login({ scopes: ["account"] });
  // return { accountKey: result.accountKey, accessToken: result.accessToken };

  // 로컬 테스트용 mock
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        accountKey: "mock-account-key-12345",
        accessToken: "mock-access-token-abcde",
      });
    }, 800);
  });
}

/**
 * 로그인 상태 확인
 */
export async function checkLoginStatus(): Promise<boolean> {
  const token = sessionStorage.getItem("toss_access_token");
  return !!token;
}

/**
 * 토큰 저장
 */
export function saveAuthToken(result: AuthResult) {
  sessionStorage.setItem("toss_access_token", result.accessToken);
  sessionStorage.setItem("toss_account_key", result.accountKey);
}

/**
 * 저장된 accountKey 가져오기
 */
export function getSavedAccountKey(): string | null {
  return sessionStorage.getItem("toss_account_key");
}

/**
 * 로그아웃
 */
export function logout() {
  sessionStorage.removeItem("toss_access_token");
  sessionStorage.removeItem("toss_account_key");
}
