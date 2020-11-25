export default function CustomError (err){
    let errorMsg = (err.response && err.response.data && err.response.data.message) || '请求错误，请重试';
    switch (err.status) {
    case 400:
        console.log('信息验证失败');
        break;
    case 401:
        console.log('认证失败');
        break;
    case 403:
        localStorage.removeItem('token');
        console.log('token校验失败');
        break;
    case 404:
        console.log('请求资源不存在');
        break;
    default:
        console.log(errorMsg);
        break;
    }
}