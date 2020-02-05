import axios from "axios"

// 推荐写法，因为axios返回的就是promise对象，没必要在封装一次promise
// 如果换axios框架，只需本页去掉axios相关，导入最新框架，return new Promise（）就可以，其他文件依旧正常使用
export function request(config) {
    const instance = axios.create({
      // baseURL: 'http://123.207.32.32:8000/api/hy',
      baseURL: 'http://106.54.54.237:8000/api/hy',
      timeout: 5000
    });

    
    //  2.2  响应拦截
    instance.interceptors.response.use(res =>{
      // console.log('响应拦截');
      // console.log(res.data);
      return res.data
    },err =>{
      console.log('拦截服务器响应错误')
      console.log(err)
    })

    // 发送网络请求
    return instance(config)
}

