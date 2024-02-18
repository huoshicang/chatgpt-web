import express from "express";
const router = express.Router();

// 模型
import getModel from "./model/getModel.js"
import addModel from "./model/addModel.js"
import delModel from "./model/delModel.js"

// 密钥
import addKey from "./key/addKey.js"
import getKey from "./key/getKey.js"
import delKey from "./key/delKey.js"

router.use('/getmodel', getModel)
router.use('/addmodel', addModel)
router.use('/delmodel', delModel)

router.use('/addkey', addKey)
router.use('/getkey', getKey)
router.use('/delkey', delKey)

export default router;
