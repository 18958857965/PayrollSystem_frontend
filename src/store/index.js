import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex);
export default new Vuex.Store({
    state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
        isLogin: '',
        user: '',
        company: '',
        employee: '',


    },


    mutations: {//同步改变state中的值
        initIsLogin(state,data) {
            state.isLogin = data;
        },
        initUser(state, data) {
            state.user = data;
        },
        initCompany(state, data) {
            state.company = data;
        },
        initEmployee(state, data) {
            state.employee = data;
        }
    },

    actions: {}

})