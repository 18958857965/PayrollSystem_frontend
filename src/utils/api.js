import axios from "axios";
import { Message } from "element-ui";
import router from '../router';

//请求拦截
axios.interceptors.request.use(config => {

    if (window.sessionStorage.getItem('user')) {
      config.headers['Authorization'] = window.sessionStorage.getItem('user');
    }
    return config;
}, error => {
    console.log(error);

})




//响应拦截
axios.interceptors.response.use(
    success => {

        //业务逻辑错误
        if (success.status && success.status == 200) {//接口调用成功
            if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {//错误响应码,有需要再加
                Message.error({ message: success.data.result });
                return;
            }
            if (success.data.message) {
                Message.success({ message: success.data.result });
            }
        }
        return success.data;
    },
    error => {

        if (error.response.code == 504 || error.response.code == 404) {
            Message.error({ message: '无法访问页面' });
        }
        else if (error.response.code == 403) {
            Message.error({ message: '权限不足,请联系管理员' });

        }
        else if (error.response.code == 401) {
            Message.error({ message: '尚未登陆请先登录' });
            router.replace('/');//返回登录
        }
        else {
            if (error.response.data.result) {
                Message.error({ message: error.response.data.result });
            }
            else {
                Message.error({ message: 'Error unexpected occurred ! ' });
            }
        }
        return;
    }
);


let base = '';

//sent a postRequest with json form
export const postRequest = (url, params) => {

    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })

}


export const putRequest = (url, params) => {

    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params


    })

}

/*export const getRequest = (url, params) => {

    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params


    })

}*/
export const deleteRequest = (url, params) => {

    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params


    })

}



