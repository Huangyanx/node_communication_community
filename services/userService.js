'use strict';

//登陆页面处理
exports.login_handle=(req,res) =>{

	var user_name=req.body.user_name;
	var user_pwd=req.body.user_pwd;
	
	let sql='select * from user where user_name=? and user_pwd=?';
	db.Connection().queryAsync(sql,[user_name,user_pwd]).then(function (result){
		//console.log(result)
		if (result.length) {
			console.log('login success')
			req.session.user_info=result[0];
			res.redirect(302,'/');
		}else{
			console.log('login fail');
			res.render('/user/login',{message:'用户名或者密码不正确！'});
		}
	
		

	})

}


exports.register_handle=(req,res) =>{

	//console.log(req.body)

	var user_name=req.body.user_name;
	var user_pwd=req.body.user_pwd;

	if (!validator.isMobilePhone(user_name,'zh-CN')&&!validator.isEmail(user_name)) {

		res.render('user/register',{message:'用户名格式有误！'});
	}else if (!validator.isByteLength(user_pwd,{min:6,max:18})) {

		res.render('user/register',{message:'密码只能是6到18位'});
	}else{

		let sql1='select id from user where user_name=?';

		db.Connection().queryAsync(sql1,[user_name]).then(function (result){

			if (result.length) {
					
				res.render('user/register',{message:'用户名已经存在！'});
			}else{
				
				var date = new Date();
				var time = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + date.getHours() + ':' + date.getMinutes() + ':' +date.getSeconds();

				let sql='insert into user (user_name,user_pwd,create_time) values ("'+user_name+'","'+user_pwd+'","'+time+'")';
				db.Connection().queryAsync(sql).then(function (result){
			
					if (result.insertId) { 
						console.log('register success')
						res.render('user/login');
					}else{
						console.log('register fail');
						res.redirect(302,'/user/register');
					}
			

				})
			}
		
		

		})

	}


		

}

exports.logout=(req,res) =>{
	delete(req.session.user_info);
	res.redirect(302,'/');

}