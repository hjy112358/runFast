export default {
  //   requestUrl:{
		// startGame:'http://192.168.199.101:8082/game/startGame',  //开始游戏
		// websocketUrl:'ws://192.168.199.101:8082/webSocket/',  //websocket地址
		// finishGame:'http://192.168.199.101:8082/game/getGameScore' ,//结束游戏
		// exitRoom:'http://192.168.199.101:8082/game/user_exitRoom'//退出房间
  //   },
	requestUrl:{
		startGame:'http://192.168.199.112:8082/game/startGame',  //开始游戏
		websocketUrl:'ws://192.168.199.112:8082/webSocket/',  //websocket地址
		finishGame:'http://192.168.199.112:8082/game/getGameScore' ,//结束游戏
		exitRoom:'http://192.168.199.112:8082/game/user_exitRoom'//退出房间
	},
    setRequestUrl($requestUrlt){
       this.$requestUrl= requestUrl;
    }
}