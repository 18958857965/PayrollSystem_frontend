import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
//import AdminHome from '../views/AdminHome'
//import Register from '../views/Register'
// import Test1 from '../views/Test1'
// import Test2 from '../views/Test2'
import Admin_StaffInfor from "../views/admin/Admin_StaffInfo";
import Admin_Management from "../views/admin/Admin_Management";
import Em_PayMethod from "../views/employee/Em_PayMethod";
import Em_Reprot from "../views/employee/Em_Reprot";
import Ho_Record from "../views/employee/Ho_Record";
import Sa_Record from "../views/employee/Sa_Record";
import GoodInfo from "../views/admin/GoodInfo";
import ErrorPage from "../views/ErrorPage";
import UndefinePage from "../views/UndefinePage";
import ProjectInfo from "../views/admin/ProjectInfo";


Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}




const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path:'/errorpage',
    name:'ErrorPage',
    component:ErrorPage
  },
  {
    path:'/undefinepage',
    name:'UndefinePage',
    component:UndefinePage
  },
  /*{
    path: '/userhome',
    name: 'UserHome',
    component: UserHome,
  },*/
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/admin_staffinfo',
        name: '员工信息',
        component: Admin_StaffInfor
      },
      {
        path: '/admin_management',
        name: '报告管理',
        component: Admin_Management
      },
      /*{
        path: '/em_paymethod',
        name: '付款方式',
        component: Em_PayMethod
      },*/
      {
        path: '/em_report',
        name: '员工报告',
        component: Em_Reprot
      },
      {
        path: '/ho_record',
        name: '工作记录',
        component: Ho_Record
      },
      {
        path: '/sa_record',
        name: '工作记录',
        component: Sa_Record
      },
      {
        path:'/goodinfo',
        name:'商品信息',
        component:GoodInfo
      },
      {
        path:'/projectinfo',
        name:'项目信息',
        component:ProjectInfo
      }
    ]
  },
  /*{
    path: '/adminhome',
    name: 'AdminHome',
    component: AdminHome,
    children: [
      {
        path: '/admin_staffinfo',
        name: '报告管理',
        component: Admin_StaffInfor
      },
      {
        path: '/admin_management',
        name: '员工信息',
        component: Admin_Management
      }
    ]
  },*/
  /*{
    path: '/register',
    name: 'Register',
    component: Register
  },*/

]

const router = new VueRouter({
  routes
});


export const initMenu =(router,store)=>{
  if(store.state.routes.length>0){
      return;

  }

  
  store.commit('initRoutes',router);
      
  
}


export default router
