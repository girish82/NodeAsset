const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routers/userRouter');
const assetRouter = require('./routers/assetRouter');
require('./db/mongoose')


app.use(cors());
app.use(express.json())

app.use(userRouter);
app.use(assetRouter);

module.exports = app;