import express from "express";
// import dotenv from "dotenv";
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// dotenv.config({path: '.env.example'});

import IndexRouter from "./router/index.js"


const app = express();

app.use(logger(process.env.LOGGER || 'dev')); // 日志
app.use(cookieParser()); // cookie
app.use(bodyParser.json()); // 解析JSON格式的请求体
app.use(express.static('public')) // 前端文件
// app.use('/avatar', express.static('avatar')) // 头像

app.use(IndexRouter)
app.all('*', (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'authorization, Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`监听端口 ${PORT}`);
});



