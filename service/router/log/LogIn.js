import express from "express";
import {HTTP_STATUS_CODES, encipher} from "../../global.js";
import {connectToDatabase} from "../../db/index.js";
import jwt from "jsonwebtoken"

const router = express.Router();

// 登录
router.post('', async (req, res) => {

  let sendValue = {
    code: HTTP_STATUS_CODES.OK,
    data: {},
    message: '登录成功'
  }

  const {account, passWord} = req.body;
  const cookie = req.cookies.cookiesId;

  if (!account || !passWord) {
    sendValue.code = HTTP_STATUS_CODES.BAD_REQUEST;
    sendValue.message = '参数不全';
    return res.send(sendValue);
  }

  try {

    const lookUpUser = await connectToDatabase(
        '查找全部',
        'users',
        {
          '$or': [
            {userName: account},
            {email: account}],
          '$and': [{isDel: 0}]
        },
        {_id: 0, isDel: 0})

    // 用户不存在
    if (lookUpUser.length === 0) {
      sendValue.code = HTTP_STATUS_CODES.NOT_FOUND;
      sendValue.message = '用户不存在';
      return res.send(sendValue);
    }

    const user = lookUpUser[0];

    if (encipher(passWord) === user.passWord) {

      // 删除密码
      delete user.passWord;

      // 生产token
      const newToken = jwt.sign({cookiesId: cookie}, process.env.SECRET, {expiresIn: '7d'});

      // 保存token，用于验证用户身份
      const addUserVerify = await connectToDatabase(
          '增加一个',
          'verify',
          {cookie, userData: user, token: newToken})

      if (!addUserVerify) {
        sendValue.code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
        sendValue.message = '登录失败';
        return res.send(sendValue);
      }

      sendValue.data = user;

    } else {
      sendValue.code = HTTP_STATUS_CODES.UNAUTHORIZED;
      sendValue.message = '密码错误';
    }

  } catch (e) {
    sendValue.code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    sendValue.message = e.message;
  }

  return res.send(sendValue);

})

export default router;
