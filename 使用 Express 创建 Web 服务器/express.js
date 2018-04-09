var express = require('express');
//express是一个第三方模块，在express里面是通过路由来控制响应的
var morgan = require('morgan');

var app = express();

app.use(express.static('./public'));//静态文件（典型的中间件）
app.use(morgan());//控制台会打印请求的日志

/* 1.express路由请求path方法*/
app.get('/', function(req, res){
	res.end('hello\n');
});
/*app.get('/', function(req, res, next){
	res.end('hello\n');
	next();//next()里面可以打印日志或者存储数据库等功能
});*/

/* 2.express路由请求Router方法*/
var Router = express.Router();
/*
 * http://example.com/post/add
 * http://example.com/post/list
*/
Router.get('/add', function(req, res){
	res.end('Router /add\n');
});
Router.get('/list', function(req, res){
	res.end('Router /list\n');
});

app.use('/post', Router);//把定义的路由加入到app的配置里面
//'/post'是指定的基础路径，如果为'/'
//就访问http://localhost:18001/add和http://localhost:18001/list就好
//不然就访问http://localhost:18001/post/add和http://localhost:18001/post/list

/* 3.express路由请求route方法*/
app.route('/article')
	.get(function(req, res){
		res.end('route /article get\n');
	})
	.post(function(req, res){
		res.end('route /article post\n');
	});
	
/* 4.路由参数*/	
//http://example.com/news/123   ,123就是一个路由参数
//req是请求对象；res是响应对象；
//next是函数执行完后的调用的函数；newsId是用户在路由里面指定的路由参数的值
app.param('newsId', function(req, res, next, newsId){
	req.newsId = newsId;//直接把路由参数放到请求对象里面
	next();//内置函数，表示外层函数执行完后还会继续执行next();
})
//使用get方法定义一个路由使用这个参数，定义方法是’：+路由参数名’
app.get('/news/:newsId', function(req, res){
	res.end('newsId: ' + req.newsId + '\n');
});

/* 5.中间件*/	
/* Connect:Node.js的中间件框架
 * 分层处理
 * 每层实现一个功能
*/


app.listen(18001, function afterListen(){
	console.log('express running on http://localhost:18001');
});
