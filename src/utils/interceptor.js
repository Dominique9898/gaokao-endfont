/**
 * 生成基础axios对象，并对请求和响应做处理
 * 前后端约定接口返回解构规范
 * {
 *    code:0,
 *    data:"成功",
 *    message:""
 * }
 */
 import axios from 'axios'
 import { Message } from 'element-ui'
 import qs from "qs"

 // 创建一个独立的axios实例
 const service = axios.create({ 
     baseURL: 'https://dominikcloud.ltd',
     headers: {
         post: {
             "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
         }
     },
     // 配置请求超时时间
     timeout: 10000, 
 });

 // 请求拦截
 service.interceptors.request.use(
     config => {
        if (config.method === "post") {
        // 序列化
        config.data = qs.stringify(config.data);
        // 温馨提示,若提交能直接接受json 格式,可以不用 qs 来序列化的
        }
        return config;
    },
    error => {
        Message({   
            showClose: true,
            message: error && error.data.error.message,
            type: 'error'
        });
        return Promise.reject(error.data.error.message);
    }
);


 // 返回拦截
 service.interceptors.response.use((response)=>{
     // 获取接口返回结果
     const res = response.data;
     // code为0，直接把结果返回回去，这样前端代码就不用在获取一次data.
     if(res.code === 0){
         return res;
     }else if(res.code === 10000){
         Message.warning(res.message);
         window.location.href = '/#/login';
         return res;
     }else{
         return res;
     }
 },()=>{
     Message.error('网络请求异常，请稍后重试!');
 });
 export default service;