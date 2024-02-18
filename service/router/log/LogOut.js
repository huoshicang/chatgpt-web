import express from "express";
import {HTTP_STATUS_CODES, TimeAndDel, encipher} from "../../global.js";
import {connectToDatabase} from "../../db/index.js";

const router = express.Router();


// 注册
router.get('', async (req, res) => {

  let sendValue = {
    code: HTTP_STATUS_CODES.OK,
    data: {},
    message: '退出成功'
  }

  const cookie = req.cookies.cookiesId;

  // 删除登录验证
  const delVerify = await connectToDatabase(
      '删除一个',
      'verify',
      {cookie: cookie}
  )


  if (!delVerify) {
    sendValue.code = HTTP_STATUS_CODES.BAD_REQUEST;
    sendValue.message = '退出失败';
    return res.send(sendValue);
  }

  return res.send(sendValue);

})



export default router;
