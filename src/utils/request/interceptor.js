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
//  import qs from "qs"

 // 创建一个独立的axios实例
 const service = axios.create({ 
     baseURL: 'https://dominikcloud.ltd/api',
     headers: {
         post: {
             "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
         }
     },
     // 配置请求超时时间
     timeout: 10000, 
 });

 service.interceptors.request.use(
     config => {
        return config
     },
     error => {
        console.error(error)
        Promise.reject(error)
    }
     
 )

 // 返回拦截
 service.interceptors.response.use((response)=>{
     // 获取接口返回结果
     const res = response.data;
     if(res.code === 0){
         return res;
     }else if(res.code === 10000){
         Message.warning(res.message);
         window.location.href = '/#/login';
         return res;
     }else if(res.code === 1){
         console.error(res);
     }
 });
 export default service;