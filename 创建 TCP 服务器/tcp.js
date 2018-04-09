var net = require('net');//引入net模块
var fs = require('fs');

const PORT = 18001;//定义端口
const HOST = '127.0.0.1';//定义本地本机服务器地址

//在整个TCP服务器中很多事情都是由事件来触发和完成相应的操作的
var clientHandler = function(socket){
	console.log('someone connected!');
	
	socket.on('data', function dataHandler(data){
		if(data[0] === 1)
		{
		  console.log(socket.remoteAddress, socket.remotePort, 'send文字数据', data.toString());
		  console.log('长度是', socket.bytesRead);
		}
		else if(data[0] === 0)
		{
		  console.log(socket.remoteAddress, socket.remotePort, 'send文件数据');
			//socket对象的pipe方法将客户端发送的流数据写到文件等其他目标对象中
			//socket.pipe(socket);  
		  data.slice(1);
		  fs.writeFileSync("message.txt",data);
		  console.log('向文件写的数据长度：' + socket.bytesRead);
		}
	});
	//数据错误事件  
    socket.on('error',function(err){  
        console.log('socket error:' + err.message);  
        socket.end();  
    }); 
	
	socket.on('close', function(){
	  console.log(socket.remoteAddress, socket.remotePort, 'disconnected');	
	})
};

var server = net.createServer(clientHandler);

server.listen(PORT, HOST);
console.log('tcp server running on tcp://', HOST, ':', PORT);

 var waitTime = 120;//定义客户端未响应的时间w为120s

  //设置超时时间
  server.on('connection', function (socket) {
  socket.setTimeout(1000 * waitTime,function() {
    console.log('客户端在' + waitTime + 's内未通信，将断开连接...');
  });
  //监听到超时事件，断开连接
  socket.on('timeout', function() {
    //socket.end();
    socket.destroy();
    //如果是确认客户端已经断开连接了（比如客户端会定时发送数据包，
    //现在已经超过间隔时间然而没有发送），可以使用socket.destroy()来断开连接。
    //使用socket.end()断开连接的话由于服务器端发送的fin包不能收到反应，
    //会使此链接进入TIME_WAIT状态，如果客户端一直没有回应，
    //在2-4分钟之后才会关闭链接，而destory()会直接断开链接，显然更加高效。
   });
});

server.on('close', function() {
    console.log('Server closed');
});

server.on('error', function(err) {
    console.log('Server error: ', err.message);
});