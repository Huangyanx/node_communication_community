var router=express.Router();

var cnodeService=require(rootPath+'/services/cnodeService');


/*router.post('/:keyword',function(req,res){
	res.render('search',{})

})*/


router.get('/',cnodeService.getArtList);


module.exports=router