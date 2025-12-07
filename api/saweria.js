// api/saweria.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  let data;
  try {
    data = req.body ? JSON.parse(req.body) : {};
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const name = data.customer_name?.trim() || 'Donatur';
  const amount = data.amount ? `Rp${Number(data.amount).toLocaleString('id-ID')}` : 'Rp0';

  // LOG untuk debug
  console.log('📥 Donasi diterima:', name, amount);

  // ✅ BALAS LANGSUNG (biar gampang test)
  res.status(200).json({ success: true, name, amount });
}
