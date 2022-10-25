const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { connectToDB } = require('./database');
const profileRouter = require('./controllers/profile');
const authRouter = require('./controllers/auth');

require('dotenv').config();

const PORT = process.env.PORT || 8000;
const SECRET = process.env.SECRET || 'secret';

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: SECRET,
    cookie: { maxAge: 60000 },
  }),
);

connectToDB();

app.use('/profile', profileRouter);
app.use('/auth', authRouter);

app.listen(PORT);
