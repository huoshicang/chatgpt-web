import CryptoJS from "crypto-js"

export const HTTP_STATUS_CODES = {
  'OK': 200,  // 请求成功
  'CREATED': 201,  // 已创建（通常在创建资源时使用）
  'BAD_REQUEST': 400,  // 请求无效或不完整
  'UNAUTHORIZED': 401,  // 未经授权，需要提供身份验证凭据
  'FORBIDDEN': 403,  // 禁止访问，客户端没有权限
  'NOT_FOUND': 404,  // 请求的资源不存在
  'INTERNAL_SERVER_ERROR': 500,  // 服务器内部错误
}

export const TimeAndDel = () => {
  const today = new Date();
  const time = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

  return {
    timeAndDel: {
      createDate: time,
      updateDate: time,
      isDel: 0
    },
    time: time
  }
}


export const encipher = (text) => {
  return CryptoJS.MD5(text).toString(CryptoJS.enc.Hex);
}

