import axios from "axios";

const headers = {
  'Content-Type': 'application/json' // 根据需要设置其他请求头
};

export const MyGet = (url, data) => {
  return axios
    .get(url, {params: data, headers})
    .then((res) => res)
    .catch((err) => err);
}

export const MyPost = (url, data) => {
  return axios.post(url, data, {headers})
    .then((res) => res)
    .catch((err) => err)
}


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});
