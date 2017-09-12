var router=express.Router();


var userService=require(rootPath+'/services/userService');



router.get('/login',function(req,res){
	res.render('user/login',{title:'登陆页面'});
});
router.get('/register',function(req,res){
	res.render('user/register',{title:'注册页面'});
});


router.post('/login',userService.login_handle);
router.post('/register',userService.register_handle);


router.get('/logout',userService.logout);

module.exports=router;
