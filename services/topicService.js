'use strict';

var validator      = require('validator');

exports.getList = (req,res) => {
 	

 	let sql='select * from topic';

 	// GMT 
 	db.connction().queryAsync(sql).then(function  (result) {

		res.render('topic/list',{result});
 		  
 	})
 	

					
}
 

exports.add = (req,res) => {
 	
 	
	res.render('topic/add',{title_str:'话题管理'});
					
}
 

exports.doAdd = (req,res) => {
 	var article_title = req.body.article_title;
 	var article_content = req.body.article_content;

	// 入库：mysql添加语法(insert into 表名 (列名1,列名2) values(值1,值2))
	var date = new Date();
	var time = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + date.getHours() + ':' + date.getMinutes() + ':' +date.getSeconds();


 	let sql='insert into topic (article_title,article_content,add_time) values (?,?,?)';

 	// GMT 
 	db.connction().queryAsync(sql,[article_title,article_content,time]).then(function  (result) {
 		 if (result) {
 		 		res.redirect(302, '/topic');
 		 }else{
 		 	res.render('topic/add');
 		 }
 	})
 	
					
}
exports.delete = (req,res) => {
 	
 	 
	var id = req.params.id;
 
 	// mysql删除的语法：delete from 表名 where 列1=值1,列2=值2
 	 
 	let sql='delete from topic where id=?';
 
 	db.connction().queryAsync(sql,[id]).then(function  (result) {
 		res.redirect(302, '/topic');
 	})			
}
 

// 进入编辑话题
exports.edit = (req,res) => {
 	
	var id = req.params.id;
 
 	 
 	let sql='select * from topic where id=?';
 
 	db.connction().queryAsync(sql,[id]).then(function  (result) {
			res.render('topic/edit',{result});
 	})			
					
}
 
 //处理编辑 
exports.doEdit = (req,res) => {
	var id = req.body.id;
	var article_title = req.body.article_title;
 	var article_content = req.body.article_content;

 	// mysql修改表信息的语法：update 表名 set 列1=值1,列2=值2 where 列1=值1
 	let sql='update topic set article_title=?,article_content=? where id=?';

 	db.connction().queryAsync(sql,[article_title,article_content,id]).then(function  (result) {
 		 if (result) {
	 		res.redirect(302, '/topic');
 		 }else{
	 		res.redirect(302, '/topic/edit/'+id);

 		 }
 	})
					
}
