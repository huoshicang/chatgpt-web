import express from "express";
import {HTTP_STATUS_CODES} from "../../global.js";
import {connectToDatabase} from "../../db/index.js";


const router = express.Router();

// 获取模型列表
router.get('', async (req, res) => {

  let sendValue = {
    code: HTTP_STATUS_CODES.OK,
    data: [],
    message: "获取成功"
  }

  try {

    const lookUpModel = await connectToDatabase(
        "查找全部",
        "model",
        {isDel: 0},
        {modelName: 1},
    );

    if (lookUpModel === null){
      sendValue.code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
      sendValue.message = "请先添加模型";

      return res.send(sendValue);
    }

    const transformData = (data) => {
      return data.map(item => ({
        label: item.modelName,
        value: item.modelName
      }));
    }

    sendValue.data = transformData(lookUpModel);

  } catch (e) {
    sendValue.code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    sendValue.message = e.message;
  }

  return res.send(sendValue);

})

export default router;
