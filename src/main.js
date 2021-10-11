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


    if (store.state.isLogin/*window.sessionStorage.getItem('isLogin')*/) {
        /*if(from.path==='/'){
            if(to.path==='/'){
                next('/home');

            }

            if (to.path === undefined) {
                next('/home');
                Message.error('未找到该网页 !');
                return;
            }
            if (!store.state.company) {//游客

                if (to.path.startsWith('/e') || to.path.startsWith('/g') || to.path.startsWith('/h') || to.path.startsWith('/s') || to.path.startsWith('/a')) {
                    next('/home' );
                    Message.error('权限不足,无法访问 !');
                    return;
                }

            }
            if(store.state.employee&&store.state.employee.type!=='2'){
                if(to.path.startsWith('/a')){
                    next('//home');
                    Message.error('权限不足,无法访问 !');
                    return;
                }

            }
            //initMenu(router, store);
            /!*if (!window.sessionStorage.getItem('user')) {


                getRequest('/user/getInfo').then(resp => {
                    if (resp) {
                        window.sessionStorage.setItem('user', JSON.stringify(resp.result));
                        next();
                    }
                });
                getRequest('/employee/getCompany').then(resp=>{
                    if(resp){
                        if(resp.result.length>0){
                            window.sessionStorage.setItem('employee', JSON.stringify(resp.result));
                        }
                    }
                })
            }*!/
            next();
        }*/
        next();
    } else {
        if (to.path == '/') {
            next();
        } else {
            next('/?redirecat=' + to.path);
        }

    }


    /*if (window.sessionStorage.getItem('tokenStr')) {
        //initMenu(router, store);
        if (!window.sessionStorage.getItem('user')) {


            return getRequest('/info').then(resp => {
                if (resp) {
                    window.sessionStorage.setItem('user', JSON.stringify(resp));
                    next();
                }
            })
        }
        next();
    } else {
        if (to.path == '/') {
            next();
        } else {
            next('/?redirecat=' + to.path);
        }

    }*/

})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
