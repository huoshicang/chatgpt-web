import express from "express";
import {HTTP_STATUS_CODES} from "../../../global.js";
import {connectToDatabase} from "../../../db/index.js";

const router = express.Router();

// 登录
router.post('', async (req, res) => {

  let sendValue = {
    code: HTTP_STATUS_CODES.OK,
    data: [],
    message: "获取成功"
  }

  const {page, pageSize} = req.body;

  if (!page || !pageSize) {
    sendValue.code = HTTP_STATUS_CODES.BAD_REQUEST;
    sendValue.message = '缺少参数';
    return res.send(sendValue);
  }

  try {

    const lookUpKey = await connectToDatabase(
        "分页查询",
        "key",
        {isDel: 0},
        {_id: 0, isDel: 0},
        {},
        page, pageSize
    );

    if (lookUpKey === null) {
      sendValue.code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
      sendValue.message = "请先添加密钥";
      return res.send(sendValue);
    }

    sendValue.data = lookUpKey


  } catch (e) {
    sendValue.code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    sendValue.message = e.message;
  }

  return res.send(sendValue);

})

export default router;
