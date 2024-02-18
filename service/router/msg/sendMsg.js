import express from "express";
import {HTTP_STATUS_CODES} from "../../global.js";
import {Api} from "../../chatgpt/api.js";
import {connectToDatabase} from "../../db/index.js";

const router = express.Router();

// 登录
router.post('', async (req, res) => {

  let sendValue = {
    code: HTTP_STATUS_CODES.OK,
    data: {},
    message: '回复成功'
  }

  // sendValue.data = {role: "assistant", content: "你好！有什么我可以帮助你的吗？"}

  const data = req.body;

  if (!data) {
    sendValue.code = HTTP_STATUS_CODES.BAD_REQUEST;
    sendValue.message = '请求参数错误';
    return res.send(sendValue);
  }

  try {
    // 删除不必要的属性
    const { msg_id, user_id, api_key, createDate, updateDate, ...requestData } = data;

    // 查找 API 密钥
    const api_key_data = await connectToDatabase('查找一个', 'key', { encryption: api_key }, { key: 1 });
    const api_key_value = api_key_data?.key;


    // 调用 API 获取回复
    const ress = await Api.getReply(requestData, {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key_value}`
    });

    if (ress.id){
      const assistantMessage = ress.choices[0].message

      // 更新消息
      const upMsg = await connectToDatabase(
          '查找更新',
          'msg',
          { '$and': [{ user_id }, { msg_id }, { isDel: 0 }] },
          { _id: 0, isDel: 0 },
          { '$set': { messages: [...data.messages, assistantMessage] } }
      );

      if (!upMsg) {
        sendValue.code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
        sendValue.message = '更新失败';
      } else {
        sendValue.data = assistantMessage;
      }
    }else {
      sendValue.code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
      sendValue.message = '回复失败';
    }







  } catch (e) {
    sendValue.code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    sendValue.message = e.message;
  }

  return res.send(sendValue);

})

export default router;
