const db = require('../db/index'); 
const bcrypt = require('bcryptjs'); // 导入 bcrypt 模块
//导入生成token的包
const jwt = require('jsonwebtoken');
//导入配置文件
const config = require('../config');

//注册函数
exports.reguser = (req, res) => {
    //接收用户提交的数据
    const userinfo = req.body;
    console.log('Received user data:', userinfo);
    // console.log(userinfo);
    
    // if(!userinfo.username || !userinfo.password){
    //     return res.send({
    //         status:400,
    //         msg:'用户名或密码不能为空'
    //     });
    // }
    //定义sql语句，查询用户名是否被占用
    const sql2='select * from ev_users where username=?';
    db.query(sql2,userinfo.username,(err,results)=>{
        if(err){
            // return res.send({
            //     status:500,
            //     msg:err.message
            // });
            return res.cc(err);
        }
        if(results.length>0){
            // return res.send({
            //     status:401,
            //     msg:'用户名已被占用'
            // });
            return res.cc('用户名已被占用');
        }
        // return res.send({
        //     status:200,
        //     msg:'用户名可用'
        // });

        //调用bcrypt.hashSync()方法对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);
    //定义插入用户的SQL语句
    const sql='insert into ev_users set ?';
    //调用db.query()执行SQL语句
    db.query(sql,{username:userinfo.username,password:userinfo.password},(err,results)=>{
        if(err){
            // return res.send({
            //     status:500,
            //     msg:'err.message'
            // });
            return res.cc(err);
        }
        if(results.affectedRows!==1){
            // return res.send({
            //     status:500,
            //     msg:'注册失败，请稍后再试'
            // });
            return res.cc('注册失败，请稍后再试');
        }
        // res.send({
        //     status:200,
        //     msg:'注册成功'
        // });
        res.cc('注册成功',0);
    });
    
})
    

} 

exports.login = (req, res) => {
    //接受表单数据
    const userinfo = req.body;
    //定义SQL语句
    const sql = 'select * from ev_users where username=?';
    //执行SQL语句
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('登录失败');
        //判断密码是否正确
        //使用 bcrypt.compareSync() 方法判断密码是否正确
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password);
        if (!compareResult) return res.cc('登录失败');
        //在服务器端生成token字符串
        // const tokenStr = jwt.sign({...results[0]}, secretKey, { expiresIn: '10h' });
        // res.send({
        //     status: 0,
        //     msg: '登录成功',
        //     token: 'Bearer ' + tokenStr
        // });
        // 生成 JWT 的 Token 字符串
        const user = { ...results[0], password: '', user_pic: '' };
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn });
        // 将生成的 Token 字符串响应给客户端
        res.send({
            status: 0,
            msg: '登录成功！',
            token: 'Bearer ' + tokenStr
        });
    });
}