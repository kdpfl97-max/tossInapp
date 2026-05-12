import type { VercelRequest, VercelResponse } from '@vercel/node';

const CERT_BASE_URL = process.env.TOSS_CERT_BASE_URL!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { accessToken, txId } = req.body;

  if (!accessToken || !txId) {
    return res.status(400).json({ error: 'accessToken과 txId가 필요해요' });
  }

  try {
    const response = await fetch(`${CERT_BASE_URL}/api/v2/sign/user/auth/id/status`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ txId }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Auth status error:', error);
    return res.status(500).json({ error: '인증 상태 조회 실패' });
  }
}
