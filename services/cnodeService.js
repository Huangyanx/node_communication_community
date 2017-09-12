exports.getCnodeInfo=getJsonInfo;

var http=require('http');
var artcle=require(rootPath+'/pacont.json');
var commit=require(rootPath+'/commit.json');

function getJsonInfo (req,res){
   
    var title='',content='',cont_info=[],path=rootPath +'/pacont.json';
    superagent.get('http://cnodejs.org')
        .end(function(erro,resp){
            var jquery=cheerio.load(resp.text);
            jquery('#topic_list .cell').each(function(index,element){

                var title_node=jquery(element).find('.topic_title');
                title=title_node.html();
                var href='http://cnodejs.org'+title_node.attr('href');

                cont_info.push({
                    title: title,
                    href: href
                })
            });
        })
            get_cont(0)
 }
function get_cont(num) {

        if (num<cont_info.length-1){

            console.log(num+path+cont_info.length);
            superagent.get(cont_info[num]['href']).end(function (err,rescon) {
                var content = cheerio.load(rescon.text);
                var article_cont = content('.topic_content').html();
                var keywords
                content('meta').each(function(index,element){
                    if (content('meta')[index].attribs.name=='keywords') {
                        keywords=content('meta')[index].attribs.content;
                    }
                });

                //console.log(keywords);
                cont_info[num]['keywords']=keywords;
                cont_info[num]['content'] = article_cont;
                get_cont(++num);

                

            })
        }else {
            
            //console.log(cont_info);
            fs.writeFile(path,JSON.stringify(cont_info),function (err) {
                if (err){
                    console.error(err)
                }else {
                    console.log('save success');
                }
            })
        }
}
      


exports.getArtList = (req,res,next) =>{
        console.log(req.params.page)
        /*分页*/
        var page_cur=req.params.page>0?req.params.page:1;

        var tat_num=artcle.length+1;
        var page_size=10;
        var page_st=(page_cur-1)*page_size;
        var page_end=page_cur*page_size;
        var page_num=Math.ceil(tat_num/page_size);

        var page_list='';
        for (var i = 1; i<page_num; i++) {
            page_list+='<li><a href="/cnode/'+ i +'">第'+ i +'页</a></li>'
        }
        res.render('cnode/cnode',{title:'文章标题列表',page_st,artcle:artcle.slice(page_st,page_end),page_list})
        

}


exports.getArtInfo = (req,res,next) =>{
//console.log(commit);
    var url_artc=req.params.id;
    if (commit[url_artc] != 'undefined') {
        var info_commit=commit[url_artc]['commit'];
       
    }
    
    res.render('cnode/art_content',{title:artcle[url_artc].title,artcle_con:artcle[url_artc],id:url_artc,info_commit})
    
}
exports.sendCommit = (req,res,next) =>{

 /*评论*/
        var commt='';
      
            var date=new Date();
            var create_time=date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日 '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();



            var id=req.params.id;
            var com_obj=req.body;
            var value={user_name:com_obj.user_name,commit_content:com_obj.commit,create_time}    
            if (typeof(commit[id])=='undefined') {
                 for (var i =0;i<artcle.length; i++) {
                       commit[i]={commit:[]};                
                 }
            }
            commit[id].commit.push(value);
            

            fs.writeFile('commit.json',JSON.stringify(commit),function(err,dat){
                if (err) {
                    console.error(err);
                }else{
                     console.log('save success');

                }

            })
            //重定向
            res.redirect(302, '/cnode/info/' + id);     

}
