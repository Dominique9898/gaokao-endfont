/**
 * request.js
 * 通过promise对axios做二次封装，针对用户端参数，做灵活配置
 */
 import { Message } from 'element-ui';
 import instance from './interceptor'

 /**
 * 核心函数，可通过它处理一切请求数据，并做横向扩展
 * @param {url} 请求地址
 * @param {params} 请求参数
 * @param {method} 请求参数
 */

  function request(url,params,method){
    return new Promise((resolve,reject)=>{
        
        instance({
            url,
            method,
            params
        }).then((res)=>{
            if(res.code === 0){
                resolve(res);
            }else{
                reject(res);
            }
        }).catch((error)=>{
            Message.error(error.message)
        })
    })
}
// 封装GET请求
function get(url,params){
    return request(url,params,'get')
}
// 封装POST请求
function post(url,params){
    return request(url,params,'post')
}
export default {
    get,post
}