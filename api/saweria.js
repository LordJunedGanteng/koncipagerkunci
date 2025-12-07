// api/saweria.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const body = await new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => resolve(data));
  });

  let data;
  try {
    data = JSON.parse(body);
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const { customer_name, amount } = data;
  if (!customer_name || !amount) {
    return res.status(400).json({ error: 'Missing name or amount' });
  }

  // 🔥 SEMENTARA: balas langsung dulu (biar gampang test)
  return res.status(200).json({
    success: true,
    message: `Donation dari ${customer_name}: Rp${Number(amount).toLocaleString('id-ID')}`
  });
}
