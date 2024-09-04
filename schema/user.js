//导入定义验证规则的包
const Joi = require('joi');

//定义用户名和密码的验证规则
const username = Joi.string().alphanum().min(1).max(10).required();
const password = Joi.string().pattern(/^[\S]{6,12}$/).required();
//定义id,nickname,email的验证规则
const id = Joi.number().integer().min(1).required();
const nickname = Joi.string().required();
const email = Joi.string().email().required();
//定义头像的验证规则
const avatar = Joi.string().dataUri().required();

//注册和登录表单数据的验证规则对象
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

//更新用户信息的验证规则对象
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}

//更新用户头像的验证规则对象
exports.update_avatar_schema = {
    body: {
        avatar
    }
}