var http = require("http");


var requestHandler = function(req,res){
	res.end('hello');//直接向用户发回hello这个响应信息
};

var web = http.createServer(requestHandler);//创建一个服务器的实例

web.listen(18000);//服务器的实例监听在18000的端口上
//当我们请求本地的18000这个端口时，服务器的实例会触发一个request事件
//request事件会调用requestHandler这个函数，这个函数会直接向用户发回hello这个响应信息

console.log('http running on http://localhost:18000');
