import axios from 'axios';
import { host } from './config';
import CustomError from './CustomError';
import { Loading } from 'element-ui';

let loading;

function startLoading (){
    loading = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
}

function endLoading (){
    loading.close();
}

let api = axios.create({
    baseURL: host
});

/* 请求拦截 */
api.interceptors.request.use(config => {
    startLoading();
    /* 请求头 */
    config.headers['Content-Type'] = 'application/json';
    config.headers['Cache-Control'] = 'no-cache';

    return config;
},error => {
    return Promise.reject(error);
});

/* 响应拦截 */
api.interceptors.response.use(response => {
    endLoading();
    console.log('response', response);
    if (response && response.status == 200) {
        if (!response.data) {
            return {};
        }
        return response.data;
    }
    return null;
},error => {
    endLoading();
    return new CustomError(error);
});

export default api;