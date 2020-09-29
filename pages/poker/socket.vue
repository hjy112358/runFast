<template>
	<view class="content">
		<view class="testsend">
			<input type="text" v-model='userid' placeholder="用户id" style="color:#fff" />
			<button type="primary" @tap='test()'>测试</button>
		</view>

		<view class="topbox">
			<!-- 返回 -->
			<!-- <view class="back">
				<image src="../../static/image/back.png" ></image>
			</view> -->

			<!-- 底牌 -->
			<view class="landlordCard clearfix" v-if='!island'>
				<image src="/static/image/landcard.png" v-for='(item,index) in landlordCard' :key="index" :class="index==0?'':'marl6'"></image>
			</view>
			<view class="landlordCard clearfix" v-else>
				<image :src="item1.src" v-for='(item1,index1) in landlordCard' :key="index1" :class="index1==0?'':'marl6'"></image>
			</view>
			<!-- 功能区 -->
			<!-- <view class="">
				
			</view> -->
		</view>
		<!-- 左玩家 -->
		<!--  -->
		<view class="palyL palybox" v-show='playmsgshow'>
			<view class="landhead" v-show='leftbtnmsg.landhead'>
				<image src="../../static/image/landlord.png" mode=""></image>
			</view>
			<view class="headimg">
				<image src="../../static/image/head.png" mode=""></image>
			</view>
			<view class="playbg flex alignitem-end">
				<view class="flex juscon-between alignitem-start">
					<view class="playmsg">
						<view class="flex juscon-between alignitem-center playlever">
							<view class="playlevel flex juscon-center alignitem-center">
								<text>LV{{playleft.level}}</text>
							</view>
							<text class="ellipsis">{{playleft.nickname}}</text>
						</view>
						<view class="beans flex juscon-start alignitem-center">
							<image src="../../static/image/dou.png" mode=""></image>
							<text>{{playleft.point}}</text>
						</view>
					</view>
					<view class="cardnum">
						<text>{{leftcount}}</text>
					</view>
				</view>

			</view>
		</view>
		<view class="palybox mybox palyLbox">
			<!-- 信息展示 -->
			<view class="msgbox">
				<text v-if='leftbtnmsg.isLeftTest' class="istext">{{leftbtnmsg.leftText}}</text>
				<text v-else class="notext">{{leftbtnmsg.leftText}}</text>
			</view>
			<!-- 出牌展示区 -->
			<view class="cardlist clearfix cardnormal cardshowlist">
				<view class="card big cardwrap big-card" v-for='(item,index) in leftbtnmsg.leftChoose' :key="index" :style="cardleft(chooseArray,item,index)">
					<image :src="item.src" mode=""></image>
				</view>
			</view>
			<!-- 倒计时 -->
			<view class="paperOperate " v-show='leftbtnmsg.timebtn'>
				<view class="flex juscon-center alignitem-center">
					<view class="countDown ">
						<view class="">
							<image src="../../static/image/time.png" mode=""></image>
							<text>{{leftbtnmsg.leftTime}}</text>
						</view>
					</view>
				</view>

			</view>


		</view>


		<!-- 我 -->
		<!--  -->
		<view class="palyS palybox " v-show='playmsgshow'>

			<view class=" palybox mybox ">
				<!-- 信息展示 -->
				<view class="msgbox">
					<text v-if='selfbtnmsg.isSelfTest' class="istext">{{selfbtnmsg.selfText}}</text>
					<text v-else class="notext">{{selfbtnmsg.selfText}}</text>
				</view>
				<!-- 出牌展示区 -->
				<view class="cardlist clearfix cardnormal cardshowlist">
					<view class="card big cardwrap big-card" v-for='(item,index) in selfbtnmsg.SelfChoose' :key="index" :style="mycardleft(chooseArray,item,index)">
						<image :src="item.src" mode=""></image>
					</view>
				</view>

				<!-- 抢地主按钮 -->
				<view class="grabCardbox flex alignitem-center juscon-center">
					<!-- 抢地主 -->
					<view class="noGrad " @tap='need()' v-show='selfbtnmsg.getbtn'>
						<image src="../../static/image/needland.png" mode=""></image>
					</view>
					<!-- 加倍 -->
					<view class="grabCard " @tap="double()" v-show='selfbtnmsg.doublebtn'>
						<image src="../../static/image/doublebtn.png" mode=""></image>
					</view>
					<!-- 不出 -->
					<view class="nopaper" @tap='sendNo()' v-show='selfbtnmsg.canclebtn'>
						<image src="../../static/image/cancle.png" mode=""></image>
					</view>
					<!-- 提示 -->
					<view class="hit" @tap='hit()' v-show='selfbtnmsg.hitbtn'>
						<image src="../../static/image/hit.png" mode=""></image>
					</view>
					<!-- 倒计时 -->
					<view class="countDown " v-show='selfbtnmsg.timebtn'>
						<view class="">
							<image src="../../static/image/time.png" mode=""></image>
							<text>{{selfbtnmsg.selfTime}}</text>
						</view>
					</view>
					<!-- 不抢地主 -->
					<view class="grabCard " @tap="noNeed()" v-show='selfbtnmsg.getnobtn'>
						<image src="../../static/image/noland.png" mode=""></image>
					</view>

					<!-- 不加倍 -->
					<view class="noGrad " @tap='nodouble()' v-show='selfbtnmsg.doublenobtn'>
						<image src="../../static/image/nodouble.png" mode=""></image>
					</view>
					<!-- 出牌 -->
					<view class="surePaper" @tap='showcard()' v-show='selfbtnmsg.sendbtn'>
						<image src="../../static/image/sendpaper.png" mode=""></image>
					</view>
					<!-- 要不起 -->
					<view class="nocard" @tap='sendNo()' v-show='selfbtnmsg.nobtn'>
						<image src="../../static/image/nobig.png" mode=""></image>
					</view>
				</view>

			</view>

			<view class="flex  juscon-between alignitem-start mymsg">
				<view class="pos-r">
					<view class="landhead" v-show='selfbtnmsg.landhead'>
						<image src="../../static/image/landlord.png" mode=""></image>
					</view>
					<view class="headimg">
						<image src="../../static/image/head.png" mode=""></image>
					</view>
					<view class="playbg flex alignitem-end">
						<view class="">
							<view class="playmsg">
								<view class="flex juscon-between alignitem-center playlever">
									<view class="playlevel flex juscon-center alignitem-center">
										<text>LV{{playself.level}}</text>
									</view>
									<text class="ellipsis">{{playself.nickname}}</text>
								</view>
							</view>
							<view class="beansdetail flex juscon-between alignitem-center">
								<image src="../../static/image/dou.png" class="dou"></image>
								<text>{{playself.point}}</text>
								<image src="../../static/image/add.png" class="add"></image>
							</view>
						</view>
					</view>
				</view>

			</view>
			<!-- 牌列表展示 -->
			<view class="cardlist  cardnormal mycarlist flex juscon-center">
				<view class="clearfix mycardbox">
					<view class="card big cardwrap big-card" v-for='(item,index) in palySpaper' :key="index" :style="mycardleft(palySpaper,item,index)"
					 @tap='checkCard(item,index)'>
						<image :src="item.src" mode=""></image>
					</view>
				</view>

				<view class="mark" v-show='showmark'>
					<text>{{markmsg}}</text>
				</view>
			</view>
			<!-- 倍数、聊天 -->
			<view class="flex juscon-between doublemsg">
				<view class="double  flex alignitem-center juscon-center">
					<text>{{selfbtnmsg.point}}</text>
				</view>
				<!-- <view class="chat">
					<image src="../../static/image/chat.png" mode=""></image>
				</view> -->
			</view>
		</view>

		<!-- 右玩家 -->
		<!--  -->
		<view class="palyR palybox" v-show='playmsgshow'>
			<view class="landhead" v-show='rightbtnmsg.landhead'>
				<image src="../../static/image/landlord.png" mode=""></image>
			</view>
			<view class="headimg">
				<image src="../../static/image/head.png" mode=""></image>
			</view>
			<view class="playbg flex alignitem-end">
				<view class="flex juscon-between alignitem-start">
					<view class="cardnum">
						<text>{{rightcount}}</text>
					</view>
					<view class="playmsg">
						<view class="flex juscon-between alignitem-center playlever">
							<view class="playlevel flex juscon-center alignitem-center">
								<text>LV{{playright.level}}</text>
							</view>
							<text class="ellipsis">{{playright.nickname}}</text>
						</view>
						<view class="beans flex juscon-start alignitem-center">
							<image src="../../static/image/dou.png" mode=""></image>
							<text>{{playright.point}}</text>
						</view>
					</view>

				</view>

			</view>
		</view>
		<view class="palybox mybox palyRbox">
			<!-- 信息展示 -->
			<view class="msgbox">
				<text v-if='rightbtnmsg.isRightTest' class="istext">{{rightbtnmsg.rightText}}</text>
				<text v-else class="notext">{{rightbtnmsg.rightText}}</text>
			</view>
			<!-- 出牌展示区 -->
			<view class="cardlist clearfix cardnormal cardshowlist">
				<view class="card big cardwrap big-card" v-for='(item,index) in rightbtnmsg.rightChoose' :key="index" :style="cardleft(chooseArray,item,index)">
					<image :src="item.src" mode=""></image>
				</view>
			</view>
			<!-- 出牌按钮 -->
			<view class="paperOperate " v-show='rightbtnmsg.timebtn'>
				<view class="flex juscon-center alignitem-center">
					<view class="countDown ">
						<view class="">
							<image src="../../static/image/time.png" mode=""></image>
							<text>{{rightbtnmsg.rightTime}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="paperCenter ">
			<view class="pos-r paperlist" v-show='showpaper'>
				<view class="paperbox">
					<image src="../../static/image/card/cardBack.png" class="paper"></image>
				</view>
				<view class="" v-for="(item,index) in isShowAni" :key='index'>
					<transition :name="`bounce${index+1}`" v-if="item">
						<image src="../../static/image/card/cardBack.png" class="papermove"></image>
					</transition>
				</view>
			</view>
			<view class="startbtn hidden" @tap="sendpaper()" v-show='showstart'>
				<image src="../../static/image/start.png" mode=""></image>
			</view>
		</view>

		<!-- 输赢界面 -->
		<view class="">

		</view>
	</view>
</template>


<script>
	import uniList from '../../components/uni-list/uni-list.vue'
	import uniListItem from '../../components/uni-list-item/uni-list-item.vue'
	import io from '@/node_modules/weapp.socket.io/lib/weapp.socket.io.js'
	export default {
		data() {
			return {
				palyL: [], //左玩家分到的牌
				palyS: [], //我分到的牌
				palyR: [], //右玩家分到的牌
				palyLpaper: [],
				palySpaper: [],
				palyRpaper: [],

				audio: {},
				mp3: '/static/f.mp3',


				showpaper: false, //发牌
				showstart: true, //开始游戏
				sendBtn: false,


				chooseArray: [], //选择的牌
				landlordCard: [], //地主牌
				island: false, //是否显示地主牌
				// leftTime：倒计时   leftText：操作文字展示 isleftTest:操作与否  leftChoose:出牌 timebtn 是否显示倒计时
				leftbtnmsg: {
					leftTime: 30,
					leftText: '',
					isLeftTest: false, //确定true  否定false
					leftChoose: [],
					timebtn: false,
					timeleft: null,
					landhead: false, //地主头像
				},
				selfbtnmsg: {
					selfTime: 30,
					selfText: '', //操作文字展示
					isSelfTest: false, //要0  不要1  超级2
					SelfChoose: [],
					double: 15, //倍数
					timebtn: false, //是否显示倒计时
					timeSelf: null,
					getbtn: false, //抢地主  
					getnobtn: false, //不抢地主 1
					doublenobtn: false, //不加倍   2
					doublebtn: false, //加倍 
					nobtn: false, //要不起 3
					canclebtn: false, //不出  4
					hitbtn: false, //提示
					sendbtn: false, //出牌 
					isChoosebtn: false, //是否操作
					landhead: false, //地主头像

				},
				rightbtnmsg: {
					rightTime: 30,
					rightText: '',
					rightChoose: [],
					timebtn: false,
					isRightTest: false, //确定true  否定false
					timeright: null,
					landhead: false, //地主头像
				},

				hintcard: [], //提示选中的牌
				markmsg: '',
				showmark: false,
				leftcount: 0, //玩家牌数
				rightcount: 0, //玩家牌数
				websocket: null,
				username: '',
				cardslist: null, //所有牌信息
				
				userid: '',
				whichme: '', //self位置的index
				playleft: {}, //左边玩家信息
				playself: {}, //我的信息
				playright: {}, //右边玩家信息
				playmsgshow: false, //是否显示玩家
				online: 0, //当前在线人数
				userRecord: [], //记录进入用户的id
				usermsg: [], //暂时记录用户的信息
				isShowAni: [true, true, true],
				useridlist: [1, 2, 3], //测试存储用户id数组
				totalTime: 30,
				type1data: {
					// 0 抢地主  1 不抢
					choosetype1: [], //抢地主的用户
					isSureRepeat: false,
					type1: 0, //抢地主操作人数(判断是否抢地主结束)
					landid: null
				},
				isSureland: false, //确认地主
				type2: 0, //判断加倍是否完成
				firstland: null, //记录重复一遍抢地主的第一个人id
				secondsure:false,//记录重复抢地主是否完成
				
				
			}
		},
		components: {
			uniList,
			uniListItem
		},
		created() {
			var _this = this;
			_this.remFn(); //加载rem
			var tokens = ['', '9383c08eed1644b58055c68e9341e172', '9383c08eed1644b58055c68e9341e177',
				'304b957948a34c4594b41f0beda38d62'
			];
			
				// uni.request({
				// 	url: 'http://192.168.199.101:8081/user/getUserDetails',
				// 	data: { //参数
				// 		userid: userID,
				// 		token: tokens[userID]
				// 	},
				// 	success: res => {
				// 		console.log(res.data)
				// 		if (res.data.success) {
				// 			_this.usermsg.push(res.data.data)
				// 		}
				// 	}
				// });
			
		},
		watch: {
			firstland() {
				console.log('第二遍抢地主')
				// this.repeatland()
			},
			
			
			
		},

		methods: {
			// 测试
			test() {
				var _this = this;
				var userID = _this.userid;
				for (var i = 0; i < _this.useridlist.length; i++) {
					if (_this.useridlist[i] == userID) {
						_this.whichme = i;
					}
				}
				// _this.websocket = new WebSocket("ws://192.168.199.101:8081/connectWebSocket/" + userID);
				_this.websocket = new WebSocket("ws://192.168.31.217:8989/connectWebSocket/" + userID);
				_this.websocket.onopen = function(event) {
					console.log('连接成功')
				};
				_this.websocket.onmessage = function(event) {
					var data = JSON.parse(event.data);
					console.log(data)
					if (data.funcType == 1) {
						// 抢地主操作显示
						_this.Grablandlord(data.funcType, data.userId, data.msg)
						// 第二轮确认第一个人是否抢地主
						if (_this.type1data.isSureRepeat && !_this.isSureland) {
							console.log("第二轮确认")
							if (data.msg == 0) {
								_this.isSureland = true;
								_this.type1data.landid = id;
							} else {
								//不抢的话地主给最后一个抢地主的人
								var index = _this.type1data.choosetype1.length - 1
								var id = _this.type1data.choosetype1[index];
								var messagelast = {
									userId: id,
									funcType: 1,
									msg: "0"
								}
								_this.websocket.send(JSON.stringify(messagelast));
								// 确认地主
								_this.isSureland = true;
								_this.type1data.landid = id;
							}
						} else if(!_this.type1data.isSureRepeat){
							_this.type1data.type1++;
							if (_this.type1data.type1 < 3) {
								var index = _this.type1data.type1;
								var first = _this.whichplay(_this.useridlist[index]);
								_this.coutdown(first, 1); //开启抢地主倒计时
							}
							// 记录抢地主的用户id
							if (data.msg == 0) {
								// msg 0抢地主  1不抢
								_this.type1data.choosetype1.push(data.userId);
							}

							// 判断是否三个用户抢地主操作完成
							if (_this.type1data.type1 == 3) {
								if (_this.type1data.choosetype1.length == 0) {
									// 没有人抢默认第一个
									var id = _this.useridlist[0];
									var messagefirst = {
										userId: id,
										funcType: 1,
										msg: "0"
									}
									_this.websocket.send(JSON.stringify(messagefirst));
									// 确认地主
									_this.isSureland = true;
									_this.type1data.landid = id;

								} else if (_this.type1data.choosetype1.length == 1) {
									// 只有一个用户抢地主
									// 确认地主
									_this.isSureland = true;
									_this.type1data.landid = _this.type1data.choosetype1[0];

								} else {
									_this.type1data.isSureRepeat = true;
									// 有两个及以上用户抢地主
									_this.firstland = _this.type1data.choosetype1[0]; //第一个抢地主的人

								}
							}
						}

					} else if (data.funcType == 2) {
						//记录加倍人数，是否可以开始出牌操作
						_this.type2++;
						// 加倍
						_this.Grablandlord(data.funcType, data.userId, data.msg)
						if (_this.type2 == 3) {
							setTimeout(function() {
								_this.leftbtnmsg.leftText = '';
								_this.selfbtnmsg.selfText = '';
								_this.rightbtnmsg.rightText = '';

							}, 1000)
						}
					}
					// 建立连接
					if (data.funcType == 4) {
						_this.userRecord.push(data.userId)
					}
					
					// 拿牌
					if (data.onlineUsers == '3' && data.userId == userID) {
						var messageuserlist = {
							userId: userID,
							funcType: 0, //用户信息
							msg: ""
						}
						_this.websocket.send(JSON.stringify(messageuserlist));
						_this.online = 3;
						var messageget = {
							userId: userID,
							funcType: 5, //拿牌
							msg: ""
						}
						_this.websocket.send(JSON.stringify(messageget));
						
					}
					// 获取到的牌信息
					if (data.card) {
						_this.cardslist = JSON.parse(data.card);
						_this.setcard()
					}
					// 获取用户信息
					if(data.userInfo){
						var infolist=JSON.parse(data.userInfo);
						for(var j=0;j<_this.useridlist.length;j++){
							for(var i=0;i<infolist.length;i++){
								if(_this.useridlist[j]==infolist[i].userid){
									_this.usermsg.push(infolist[i])
								}
							}
						}
						// 根据位置展示信息
						if (_this.whichme == '0') {
							_this.playself = _this.usermsg[0];
							_this.playleft = _this.usermsg[1];
							_this.playright = _this.usermsg[2];
						
						} else if (_this.whichme == '1') {
							_this.playself = _this.usermsg[1];
							_this.playleft = _this.usermsg[2];
							_this.playright = _this.usermsg[0];
						} else if (_this.whichme == '2') {
							_this.playself = _this.usermsg[2];
							_this.playleft = _this.usermsg[0];
							_this.playright = _this.usermsg[1];
						}
						
					}

				};
				//连接关闭的回调方法
				_this.websocket.onclose = function(data) {
					console.log(data)
				};
				_this.websocket.onerror = function(data) {
					console.log(data)
				};
			},
			// repeatland() {
			// 	var _this = this;
			// 	var first = _this.whichplay(_this.firstland); //第一个抢地主的人
			// 	if (first == 'left') {
			// 		_this.leftbtnmsg.leftText = '';
			// 		_this.leftbtnmsg.timebtn = true;
			// 		_this.leftTimeDown();
			// 	} else if (first == 'self') {
			// 		_this.selfbtnmsg.selfText = '';
			// 		_this.selfTimeDown(1);
			// 		_this.selfbtnmsg.getbtn = true;
			// 		_this.selfbtnmsg.timebtn = true;
			// 		_this.selfbtnmsg.getnobtn = true;

			// 	} else {
			// 		_this.rightbtnmsg.rightText = '';
			// 		_this.rightTimeDown();
			// 		_this.rightbtnmsg.timebtn = true;
			// 	}
			// },
			// 修改牌的属性
			setcard() {
				var _this = this;
				var userID = _this.userid;
				var allcard, imgsrc;
				// 处理后台返回的数据
				for (var v in _this.cardslist) {
					var nowdata = _this.cardslist[v];
					for (var i = 0; i < nowdata.length; i++) {
						var card;
						if (nowdata[i].num == 'J') {
							card = 11
						} else if (nowdata[i].num == 'Q') {
							card = 12
						} else if (nowdata[i].num == 'K') {
							card = 13
						} else if (nowdata[i].num == 'A') {
							card = 14
						} else if (nowdata[i].num == '2') {
							card = 15
						} else if (nowdata[i].num == 'joker') {
							card = 16
						} else if (nowdata[i].num == 'JOKER') {
							card = 17
						} else {
							card = nowdata[i].num
						}
						if (nowdata[i].num == 'JOKER' || nowdata[i].num == 'joker') {
							imgsrc = '../../static/image/card/' + card + '.png';
						} else {
							imgsrc = '../../static/image/card/' + card + '-' + nowdata[i].color + '.png';
						}
						nowdata[i].type = nowdata[i].color; //花色
						nowdata[i].cardvalue = nowdata[i].num; //牌面
						nowdata[i].checked = false;
						nowdata[i].card = card;
						nowdata[i].isHint = true;
						nowdata[i].src = imgsrc;
					}
				}
				_this.disposecard()
			},
			//整理后台返回数据，并给用户排位置
			disposecard() {
				var _this = this;
				var userlist = [];
				var landcard = [];
				for (var v in _this.cardslist) {
					if (v != 'dipai') {
						var user = {
							userid: v,
							cardlist: _this.cardslist[v]
						}
						userlist.push(user)
					} else {
						landcard.push(_this.cardslist[v])
					}
				}
				_this.landlordCard = landcard[0];
				//根据userid排座位
				if (_this.whichme == '0') {
					_this.palyS = userlist[0].cardlist;
					_this.palyL = userlist[1].cardlist;
					_this.palyR = userlist[2].cardlist;

				} else if (_this.whichme == '1') {
					_this.palyS = userlist[1].cardlist;
					_this.palyL = userlist[2].cardlist;
					_this.palyR = userlist[0].cardlist;
				} else if (_this.whichme == '2') {
					_this.palyS = userlist[2].cardlist;
					_this.palyL = userlist[0].cardlist;
					_this.palyR = userlist[1].cardlist;
				}
				_this.sendpaper();
			},
			// 发牌
			sendpaper() {
				this.playmsgshow = true;
				this.showpaper = true;
				this.showstart = false;
				let nowCardLength = 0; //当前发出的牌的张数
				//创建音频
				// this.audio = new Audio();
				// this.audio.src = _this.mp3;
				// // 播放音频
				// _this.audio.play();

				// 发牌定时器
				let timer = setInterval(() => {
					// 牌发完，定时器关闭
					if (nowCardLength >= 50) {
						clearInterval(timer);
						this.showpaper = false;
						var first = this.whichplay(this.useridlist[0]);
						this.coutdown(first, 1); //开启抢地主倒计时
					}
					let index = nowCardLength % 3;

					// 做发牌动画
					this.isShowAni = [true, true, true];
					this.isShowAni[index] = !this.isShowAni[index];
					if (index == 0) {
						this.palyLpaper.push(this.palyL[0]);
						this.leftcount = this.palyLpaper.length;
						this.sortCard(this.palyLpaper)
						this.palyL.shift();
					} else if (index == 1) {
						this.palySpaper.push(this.palyS[0]);
						this.sortCard(this.palySpaper)
						this.palyS.shift();
					} else if (index == 2) {
						this.palyRpaper.push(this.palyR[0]);
						this.rightcount = this.palyRpaper.length;
						this.sortCard(this.palyRpaper)
						this.palyR.shift();
					}

					nowCardLength++;
				}, 60);
			},

			// 改变当前自己牌的堆叠位置
			mycardleft(play, item, index) {
				var marginL, marginT;
				if (item.checked) {
					marginT = '0'
				}
				if (index == 0) {
					marginL = '0';
				}
				return {
					marginLeft: marginL,
					marginTop: marginT
				}
			},
			// 改变左右两边玩家的出牌的排列样式
			cardleft(play, item, index) {
				var marginL, marginT;
				if (item.checked) {
					marginT = '0'
				}
				if (index == 0 || index == 9) {
					marginL = '0';
				}
				if (index >= 9) {
					marginT = '-0.45rem';
				}
				return {
					marginLeft: marginL,
					marginTop: marginT
				}
			},

			// 给牌排序
			sortCard(cards) {
				return cards.sort((a, b) => {
					let num = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2', 'joker', 'JOKER']
					let x = num.findIndex(n => n === a.cardvalue)
					let y = num.findIndex(n => n === b.cardvalue)
					if (x < y) {
						return 1
					} else if (x > y) {
						return -1
					} else {
						return 0
					}
				})
			},
			// 倒coutdown计时
			coutdown(num, type) {
				// num  谁方倒计时  all全部  left 左方  self本方  right 右方
				//  type 哪个操作的倒计时  1抢地主 2加倍 3要不起  4出牌
				if (num == 'all') {
					console.log('coutdownall left')
					this.leftTimeDown();
					this.selfTimeDown(type);
					this.rightTimeDown();
				} else if (num == 'left') {
					console.log('coutdown left')
					this.leftTimeDown();
				} else if (num == 'self') {
					
					this.selfTimeDown(type);
				} else if (num == 'right') {
					this.rightTimeDown();
				}

			},
			// 左玩家倒计时
			leftTimeDown() {
				console.log('lefttimedow')
				var _this = this;
				clearInterval(_this.leftbtnmsg.timeleft);
				_this.leftbtnmsg.timebtn = true;
				console.log('left倒计时里的btntrue')
				_this.leftbtnmsg.leftText='';
				_this.leftbtnmsg.leftTime = _this.totalTime;
				_this.leftbtnmsg.timeleft = setInterval(function() {
					_this.leftbtnmsg.leftTime--;
					if (_this.leftbtnmsg.leftTime == 0) {
						clearInterval(_this.leftbtnmsg.timeleft);
						_this.leftbtnmsg.timebtn = false
					}
				}, 1000);
			},
			// 本家倒计时
			selfTimeDown(type) {
				console.log('self')
				var _this = this;
				clearInterval(_this.selfbtnmsg.timeSelf);
				_this.selfbtnmsg.selfText='';
				_this.selfbtnmsg.timebtn = true;
				_this.selfbtnmsg.selfTime = _this.totalTime;
				_this.selfbtnmsg.isChoosebtn = false;
				if (type == 1) {
					_this.selfbtnmsg.getbtn = true;
					_this.selfbtnmsg.getnobtn = true;
				}
				_this.selfbtnmsg.timeSelf = setInterval(function() {
					_this.selfbtnmsg.selfTime--;
					if (_this.selfbtnmsg.selfTime == 0) {
						clearInterval(_this.selfbtnmsg.timeSelf);
						if (!_this.selfbtnmsg.isChoosebtn) {
							if (type == 1) {
								var userID = _this.userid;
								var message = {
									userId: userID,
									funcType: 1,
									msg: "1"
								}
								_this.websocket.send(JSON.stringify(message));
								_this.selfbtnmsg.isChoosebtn = true;
								_this.selfbtnmsg.isSelfTest = false;
								_this.selfbtnmsg.selfText = '不抢';
								_this.selfbtnmsg.getbtn = false;
								_this.selfbtnmsg.getnobtn = false;
							} else if (type == 2) {
								var userID = _this.userid;
								var message = {
									userId: userID,
									funcType: 2,
									msg: "1"
								}
								_this.websocket.send(JSON.stringify(message));
								_this.selfbtnmsg.isChoosebtn = true;
								_this.selfbtnmsg.isSelfTest = false;
								_this.selfbtnmsg.selfText = '不加倍';
								_this.selfbtnmsg.doublenobtn = false;
								_this.selfbtnmsg.doublebtn = false;
							}

						}
						_this.selfbtnmsg.timebtn = false;
					}
				}, 1000);
			},
			// 右玩家倒计时
			rightTimeDown() {
				console.log('right')
				var _this = this;
				clearInterval(_this.rightbtnmsg.timeright);
				_this.rightbtnmsg.rightText='';
				_this.rightbtnmsg.timebtn = true;
				_this.rightbtnmsg.rightTime = _this.totalTime;
				_this.rightbtnmsg.timeright = setInterval(function() {
					_this.rightbtnmsg.rightTime--;
					if (_this.rightbtnmsg.rightTime == 0) {
						clearInterval(_this.rightbtnmsg.timeright);
						_this.rightbtnmsg.timebtn = false
					}
				}, 1000);
			},
			// 处理抢地主,加倍操作
			Grablandlord(type, id, msg) {
				var which = this.whichplay(id);
				if (which == 'left') {
					clearInterval(this.leftbtnmsg.timeleft);
					this.leftbtnmsg.timebtn = false;
					if (type == 1) {
						if (msg == 0) {
							this.leftbtnmsg.isLeftTest = true;
							this.leftbtnmsg.leftText = '抢地主';
						} else {
							this.leftbtnmsg.isLeftTest = false;
							this.leftbtnmsg.leftText = '不抢';
						}
					} else if (type == 2) {
						if (msg == 0) {
							this.leftbtnmsg.isLeftTest = true;
							this.leftbtnmsg.leftText = '加倍';
						} else if (msg == 1) {
							this.leftbtnmsg.isLeftTest = false;
							this.leftbtnmsg.leftText = '不加倍';
						} else if (msg == 2) {
							this.leftbtnmsg.isLeftTest = false;
							this.leftbtnmsg.leftText = '超级加倍';
						}
					}
				} else if (which == 'right') {
					clearInterval(this.rightbtnmsg.timeright);
					this.rightbtnmsg.timebtn = false;
					if (type == 1) {
						if (msg == 0) {
							this.rightbtnmsg.isRightTest = true;
							this.rightbtnmsg.rightText = '抢地主';
						} else {
							this.rightbtnmsg.isRightTest = false;
							this.rightbtnmsg.rightText = '不抢';
						}
					} else if (type == 2) {
						if (msg == 0) {
							this.rightbtnmsg.isRightTest = true;
							this.rightbtnmsg.rightText = '加倍';
						} else if (msg == 1) {
							this.rightbtnmsg.isRightTest = false;
							this.rightbtnmsg.rightText = '不加倍';
						} else if (msg == 2) {
							this.rightbtnmsg.isRightTest = false;
							this.rightbtnmsg.rightText = '超级加倍';
						}
					}
				} else {
					clearInterval(this.selfbtnmsg.timeSelf);
					this.selfbtnmsg.timebtn = false;
					if (type == 1) {
						this.selfbtnmsg.getbtn = false;
						this.selfbtnmsg.getnobtn = false;
						if (msg == 0) {
							this.selfbtnmsg.isSelfTest = true;
							this.selfbtnmsg.selfText = '抢地主';
						} else {
							this.selfbtnmsg.isSelfTest = false;
							this.selfbtnmsg.selfText = '不抢';
						}
					}
				}
				
			
			},
			
			// 判断当前是哪个用户的操作
			whichplay(id) {
				var _this = this;
				var index = _this.useridlist.indexOf(parseInt(id));
				var which = '';
				if (_this.whichme == '0') {
					if (index == '1') {
						which = 'left'
					} else if (index == '2') {
						which = 'right'
					} else {
						which = 'self'
					}

				} else if (_this.whichme == '1') {
					if (index == '2') {
						which = 'left'
					} else if (index == '0') {
						which = 'right'
					} else {
						which = 'self'
					}
				} else if (_this.whichme == '2') {
					if (index == '0') {
						which = 'left'
					} else if (index == '1') {
						which = 'right'
					} else {
						which = 'self'
					}
				}
				return which
			},
			// 抢地主
			need() {
				var _this = this;
				var userID = _this.userid;
				var message = {
					userId: userID,
					funcType: 1,
					msg: "0"
				}
				_this.websocket.send(JSON.stringify(message));
				_this.selfbtnmsg.isChoosebtn = true;
				_this.selfbtnmsg.isSelfTest = true;
				_this.selfbtnmsg.selfText = '抢地主';
				_this.selfbtnmsg.getbtn = false;
				_this.selfbtnmsg.getnobtn = false;
				_this.selfbtnmsg.timebtn = false;
			},
			// 不抢地主
			noNeed() {
				var _this = this;
				var userID = _this.userid;
				var message = {
					userId: userID,
					funcType: 1,
					msg: "1"
				};
				_this.websocket.send(JSON.stringify(message));
				_this.selfbtnmsg.isChoosebtn = true;
				_this.selfbtnmsg.isSelfTest = false;
				_this.selfbtnmsg.selfText = '不抢';
				_this.selfbtnmsg.getbtn = false;
				_this.selfbtnmsg.getnobtn = false;
				_this.selfbtnmsg.timebtn = false;
			},
			// 确定地主
			sureLand() {
				var _this = this;
				var userID = _this.userid;
				var which = _this.whichplay(_this.type1data.landid);
				if (which == 'self') {
					if (_this.type1data.landid == userID) {
						console.log('我是地主')
						_this.selfbtnmsg.landhead = true;
						for (var i = 0; i < _this.landlordCard.length; i++) {
							_this.palySpaper.push(_this.landlordCard[i]);
						}
					}
				} else if (which == 'left') {
					_this.leftcount = parseInt(_this.palyLpaper.length) + 3;
					_this.leftbtnmsg.landhead = true;
				} else {
					_this.rightcount = parseInt(_this.palyRpaper.length) + 3;
					_this.rightbtnmsg.landhead = true;
				}
				console.log('加倍开始')
				_this.leftbtnmsg.leftText = '';
				_this.selfbtnmsg.selfText = '';
				_this.rightbtnmsg.rightText = '';
				// _this.coutdown('all', 2); //开启加倍倒计时
				// _this.selfbtnmsg.timebtn = true;
				// _this.selfbtnmsg.doublenobtn = true;
				// _this.selfbtnmsg.doublebtn = true;
				// _this.leftbtnmsg.timebtn = true;
				// _this.rightbtnmsg.timebtn = true;



			},
		
		
		
		
		
			// 不加倍
			nodouble() {
				var _this = this;
				var userID = _this.userid;
				var message = {
					userId: userID,
					funcType: 2,
					msg: "1"
				};
				_this.websocket.send(JSON.stringify(message));
				_this.selfbtnmsg.isChoosebtn = true;
				_this.selfbtnmsg.isSelfTest = false;
				_this.selfbtnmsg.selfText = '不加倍';
				_this.selfbtnmsg.doublenobtn = false;
				_this.selfbtnmsg.doublebtn = false;
				_this.selfbtnmsg.timebtn = false;
			},

			// 加倍
			double() {
				var _this = this;
				var userID = _this.userid;
				var message = {
					userId: userID,
					funcType: 2,
					msg: "0"
				};
				_this.websocket.send(JSON.stringify(message));
				_this.selfbtnmsg.isChoosebtn = true;
				_this.selfbtnmsg.isSelfTest = false;
				_this.selfbtnmsg.selfText = '加倍';
				_this.selfbtnmsg.doublenobtn = false;
				_this.selfbtnmsg.doublebtn = false;
				_this.selfbtnmsg.timebtn = false;
			},
			// 选择牌
			checkCard(item, index) {
				// 选择牌
				this.palySpaper[index].checked = !this.palySpaper[index].checked;
			},
			
			// 出牌
			showcard() {
				var _this = this;
				_this.checkcard = true;
				_this.chooseArray = [];
				var newarry = _this.palySpaper;
				var reloadarry = []
				if (_this.hintcard.length > 0) {
					for (var index in _this.palySpaper) {
						if (_this.palySpaper[index].checked) {
							_this.chooseArray.push(_this.palySpaper[index]);
						} else {
							reloadarry.push(_this.palySpaper[index])
						}
					}
					_this.chooseArray = _this.hintcard;
					_this.palySpaper = reloadarry;
					_this.sendBtn = false;
				} else {
					var checkd = []
					for (var index in _this.palySpaper) {
						if (_this.palySpaper[index].checked) {
							checkd.push(_this.palySpaper[index]);
						} else {
							reloadarry.push(_this.palySpaper[index])
						}
					}
					var result = _this.judgeCards(checkd);
					var last = _this.judgeCards(_this.testcard);
					if (result) {
						var follow = _this.follow(last, result);
						if (follow) {
							_this.chooseArray = checkd
							_this.palySpaper = reloadarry;
							_this.sendBtn = false;
						} else {
							_this.chooseArray = [];
							_this.showmark = true;
							_this.markmsg = '你出的牌不符合规则'
			
							setTimeout(function() {
								_this.showmark = false;
								_this.sendTime = 5;
								_this.markmsg = ''
							}, 1000);
						}
					} else {
						_this.chooseArray = [];
						_this.showmark = true;
						_this.markmsg = '你出的牌不符合规则';
			
						setTimeout(function() {
							_this.showmark = false;
							_this.sendTime = 5;
							_this.markmsg = ''
						}, 1000);
					}
				}
			},
			
			// 不出
			sendNo() {
				// this.sendBtn = false;
				// this.nocard = false;
				// this.msg = '不出';
				// this.istext = false;
				// this.showmark = false;
				// this.checkNOtime = true;
				// this.closemsg()
			},

			// 提示
			hit() {
				var which = this.hintCards(this.testcard, this.palySpaper)
				console.log(which);
				this.palySpaper.forEach(item => {
					item.checked = false;
					this.hintcard = []
				})
				if (which) {
					for (var i = 0; i < which.length; i++) {
						for (var j = 0; j < this.palySpaper.length; j++) {
							if (which[i] == this.palySpaper[j].card && this.palySpaper[j].checked == false) {
								this.palySpaper[j].checked = true;
								this.hintcard.push(this.palySpaper[j])
								break
							}
						}
					}
				}
				if (!(this.isfirst) && !which) {
					this.isfirst = true;
					this.hit()
				}
			},


		},
		onLaunch: function() {
			// 锁定横屏
			plus.screen.lockOrientation('landscape-primary'); //锁定
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	page {
		background: url(../../static/image/bg.webp) no-repeat center;
		background-size: 100% 100%;
		height: 100%;
		width: 100%;
		font-size: .12rem;
	}


	.landlordCard image {
		width: .2rem;
		height: .3rem;
		vertical-align: top;
		margin-top: .03rem;
	}

	.landlordCard {
		background: url(../../static/image/landbg.png) no-repeat;
		background-size: 100% 100%;
		width: .96rem;
		height: .36rem;
		text-align: center;
	}

	.marl6 {
		margin-left: -0.06rem;
	}

	.startbtn image {
		width: .98rem;
		height: .43rem;
	}

	.startbtn {
		height: .43rem;
		margin-top: 0.8rem
	}

	.startbtn image {
		vertical-align: top;

	}

	.playbg {
		height: 1.4rem;
		position: relative;
		z-index: 2;
	}

	.palyL .playbg {
		margin-left: -0.2rem
	}

	.palyL {
		position: absolute;
		top: .6rem;
		left: .5rem;
		height: 1.4rem;
		overflow: hidden;
		width: 2rem;
	}

	.beans {
		margin-left: .22rem
	}

	.beans image {
		width: .18rem;
		height: .15rem;
		margin-right: 0.08rem;
	}

	.cardnum {
		width: .2rem;
		height: .3rem;
		background: #3d679f;
		border: 1px solid #fff;
		display: flex;
		align-items: center;
		color: #fff;
		justify-content: center;
	}

	.playmsg {
		color: #fff;
		background: url(../../static/image/left.png) no-repeat;
		margin-right: .33rem;
		background-size: 100% 100%;
		padding: 0.01rem .2rem;
	}

	.palyL .playmsg,
	.palyR .playmsg {
		height: 0.42rem;
	}

	.palyL .playlever,
	.palyR .playlever {
		margin-top: -.05rem
	}

	.palyS .playlever {
		margin-top: -0.05rem;
		margin-left: 0.3rem;
	}

	.palyS .playmsg {
		margin-right: 0;
		margin-bottom: .05rem;
		background: url(../../static/image/self.png) no-repeat;
		height: .2rem;
		background-size: 100% 100%;
	}

	.palyR .playmsg {
		background: url(../../static/image/right.png) no-repeat;
		margin-right: 0;
		margin-left: .33rem;
	}

	.playlevel {
		background: url("../../static/image/level.png") no-repeat;
		background-size: 100% 100%;
		width: .66rem;
		height: .3rem;
		margin-right: .07rem;
	}

	.headimg {
		position: absolute;
		top: 0;
		left: .3rem;
		width: 1.22rem;
		height: 1.4rem;
		z-index: 1;

	}

	.palyS .headimg,
	.palyS .playbg {
		height: 1.56rem;
	}

	.headimg image {
		width: 1.22rem;
		height: 1.56rem;
	}

	.palyR .headimg image {
		transform: rotateY(180deg)
	}

	.palyR {
		position: absolute;
		top: .6rem;
		right: .3rem;
		overflow: hidden;
		height: 1.4rem;
	}

	.mymsg {
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.beansdetail {
		color: #fff;
		background: rgba(0, 0, 0, .2);
		border-radius: 10rem;
		width: 1.04rem;
		margin-bottom: .06rem;
		margin-left: .1rem;
	}

	.beansdetail .dou {
		width: .27rem;
		height: .23rem
	}

	.beansdetail .add {
		width: .25rem;
		height: .25rem
	}

	.paperCenter {
		position: absolute;
		left: 50%;
		top: 20%;
		transform: translateX(-50%);
		text-align: center;
	}


	/* 	.paperCenter .papermove{
		z-index:2
	} */
	.paperCenter .paper,
	.paperCenter .papermove {
		width: 0.5rem;
		height: 0.8rem;
		/* position: relative; */
	}

	/* .paperCenter .paper{
		width:0.6rem;
		height:0.9rem;
	} */
	.list-enter-active,
	.list-leave-active {
		transition: 1s;
	}

	.list-enter-active {
		opacity: 0.9;
	}

	.list-leave-to {
		opacity: 1;
	}

	.bounce1-enter-active {
		animation: bounce1-in .2s ease-out;
	}

	.bounce1-leave-active {
		animation: bounce1-in .2s ease-out;
	}

	.bounce2-enter-active {
		animation: bounce2-in .2s ease-out;
	}

	.bounce2-leave-active {
		animation: bounce2-in .2s ease-out;
	}

	.bounce3-enter-active {
		animation: bounce3-in .2s ease-out;
	}

	.bounce3-leave-active {
		animation: bounce3-in .2s ease-out;
	}

	.papermove {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	/* 发牌时的动画过渡 */

	/* 玩家-左 */
	@keyframes bounce1-in {
		0% {
			transform: translate(0, -50%) scale(1, 1);
		}

		20% {

			transform: translate(-50%, -50%) scale(1.2, 1.2);

		}

		100% {
			transform: translate(-400%, -50%) scale(1, 1);
		}
	}

	/* 玩家-我 */
	@keyframes bounce2-in {
		0% {
			transform: translate(-50%, 0) scale(1, 1);
		}

		20% {
			transform: translate(-50%, 60%) scale(1.2, 1.2);
		}

		100% {
			transform: translate(-50%, 100%) scale(1, 1);
		}
	}

	/* 玩家-右 */
	@keyframes bounce3-in {

		0% {
			transform: translate(0, -50%) scale(1, 1);

		}

		20% {
			transform: translate(50%, -50%) scale(1.2, 1.2);
		}

		100% {
			transform: translate(400%, -50%) scale(1, 1);
		}
	}

	.mycarlist {
		margin-top: -.15rem;
		z-index: 3;
		position: absolute;
		left: 50%;
		bottom: .18rem;
		width: 85%;
		margin-left: -55%;
		height: 1.35rem;
		padding-left: 20%;
	}


	@media screen and (max-width: 736px) {
		.mycarlist {
			margin-left: -51%;
			width: 80%;
		}
	}

	.card {
		width: .78rem;
		height: 1rem;
		position: relative;
		margin-left: -0.55rem;
		margin-top: 0.19rem;
	}

	.card image {
		width: .78rem;
		height: 1rem;
	}

	.doublemsg {
		position: fixed;
		bottom: .04rem;
		right: .45rem;
	}

	.doubleimg {
		width: .23rem;
		height: .23rem;
	}

	.double {
		width: .88rem;
		height: .23rem;
		background: rgba(0, 0, 0, .2);
		border-radius: 1rem;
		color: #fff;
		text-align: center;
	}

	.chat image {
		width: .73rem;
		height: .22rem
	}

	.chat {
		margin-left: .45rem;
	}

	.double:before {
		content: '';
		background: url(../../static/image/double.png) no-repeat;
		width: .23rem;
		height: .23rem;
		background-size: 100% 100%;
		position: absolute;
		left: 0;
		top: 0;
	}

	.noGrad image,
	.grabCard image {
		width: .8rem;
		height: .35rem
	}

	.countDown text {
		font-size: .16rem;
		color: #DB4A00;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.countDown {
		position: relative;
		margin: 0 .1rem;
	}

	.countDown image {
		width: .4rem;
		height: .47rem;
	}

	.nopaper image,
	.hit image,
	.surePaper image {
		width: .8rem;
		height: .35rem
	}

	.mybox {
		text-align: center;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -40%)
	}

	.mybox .card,
	.mybox .card image {
		width: .4rem;
		height: .6rem;
	}

	.mybox .card {
		margin-left: -.25rem
	}

	.cardnormal .card {
		float: left;
	}

	.paperbox {
		width: 0.5rem;
		height: 0.8rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		/* z-index: 2; */
	}

	.paperlist {
		margin-top: 0.9rem;
	}


	.landhead {
		position: absolute;
		top: 0;
		right: 0;
	}

	.palyS .landhead {
		top: -0.2rem;
	}

	.palyL .landhead {
		right: .3rem;
	}

	.landhead image {
		width: .35rem;
		height: .39rem;
	}

	.palyR .landhead {
		left: 0;
	}

	.msgbox text {
		font-size: .26rem;
		font-weight: bold;
		font-style: italic;
	}

	.msgbox text.istext {
		color: #f3cb47
	}

	.msgbox text.notext {
		color: #79ac4e
	}

	.grabCardbox {
		display: inline-block;
	}

	.bigdouble {
		margin-right: .1rem
	}

	.nocard image {
		width: .8rem;
		height: .35rem
	}

	.hit {
		margin-left: .1rem;
	}

	.mark {
		position: fixed;
		bottom: .35rem;
		left: 0;
		width: 100%;
		height: 1.16rem;
		display: table;
		text-align: center;
	}

	.mark text {
		display: table-cell;
		vertical-align: middle;
		color: #f3e6ac;
		padding-top: .30rem;
		font-size: .2rem;
		font-family: cursive;
		font-weight: bold;
		background: rgba(0, 0, 0, .3);
	}

	/* 地主牌展示 */
	.landlordCard .card {
		float: left;
		margin-right: .2rem;
	}

	.palyLbox.mybox {
		top: .85rem;
		left: 2.3rem;
		transform: translate(0, 0);
	}

	.palyRbox.mybox {
		top: .85rem;
		right: 2.4rem;
		transform: translate(0, 0);
	}

	.palyLbox .cardlist,
	.palyRbox .cardlist {
		max-width: 1.6rem;
	}


	/* 公用 */
	.clearfix:after {
		content: ".";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}

	.clearfix {
		*zoom: 1;
	}

	.hidden {
		display: none !important
	}

	.fl {
		float: left
	}

	.fr {
		float: right
	}

	/* flex */
	.flex {
		display: -webkit-flex;
		display: flex;
	}

	.juscon-start {
		justify-content: flex-start
	}

	.juscon-end {
		justify-content: flex-end
	}

	.juscon-center {
		justify-content: center
	}

	.juscon-between {
		justify-content: space-between
	}

	.juscon-around {
		justify-content: space-around;
	}

	.alignitem-start {
		align-items: start
	}

	.alignitem-center {
		align-items: center
	}

	.alignitem-end {
		align-items: flex-end
	}

	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 0.5rem;
	}

	.pos-r {
		position: relative
	}


	/* 测试按钮 */
	.testsend {
		position: fixed;
		top: 0;
		left: 0;
	}
</style>
