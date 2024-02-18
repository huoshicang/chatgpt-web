import express from "express";
const router = express.Router();

import RegisterRouter from "./log/Register.js"
import LogInRouter from "./log/LogIn.js"
import VerifyRouter from "./log/Verify.js"
import LogOutRouter from "./log/LogOut.js"

import AddChatRouter from "./chat/addChat.js";
import GetChatRouter from "./chat/getChat.js";
import DelChatRouter from "./chat/delChat.js";

import GetMsgRouter from "./msg/getMsg.js";
import SendMsgRouter from "./msg/sendMsg.js";
import GetModel from "./msg/getModel.js";

import UpDateInfo from "./info/info.js"
import UpAvatar from "./info/avatar.js"
import Image from "./info/getAvatar.js"

import Dashboard from "./dashboard/index.js"

router.use('/register', RegisterRouter);
router.use('/login', LogInRouter);
router.use('/verify', VerifyRouter);
router.use('/logout', LogOutRouter);

router.use('/addchat', AddChatRouter);
router.use('/getchat', GetChatRouter);
router.use('/delchat', DelChatRouter);

router.use('/getmsg', GetMsgRouter);
router.use('/sendmsg', SendMsgRouter);
router.use('/getmodel', GetModel);

router.use('/updateinfo', UpDateInfo)
router.use('/upavatar', UpAvatar)
router.use('/images/:imageName', Image)

router.use('/dashboard', Dashboard)


export default router;
