/*
 import { getRequest } from "./api";
import {router_for_vuex} from "..router/index"

export const initMenu =(router,store)=>{
    if(store.state.routes.length>0){
        return;

    }


    store.commit('initRoutes',router_for_vuex);


}



export const formatRoutes=(routes)=>{
    let fmtRoutes=[];
    routes.forEach(router=>{
        let{
            isadmin,
            path,
            component,
            name,
            children,

        }=router;

        if(childern&&children instanceof Array){
            children=formatRoutes(children);
        }
        let fmRouter={
            isadmin:isadmin,
            path:path,
            name:name,
            children:children,
            component(resolve){
                if(isdamin==="1"){
                    require(['../views/admin'+component+'.vue'],resolve)
                }
                else{
                    require(['../views/employee'+component+'.vue'],resolve)
                }



            }


        }
        fmtRoutes.push(fmRouter);
    });
    return fmtRoutes;
}
*/
