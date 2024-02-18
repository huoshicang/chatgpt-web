import express from "express";
import {HTTP_STATUS_CODES, TimeAndDel} from "../../global.js";
import {connectToDatabase} from "../../db/index.js";

const router = express.Router();

// 注册
router.post('', async (req, res) => {

  let sendValue = {
    code: HTTP_STATUS_CODES.OK,
    data: {},
    message: '删除成功'
  };

  const { user_id, chat_id, msg_id } = req.body;

  if (!user_id || !chat_id || !msg_id) {
    sendValue.code = HTTP_STATUS_CODES.BAD_REQUEST;
    sendValue.message = '参数不全';
    return res.send(sendValue);
  }

  try {
    // 删除聊天
    const upChatDel = await connectToDatabase(
        '查找更新',
        'chat',
        { '$and': [{ user_id }, { chat_id }] },
        {_id: 1, chat_id: 1},
        { '$set': { isDel: 1 } }
    );

    // 删除消息
    const upMsgDel = await connectToDatabase(
        '查找更新',
        'msg',
        { '$and': [{ user_id }, { msg_id }] },
        {_id: 1, msg_id: 1},
        { '$set': { isDel: 1 } }
    );


    if (!upChatDel && !upMsgDel) {
      sendValue.code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
      sendValue.message = '删除失败';

      return res.send(sendValue);
    }

  } catch (e) {
    sendValue.code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    sendValue.message = e.message;
  }

  return res.send(sendValue);
})


export default router;
