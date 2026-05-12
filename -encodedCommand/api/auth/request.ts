import type { VercelRequest, VercelResponse } from '@vercel/node';

const CERT_BASE_URL = process.env.TOSS_CERT_BASE_URL!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { accessToken, requestUrl } = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: 'accessToken이 필요해요' });
  }

  try {
    const response = await fetch(`${CERT_BASE_URL}/api/v2/sign/user/auth/id/request`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestType: 'USER_NONE', // 원터치 인증 (개인정보 입력 불필요)
        requestUrl: requestUrl || 'intoss://pangpang-cat',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Auth request error:', error);
    return res.status(500).json({ error: '인증 요청 실패' });
  }
}
