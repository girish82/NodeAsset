const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routers/userRouter');
// const bookRouter = require('./routers/bookRouter');
require('./db/mongoose')


app.use(cors());
app.use(express.json())

app.use(userRouter);
// app.use(bookRouter);

module.exports = app;