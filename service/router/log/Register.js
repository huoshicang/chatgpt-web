import express from "express";
import {HTTP_STATUS_CODES, TimeAndDel, encipher} from "../../global.js";
import {connectToDatabase} from "../../db/index.js";
import {v4 as uuid} from 'uuid';

const router = express.Router();


// 注册
router.post('', async (req, res) => {

  let sendValue = {
    code: HTTP_STATUS_CODES.OK,
    data: {},
    message: '注册成功'
  }

  const {userName, passWord, email} = req.body;

  if (!userName || !passWord || !email) {
    sendValue.code = HTTP_STATUS_CODES.BAD_REQUEST;
    sendValue.message = '参数不全';
    return res.send(sendValue);
  }

  try {

    //  检查用户名或邮箱是否存在
    const lookUpUser = await connectToDatabase(
        '查找一个',
        'users',
        {'$or': [{userName},{email}]},
        {_id: 1})

    console.log(lookUpUser)
    console.log(lookUpUser && lookUpUser.length > 0)

    // 如果存在 则返回
    if (lookUpUser && lookUpUser.length > 0) {
      sendValue.code = HTTP_STATUS_CODES.CREATED;
      sendValue.message = '用户名或邮箱已存在';
      return res.send(sendValue);
    }

    // 如果不存在 添加一个用户

    const user_id = uuid()

    const addUser = await connectToDatabase(
        '增加一个',
        'users',
        {
          _id: user_id,
          user_id, userName,
          passWord: encipher(passWord),
          userRole: 'user',
          description: "",
          email,
          ...TimeAndDel().timeAndDel,
        })

    // 根据返回值判断是否添加成功
    if (!addUser) {
      sendValue.code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
      sendValue.message = '注册失败';

      return res.send(sendValue);
    }


  } catch (e) {
    sendValue.code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    sendValue.message = e.message;
  }

  return res.send(sendValue);

})


export default router;
