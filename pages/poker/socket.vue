<template>
	<view class="content">

		<view class="testsend">
			<input type="text" v-model='selfuserid' style="color:#fff;border:1px solid #f00" />
			<input type="text" v-model='selfToken' style="color:#fff;border:1px solid #f00" />
		</view>


		<view class="topbox">
			<!-- 返回 -->
			<view class="back" @tap='back()'>
				<image src="../../static/image/back.png"></image>
			</view>

		</view>
		<!-- 左玩家 -->
		<view class="palyL palybox" v-show='playmsgshow'>

			<view class="headimg flex juscon-center alignitem-center">
				<image :src="playleft.avatar" mode=""></image>
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
							<text>{{playleft.point | pointFilter}}</text>
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
			<!-- gif区域 -->
			<view class="gifbox" v-show='leftbtnmsg.showgif'>
				<image :src="girsrc" mode=""></image>
			</view>
			<view class="cardlist clearfix cardnormal cardshowlist">

				<view class="card big cardwrap big-card" v-for='(item,index) in leftbtnmsg.leftChoose' :key="index" :style="cardleft(item,index,'left')">
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
		<view class="palyS palybox " v-show='playmsgshow'>

			<view class=" palybox mybox ">
				<!-- 信息展示 -->
				<view class="msgbox">
					<text v-if='selfbtnmsg.isSelfTest' class="istext">{{selfbtnmsg.selfText}}</text>
					<text v-else class="notext">{{selfbtnmsg.selfText}}</text>
				</view>
				<!-- 出牌展示区 -->
				<!-- gif区域 -->
				<view class="gifbox" v-show='selfbtnmsg.showgif'>
					<image :src="girsrc" mode=""></image>
				</view>
				<view class="cardlist clearfix cardnormal cardshowlist flex juscon-center">

					<view class="card big cardwrap big-card" v-for='(item,index) in selfbtnmsg.SelfChoose' :key="index" :style="mycardleft(item,index)">
						<image :src="item.src" mode=""></image>
					</view>
				</view>

				<!-- 按钮 -->
				<view class="grabCardbox flex alignitem-center juscon-center clearfix">

					<!-- 不出 -->
					<view class="nopaper selfbtn" @tap='sendNo()' v-show='selfbtnmsg.canclebtn'>
						<image src="../../static/image/cancle.png" mode=""></image>
					</view>
					<!-- 提示 -->
					<view class="hit selfbtn" @tap='hit()' v-show='selfbtnmsg.hitbtn'>
						<image src="../../static/image/hit.png" mode=""></image>
					</view>
					<!-- 倒计时 -->
					<view class="countDown selfbtn" v-show='selfbtnmsg.timebtn'>
						<view class="">
							<image src="../../static/image/time.png" mode=""></image>
							<text>{{selfbtnmsg.selfTime}}</text>
						</view>
					</view>

					<!-- 出牌 -->
					<view class="surePaper selfbtn" @tap='showcard()' v-show='selfbtnmsg.sendbtn'>
						<image src="../../static/image/sendpaper.png" mode=""></image>
					</view>
					<!-- 要不起 -->
					<view class="nocard selfbtn" @tap='affordNo()' v-show='selfbtnmsg.nobtn'>
						<image src="../../static/image/nobig.png" mode=""></image>
					</view>
				</view>

			</view>

			<view class="flex  juscon-between alignitem-start mymsg">
				<view class="pos-r">
					<view class="playbg flex alignitem-end">
						<view class="flex flex juscon-start">
							<view class="headimg flex juscon-center alignitem-center">
								<image :src="playself.avatar" mode=""></image>
							</view>
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
								<text>{{playself.point | pointFilter}}</text>
								<image src="../../static/image/add.png" class="add"></image>
							</view>
						</view>
					</view>
				</view>

			</view>
			<!-- 牌列表展示 -->
			<view class="cardlist  cardnormal mycarlist flex juscon-center">
				<view class="clearfix mycardbox">
					<view class="card big cardwrap big-card" v-for='(item,index) in palySpaper' :key="index" :style="mycardleft(item,index)">
						<img :src="item.src" :cid="item.cardId" @tap='checkCard(item,index)' @touchstart="bodyTouchStart" @touchmove="bodyTouchMove"
						 @touchend="bodyTouchEnd">
						</img>
					</view>
				</view>

				<view class="mark" v-show='showmark'>
					<text>{{markmsg}}</text>
				</view>
			</view>

		</view>

		<!-- 右玩家 -->
		<view class="palyR palybox" v-show='playmsgshow'>

			<view class="headimg flex juscon-center alignitem-center">
				<image :src="playright.avatar" mode=""></image>
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
							<text>{{playright.point | pointFilter}}</text>
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
			<!-- gif区域 -->
			<view class="gifbox" v-show='rightbtnmsg.showgif'>
				<image :src="girsrc" mode=""></image>
			</view>
			<view class="cardlist clearfix cardnormal cardshowlist flex juscon-end">

				<view class="card big cardwrap big-card" v-for='(item,index) in rightbtnmsg.rightChoose' :key="index" :style="cardleft(item,index,'right')">
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

		</view>
		<view class="startbtn" @tap="startGame()" v-show='startbtn'>
			<image src="../../static/image/start.png" mode=""></image>
		</view>

		<view class="waiting" v-show='waiting'>
			<text>正在等待伙伴加入...({{waitTime}}s)</text>
		</view>
		<!-- 输赢界面 -->
		<view class="accountbox" v-if="accountRes" :class="isWin ? `win` : `lose`">
			<!-- 豆子不够提示退出房间 -->
			<view class="noEnoughbox" v-show='isNoenough'> 
				<view class="noEnough" >
					<text>豆子不够了，退出房间！</text>
					<image src="../../static/image/sure.png" mode="" @tap="back()"></image>
				</view>
			</view>
			
			<!-- 背景部分 -->
			<div class="account-bg">
			</div>
			<view class="back" @tap='back()'>
				<image src="../../static/image/back.png"></image>
			</view>
			<view class="roomBtn flex juscon-around alignitem-center">
				<image src="../../static/image/change.png" class="changeDesk" @tap='changeDesk()'></image>
				<image src="../../static/image/award.png" class="award"></image>
			</view>
			<view class="settleBox">
				<!-- 头像部分 -->
				<div class="avatar flex juscon-center">
					<div class="avatar-img">
						<img src="../../static/image/head.png" alt="" />
					</div>
					<div class="level-share">
						<div class="avatar-level">
							<img src="../../static/image/level.png" alt="" />
							<span>LV{{playself.level}}</span>
						</div>
						<div class="share-btn">
							<img src="../../static/image/share.png" alt="" />
						</div>
					</div>
				</div>

				<!-- 结算表格部分 -->
				<div class="account-table">
					<ul class="table-head">
						<li class="nickname">昵称</li>
						<li class="multiple">倍数</li>
						<li class="money">金豆</li>
					</ul>
					<div class="table-body">
						<!-- 我 -->
						<ul class='selfmsgbox'>
							<li class="nickname flex juscon-center alignitem-center">
								<p class="ellipsis">{{playself.nickname}}</p>
								<view class="addfriend"></view>
							</li>
							<li class="multiple">{{double}}</li>
							<li class="money">{{selfmoney}}</li>
						</ul>
						<!-- 左 -->
						<ul>
							<li class="nickname flex juscon-center alignitem-center">

								<p class="ellipsis">{{playleft.nickname}}</p>
								<view class="addfriend" v-if='leftbtnmsg.isFriend'></view>
								<view class="flex juscon-center alignitem-center" @tap='addFriend(playleft.userid)' v-else>
									<img src="../../static/image/addfriend.png" alt="" class="addfriend" />
								</view>

							</li>
							<li class="multiple">{{double}}</li>
							<li class="money">{{leftmoney}}</li>
						</ul>
						<!-- 右 -->
						<ul>
							<li class="nickname flex juscon-center alignitem-center">
								<p class="ellipsis">{{playright.nickname}}</p>
								<view class="addfriend" v-if='rightbtnmsg.isFriend'></view>
								<view class="flex juscon-center alignitem-center" @tap='addFriend(playright.userid)' v-else>
									<img src="../../static/image/addfriend.png" alt="" class="addfriend" />
								</view>
							</li>
							<li class="multiple">{{double}}</li>
							<li class="money">{{rightmoney}}</li>
						</ul>
					</div>
				</div>

			</view>


			<div class="continue-btn" @tap="continueGame">
				<p>继续游戏 ({{waitTimeContine}}s)</p>
			</div>
		</view>
	</view>
