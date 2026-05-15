import type { VercelRequest, VercelResponse } from '@vercel/node';

const BASE_URL = 'https://apps-in-toss-api.toss.im';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { authorizationCode, referrer } = req.body;

  if (!authorizationCode) {
    return res.status(400).json({ error: 'authorizationCode가 필요해요' });
  }

  try {
    const response = await fetch(`${BASE_URL}/api-partner/v1/apps-in-toss/user/oauth2/generate-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        authorizationCode,
        referrer: referrer ?? 'deeplink',
      }),
    });

    const data = await response.json();

    if (!response.ok || data.resultType !== 'SUCCESS') {
      return res.status(response.status).json({ error: data.error ?? data });
    }

    return res.status(200).json(data.success);
  } catch (error) {
    console.error('Token error:', error);
    return res.status(500).json({ error: '토큰 발급 실패' });
  }
}
