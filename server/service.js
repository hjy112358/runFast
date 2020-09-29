// var ws = require("nodejs-websocket")
// var port=3101;
// var user=0;

// // // 创建一个连接
// var server = ws.createServer(function (conn) {
//     console.log("创建一个新的连接--------");
//     console.log(conn)
	
//     conn.nickname=conn.path.split("=")[1]
//     var mes = {};
//     mes.type = "enter";
//     mes.data = " 进来啦"
//     broadcast(JSON.stringify(mes));
	
//     //向客户端推送消息
//     conn.on("message", function (str) {
		
//         console.log("回复 "+str)
//         mes.type = "message";
//         mes.data = conn.nickname + "-" + str;
//         broadcast(JSON.stringify(mes));
		
//     });

//     //监听关闭连接操作
//     conn.on("close", function (code, reason) {
//         console.log("关闭连接");
//         mes.type = "leave";
//         mes.data = conn.nickname+" 离开了"
//         // broadcast(JSON.stringify(mes));
//     });

//     //错误处理
//     conn.on("error", function (err) {
//         console.log("监听到错误");
//         console.log(err);
//     });
// }).listen(port);

// function broadcast(str){
//     server.connections.forEach(function(connection){
//         connection.sendText(str);
//     })
// }



var app = require('http').createServer();
var io = require('socket.io')(app);

// socket连接
io.on('connection', (socket) => {
    console.log('a user connected');
    //将收到的消息广播出去
    socket.on('message', function(content){
        console.log(content);   //content为收到的消息内容，包括姓名和消息内容
        socket.broadcast.emit('message',content);
    });

    //监听新人连接，然后广播出去
    socket.on('newPeople', function(name){
        console.log(name)     //name为连接者的姓名或昵称
        socket.broadcast.emit('newPeer',name);
    });
	
	socket.on('disconnect', function (name) {
	
	      socket.emit(name+'disconnected');
	
	  });
	
});


app.listen(3030, () => {
    console.log('listening on *:3030');
});


// let app = require('http').createServer();
// let io = require("socket.io")(app);
// let port = 3000
// let user = []
// io.on('connection', function (socket) {
//     /*监听登录*/
//     let userName = null;
//     socket.on('login',function(data){
//         userName = data.userName;
//         let index = user.findIndex(e => e==userName)
//         if(index === -1){
//             user.push(userName);
//             socket.emit("loginSuccess",userName);
//             io.sockets.emit("add",userName)
//         }else{
//             socket.emit("loginFail",'')  
//         }
//     })
//     socket.on('sendMessage',function(data){
//         console.log(data)
//         io.sockets.emit("otherMessage",data)  
// 		var data = JSON.parse(data);
// 		switch(data.msg.func){
// 			case:''
// 		}

//     })
//     socket.on('disconnect',function(){
//         /*向所有连接的客户端广播leave事件*/
//         io.sockets.emit('leave',userName)
//         user.map(function(val,index){
//             if(val === userName){
//                 user.splice(index,1);
//             }
//         })
//      })
// })

// app.listen(port,function(){
//     console.log("3000端口已启用")
// })