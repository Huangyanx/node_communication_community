/*分页*/   
exports.getInfo = (req,res) => {

	console.log(req)
	var keyword=req.params.keyword;
	 
	superagent.get('http://www.toutiao.com/search_content/?offset=20&format=json&keyword='+encodeURI(keyword)+'&autoload=true&count=20&cur_tab=1')
			.end(function  (err,rtn_data) {
				if (err) {
					console.log(err)
				}else{
					res.render('search',{article_list:rtn_data.body.data});
					
				}
			})
}
