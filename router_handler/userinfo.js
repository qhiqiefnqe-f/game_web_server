//导入数据库操作模块
const db = require('../db/index')
//获取用户信息
exports.getUserInfo = (req, res) => {
    //定义查询用户信息的SQL语句
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?';
    //执行SQL语句
    db.query(sql, req.auth.id, (err, results) => {
        //执行SQL语句失败
        if (err) return res.cc(err);
        //查询到的数据不是一条
        if (results.length !== 1) return res.cc('获取用户信息失败(空）');
        //用户信息获取成功
        res.send({
            status: 0,
            message: '获取用户基本信息成功',
            data: results[0]
        });
    })
}

//更新用户信息
exports.updateUserInfo = (req, res) => {
    //定义更新用户信息的SQL语句
    const sql = 'update ev_users set ? where id=?';
    //执行SQL语句
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 打印实际执行的 SQL 查询
        
        //执行SQL语句失败
        if (err) return res.cc(err);
        //影响行数不为1
        if (results.affectedRows !== 1) return res.cc('更新用户信息失败');
        //更新用户信息成功
        res.cc('更新用户信息成功', 0);
    }) 

}

//更新用户头像
exports.updateAvatar = (req, res) => {
    //定义更新用户头像的SQL语句
    const sql = 'update ev_users set user_pic=? where id=?';
    //执行SQL语句
    db.query(sql, [req.body.avatar, req.body.id], (err, results) => {
        //执行SQL语句失败
        if (err) return res.cc(err);
        //影响行数不为1
        if (results.affectedRows !== 1) return res.cc('更新用户头像失败');
        //更新用户头像成功
        res.cc('更新用户头像成功', 0);
    })
}