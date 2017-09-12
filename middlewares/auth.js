exports.authUser = function (req, res, next) {
   
  res.locals.curr_user = null;
  
  res.locals.title='社区欢迎你'

  if (req.session.user_info) {
        user=res.locals.curr_user = req.session.user_info ;
        // 是不是超级管理员
  		user.is_admin = true;
        // 消息数量

  		next();
  } else{

	 	next();
  } 
};
