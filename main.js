const express=require('express');
const morgan = require('morgan');
//创建服务器
const app=express();
const joi = require('joi'); // 确保导入 joi 模块

//jwt相关的两个包
const jwt=require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');
app.use(morgan('combined'));

//配置解析表单数据的中间件
app.use(express.urlencoded({extended:false}));
app.use(express.json()); // 添加解析 JSON 数据的中间件

//配置cors
const cors=require('cors');
app.use(cors());

//在路由之前封装res.cc函数
app.use((req,res,next)=>{
    //status默认值为1，表示失败的情况
    //err的值可能是一个错误对象，也可能是一个错误的描述字符串
    res.cc=function(err,status=1){
        res.send({
            status,
            msg:err instanceof Error?err.message:err
        });
    }

    next();
})

//全局配置
const config=require('./config');

//注册将JWT字符串解析还原成JSON对象的中间件,api开头的不需要验证
//配置成功后将解析出来的信息挂载到req.auth上
app.use(expressJwt({secret:config.jwtSecretKey, algorithms: ['HS256']}).unless({path:[/^\/api\//]}));





//导入路由模块
//用户路由模块
const router=require('./router/user.js');
app.use('/api',router);
//用户信息路由模块 
const userinfo=require('./router/userinfo.js');
app.use('/my',userinfo);


//使用全局错误处理中间件，捕获解析JWT失败的错误
app.use((err,req,res,next)=>{
    // if(err.name==='UnauthorizedError'){
    //     return res.send({
    //         status:401,
    //         msg:'token解析失败'
    //     });
    // }
    // res.send({
    //     status:500,
    //     msg:'未知错误'
    // });

    //验证失败导致的错误
    if(err instanceof joi.ValidationError)  return res.cc(err);
    //token解析失败
    if(err.name==='UnauthorizedError') return res.cc('身份认证失败');
    //未知的错误
    res.cc(err);
});

//启动服务器
app.listen(80,()=>{
    console.log('server is running at http://localhost:80');
})