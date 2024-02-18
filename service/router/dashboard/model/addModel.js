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

  const {modelName, modelGroup, Description} = req.body;

  if (!modelName || !modelGroup || !Description) {
    sendValue.code = HTTP_STATUS_CODES.BAD_REQUEST;
    sendValue.message = '参数不全';
    return res.send(sendValue);
  }

  try {
    // 添加聊天

    const model_id = uuid()

    const addModel = await connectToDatabase('增加一个',
        'model',
        {
          _id: model_id,
          model_id,
          modelName,
          modelGroup,
          Description,
          ...TimeAndDel().timeAndDel,
        }
    );



    if (!addModel) {
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
