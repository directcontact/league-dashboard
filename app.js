const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const { readFile } = require('./util/read-json');

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
const mongoDB = process.env.DATABASE_URL;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('connected', (err, res) => {
  console.log('mongoose is connected');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/v1/read/static', async (req, res) => {
  await readFile();
});

app.listen(8000, () => {
  console.log('listening on port 8000!');
});
