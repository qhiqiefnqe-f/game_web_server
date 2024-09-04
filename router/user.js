const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
// 从 main.js 中导入 secretKey
const { secretKey } = require('../main');
//导入routerhandler处理函数
const userhandler = require('../router_handler/user.js');
//导入验证数据的中间件
const expressJoi = require('@escook/express-joi');
//导入验证规则对象
const { reg_login_schema } = require('../schema/user.js');

//注册用户
router.post('/reguser', expressJoi(reg_login_schema),userhandler.reguser);
//登录
router.post('/login', expressJoi(reg_login_schema), userhandler.login);


module.exports = router;