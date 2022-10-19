const express = require('express');
const cors = require('cors');
const { connectToDB } = require('./database');
const profileRouter = require('./controllers/profile');

require('dotenv').config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());

await connectToDB();

app.use('/profile', profileRouter);

app.listen(PORT);
