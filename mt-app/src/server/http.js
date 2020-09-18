import axios from 'axios';

axios.defaults.baseURL = 'http://api.duyiedu.com';
// 数据拦截
axios.interceptors.request.use(req =>{
    req.params = {
        ...req.params,
        appkey:'_x642743457_1585790588400'
    }
    return req;
},err =>{
    return Promise.reject(err);
})

export default axios;