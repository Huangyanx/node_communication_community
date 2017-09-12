var router=express.Router();
var cnodeService=require(rootPath+'/services/cnodeService');
var topicService=require(rootPath+'/services/topicService');

router.post('/:keyword',function(req,res){
	res.render('search',{})

})


//文章列表
//router.get('/',cnodeService.getArtList)

/*文章列表及分页*/
router.get('/:page',cnodeService.getArtList);


/*文章详情*/
router.get('/info/:id',cnodeService.getArtInfo);

/*提交评论*/
router.post('/post_commt/:id',cnodeService.sendCommit);


//话题社区

router.get('/',topicService.getList)

router.get('/add',topicService.add)
router.post('/add',topicService.doAdd)

router.get('/del/:id',topicService.delete)

router.get('/edit/:id',topicService.edit)
router.post('/edit',topicService.doEdit)

module.exports=router;
