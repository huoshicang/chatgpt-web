import express from "express";
import {HTTP_STATUS_CODES, TimeAndDel} from "../../global.js";
import {connectToDatabase} from "../../db/index.js";

const router = express.Router();

// 注册
router.post('', async (req, res) => {

  let sendValue = {
    code: HTTP_STATUS_CODES.OK,
    data: {},
    message: '添加成功'
  };

  const { user_id, userName, chat_id, msg_id, chatTitle, system, chatParameters } = req.body;

  if (!user_id || !userName || !chat_id || !msg_id || !chatTitle || !chatParameters) {
    sendValue.code = HTTP_STATUS_CODES.BAD_REQUEST;
    sendValue.message = '参数不全';
    return res.send(sendValue);
  }

  try {
    // 添加聊天
    const addChat = await connectToDatabase('增加一个',
        'chat',
        {
          _id: chat_id,
          chat_id,
          user_id,
          msg_id,
          userName,
          chatTitle,
          ...TimeAndDel().timeAndDel,
        }
    );

    // 设置预设
    chatParameters.messages = system ? [{ role: "system", content: system }] : [];

    // 获取密钥
    const getModel = await connectToDatabase('查找一个',
        'model',
        { modelName: chatParameters.model, isDel: 0},
        { modelGroup: 1});

    console.log('getModel', getModel)

    // 获取密钥
    const getKey = await connectToDatabase('查找全部',
        'key',
        { modelGroup: getModel.modelGroup, isDel: 0 },
        { key_id: 1, encryption: 1, chat_usage: 1 },
        {});

    getKey.sort((a, b) => parseInt(a.chat_usage) - parseInt(b.chat_usage));

    // 获取第一个
    const Key = getKey[0];

    // 添加消息
    const addMessage = await connectToDatabase('增加一个',
        'msg',
        {
          _id: msg_id,
          msg_id,
          user_id,
          api_key: Key.encryption,
          ...chatParameters,
          ...TimeAndDel().timeAndDel,
        }
    );

    if (!addChat && !addMessage) {
      sendValue.code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
      sendValue.message = '添加失败';
    }

    // 更新使用人数
    const chat_usage = Key.chat_usage + 1;
    const upChatUsage = await connectToDatabase(
        '查找更新',
        'key',
        { isDel: 0, '$and': [{ key_id: Key.key_id }, { encryption: Key.encryption }] },
        { _id: 0, isDel: 0 },
        { '$set': { chat_usage: chat_usage } }
    );

    if (upChatUsage) {
      sendValue.message += '，更新人数';
    }

  } catch (e) {
    sendValue.code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    sendValue.message = e.message;
  }

  return res.send(sendValue);
})


export default router;
