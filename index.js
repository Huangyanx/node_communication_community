global.express=require('express');
global.rootPath=__dirname;
global.cheerio=require('cheerio');
global.fs=require('fs');
global.superagent=require('superagent');
global.promise=require('bluebird');
global.db=require('./db');
global.validator=require('validator');


var ejs=require('ejs');
var auth=require('./middlewares/auth');

var bodyprser=require('body-parser');
var session=require('express-session');

/*创建路由*/
var index=require(rootPath+'/routers/indexRoute');
var user=require(rootPath+'/routers/userRoute');
var cnode=require(rootPath+'/routers/ecodeRoute');

//创建一个服务
var app=express();
app.set('view engine','html');
app.set('views',rootPath+'/views');
app.engine('.html',ejs.__express);

//放在路由的前面

app.use(bodyprser.json());
app.use(bodyprser.urlencoded({ extended: false}));//post 传过来的参数转成json格式，通过req.body接受post传过来的参数

//配置session
app.use(
	session({
		secret:'!@#$',
		resave:false,
		saveUninitialized:true,
		cookie:{}

	}))

app.use(auth.authUser);

//中间件
app.use('/',index)
app.use('/user',user)
app.use('/cnode',cnode)

app.use(express.static(__dirname+'/public'));

/*捕获错误*/
app.use(function(req,res,next){
	var err=new Error('页面不存在');
	err.status = 404;
	next(err);

});



//development error handler(错误处理)
//will print stacktrsce
if (app.get('env')==='development') {
	app.use(function(err,req,res,next){
		res.status(err.status||500);
		res.render('error',{
			message:err.message,
			error:err,
			title:'错误信息提示页面'
		})

	})
}


app.listen(3000);