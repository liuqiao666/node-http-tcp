var net = require('net');
var fs = require('fs');
process.stdin.resume();//process.stdin用于获取来自标准输入的可读流（Readable Stream）
//process.stdin流来接受用户的键盘输入，这个可读流初始化时处于暂停状态，调用流上的resume()方法来恢复流
process.stdin.setEncoding('utf8');

const HOST = '127.0.0.1';
const PORT = 18000;

var tcpClient = net.Socket();

tcpClient.connect(PORT, HOST, function(){
		console.log('connect success!');
	
    	// 获取输入的字符串
    	process.stdin.on('data', function(data){
        // 发送输入的字符串到服务器
        console.log('input: ');
        tcpClient.write(data);

        
        // 输入 'close' 字符串时关闭连接
        if (data === 'close\n') {
            tcpClient.end();
        }
    });
});

// 获取服务端发送过来的数据
/*tcpClient.on('data', function(data){
	console.log('received: ',data.toString());
});*/

tcpClient.on('error',function(error){
  throw error;
});

tcpClient.on('end', function() {
    console.log('Disconnected from server');
    // 退出客户端程序
    process.exit();
});


