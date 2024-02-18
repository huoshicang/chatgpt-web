import express from "express";
import {HTTP_STATUS_CODES, TimeAndDel} from "../../../global.js";
import {connectToDatabase} from "../../../db/index.js";
import {v4 as uuid} from 'uuid';

const router = express.Router();

// 注册
router.post('', async (req, res) => {

  let sendValue = {
    code: HTTP_STATUS_CODES.OK,
    data: {},
    message: '添加成功'
  };

  const {encryption, key, modelGroup, account, password} = req.body;


  if (!key || !key || !modelGroup || !account || !password) {
    sendValue.code = HTTP_STATUS_CODES.BAD_REQUEST;
    sendValue.message = '参数不全';
    return res.send(sendValue);
  }

  try {
    // 添加聊天

    const generateRandomString = (length) => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let result = '';

      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      return result;
    }

    const key_id = uuid()

    const addKey = await connectToDatabase('增加一个',
        'key',
        {
          _id: key_id,
          key_id,
          chat_usage: 0,
          encryption: encryption || generateRandomString(10),
          key, modelGroup, account, password,
          ...TimeAndDel().timeAndDel,
        },

    );

    console.log('addKey', addKey)

    if (!addKey) {
      sendValue.code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
      sendValue.message = '添加失败';
    }


  } catch (e) {
    sendValue.code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    sendValue.message = e.message;
  }

  return res.send(sendValue);
})


export default router;
