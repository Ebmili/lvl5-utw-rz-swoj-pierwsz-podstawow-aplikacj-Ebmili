const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Welcome to our schedule website');
});

const { users, schedules } = require('./data');

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/schedules', (req, res) => {
  res.json(schedules);
});

app.get('/users/:userId/schedules', (req, res) => {
  const userId = parseInt(req.params.userId);
  res.json(userId);
});

app.get('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users[userId];

  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else {
    res.json(user);
  }
});

app.post('/schedules', (req, res) => {
  const newSchedule = req.body;
  schedules.push(newSchedule);
  res.json(newSchedule);
});


app.post('/users', (req, res) => {
  const newUser = req.body;
  const crypto = require('crypto');
  const passwordHash = crypto
    .createHash('sha256')
    .update(newUser.password)
    .digest('base64');

  newUser.password = passwordHash;
  
  users.push(newUser);
  res.json(newUser);
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
