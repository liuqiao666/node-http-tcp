var fs = require('fs');
var url = require('url');//处理请求接口的模块
//1.引入http模块
var http = require('http');
//2.创建http服务
//根据客户端（浏览器）请求的地址不同，向前端发送不同的数据
//只要服务器收到客户端的http请求，就会来触发回调函数
var server = http.createServer(function (req,res){
	//console.log('收到请求！');
	//req:请求对象
	//res:响应对象
	
	//req.url:保存的是请求的路径信息
	//req.method:保存的是请求的方法
	//console.log(req.url);
	//console.log(req.method);
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});  
 
	//路由：根据用户请求的路径，向用户发送不同的数据、页面
	if (req.url == '/'){
		//	读取index.html文件
		var rs = fs.createReadStream('./index.html');
		//把读取出来的文件写入浏览器（res就是写入流，目的地是用户的浏览器）
		rs.pipe(res);
		//	发送'welcome to index'
		console.log('welcome to index.html')
	}
	if (req.url == '/login.html'){
		//	读取login.html文件
		var rs = fs.createReadStream('./login.html');
		//把读取出来的文件写入浏览器（res就是写入流，目的地是用户的浏览器）
		rs.pipe(res);
		console.log('welcome to login.html')
		//res.end;//往前端发页面是异步操作，不能手动断开
	}
	/*if (req.url == '/login'){
		console.log(req.query.user);
		console.log(req.query.pass);
		//	发送'please login'
		if(req.query.user == '123' && req.query.pass == '123'){
			res.write('login success');//write发数据不能自动断开
			console.log('login success')
			res.end();
		}else{
			res.write('login error');
			console.log('login error')
			res.end();
		}
	}*/
	var urlObj = url.parse(req.url,true);
	if (urlObj.pathname == '/login'){
		console.log(urlObj.query.user);
		console.log(urlObj.query.pass);
		//	发送'please login'
		if(urlObj.query.user == '123' && urlObj.query.pass == '123'){
			res.write('login success');//write发数据不能自动断开
			console.log('login success')
			res.end();
		}else{
			res.write('login error');
			console.log('login error')
			res.end();
		}
	}
	// res.end()断开链接
	//res.end();
});
//3.监听端口号
server.listen(8080, function(){
	console.log('liuqiao666^-^')
});

/*var fs = require('fs');
var url = require('url');//处理请求接口的模块
//1.引入http模块
var http = require('http');
//2.创建http服务
//根据客户端（浏览器）请求的地址不同，向前端发送不同的数据
//只要服务器收到客户端的http请求，就会来触发回调函数
var server = http.createServer(function (req,res){
	
	//parse()如果传递两个参数：req.url,ture;会把接口和接口参数分离开
	//而且接口参数会转换为对象类型
	var urlObj = url.parse(req.url,true);
 
	//路由：根据用户请求的路径，向用户发送不同的数据、页面
	if (urlObj.pathname == '/index.html'){
		//	读取index.html文件
		var rs = fs.createReadStream('./index.html');
		//把读取出来的文件写入浏览器（res就是写入流，目的地是用户的浏览器）
		rs.pipe(res);
		//	发送'welcome to index'
		console.log('welcome to index')
	}
	else if (urlObj.pathname == '/login.html'){
		//	读取login.html文件
		var rs = fs.createReadStream('./login.html');
		//把读取出来的文件写入浏览器（res就是写入流，目的地是用户的浏览器）
		rs.pipe(res);
		console.log('页面已打开！')
		//res.end;//往前端发页面是异步操作，不能手动断开
	}
	else if (urlObj.pathname == '/login'){
		//console.log('get data');
		console.log('user:');
		console.log(urlObj.query.user);
		console.log('pass:');
		console.log(urlObj.query.pass);
		//	发送'please login'
		if(urlObj.query.user == '123' && urlObj.query.pass == '123'){
			res.write('login success');//write发数据不能自动断开
			console.log('login success')
			res.end();
		}else{
			res.write('login error');
			console.log('login error')
			res.end();
		}
	}
	// res.end()断开链接
	//res.end();
});
//3.监听端口号
server.listen(8080, function(){
	console.log('liuqiao666^-^')
});*/
