import {MyPost} from "./MyAxios.js";


export const Api = {
  // 获取回复
  getReply: async (data, headers) => {
    return await MyPost(process.env.CHATGPTPROXY, data, headers);
  },
};


