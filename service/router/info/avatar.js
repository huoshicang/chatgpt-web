import express from "express";
import multer from "multer";
import {HTTP_STATUS_CODES, TimeAndDel} from "../../global.js";
import {connectToDatabase} from "../../db/index.js";
import * as path from "path";

const router = express.Router();

// 配置multer中间件
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'avatar/'); // 设置图片上传的目录
  },
  filename: function (req, file, cb) {
    // 获取前端传递过来的文件名，如果没有则使用默认的文件名
    const imageName = req.body.imageName || Date.now();
    cb(null, imageName + '-' + file.originalname); // 设置图片的文件名
  }
});

const upload = multer({ storage: storage });

// 注册
router.post('', upload.single('image'), async (req, res) => {

  let sendValue = {
    code: HTTP_STATUS_CODES.OK,
    data: {},
    message: '修改成功'
  }

  // 检查是否有文件被上传
  if (!req.file) {
    sendValue.code = HTTP_STATUS_CODES.BAD_REQUEST;
    sendValue.message = '未上传文件';
    return res.send(sendValue);
  }

  console.log('req.file', req.file);



  return res.send(sendValue);

})



export default router;
