const express = require('express');
const router = express.Router();
//导入路由处理函数模块
const userinfo_handler = require('../router_handler/userinfo.js');
//导入验证数据的中间件
const expressJoi = require('@escook/express-joi');
//导入验证规则对象
const { update_userinfo_schema,update_avatar_schema } = require('../schema/user.js');

//挂载路由

//获取用户基本信息
router.get('/userinfo', userinfo_handler.getUserInfo);
//更新用户基本信息
router.post('/userinfo', expressJoi(update_userinfo_schema),userinfo_handler.updateUserInfo);
//更新用户头像
router.post('/update/avatar',expressJoi(update_avatar_schema) ,userinfo_handler.updateAvatar);
module.exports = router;