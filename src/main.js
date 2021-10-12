import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {postRequest} from './utils/api.js'
import {putRequest} from './utils/api.js'
import {getRequest} from './utils/api.js'
import {deleteRequest} from './utils/api.js'
import {Message} from "element-ui";
import store from './store'
//import { initMenu } from './utils/menus';


Vue.config.productionTip = false
Vue.use(ElementUI);


Vue.prototype.postRequest = postRequest;


router.beforeEach((to, from, next) => {


    if (store.state.isLogin==='1'/*window.sessionStorage.getItem('isLogin')*/) {
        if (to.path === '/') {
            return next('/home');
        }
        if (to.path === undefined) {
            Message.error('未找到该网页 !');
            return;
        }
        if (!store.state.company) {//游客
            if (to.path.startsWith('/e') || to.path.startsWith('/g') || to.path.startsWith('/p') || (to.path.startsWith('/h')&&(to.path!=='/home')) || to.path.startsWith('/s') || to.path.startsWith('/a')) {
                Message.error('权限不足,无法访问 !');
                return;
            }
        }
        if (store.state.employee && store.state.employee.type === '0') {
            if (to.path.startsWith('/s')) {
                Message.error('权限不足,无法访问 !');
                return;
            }
        }
        if (store.state.employee && store.state.employee.type === '1') {
            if ((to.path.startsWith('/h')&&(to.path!=='/home'))) {
                Message.error('权限不足,无法访问 !');
                return;
            }
        }
        if (store.state.employee && store.state.employee.type !== '2') {
            if (to.path.startsWith('/a')|| to.path.startsWith('/g') || to.path.startsWith('/p')) {
                Message.error('权限不足,无法访问 !');
                return;
            }
        }
        next();
    } else {
        if (to.path == '/') {
            next();
        } else {
            Message.error('请先登录 !');
            next('/?redirecat=' + to.path);
        }

    }




})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
