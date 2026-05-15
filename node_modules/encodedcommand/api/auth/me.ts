import type { VercelRequest, VercelResponse } from '@vercel/node';

const BASE_URL = 'https://apps-in-toss-api.toss.im';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const accessToken = req.headers.authorization?.replace('Bearer ', '');

  if (!accessToken) {
    return res.status(401).json({ error: 'accessToken이 필요해요' });
  }

  try {
    const response = await fetch(`${BASE_URL}/api-partner/v1/apps-in-toss/user/oauth2/login-me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok || data.resultType !== 'SUCCESS') {
      return res.status(response.status).json({ error: data.error ?? data });
    }

    return res.status(200).json(data.success);
  } catch (error) {
    console.error('Me error:', error);
    return res.status(500).json({ error: '사용자 정보 조회 실패' });
  }
}
