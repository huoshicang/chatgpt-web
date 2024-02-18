import express from "express";
import {HTTP_STATUS_CODES} from "../../../global.js";
import {connectToDatabase} from "../../../db/index.js";


const router = express.Router();

// 注册
router.post('', async (req, res) => {

  let sendValue = {
    code: HTTP_STATUS_CODES.OK,
    data: {},
    message: '删除成功'
  };

  const { model_id } = req.body;

  if (!model_id) {
    sendValue.code = HTTP_STATUS_CODES.BAD_REQUEST;
    sendValue.message = '参数不全';
    return res.send(sendValue);
  }

  try {
    // 删除聊天
    const upChatDel = await connectToDatabase(
        '查找更新',
        'model',
        { model_id },
        {_id: 1, model_id: 1},
        { '$set': { isDel: 1 } }
    );



    if (!upChatDel) {
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
