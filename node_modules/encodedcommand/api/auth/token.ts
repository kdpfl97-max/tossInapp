import type { VercelRequest, VercelResponse } from '@vercel/node';

const CLIENT_ID = process.env.TOSS_CLIENT_ID!;
const CLIENT_SECRET = process.env.TOSS_CLIENT_SECRET!;
const AUTH_BASE_URL = process.env.TOSS_AUTH_BASE_URL!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      scope: 'ca',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    const response = await fetch(`${AUTH_BASE_URL}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Token error:', error);
    return res.status(500).json({ error: '토큰 발급 실패' });
  }
}
