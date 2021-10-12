
let proxyObj={

}
proxyObj['/']={
    //websocket
    ws:false,


    //target address 后端地址

    target:'http://10.151.223.224/salary',
    //target:'http://49.140.61.112/salary',
    //target:'http://localhost:8081',

    
    changOrigin: true,

    //不重写请求地址
    pathRe:{
        '^/':'/'
    }
}
module.exports={
    devServer:{
        host:'localhost',
        port:8080,
        proxy:proxyObj
    }
}