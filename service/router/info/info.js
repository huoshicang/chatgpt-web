import express from "express";
import {HTTP_STATUS_CODES, TimeAndDel, encipher} from "../../global.js";
import {connectToDatabase} from "../../db/index.js";

const router = express.Router();


// 注册
router.post('', async (req, res) => {

  let sendValue = {
    code: HTTP_STATUS_CODES.OK,
    data: {},
    message: '修改成功'
  }

  const {user_id, userName, description, email} = req.body;
  const cookie = req.cookies.cookiesId;

  if (!user_id || !userName || !description || !email) {
    sendValue.code = HTTP_STATUS_CODES.BAD_REQUEST;
    sendValue.message = '参数不全';
    return res.send(sendValue);
  }

  // 更新消息
  const upInfo = await connectToDatabase(
      '查找更新',
      'users',
      { '$and': [{ user_id }, { isDel: 0 }] },
      { _id: 0, isDel: 0 },
      { '$set': { userName, description, email, updateDate: TimeAndDel().time } }
  );

  // 删除登录验证
  const delVerify = await connectToDatabase(
      '删除一个',
      'verify',
      {cookie: cookie}
  )


  if (!upInfo && !delVerify) {
    sendValue.code = HTTP_STATUS_CODES.BAD_REQUEST;
    sendValue.message = '修改失败';
    return res.send(sendValue);
  }

  return res.send(sendValue);

})



export default router;
