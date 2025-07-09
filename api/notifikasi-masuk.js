let lastData = null;

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { date, via, name, amount } = req.body;

    if (!date || !via || !name || !amount) {
      return res.status(400).json({ error: 'Missing fields: date, via, name, or amount' });
    }

    lastData = { date, via, name, amount };
    return res.status(200).json({ message: 'Success', ...lastData });

  } else if (req.method === 'GET') {
    if (!lastData) {
      return res.status(404).json({ error: 'No data yet' });
    }

    return res.status(200).json(lastData);

  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
