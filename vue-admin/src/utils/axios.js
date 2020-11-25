import axios from 'axios';
import { host } from './config';
import CustomError from './CustomError';

let api = axios.create({
    baseURL: host
});

/* 请求拦截 */
api.interceptors.request.use(config => {
    /* 请求头 */
    config.headers['Content-Type'] = 'application/json';
    config.headers['Cache-Control'] = 'no-cache';

    return config;
},error => {
    return Promise.reject(error);
});

/* 响应拦截 */
api.interceptors.response.use(response => {
    console.log('response', response);
    if (response && response.status == 200) {
        if (!response.data) {
            return {};
        }
        return response.data;
    }
    return null;
},error => {
    return new CustomError(error);
});

export default api;