</template>


<script>
	import uniList from '../../components/uni-list/uni-list.vue'
	import uniListItem from '../../components/uni-list-item/uni-list-item.vue'
	import io from '@/node_modules/weapp.socket.io/lib/weapp.socket.io.js'
	import {
		requestUrl
	} from "../../util/common.js";
	export default {
		data() {
			return {
				// 分牌相关
				palyL: [], //暂存左玩家分到的牌
				palyS: [], //暂存我分到的牌
				palyR: [], //暂存右玩家分到的牌
				palyLpaper: [], //用于页面中遍历的牌
				palySpaper: [],
				palyRpaper: [],
				showpaper: false, //发牌
				audio: {},
				mp3: '/static/f.mp3',
				cardslist: null, //获取所有牌信息

				//左边玩家相关  
				leftbtnmsg: {
					leftTime: 30, //倒计时 
					leftText: '', //操作文字展示
					isLeftTest: false, //确定true  否定false
					leftChoose: [], //出的牌
					timebtn: false, //是否显示倒计
					timeleft: null, //定时器名字
					isFriend: false, //是否是好友
					showgif: false, //是否显示gif
				},
				leftcount: 0, //左玩家牌数
				playleft: {}, //左边玩家信息详情

				// 自己相关
				selfbtnmsg: {
					selfTime: 30,
					selfText: '', //操作文字展示
					isSelfTest: false, //要0  不要1  超级2
					SelfChoose: [],
					timebtn: false, //是否显示倒计时
					timeSelf: null,
					nobtn: false, //要不起 4
					canclebtn: false, //不出  3
					hitbtn: false, //提示
					sendbtn: false, //出牌
					isChoosebtn: false, //是否操作
					showgif: false, //是否显示gif

				},
				playself: {}, //我的信息详情

				// 右玩家相关
				rightbtnmsg: {
					rightTime: 30,
					rightText: '',
					rightChoose: [],
					timebtn: false,
					isRightTest: false, //确定true  否定false
					timeright: null,
					isFriend: false,
					showgif: false, //是否显示gif
				},
				rightcount: 0, //右玩家牌数
				playright: {}, //右边玩家信息详情

				// 提示
				hintcard: [], //提示选中的牌
				markmsg: '',
				showmark: false,

				// 基础参数
				websocket: null,
				totalTime: 20,
				beginTime: null,
				double: 3, //--------------后台规定

				//用户相关
				selfuserid: '', //当前用户userid
				selfToken: '', //当前用户token
				whichme: '0', //self位置的index
				playmsgshow: false, //是否显示玩家
				userRecord: [], //记录进入用户的id
				usermsg: [], //暂时记录用户的信息
				isShowAni: [true, true, true],
				useridlist: [], //存储用户id数组

				// 出牌相关
				sendRecord: [], //三个用户的出牌
				playOrderCount: 0,
				lastcard: [], ///记录上一家的牌
				firstSend: '', //记录第一个出牌的id
				accountRes: false, //输赢界面显示  
				isWin: true,
				rightmoney: 0, //右玩家最后分数
				leftmoney: 0, //左玩家最后分数
				selfmoney: 0, //本玩家最后分数
				isfinish: false, //是否结束
				isboth: 0, //记录牌和用户信息是否都拿到
				startbtn: true, //是否显示开始按钮
				waiting: false, //等待匹配文字显示
				roomID: '', //房间ID
				chageTable: false, //是否换桌
				isLeave: true, //是否可以离开房间
				playOrder: [], //确认第一个出牌的人后出牌用户出牌顺序id
				firstHx: true, //用来判断是否需要首次出三红桃
				touchcard: [], //滑动选中的牌
				waitTime: 30, //开始游戏默认等待时间
				waitTimeInterval: null, //开始游戏倒计时
				waitTimeContine: 30, //继续游戏默认等待时间
				waitContinueInterval: null, //继续游戏倒计时
				isNoenough: false, //是否豆子不够扣要退出房间
				girsrc: '',

				// 测试token
				tokenlist: ['',
					'9383c08eed1644b58055c68e9341e172',
					'9383c08eed1644b58055c68e9341e177',
					'304b957948a34c4594b41f0beda38d62',
					'304b957948a34c4594b41f0beda38d86',
					'9383c08eed1644b58055c68e9341e174',
					'bf4ffbc973274308ad6312381160f697'
				]
			}
		},
		destroyed() {
			// window.addEventListener('beforeunload', e => this.back(e))
		},
		components: {
			uniList,
			uniListItem
		},
		created() {
			this.remFn(); //加载rem
			// window.addEventListener('beforeunload', e => this.back(e))
		},
		mounted() {
			window.getUserInfo = this.getUserInfo;

		},
		watch: {
			isboth() {
				if (this.isboth == 2) {
					this.setcard();
					this.waiting = false
				}
			},
			// 开始游戏等待倒计时
			waiting() {
				if (this.waiting) {
					this.waitSetinterval();
				} else {
					clearInterval(this.waitTimeInterval);
				}
			},
			// 输赢界面倒计时
			accountRes() {
				if (this.accountRes) {
					this.waitConSetinterval();
				} else {
					clearInterval(this.waitContinueInterval);
				}
			}
		},
		// 豆子显示过滤器
		filters: {
			pointFilter(value) {
				// if (!value) return "";
				if (value >= 10000) {
					return (value / 10000).toFixed(2) + `万`;
				} else {
					return value;
				}
			},
		},
		methods: {
			
			//等待超时接下来的操作
			timeOut() {
				// 直接退出房间
				this.back();

			},
			// 开始游戏等待计时
			waitSetinterval() {
				var _this = this;
				_this.waitTimeInterval = setInterval(function() {
					_this.waitTime--;
					if (_this.waitTime == 0) {
						clearInterval(_this.waitTimeInterval);
						_this.timeOut();
					}
				}, 1000);
			},
			// 继续游戏等待计时
			waitConSetinterval() {
				var _this = this;
				_this.waitContinueInterval = setInterval(function() {
					_this.waitTimeContine--;
					if (_this.waitTimeContine == 0) {
						clearInterval(_this.waitContinueInterval);
						// alert('timeout')
						_this.timeOut();
					}
				}, 1000);
			},
			bodyTouchStart(e) {
				e.preventDefault();
				this.touchcard = [];
			},
			bodyTouchMove(e) {
				e.preventDefault();
				var cardId = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY).getAttribute('cid');
				this.touchcard.push(cardId);
			},
			bodyTouchEnd(e) {
				e.preventDefault();
				var temp = []; //一个新的临时数组
				for (var i = 0; i < this.touchcard.length; i++) {
					if (temp.indexOf(this.touchcard[i]) == -1) {
						temp.push(this.touchcard[i]);
					}
				}
				for (var i = 0; i < this.palySpaper.length; i++) {
					for (var j = 0; j < temp.length; j++)
						if (this.palySpaper[i].cardId == temp[j]) {
							this.palySpaper[i].checked = !this.palySpaper[i].checked
						}
				}
				this.palySpaper = this.palySpaper.slice();
			},

			// 加好友
			addFriend(id) {
				// alert('好友id----'+id)
				H5Interactive.add_friend(id)
			},

			// 返回
			back() {
				clearInterval(this.waitTimeInterval);
				clearInterval(this.waitContinueInterval);
				// if(this.isLeave && this.websocket){
				this.websocket.close()
				// }else if(!this.websocket){
				// H5Interactive.exit_room()   //退出房间
				// // }else{
				// 	alert('不可以')
				// }

			},
			// 继续游戏
			continueGame() {
				clearInterval(this.waitContinueInterval);
				var message = {
					userId: this.selfuserid,
					funcType: 100,
					msg: "1"
				}
				this.websocket.send(JSON.stringify(message));
				this.clearall();
				var websocket = this.websocket;
				var userId = this.selfuserid;
				var userToken = this.selfToken;
				Object.assign(this.$data, this.$options.data())
				this.selfuserid = userId;
				this.selfToken = userToken;
				this.websocket = websocket;
				this.waiting = true;
				this.startbtn = false;
			},
			//换桌
			changeDesk() {
				this.isLeave = true;
				this.back();
				this.chageTable = true;
			},


			// 获取用户的id和token
			getUserInfo(str) {
				this.selfuserid = str.split(",")[0].split('=')[1];
				this.selfToken = str.split(",")[1].split('=')[1];
			},
			startGame() {
				var _this = this;
				_this.selfToken = _this.tokenlist[_this.selfuserid]; //测试用后期删除
				var usermsg = {
					userid: _this.selfuserid,
					token: _this.selfToken,
					gametype: 3
				}
				if (_this.chageTable) {
					_this.chageTable = false;
					usermsg.originalRoomId = _this.roomID;
				}
				uni.request({
					url: requestUrl.startGame,
					method: 'POST',
					data: usermsg,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						if (res.data.success) {
							_this.roomID = res.data.data.id;
							this.start();
						}
					}
				});
				this.startbtn = false;
				this.waiting = true;
			},

			start() {
				var _this = this;
				var selfuserID = _this.selfuserid;
				_this.websocket = new WebSocket(requestUrl.websocketUrl + _this.roomID + '/' + selfuserID);
				console.log(_this.websocket)
				_this.websocket.onopen = function(event) {
					console.log('连接成功');
					_this.isLeave = true;
				};
				_this.websocket.onmessage = function(event) {
					var data = JSON.parse(event.data);
					console.log(data)
					//functype 3出牌     11 第一个出牌
					if (data.funcType == 11) {
						_this.firstSend = data.userId;
					}
					// 出牌
					if (data.funcType == 3) {
						_this.grabCardlist(data.userId, data.msg);
						// msg  1不出 2要不起
						if (data.msg == 1 || data.msg == 2) {
							var whichindex = _this.playOrder.indexOf(parseInt(data.userId));
							_this.sendRecord[whichindex] = null;
						} else {
							var whichindex = _this.playOrder.indexOf(parseInt(data.userId));
							_this.sendRecord[whichindex] = JSON.parse(data.msg);

						}
					}
					// 获取到的牌信息
					if (data.card) {
						console.log(data.card)
						_this.cardslist = JSON.parse(data.card);
						_this.beginTime = _this.formatDate();
						_this.isboth++;
						_this.isLeave = false;
					}
					// 获取用户信息
					if (data.userInfo) {
						_this.isboth++;
						var infolist = JSON.parse(data.userInfo);
						for (var i = 0; i < infolist.length; i++) {
							_this.useridlist.push(infolist[i].userid);
							_this.usermsg.push(infolist[i])
						}
						// 判断当前自己进房间顺序的index值
						for (var i = 0; i < _this.useridlist.length; i++) {
							if (_this.useridlist[i] == selfuserID) {
								_this.whichme = i;
							}
						}
						// 根据位置展示信息
						if (_this.whichme == '0') {
							_this.playself = _this.usermsg[0];
							_this.playleft = _this.usermsg[2];
							_this.playright = _this.usermsg[1];

						} else if (_this.whichme == '1') {
							_this.playself = _this.usermsg[1];
							_this.playleft = _this.usermsg[0];
							_this.playright = _this.usermsg[2];
						} else if (_this.whichme == '2') {
							_this.playself = _this.usermsg[2];
							_this.playleft = _this.usermsg[1];
							_this.playright = _this.usermsg[0];
						}

						_this.setFriend(selfuserID, _this.useridlist)

					}
				};
				//连接关闭的回调方法
				_this.websocket.onclose = function(event) {
					console.log(event)
					if (event.data) {
						var data = JSON.parse(event.data);
					} else {
						var data = {
							userid: _this.selfuserid,
							token: _this.selfToken,
							gametype: 3
						}
						// 退出房间
						uni.request({
							url: requestUrl.exitRoom,
							method: 'POST',
							data: data,
							header: {
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							success: (res) => {
								if (res.data.success) {
									if (_this.chageTable) {
										var userId = _this.selfuserid;
										var userToken = _this.selfToken;
										var lastroomid = _this.roomID;
										Object.assign(_this.$data, _this.$options.data())
										_this.selfuserid = userId;
										_this.selfToken = userToken;
										_this.chageTable = true;
										_this.roomID = lastroomid;
										_this.startGame();
									} else {
										// H5Interactive.exit_room()   //退出房间
									}
								}
							}
						});
					}
				};
				_this.websocket.onerror = function(data) {
					console.log(data)
				};
			},
			// 处理好友关系是否显示加好友图标
			setFriend(selfid, idlist) {
				var _this = this;
				var data = {
					userid: parseInt(selfid),
					userids: idlist
				}
				uni.request({
					url: requestUrl.isFriend,
					method: 'POST',
					data: data,
					success: (res) => {
						console.log(res)
						if (res.data.success) {
							var ids = res.data.data;
							console.log(ids)
							if (ids.length > 0) {
								for (var i = 0; i < ids.length; i++) {
									var which = _this.whichplay(ids[i]);
									if (which == 'left') {
										_this.leftbtnmsg.isFriend = true;
									} else if (which == 'right') {
										_this.rightbtnmsg.isFriend = true;
									}
								}
							}
						}
					}
				});
			},
			// 判断当前是否上两家都不出
			isReturn(id) {
				var count = 0;
				var result = false;
				var index = this.playOrder.indexOf(parseInt(id));
				var arr = [1, 0, 2, 1];
				var arrCir = arr.slice(2 - index, 2 - index + 2);
				for (var i = 0; i < arrCir.length; i++) {
					if (!this.sendRecord[arrCir[i]]) {
						count++;
					}
				}
				if (this.sendRecord.length < 1 || count == 2) {
					result = true;
				}

				return result
			},

			// 出牌显示
			grabCardlist(id, msg) {
				var _this = this;
				var which = _this.whichplay(id);
				var index = _this.playOrder.indexOf(parseInt(id));
				var selfuserID = _this.selfuserid;
				var gif='';
				if (msg == 1) {
					var myaudio = new Audio();
					myaudio.src = '/static/audio/pass.mp3';
					myaudio.play();
					gif= '';
				} else if (msg == 2) {
					var myaudio = new Audio();
					myaudio.src = '/static/audio/pass2.mp3';
					myaudio.play();
					gif = '';
				} else {
					var result = _this.judgeCards(JSON.parse(msg));
					console.log(result)
					switch (result.cardKind) {
						// 单张
						case 'ONE':
							var myaudio = new Audio();
							myaudio.src = '/static/audio/' + result.val + '.mp3';
							myaudio.play();
							gif = '';
							break;

							// 对子
						case 'PAIRS':
							var myaudio = new Audio();
							myaudio.src = '/static/audio/pairs' + result.val + '.mp3';
							myaudio.play()
							gif = '/static/image/gif/PAIRS.gif';
							break;
							// 顺子
						case 'PROGRESSION':
							var myaudio = new Audio();
							myaudio.src = '/static/audio/PROGRESSION.mp3';
							myaudio.play();
							gif = '/static/image/gif/PROGRESSION.gif';
							break;
							//三不带
						case 'THREE':
							var myaudio = new Audio();
							myaudio.src = '/static/audio/THREE.mp3';
							myaudio.play();
							gif = '/static/image/gif/THREE.gif';
							break;
							//炸弹
						case 'BOMB':
							var myaudio = new Audio();
							myaudio.src = '/static/audio/BOMB.mp3';
							myaudio.play();
							gif= '/static/image/gif/BOMB.gif';
							break;
							//王炸
						case 'KINGBOMB':
							var myaudio = new Audio();
							myaudio.src = '/static/audio/KINGBOMB.mp3';
							myaudio.play();
							gif = '/static/image/gif/BOMB.gif';
							break;
							//三带一
						case 'THREE_ONE':
							var myaudio = new Audio();
							myaudio.src = '/static/audio/THREE_ONE.mp3';
							myaudio.play();
							gif = '/static/image/gif/THREE_ONE.gif';
							break;
							//三带二
						case 'THREE_TWO':
							var myaudio = new Audio();
							myaudio.src = '/static/audio/THREE_TWO.mp3';
							myaudio.play();
							gif = '/static/image/gif/THREE_TWO.gif';
							break;
							//四带二
						case 'FOUR_TWO':
							var myaudio = new Audio();
							myaudio.src = '/static/audio/FOUR_TWO.mp3';
							myaudio.play();
							gif = '/static/image/gif/FOUR_TWO.gif';
							break;
							//四带二对
						case 'FOUR_PAIRS':
							var myaudio = new Audio();
							myaudio.src = '/static/audio/FOUR_TWO.mp3';
							myaudio.play();
							gif = '/static/image/gif/FOUR_TWO.mp3.gif';
							break;
							//连对
						case 'PROGRESSION_PAIRS':
							var myaudio = new Audio();
							myaudio.src = '/static/audio/PROGRESSION_PAIRS.mp3';
							myaudio.play();
							gif = '/static/image/gif/PROGRESSION_PAIRS.gif';
							break;

							//飞机
						case 'PLANE':
							var myaudio = new Audio();
							myaudio.src = '/static/audio/PLANE.mp3';
							myaudio.play();
							gif = '/static/image/gif/PLANE.gif';
							break;
							//飞机带单
						case 'PLANE_ONE':
							var myaudio = new Audio();
							myaudio.src = '/static/audio/PLANE.mp3';
							myaudio.play();
							gif = '/static/image/gif/PLANE.gif';
							break;
							//飞机带双
						case 'PLANE_PAIRS':
							var myaudio = new Audio();
							myaudio.src = '/static/audio/PLANE.mp3';
							myaudio.play();
							gif = '/static/image/gif/PLANE.gif';
							break;
						default:
							gif = '';

					}
				}

				if (which == 'left') {
					clearInterval(_this.leftbtnmsg.timeleft);
					_this.leftbtnmsg.timebtn = false;
					_this.leftbtnmsg.showgif = false;
					if (msg == 1) {
						_this.leftbtnmsg.isLeftTest = false;
						_this.leftbtnmsg.leftText = '不出';
						_this.sendRecord[index] = null;
					} else if (msg == 2) {
						_this.leftbtnmsg.isLeftTest = false;
						_this.leftbtnmsg.leftText = '要不起';
						_this.sendRecord[index] = null;
					} else {
						if(gif!=''){
							_this.girsrc=gif+'?time='+Date.parse(new Date());
							_this.leftbtnmsg.showgif = true;
							setTimeout(function() {
								_this.girsrc = '../../static/image/null.png?time='+Date.parse(new Date());
								_this.leftbtnmsg.showgif = false;
								
							}, 1100)
						}
					
						var cards = JSON.parse(msg);
						_this.leftbtnmsg.leftChoose = _this.sortCard(cards).reverse();
						_this.sendRecord[index] = cards;
						_this.leftcount = _this.leftcount - parseInt(cards.length);
						if (_this.leftcount == 0) {
							_this.finish(id);
							_this.clearall();
							_this.isfinish = true;
						}
					}
				} else if (which == 'right') {
					_this.rightbtnmsg.showgif = false;
					clearInterval(_this.rightbtnmsg.timeright);
					_this.rightbtnmsg.timebtn = false;
					if (msg == 1) {
						_this.rightbtnmsg.isRightTest = false;
						_this.rightbtnmsg.rightText = '不出';
						_this.sendRecord[index] = null;
					} else if (msg == 2) {
						_this.rightbtnmsg.isRightTest = false;
						_this.rightbtnmsg.rightText = '要不起';
						_this.sendRecord[index] = null;
					} else {
						if(gif!=''){
							_this.girsrc=gif+'?time='+Date.parse(new Date());
							_this.rightbtnmsg.showgif = true;
							
							setTimeout(function() {
								_this.girsrc = '../../static/image/null.png?time='+Date.parse(new Date());
								_this.rightbtnmsg.showgif = false;
								
							}, 1100)
						}
						var cards = JSON.parse(msg);
						_this.rightbtnmsg.rightChoose = _this.sortCard(cards).reverse();
						_this.sendRecord[index] = cards;
						_this.rightcount = _this.rightcount - (cards.length);
						if (_this.rightcount == 0) {
							_this.finish(id);
							_this.clearall();
							_this.isfinish = true;
						}
					}
				} else {
					if(msg==1||msg==2){
						_this.selfbtnmsg.showgif = false;
						
					}else{
						if(gif != ''){
							_this.girsrc=gif+'?time='+Date.parse(new Date());
							_this.selfbtnmsg.showgif = true;
							
							setTimeout(function() {
								_this.girsrc = '../../static/image/null.png?time='+Date.parse(new Date());
								_this.selfbtnmsg.showgif = false;
							}, 1100)
						}
					}
					if (_this.palySpaper.length == 0) {
						_this.finish(id);
						_this.clearall();
						_this.isfinish = true;
					}
				}

				_this.playOrderCount++;
				var nextindex = _this.playOrderCount % 3;
				var indexId = _this.playOrder[nextindex];
				var which = _this.whichplay(indexId);
				if (!_this.isfinish) {
					if (which == 'left') {
						_this.leftTimeDown();
					} else if (which == 'self') {
						_this.selfTimeDown();

					} else {
						_this.rightTimeDown()
					}
				}
			},
			// 修改牌的属性
			setcard() {
				var _this = this;
				var allcard, imgsrc;
				// 处理后台返回的数据
				for (var v in _this.cardslist) {
					var nowdata = _this.cardslist[v];
					for (var i = 0; i < nowdata.length; i++) {
						var card;
						if (nowdata[i].num == 3 && nowdata[i].color == 'hx') {
							_this.firstSend = v;
							var message = {
								userId: v,
								funcType: 11, //确定第一个出的人
								msg: '1'
							};
							_this.websocket.send(JSON.stringify(message));

						}
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
						nowdata[i].cardId = card + '-' + nowdata[i].color;
					}
				}
				_this.disposecard()
			},
			//整理后台返回数据，并给用户排位置
			disposecard() {
				var _this = this;
				var userlist = [];
				for (var v in _this.cardslist) {
					var user = {
						userid: v,
						cardlist: _this.cardslist[v]
					}
					userlist.push(user)
				}
				//根据userid排座位
				if (_this.whichme == '0') {
					_this.palyS = userlist[0].cardlist;
					_this.palyL = userlist[2].cardlist;
					_this.palyR = userlist[1].cardlist;

				} else if (_this.whichme == '1') {
					_this.palyS = userlist[1].cardlist;
					_this.palyL = userlist[0].cardlist;
					_this.palyR = userlist[2].cardlist;
				} else if (_this.whichme == '2') {
					_this.palyS = userlist[2].cardlist;
					_this.palyL = userlist[1].cardlist;
					_this.palyR = userlist[0].cardlist;
				}
				_this.sendpaper();
			},
			// 发牌
			sendpaper() {
				this.playmsgshow = true;
				this.showpaper = true;
				let nowCardLength = 0; //当前发出的牌的张数
				//创建音频
				this.audio = new Audio();
				this.audio.src = this.mp3;
				this.audio.loop = true;
				// 播放音频
				this.audio.play();
				// 发牌定时器
				let timer = setInterval(() => {

					// 牌发完，定时器关闭
					if (nowCardLength >= 47) { //
						clearInterval(timer);
						this.showpaper = false;
						this.startFirst();
						this.audio.pause();
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
			//找出有3红桃的人并开始出牌
			startFirst() {
				var which = this.whichplay(this.firstSend);
				if (which == 'left') {
					this.leftTimeDown()
				} else if (which == 'right') {
					this.rightTimeDown()
				} else {
					this.selfTimeDown()
				}

				//确认第一个人后改变出牌顺序
				this.changePlayOrder()
			},
			// 改变当前自己牌的堆叠位置
			mycardleft(item, index) {
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
			cardleft(item, index, which) {
				var marginL, marginT;
				if (item.checked) {
					marginT = '0'
				}
				if (index >= 7) {
					marginT = '-.35rem';
				}

				if (index == 0 || index == 7) {
					marginL = '0';
				}
				if (which == 'right') {
					if (index >= 7) {
						marginT = '.45rem';
					}
					if (index == 7) {
						marginL = '-1.3rem';
					}
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

			// 左玩家倒计时
			leftTimeDown() {
				var _this = this;
				clearInterval(_this.leftbtnmsg.timeleft);
				_this.leftbtnmsg.leftChoose = [];
				_this.leftbtnmsg.timebtn = true;
				_this.leftbtnmsg.leftText = '';
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
			selfTimeDown() {
				var _this = this;
				clearInterval(_this.selfbtnmsg.timeSelf);
				_this.selfbtnmsg.selfText = '';
				_this.selfbtnmsg.timebtn = true;
				_this.selfbtnmsg.selfTime = _this.totalTime;
				_this.selfbtnmsg.isChoosebtn = false;
				var selfuserID = _this.selfuserid;
				_this.palySpaper.forEach(item => {
					item.isHint = true;
				})
				_this.palySpaper = _this.palySpaper.slice();

				_this.selfbtnmsg.SelfChoose = [];
				var userID = _this.selfuserid;
				var lastcard = _this.getlastCard(userID);
				var which = _this.hintCards(lastcard, _this.palySpaper);
				_this.palySpaper.forEach(item => {
					item.isHint = true;
				})
				_this.palySpaper = _this.palySpaper.slice();
				if (which) {
					_this.selfbtnmsg.hitbtn = true;
					_this.selfbtnmsg.canclebtn = true;
					_this.selfbtnmsg.sendbtn = true;
					if (_this.isReturn(selfuserID)) {
						_this.selfbtnmsg.canclebtn = false;
					}
				} else {
					if (lastcard.length > 0) {
						_this.selfbtnmsg.nobtn = true;
					}
				}

				_this.selfbtnmsg.timeSelf = setInterval(function() {
					_this.selfbtnmsg.selfTime--;
					if (_this.selfbtnmsg.selfTime == 0) {
						clearInterval(_this.selfbtnmsg.timeSelf);
						if (!_this.selfbtnmsg.isChoosebtn) {
							_this.sendTimeOut();
							_this.selfbtnmsg.timebtn = false;
						}
					}
				}, 1000);
			},
			// 右玩家倒计时
			rightTimeDown() {
				var _this = this;
				clearInterval(_this.rightbtnmsg.timeright);
				_this.rightbtnmsg.rightText = '';
				_this.rightbtnmsg.timebtn = true;
				_this.rightbtnmsg.rightChoose = [];
				_this.rightbtnmsg.rightTime = _this.totalTime;
				_this.rightbtnmsg.timeright = setInterval(function() {
					_this.rightbtnmsg.rightTime--;
					if (_this.rightbtnmsg.rightTime == 0) {
						clearInterval(_this.rightbtnmsg.timeright);
						_this.rightbtnmsg.timebtn = false
					}
				}, 1000);
			},
			// 清楚所有定时器和显示文字
			clearall() {
				clearInterval(this.leftbtnmsg.timeleft);
				this.leftbtnmsg.timebtn = false;
				clearInterval(this.rightbtnmsg.timeright);
				this.rightbtnmsg.timebtn = false;
				clearInterval(this.selfbtnmsg.timeSelf);
				this.selfbtnmsg.timebtn = false;
				this.rightbtnmsg.rightText = '';
				this.selfbtnmsg.selfText = '';
				this.leftbtnmsg.leftText = '';
			},
			// 判断当前是哪个用户的操作
			whichplay(id) {
				var _this = this;
				var index = _this.useridlist.indexOf(parseInt(id));
				var which = '';
				if (_this.whichme == '0') {
					if (index == '1') {
						which = 'right'
					} else if (index == '2') {
						which = 'left'
					} else {
						which = 'self'
					}

				} else if (_this.whichme == '1') {
					if (index == '2') {
						which = 'right'
					} else if (index == '0') {
						which = 'left'
					} else {
						which = 'self'
					}
				} else if (_this.whichme == '2') {
					if (index == '0') {
						which = 'right'
					} else if (index == '1') {
						which = 'left'
					} else {
						which = 'self'
					}
				}
				return which
			},
			//改变出牌顺序
			changePlayOrder() {
				var index = this.useridlist.indexOf(parseInt(this.firstSend));
				this.playOrder = this.useridlist.slice(index).concat(this.useridlist.slice(0, index));

			},

			// 选择牌
			checkCard(item, index) {
				this.palySpaper[index].checked = !this.palySpaper[index].checked;
				this.palySpaper = this.palySpaper.slice();
			},



			// 出牌
			showcard() {
				var _this = this;
				_this.selfbtnmsg.SelfChoose = [];

				var userID = _this.selfuserid;
				var reloadarry = [];
				var checkdlist = [];
				var chageindex = _this.playOrder.indexOf(parseInt(userID));
				// 获取所有选中的牌
				for (var index in _this.palySpaper) {
					if (_this.palySpaper[index].checked) {
						checkdlist.push(_this.palySpaper[index]);
					} else {
						reloadarry.push(_this.palySpaper[index])
					}
				}
				if (checkdlist.length > 0) {
					var result = _this.judgeCards(checkdlist);
				} else {
					_this.showmark = true;
					_this.markmsg = '请选择要出的牌'
					setTimeout(function() {
						_this.showmark = false;
						_this.markmsg = ''
					}, 1000);
					return;
				}
				if (result.status) {
					if (_this.isReturn(userID)) {
						// 是否首次出牌
						var hasHx = false;
						if (_this.firstHx) {
							for (var i = 0; i < checkdlist.length; i++) {
								if (checkdlist[i].card == '3' && checkdlist[i].type == 'hx') {
									hasHx = true;
									_this.firstHx = false;
								}
							}
							if (!hasHx && _this.firstSend == userID) {
								_this.showmark = true;
								_this.markmsg = '首次出牌3红桃必出'
								setTimeout(function() {
									_this.showmark = false;
									_this.markmsg = ''
								}, 1000);
								return;
							}
						}

						var msg = JSON.stringify(checkdlist);
						var message = {
							userId: userID,
							funcType: 3, //出牌
							msg: msg
						};
						_this.websocket.send(JSON.stringify(message));
						_this.selfbtnmsg.SelfChoose = _this.sortCard(checkdlist).reverse();
						_this.palySpaper = reloadarry;
						_this.selfbtnmsg.isChoosebtn = true;
						clearInterval(_this.selfbtnmsg.timeSelf);
						_this.selfbtnmsg.canclebtn = false;
						_this.selfbtnmsg.sendbtn = false;
						_this.selfbtnmsg.timebtn = false;
						_this.selfbtnmsg.hitbtn = false;
						_this.sendRecord[chageindex] = checkdlist;
					} else {
						var lastcard = _this.getlastCard(userID);
						var last = _this.judgeCards(lastcard);
						var follow = _this.follow(last, result);
						var msg = JSON.stringify(checkdlist);
						if (follow) {
							var message = {
								userId: userID,
								funcType: 3, //出牌
								msg: msg
							};
							_this.websocket.send(JSON.stringify(message));
							_this.selfbtnmsg.SelfChoose = _this.sortCard(checkdlist).reverse();
							_this.palySpaper = reloadarry; //重新加载现有牌面
							_this.selfbtnmsg.sendbtn = false;
							_this.selfbtnmsg.canclebtn = false;
							_this.selfbtnmsg.timebtn = false;
							_this.selfbtnmsg.hitbtn = false;
							clearInterval(_this.selfbtnmsg.timeSelf);
							_this.sendRecord[chageindex] = checkdlist;
						} else {
							_this.selfbtnmsg.SelfChoose = [];
							_this.showmark = true;
							_this.markmsg = '你出的牌不符合规则'
							setTimeout(function() {
								_this.showmark = false;
								_this.markmsg = ''
							}, 1000);
						}
					}

				} else {
					_this.selfbtnmsg.SelfChoose = [];
					_this.showmark = true;
					_this.markmsg = '你出的牌不符合规则';
					setTimeout(function() {
						_this.showmark = false;
						_this.markmsg = ''
					}, 1000);
				}
			},

			//获取前面玩家的出牌
			getlastCard(id) {
				var _this = this;
				var returnlist = [];
				var index = _this.playOrder.indexOf(parseInt(id));
				var arr = [1, 0, 2, 1];
				var arrCir = arr.slice(2 - index, 2 - index + 2);
				for (var i = 0; i < arrCir.length; i++) {
					if (_this.sendRecord[arrCir[i]]) {
						returnlist = _this.sendRecord[arrCir[i]];
						break;
					}
				}
				return returnlist
			},

			// 不出
			sendNo() {
				var _this = this;
				var userID = _this.selfuserid;

				var chageindex = _this.playOrder.indexOf(parseInt(userID));
				var message = {
					userId: userID,
					funcType: 3,
					msg: "1"
				};
				_this.websocket.send(JSON.stringify(message));
				for (var index in _this.palySpaper) {
					_this.palySpaper[index].checked = false;
				}
				_this.palySpaper = _this.palySpaper.slice();
				_this.selfbtnmsg.isChoosebtn = true;
				_this.selfbtnmsg.isSelfTest = false;
				_this.selfbtnmsg.selfText = '不出';
				_this.selfbtnmsg.canclebtn = false;
				_this.selfbtnmsg.sendbtn = false;
				_this.selfbtnmsg.timebtn = false;
				_this.selfbtnmsg.hitbtn = false;
				_this.sendRecord[chageindex] = null;

			},
			// 出牌时间到了
			sendTimeOut() {
				var _this = this;
				var userID = _this.selfuserid;
				var chageindex = _this.playOrder.indexOf(parseInt(userID));
				var reloadarry = [];
				var checkdlist = [];
				var cardlist = [];
				if (!_this.isReturn(userID)) {
					// 对局   不出
					_this.sendNo()
				} else {
					console.log(_this.firstHx)
					if (_this.firstHx) {
						for (var i = 0; i < _this.palySpaper.length; i++) {
							if (_this.palySpaper[i].card == '3' && _this.palySpaper[i].type == 'hx') {
								_this.palySpaper[i].checked = true;
								_this.firstHx = false;
							} else {
								_this.palySpaper[i].checked = false;
							}
						}
					}

					// 不是对局   点了提示   出提示牌   没有的话拿提示牌
					// 获取所有选中的牌
					for (var index in _this.palySpaper) {
						if (_this.palySpaper[index].checked) {
							checkdlist.push(_this.palySpaper[index]);
						} else {
							reloadarry.push(_this.palySpaper[index])
						}
					}
					console.log(checkdlist)
					if (checkdlist.length > 0) {
						var result = _this.judgeCards(checkdlist);
						if (result.status) {
							cardlist = checkdlist
						} else {
							var which = _this.hintCards([], _this.palySpaper);
							reloadarry = [];
							if (which) {
								for (var i = 0; i < which.length; i++) {
									for (var j = 0; j < _this.palySpaper.length; j++) {
										if (which[i] == _this.palySpaper[j].card) {
											cardlist.push(_this.palySpaper[j]);
										} else {
											reloadarry.push(_this.palySpaper[j])
										}
									}
								}
							}
							_this.palySpaper.forEach(item => {
								item.isHint = true;
							})
							_this.palySpaper = _this.palySpaper.slice();
						}
					} else {
						var which = _this.hintCards([], _this.palySpaper);
						reloadarry = [];
						if (which) {
							for (var i = 0; i < which.length; i++) {
								for (var j = 0; j < _this.palySpaper.length; j++) {
									if (which[i] == _this.palySpaper[j].card) {
										cardlist.push(_this.palySpaper[j]);
									} else {
										reloadarry.push(_this.palySpaper[j])
									}
								}
							}
						}
						_this.palySpaper.forEach(item => {
							item.isHint = true;
						})

						_this.palySpaper = _this.palySpaper.slice();
					}


					var msg = JSON.stringify(cardlist);
					var message = {
						userId: userID,
						funcType: 3, //出牌
						msg: msg
					};
					_this.websocket.send(JSON.stringify(message));
					_this.selfbtnmsg.SelfChoose = _this.sortCard(cardlist).reverse();
					_this.palySpaper = reloadarry; //重新加载现有牌面
					_this.selfbtnmsg.sendbtn = false;
					_this.selfbtnmsg.canclebtn = false;
					_this.selfbtnmsg.timebtn = false;
					_this.selfbtnmsg.hitbtn = false;
					_this.selfbtnmsg.nobtn = false;
					clearInterval(_this.selfbtnmsg.timeSelf);
					_this.sendRecord[chageindex] = cardlist;
				}
			},
			// 要不起
			affordNo() {
				var _this = this;
				var userID = _this.selfuserid;
				var chageindex = _this.playOrder.indexOf(parseInt(userID));

				var message = {
					userId: userID,
					funcType: 3,
					msg: "2"
				};
				_this.websocket.send(JSON.stringify(message));
				for (var index in _this.palySpaper) {
					_this.palySpaper[index].checked = false;
				}
				_this.palySpaper = _this.palySpaper.slice();
				_this.selfbtnmsg.isChoosebtn = true;
				_this.selfbtnmsg.isSelfTest = false;
				_this.selfbtnmsg.selfText = '要不起';
				_this.selfbtnmsg.nobtn = false;
				_this.selfbtnmsg.timebtn = false;
				_this.sendRecord[chageindex] = null;
			},
			// 提示
			hit() {
				var userID = this.selfuserid;
				var lastcard = this.getlastCard(userID);
				var which = this.hintCards(lastcard, this.palySpaper);

				this.palySpaper.forEach(item => {
					item.checked = false;
				})
				if (which) {
					for (var i = 0; i < which.length; i++) {
						for (var j = 0; j < this.palySpaper.length; j++) {
							if (which[i] == this.palySpaper[j].card && this.palySpaper[j].checked == false) {
								this.palySpaper[j].checked = true;
								break;
							}
						}
					}

				}

				this.palySpaper = this.palySpaper.slice();


			},
			// 获取当前时间
			formatDate() {
				// inputTime  时间戳
				var date = new Date();
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				var second = date.getSeconds();
				minute = minute < 10 ? ('0' + minute) : minute;
				second = second < 10 ? ('0' + second) : second;
				return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
			},

			//结束
			finish(id) {
				// id 谁的牌结束了
				var _this = this;
				_this.isLeave = true; //是否可以离开界面 
				_this.isfinish = true;
				var selfuserID = _this.selfuserid;
				_this.clearall();
				var nopointid = null; //没有豆子的id
				_this.accountRes = true; //输赢界面显示

				var resultList = [];
				var leftdeduct = 0,
					selfdeduct = 0,
					rightdeduct = 0;
				var userids = []
				for (var j = 0; j < _this.usermsg.length; j++) {
					userids.push(_this.usermsg[j].userid);
				}


				// 先结算输的人的金豆
				for (var i = 0; i < _this.playOrder.length; i++) {
					var nowplayid = _this.playOrder[i];
					var index = _this.usermsg.indexOf(nowplayid);
					var which = _this.whichplay(nowplayid);
					if (id != nowplayid) {
						if (which == 'left') {
							if (_this.leftcount == 16) {
								leftdeduct = 16 * 4
							} else {
								leftdeduct = _this.leftcount * _this.double;
							}
							var leftindex = userids.indexOf(nowplayid);
							if (parseInt(_this.usermsg[leftindex].point) < parseInt(leftdeduct)) {
								nopointid = nowplayid
								leftdeduct = _this.usermsg[leftindex].point;
							}
						} else if (which == 'self') {
							if (_this.palySpaper.length == 16) {
								selfdeduct = 16 * 4
							} else {
								selfdeduct = _this.palySpaper.length * _this.double;
							}
							var selfindex = userids.indexOf(nowplayid);
							if (parseInt(_this.usermsg[selfindex].point) < parseInt(selfdeduct)) {
								nopointid = nowplayid
								selfdeduct = _this.usermsg[selfindex].point
							}
						} else if (which == 'right') {

							if (_this.rightcount == 16) {
								rightdeduct = 16 * 4
							} else {
								rightdeduct = _this.rightcount * _this.double;
								console.log(rightdeduct)
							}
							var rightindex = userids.indexOf(nowplayid);
							if (parseInt(_this.usermsg[rightindex].point) < parseInt(rightdeduct)) {
								nopointid = nowplayid
								rightdeduct = _this.usermsg[rightindex].point
							}
						}
					}
				}



				if (nopointid == selfuserID) {
					_this.isNoenough = true;
				}

				// 赢的人的金豆
				var winindex = _this.playOrder.indexOf(id);
				var whichwin = _this.whichplay(id);
				if (whichwin == 'left') {
					leftdeduct = parseInt(selfdeduct) + parseInt(rightdeduct);
				} else if (whichwin == 'self') {
					selfdeduct = parseInt(leftdeduct) + parseInt(rightdeduct)
				} else if (whichwin == 'right') {
					rightdeduct = parseInt(selfdeduct) + parseInt(leftdeduct)
				}

				for (var k = 0; k < _this.playOrder.length; k++) {
					var nowplayOrder = _this.playOrder[k];
					var index = _this.playOrder.indexOf(nowplayOrder);
					var which = _this.whichplay(nowplayOrder);
					var leftwin = 0,
						selfwin = 0,
						rightwin = 0;
					if (which == 'left') {
						if (nowplayOrder == id) {
							leftwin = 1;
							_this.leftmoney = leftdeduct;
						} else {
							_this.leftmoney = -leftdeduct;
						}

						var data = {
							"userid": nowplayOrder,
							"point": _this.leftmoney,
							"goldCoin": 0,
							"iswin": leftwin,
							"beginTime": _this.beginTime,
							"gametype": 3
						}
						resultList.push(data);
					} else if (which == 'self') {
						if (nowplayOrder == id) {
							selfwin = 1;
							_this.isWin = 1;
							_this.selfmoney = selfdeduct;
						} else {
							_this.isWin = 0;
							_this.selfmoney = -selfdeduct;
						}

						var data = {
							"userid": nowplayOrder,
							"point": _this.selfmoney,
							"goldCoin": 0,
							"iswin": selfwin,
							"beginTime": _this.beginTime,
							"gametype": 3
						}
						resultList.push(data)
					} else if (which == 'right') {
						if (nowplayOrder == id) {
							rightwin = 1;
							_this.rightmoney = rightdeduct;
						} else {
							_this.rightmoney = -rightdeduct;
						}
						var data = {
							"userid": nowplayOrder,
							"point": _this.rightmoney,
							"goldCoin": 0,
							"iswin": rightwin,
							"beginTime": _this.beginTime,
							"gametype": 3
						}
						resultList.push(data)
					}
				}
				console.log(resultList)
				if (selfuserID == _this.firstSend) {
					uni.request({
						url: requestUrl.finishGame,
						method: 'POST',
						data: JSON.stringify(resultList),
						header: {
							'Content-Type': 'application/json'
						},
						success: (res) => {
							console.log(res.data);
						}
					});
				}
			}
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
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
	}

	.back {
		position: absolute;
		left: .34rem;
		top: 0;
	}

	.back image {
		width: .5rem;
		height: .5rem;
	}

	.roomBtn {
		background: url("../../static/image/finishbtnbg.png") no-repeat;
		position: absolute;
		top: 0;
		right: 0;
		width: 1rem;
		height: .5rem;
		padding: 0 .5rem;
		background-size: 100% 100%
	}

	.roomBtn image.changeDesk {
		width: 0.35rem;
		height: 0.45rem;
		margin-right: 0.2rem;
	}

	.cardnormal .card img {
		width: 0.58rem;
		height: 0.8rem;
	}

	.roomBtn image {
		width: 0.4rem;
		height: 0.45rem;
	}

	.roomBtn image.award {
		margin-top: 0.05rem;
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

	.palyLbox .gifbox {
		top: 3%;
	}

	.palyRbox .gifbox {
		right: 0;
		left: auto;
		top: 3%;
	}

	.palySbox .gifbox {
		left: -82%;
	}

	.gifbox {
		position: absolute;
		left: 0;
		top: -29%;
		z-index: 999;
		width: 1rem;
		height: 1rem;
	}

	.gifbox image {
		width: 1.3rem;
		height: 1.3rem;
	}

	.startbtn image {
		width: .98rem;
		height: .43rem;
	}

	.startbtn {
		height: .43rem;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%)
	}



	.continue-btn {
		width: 1.1rem;
		height: 0.43rem;
		position: absolute;
		right: 2.32rem;
		bottom: 0.24rem;
		background: url(../../static/image/continuebtn.png) no-repeat;
		background-size: 100% 100%;
		font-size: 0.14rem;
		color: #ffffff;
		text-shadow: 1px 0px 1px rgba(232, 139, 58, 0.8),
			-1px 0px 1px rgba(232, 139, 58, 0.8),
			0px 1px 1px rgba(232, 139, 58, 0.8),
			0px -1px 1px rgba(232, 139, 58, 0.8);
		line-height: 0.4rem;
		text-align: center;

	}

	.startbtn image {
		vertical-align: top;

	}

	.continue-btn text {
		color: #fff;
		font-size: .22rem;
	}

	.playbg {
		height: 1.1rem;
		position: relative;
		z-index: 2;
	}

	.palyR .headimg {
		left: .75rem;
	}

	.palyL .playbg {
		margin-left: -0.2rem
	}

	.palyL {
		position: absolute;
		top: .8rem;
		left: .2rem;
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
		margin-right: .1rem;
		background-size: 100% 100%;
		padding: 0.01rem .2rem;
	}

	.palyS .headimg {
		top: auto;
		left: .1rem;
		bottom: .05rem
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
		margin-left: 0.2rem;
	}

	.palyR .playmsg {
		background: url(../../static/image/right.png) no-repeat;
		margin-right: 0;
		margin-left: .03rem;
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
		left: .4rem;
		width: 0.45rem;
		height: 0.45rem;
		border: 0.05rem solid #d1a05b;
		border-radius: 0.1rem;
		background: #f2e5bf;
		z-index: 1;
	}

	/* 豆子不够 */
	.noEnoughbox{
		width: 100%;
		height: 100%;
		background:rgba(0,0,0,.2);
		position: absolute;
		top:0;
		left:0;
		z-index:1;
	}
	.noEnough {
		width: 3.38rem;
		height: 2.09rem;
		background: #fff;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
		background: url(../../static/image/hint.png) no-repeat;
		background-size: 100% 100%;
		text-align: center;
	}

	.noEnough text {
		font-size: .26rem;
		display: block;
		margin: 0 auto;
		margin-top: 0.6rem;
		color: #B45000
	}

	.noEnough image {
		width: .88rem;
		height: .4rem;
		position: absolute;
		left: 50%;
		bottom: .2rem;
		transform: translateX(-50%);
	}



	.headimg image {
		width: 0.45rem;
		height: .45rem;
	}

	.palyR .headimg image {
		transform: rotateY(180deg)
	}

	.palyR {
		position: absolute;
		top: .8rem;
		right: .2rem;
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
			transform: translate(-50%, 80%) scale(1, 1);
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
		bottom: .2rem;
		width: 100%;
		margin-left: -50%;
		height: 1.35rem;
		padding-left: 3%;
	}

	.palyS .cardshowlist {
		margin-bottom: -.58rem;
	}

	@media screen and (max-width: 736px) {
		.mycarlist {
			padding-left: 4%;
		}
	}

	.card {
		width: .58rem;
		height: 0.8rem;
		position: relative;
		margin-left: -0.3rem;
		margin-top: 0.19rem;
	}

	.card img {
		width: .58rem;
		height: 0.8rem;
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
		left: 50%;
		transform: translateX(-50%);
		bottom: 1.2rem;
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

	.selfbtn {
		margin-bottom: -0.2rem
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
		top: 0.3rem;
		left: 0.7rem;
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

	.palyRbox .msgbox {
		margin-right: -1.4rem;
		margin-top: 0.3rem;
	}

	.palyLbox .msgbox {
		margin-top: 0.3rem;
		margin-left: -.1rem;
	}

	.grabCardbox {
		display: inline-block;
		position: relative;
		height: .35rem;
		margin-bottom: 0.5rem;
	}

	.palyS .mybox {
		z-index: 999
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
		bottom: .55rem;
		left: 0;
		width: 100%;
		height: 1rem;
		display: table;
		text-align: center;
	}

	.mark text {
		vertical-align: middle;
		color: #f3e6ac;
		font-size: .2rem;
		font-family: cursive;
		font-weight: bold;
		width: 4rem;
		height: 0.4rem;
		line-height: 0.4rem;
		display: block;
		text-align: center;
		margin: 0 auto;
		margin-top: 0.4rem;
		background: linear-gradient(to right,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0) 10%,
			rgba(0, 0, 0, 0.3) 20%,
			rgba(0, 0, 0, 0.4) 30%,
			rgba(0, 0, 0, 0.5) 40%,
			rgba(0, 0, 0, 0.6) 50%,
			rgba(0, 0, 0, 0.5) 60%,
			rgba(0, 0, 0, 0.4) 70%,
			rgba(0, 0, 0, 0.3) 80%,
			rgba(0, 0, 0, 0) 90%,
			rgba(0, 0, 0, 0) 100%);
	}

	.waiting {
		text-align: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: .18rem;
	}

	.waiting text {
		color: #f3e6ac;
	}

	/* 地主牌展示 */
	.landlordCard .card {
		float: left;
		margin-right: .2rem;
	}

	.palyLbox.mybox {
		top: .75rem;
		left: 2rem;
		transform: translate(0, 0);
	}

	.palyRbox.mybox {
		top: .75rem;
		right: 2.3rem;
		transform: translate(0, 0);
	}

	.palyLbox .cardlist,
	.palyRbox .cardlist {
		max-width: 1.6rem;

	}

	.palyLbox .cardlist {
		margin-left: 0.1rem;
	}

	.accountbox {
		width: 100%;
		height: 100%;
		background: url("../../static/image/maskbg.webp");
		background-size: 100% 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 100000000000;
	}

	.accountbox.win .account-bg {
		background: url("../../static/image/winbg.webp") no-repeat;
		background-size: 8.3rem 3.7rem;
	}

	.settleBox {
		position: absolute;
		left: 2.6rem;
		top: 1.16rem;
	}

	.accountbox.win .level-share {
		background: linear-gradient(to right, rgba(236, 192, 118, 0.8), rgba(229, 162, 70, 0));
	}

	.accountbox.lose .account-bg {
		background: url("../../static/image/losebg.webp") no-repeat;
		background-size: 8.3rem 3.7rem;
	}

	.island {
		width: .29rem;
		height: .32rem;
	}

	.accountbox.lose .level-share {
		background: linear-gradient(to right, rgba(225, 225, 225, 0.9), rgba(120, 120, 120, 0));
	}

	.accountbox .account-bg {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.accountbox .avatar {
		/* position: absolute;
	  top: 0.96rem;
	  left: 3.69rem;
	  display: flex;
	  align-items: center; */
		/* padding-right: 1.15rem; */
		margin-left: 1rem
	}

	.accountbox .avatar .avatar-img {
		width: 0.5rem;
		height: 0.5rem;
		overflow: hidden;
		border: 0.03rem solid white;
		border-radius: 0.05rem;
		box-sizing: border-box;
		box-shadow: 0 0.04rem 0.09rem rgba(0, 0, 0, .4);
	}

	.accountbox .avatar .avatar-img img {
		width: 100%;
	}

	.accountbox .avatar .level-share {
		width: 1.83rem;
		height: 0.5rem;
		display: flex;
		align-items: center;
	}

	.accountbox .avatar .level-share .avatar-level {
		width: 0.65rem;
		height: 0.3rem;
		margin-left: 0.23rem;
		position: relative;
	}

	.selfmsgbox {
		color: #d35826;
	}

	.accountbox .avatar .level-share .avatar-level img {
		width: 100%;
	}

	.accountbox .avatar .level-share .avatar-level span {
		position: absolute;
		color: #ffffff;
		top: 0.06rem;
		left: 0.22rem;
		font-size: 0.12rem;
		font-weight: bold;
	}

	.accountbox .avatar .level-share .share-btn {
		width: 0.3rem;
		height: 0.3rem;
		margin-left: 0.1rem;
	}

	.accountbox .avatar .level-share .share-btn img {
		width: 100%;
	}

	.accountbox .account-table {
		/* height: 1.53rem;
	  position: absolute;
	  top: 1.51rem;
	  left: 3rem; */
	}

	.accountbox .account-table ul {
		list-style: none;
		margin: 0;
		padding: 0;
		height: 0.32rem;
		text-align: center;
		font-size: 0.14rem;
		display: flex;
		align-items: center;
	}

	.accountbox .account-table ul.table-head li {
		font-size: 0.12rem;
	}

	.accountbox .account-table ul .nickname {
		width: 1.6rem;
		position: relative;
	}

	.accountbox .account-table ul .nickname .addfriend {
		width: 0.24rem;
		/*  position: absolute;
	  top: -0.02rem;
	  left: 1.18rem; */
		height: 0.24rem;
	}

	.nickname p {
		min-width: 0.75rem;
		text-align: center;
	}

	.accountbox .account-table ul .endpoints {
		width: 0.8rem;
	}

	.accountbox .account-table ul .multiple {
		width: 0.8rem;
	}

	.accountbox .account-table ul .money {
		width: 1rem;
	}

	.accountbox .account-table .table-head {
		color: #8a8a8a;
		/* padding-right: 1.15rem; */
	}

	.accountbox .account-table .table-body {
		color: #25241d;
	}



	.accountbox .continue-btn img {
		width: 100%;
	}

	.palyLbox .paperOperate {
		margin-left: -.1rem;
		margin-top: .2rem
	}

	.palyRbox .paperOperate {
		margin-right: -1.4rem;
		margin-top: .2rem
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
