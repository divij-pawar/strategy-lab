let strategies = [
  { id: 1, name: 'Momentum Breakout', description: 'Buy high, sell higher.' },
  { id: 2, name: 'Mean Reversion', description: 'Buy low, sell high.' }
];

const getAllStrategies = (req, res) => {
  res.json(strategies);
};

const addStrategy = (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  const newStrategy = {
    id: strategies.length + 1,
    name,
    description
  };

  strategies.push(newStrategy);
  res.status(201).json(newStrategy);
};

module.exports = { getAllStrategies, addStrategy };
