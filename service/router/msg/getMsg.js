import express from "express";
import {HTTP_STATUS_CODES} from "../../global.js";
import {connectToDatabase} from "../../db/index.js";
const router = express.Router();

// 登录
router.post('', async (req, res) => {

  let sendValue = {
    code: HTTP_STATUS_CODES.OK,
    data: {},
    message: '获取成功'
  }

  const {user_id, msg_id} = req.body;

  if (!user_id || !msg_id) {
    sendValue.code = HTTP_STATUS_CODES.BAD_REQUEST;
    sendValue.message = '参数不全';
    return res.send(sendValue);
  }

  try {

    const lookUpMsg = await connectToDatabase(
        '查找一个',
        'msg',
        {'$and': [{user_id}, {msg_id}, {isDel: 0}]},
        {_id: 0, isDel: 0})

    if (lookUpMsg === null) {
      sendValue.code = HTTP_STATUS_CODES.NOT_FOUND;
      sendValue.message = '未找到对话记录';

      return res.send(sendValue);
    }

    sendValue.data = lookUpMsg;

  } catch (e) {
    sendValue.code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    sendValue.message = e.message;
  }

  return res.send(sendValue);

})

export default router;
