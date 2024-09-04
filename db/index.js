const mysql=require('mysql');

//创建连接对象
const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'admin123',
    database:'my_db_01'
});

// //测试mysql模块
// db.query('select 1',(err,results)=>{
//     if(err){
//         console.log(err.message);
//     }else{
//         console.log(results);
//     }
// })

// //查询user表中的所有数据
// const sql='select * from users';
// db.query(sql,(err,results)=>{
//     if(err){
//         console.log(err.message);
//     }else{
//         console.log(results);
//     }
// })

// //向users表中插入一条数据
// const user={username:'spiderman2',password:'123456'};
// //定义待执行的SQL语句
// const sql='insert into users set ?';
// //执行SQL语句
// db.query(sql,user,(err,results)=>{
//     if(err){
//         console.log(err.message);
//     }
//     if(results.affectedRows>0){
//         console.log('插入成功');
//     }
// })

// //更新users表中的一条数据
// const user={id:3,username:'aaa',password:'000'}

// const sql='update users set ? where id=?';

// db.query(sql,[user,user.id],(err,results)=>{
//     if(err){
//         console.log(err.message);
//     }
//     if(results.affectedRows>0){
//         console.log('更新成功');
//     }
// })

// //删除id为5的用户(不推荐)
// const sql='delete from users where id=?';
// db.query(sql,4,(err,results)=>{
//     if(err){
//         console.log(err.message);
//     }
//     if(results.affectedRows>0){
//         console.log('删除成功');
//     }
// })

// //标记删除
// const sql='update users set status=? where id=?';
// db.query(sql,[1,3],(err,results)=>{
//     if(err){
//         console.log(err.message);
//     }
//     if(results.affectedRows>0){
//         console.log('删除成功');
//     }
// })

module.exports=db;