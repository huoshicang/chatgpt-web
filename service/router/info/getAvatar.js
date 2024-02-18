import express from "express";
import { HTTP_STATUS_CODES } from "../../global.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// 图片访问路由
router.get('', (req, res) => {
  let sendValue = {
    code: HTTP_STATUS_CODES.OK,
    data: {},
    message: '获取成功'
  };

  const imagePath = path.resolve('avatar', req.baseUrl.split('/').pop());

  // 发送图片文件给客户端
  res.sendFile(imagePath);
});

export default router;
