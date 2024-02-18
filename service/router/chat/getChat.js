import express from "express";
import {HTTP_STATUS_CODES} from "../../global.js";
import {connectToDatabase} from "../../db/index.js";
const router = express.Router();

// 登录
router.post('', async (req, res) => {

  let sendValue = {
    code: HTTP_STATUS_CODES.OK,
    data: [],
    message: '获取成功'
  }

  const {user_id} = req.body;

  if (!user_id) {
    sendValue.code = HTTP_STATUS_CODES.BAD_REQUEST;
    sendValue.message = '缺少参数';
    return res.send(sendValue);
  }

  try {

    const lookUpChat = await connectToDatabase(
        '查找全部',
        'chat',
        {'$and': [{user_id}, {isDel: 0}]},
        {user_id: 0, isDel: 0})


    if (lookUpChat.length === 0) {
      sendValue.code = HTTP_STATUS_CODES.NOT_FOUND;
      sendValue.message = '未找到聊天记录';

      return res.send(sendValue);
    }

    // todo 按照创建时间分组
    sendValue.data = lookUpChat;

  } catch (e) {
    sendValue.code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    sendValue.message = e.message;
  }

  return res.send(sendValue);

})

export default router;
