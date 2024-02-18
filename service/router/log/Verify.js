import express from "express";
import {HTTP_STATUS_CODES} from "../../global.js";
import {connectToDatabase} from "../../db/index.js";

import jwt from "jsonwebtoken";

const router = express.Router();

// 注册
router.get('', async (req, res) => {
  const cookie = req.cookies.cookiesId

  let sendValue = {
    code: HTTP_STATUS_CODES.OK,
    data: {},
    message: '已登录'
  }

  try {

    //  获取验证信息
    const lookUpUser = await connectToDatabase(
        '查找一个',
        'verify',
        {cookie},
        {_id: 0})

    // 如果存在 则返回
    if (!lookUpUser) {
      sendValue.code = HTTP_STATUS_CODES.UNAUTHORIZED;
      sendValue.message = '未登录';
      return res.send(sendValue);
    }


    // 解密
    const decoded = jwt.verify(lookUpUser.token, process.env.SECRET);
    const currentTimestamp = Date.now();
    const tokenTimestamp = parseInt(decoded.iat) * 1000; // 将秒转换为毫秒

    const tokenExpiration = 7 * 24 * 60 * 60 * 1000; // 7 天的有效期
    const isTokenExpired = currentTimestamp - tokenTimestamp > tokenExpiration;

    if (isTokenExpired) {
     // Token 超时
      sendValue.code = HTTP_STATUS_CODES.UNAUTHORIZED;
      sendValue.message = '登录过期';
      return res.send(sendValue);
    }

    sendValue.data = lookUpUser.userData;

  } catch (e) {
    sendValue.code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    sendValue.message = e.message;
  }

  return res.send(sendValue);

})


export default router;
