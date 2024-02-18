import { MyGet, MyPost } from "@/api/MyAxios.js";

export const Api = {
  // 注册
  register: async (data) => {
    return await MyPost("/register", data);
  },
  // 登录
  login: async (data) => {
    return await MyPost("/login", data);
  },
  // 验证
  verify: async (data) => {
    return await MyGet("/verify", data);
  },
  // 修改信息
  updateInfo: async (data) => {
    return await MyPost("/updateinfo", data);
  },
  // 添加聊天
  addChat: async (data) => {
    return await MyPost("/addchat", data);
  },
  // 获取聊天
  getChat: async (data) => {
    return await MyPost("/getchat", data);
  },
  // 删除聊天
  deleteChat: async (data) => {
    return await MyPost("/delchat", data);
  },
  // 获取消息
  getChatMsg: async (data) => {
    return await MyPost("/getmsg", data);
  },
  // 发送消息
  sendMsg: async (data) => {
    return await MyPost("/sendmsg", data);
  },
  // 获取模型
  getChatModel: async () => {
    return await MyGet("/getmodel");
  },
  /* 仪表盘 */
  // 获取模型
  getModel: async (data) => {
    return await MyPost("/dashboard/getmodel", data);
  },
  // 添加模型
  addModel: async (data) => {
    return await MyPost("/dashboard/addmodel", data);
  },
  // 删除模型
  deleteModel: async (data) => {
    return await MyPost("/dashboard/delmodel", data);
  },
  // 添加密钥
  addKey: async (data) => {
    return await MyPost("/dashboard/addkey", data);
  },
  // 获取密钥
  getKey: async (data) => {
    return await MyPost("/dashboard/getkey", data);
  },
  // 删除密钥
  deleteKey: async (data) => {
    return await MyPost("/dashboard/delkey", data);
  },
};


