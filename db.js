var mysql=require('mysql');

promise.promisifyAll(require('mysql/lib/Connection').prototype);


exports.Connection=()=>mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'cnode'
})