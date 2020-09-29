<!-- 2020-9-28 简单完成打牌的流程 -->
<template>
	<view class="content">
			<!-- <input type="text" v-model='selfuserid'  style="color:#fff;border:1px solid #f00" /> -->
		<view class="testsend">
			<input type="text" v-model='selfuserid'  style="color:#fff;border:1px solid #f00" />
			<input type="text" v-model='selfToken'  style="color:#fff;border:1px solid #f00" />
			
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
			<view class="cardlist clearfix cardnormal cardshowlist flex juscon-center">
				<view class="card big cardwrap big-card" v-for='(item,index) in leftbtnmsg.leftChoose' :key="index" :style="cardleft(item,index)">
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
				<view class="cardlist clearfix cardnormal cardshowlist flex juscon-center">
					<view class="card big cardwrap big-card" v-for='(item,index) in selfbtnmsg.SelfChoose' :key="index" :style="mycardleft(item,index)">
						<image :src="item.src" mode=""></image>
					</view>
				</view>

				<!-- 抢地主按钮 -->
				<view class="grabCardbox flex alignitem-center juscon-center clearfix">
					<!-- 抢地主 -->
					<view class="noGrad selfbtn" @tap='need()' v-show='selfbtnmsg.getbtn'>
						<image src="../../static/image/needland.png" mode=""></image>
					</view>
					<!-- 加倍 -->
					<view class="grabCard selfbtn" @tap="double()" v-show='selfbtnmsg.doublebtn'>
						<image src="../../static/image/doublebtn.png" mode=""></image>
					</view>
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
					<!-- 不抢地主 -->
					<view class="grabCard selfbtn" @tap="noNeed()" v-show='selfbtnmsg.getnobtn'>
						<image src="../../static/image/noland.png" mode=""></image>
					</view>

					<!-- 不加倍 -->
					<view class="noGrad selfbtn" @tap='nodouble()' v-show='selfbtnmsg.doublenobtn'>
						<image src="../../static/image/nodouble.png" mode=""></image>
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
					<view class="card big cardwrap big-card" v-for='(item,index) in palySpaper' :key="index" :style="mycardleft(item,index)"
					 @tap='checkCard(item,index)'>
						<image :src="item.src" mode=""></image>
					</view>
				</view>

				<view class="mark" v-show='showmark'>
					<text>{{markmsg}}</text>
				</view>
			</view>
			<!-- 倍数 -->
			<view class="flex juscon-between doublemsg">
				<view class="double  flex alignitem-center juscon-center">
					<text>{{this.doublePoint}}</text>
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
			<view class="cardlist clearfix cardnormal cardshowlist flex juscon-center">
				<view class="card big cardwrap big-card" v-for='(item,index) in rightbtnmsg.rightChoose' :key="index" :style="cardleft(item,index)">
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
			<text>正在为您寻找伙伴...</text>
		</view>
		<!-- 输赢界面 -->
		<view v-if="accountRes" class="accountbox" :class="isWin ? `win` : `lose`">
			<!-- 背景部分 -->
			<div class="account-bg">
			</div>

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
						<li class="endpoints">底分</li>
						<li class="multiple">倍数</li>
						<li class="money">金豆</li>
					</ul>
					<div class="table-body">
						<!-- 我 -->
						<ul class='selfmsgbox'>
							<li class="nickname flex juscon-center alignitem-center">
								<view class="flex juscon-center alignitem-center">
									<img src="../../static/image/land.png" alt="" class="island" v-show='type1data.landid==playself.userid' />
								</view>
								<p class="ellipsis">{{playself.nickname}}</p>
								<view class="addfriend"></view>
							</li>
							<li class="endpoints">{{endPoint}}</li>
							<li class="multiple" v-if='type1data.landid==playself.userid'>{{landdoublePoint}}</li>
							<li class="multiple" v-else>{{doublePoint}}</li>
							<li class="money">{{selfmoney}}</li>
						</ul>
						<!-- 左 -->
						<ul>
							<li class="nickname flex juscon-center alignitem-center">
								<view class="island flex juscon-center alignitem-center">
									<img src="../../static/image/land.png" alt="" class="island" v-show='type1data.landid==playleft.userid' />
								</view>
								<p class="ellipsis">{{playleft.nickname}}</p>
								<view class="flex juscon-center alignitem-center">
									<img src="../../static/image/addfriend.png" alt="" class="addfriend" />
								</view>

							</li>
							<li class="endpoints">{{endPoint}}</li>
							<li class="multiple" v-if='type1data.landid==playleft.userid'>{{landdoublePoint}}</li>
							<li class="multiple" v-else>{{doublePoint}}</li>
							<li class="money">{{leftmoney}}</li>
						</ul>
						<!-- 右 -->
						<ul>
							<li class="nickname flex juscon-center alignitem-center">
								<view class="island flex juscon-center alignitem-center">
									<img src="../../static/image/land.png" alt="" class="island" v-show='type1data.landid==playright.userid' />
								</view>
								<p class="ellipsis">{{playright.nickname}}</p>
								<view class="flex juscon-center alignitem-center">
									<img src="../../static/image/addfriend.png" alt="" class="addfriend" />
								</view>

							</li>
							<li class="endpoints">{{endPoint}}</li>
							<li class="multiple" v-if='type1data.landid==playright.userid'>{{landdoublePoint}}</li>
							<li class="multiple" v-else>{{doublePoint}}</li>
							<li class="money">{{rightmoney}}</li>
						</ul>
					</div>
				</div>

			</view>

			<!-- 继续游戏按钮 -->
			<div class="continue-btn">
				<img src="../../static/image/continuebtn.png" alt="" />
			</div>
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
				// 分牌相关
				palyL: [], //暂存左玩家分到的牌
				palyS: [], //暂存我分到的牌
				palyR: [], //暂存右玩家分到的牌
				palyLpaper: [], //用于页面中遍历的牌
				palySpaper: [],
				palyRpaper: [],
				landlordCard: [], //地主牌
				island: false, //是否显示地主牌牌面
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
					landhead: false, //地主头像
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
					getbtn: false, //抢地主  
					getnobtn: false, //不抢地主 1
					doublenobtn: false, //不加倍   2
					doublebtn: false, //加倍 
					nobtn: false, //要不起 4
					canclebtn: false, //不出  3
					hitbtn: false, //提示
					sendbtn: false, //出牌 
					isChoosebtn: false, //是否操作
					landhead: false, //地主头像
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
					landhead: false, //地主头像
				},
				rightcount: 0, //右玩家牌数
				playright: {}, //右边玩家信息详情

				// 提示
				hintcard: [], //提示选中的牌
				markmsg: '',
				showmark: false,

				// 基础参数
				doublePoint: 15, //倍数
				landdoublePoint:15,//地主倍数
				endPoint: 30, //底分
				websocket: null,
				totalTime: 20,
				beginTime: null,

				//用户相关
				selfuserid: '', //当前用户userid
				selfToken:'', //当前用户token
				whichme: '', //self位置的index
				playmsgshow: false, //是否显示玩家
				userRecord: [], //记录进入用户的id
				usermsg: [], //暂时记录用户的信息
				isShowAni: [true, true, true],
				useridlist: [], //存储用户id数组

				// 抢地主
				type1data: {
					// 0 抢地主  1 不抢
					choosetype1: [], //抢地主的用户
					isSureRepeat: false,
					type1: [], //抢地主操作人数(判断是否抢地主结束)
					landid: 2
				},
				isSureland: false, //确认地主
				firstland: null, //记录重复一遍抢地主的第一个人id
				secondsure: false, //记录重复抢地主是否完成
				playOrder: [], //确认地主后的出牌顺序
			
				// 加倍
				type2: [], //判断加倍是否完成（通过操作人数）

				// 出牌相关
				sendRecord: [], //三个用户的出牌
				playOrderCount: 0,
				lastcard: [], ///记录上一家的牌

				accountRes: false, //输赢界面显示
				isWin: false,
				rightmoney:0, //右玩家最后分数
				leftmoney:0,//左玩家最后分数
				selfmoney:0,//本玩家最后分数
				isfinish:false, //是否结束
				isboth:0, //记录牌和用户信息是否都拿到
				startbtn:true,//是否显示开始按钮
				waiting:false ,//等待匹配文字显示
			}
		},
		components: {
			uniList,
			uniListItem
		},
		created() {
			this.remFn(); //加载rem
		},
		mounted() {
			window.getUserInfo= this.getUserInfo;
		},
		watch: {
			firstland() {
				// 是否第二遍询问地主
				this.repeatland()
			},
			isSureland() {
				// 确认地主
				this.sureLand()
			},
			isboth(){
				if(this.isboth==2){
					this.setcard();
					this.waiting=false
				}
			}
		},

		methods: {
			// 获取用户的id和token
			getUserInfo(str){
				this.selfuserid=str.split(",")[0].split('=')[1];
				this.selfToken=str.split(",")[1].split('=')[1];
			},
			startGame(){
				
				var data={
					userid:this.selfuserid,
					token:this.selfToken,
					gametype:1
				}
				uni.request({
				    url: this.$requestUrl.requestUrl.startGame,
					method:'POST',
				    data: JSON.stringify(data),
					header: {
						'Content-Type' : 'application/json'
					},
				    success: (res) => {
				        console.log(res.data);
						
				    }
				});
				this.startbtn=false;
				this.waiting=true;
				
				this.start()
			},
			
			start() {
				var _this = this;
				var selfuserID = _this.selfuserid;
				_this.websocket = new WebSocket(_this.$requestUrl.requestUrl.websocketUrl + selfuserID);
				_this.websocket.onopen = function(event) {
					console.log('连接成功');
					// console.log(event)
				};
				_this.websocket.onmessage = function(event) {
					console.log(event)
					var data = JSON.parse(event.data);
					// console.log(data)
					//functype  1斗地主    2 加倍    3出牌
					if (data.funcType == 1) {
						// 抢地主操作文字显示
						if (_this.type1data.isSureRepeat && !_this.isSureland) {
							_this.Grablandlord(data.funcType, data.userId, data.msg);

							if (data.msg == 0) {
								_this.isSureland = true;
								_this.type1data.landid = data.userId;
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
						}
						if (!_this.type1data.isSureRepeat) {
							_this.Grablandlord(data.funcType, data.userId, data.msg);
							if (_this.type1data.type1.indexOf(parseInt(data.userId)) == '-1') {
								_this.type1data.type1.push(data.userId);
								if (_this.type1data.type1.length < 3) {
									//不满3人时，下一家触发抢地主倒计时

									var index = _this.type1data.type1.length;
									var first = _this.whichplay(_this.useridlist[index]);
									_this.coutdown(first, 1); //开启抢地主倒计时
								}
							}


							// 记录抢地主的用户id
							if (data.msg == 0) {
								// msg 0抢地主  1不抢
								if (_this.type1data.choosetype1.indexOf(parseInt(data.userId)) == '-1') {
									_this.type1data.choosetype1.push(data.userId);
								}

							}

							// 判断是否三个用户抢地主操作完成
							if (_this.type1data.type1.length == 3) {
								if (_this.type1data.choosetype1.length == 0) {
									// 没有人抢默认第一个
									var id = _this.useridlist[0];

									// 确认地主
									_this.isSureland = true;
									// 记录地主id
									_this.type1data.landid = id;

								} else if (_this.type1data.choosetype1.length == 1) {
									// 只有一个用户抢地主
									// 确认地主
									_this.isSureland = true;
									// 记录地主id
									_this.type1data.landid = _this.type1data.choosetype1[0];

								} else {
									_this.type1data.isSureRepeat = true;
									// 有两个及以上用户抢地主
									_this.firstland = _this.type1data.choosetype1[0]; //第一个抢地主的人

								}
							}

						}


					}
					// 加倍
					if (data.funcType == 2) {
						_this.Grablandlord(data.funcType, data.userId, data.msg);
						if (_this.type2.indexOf(parseInt(data.userId)) == '-1') {
							_this.type2.push(data.userId);
							if (data.msg == 0) {
								_this.doublePoint = parseInt(_this.doublePoint) * 2;
							}
						}
						if (_this.type2.length == 3) {
							_this.clearall(); //清空所有定时器和提示文字
							_this.startSend(); //地主先开始出牌
						}
					}

					// 出牌
					if (data.funcType == 3) {
						_this.grabCardlist(data.userId, data.msg);
						if (data.msg == 1 || data.msg == 2) {
							var whichindex = _this.playOrder.indexOf(parseInt(data.userId));
							_this.sendRecord[whichindex] = null;
						}else{
							var whichindex = _this.playOrder.indexOf(parseInt(data.userId));
							_this.sendRecord[whichindex] = JSON.parse(data.msg);
							if(_this.judgeCards(JSON.parse(data.msg)).cardKind=='BOMB'){
								_this.doublePoint=_this.doublePoint*2
							}
						}
						
						_this.playOrderCount++;
						var nextindex = _this.playOrderCount % 3;
						var indexId = _this.playOrder[nextindex];
						var which = _this.whichplay(indexId);
						if(!_this.isfinish){
							if (which == 'left') {
								_this.leftTimeDown();
							} else if (which == 'self') {
								_this.selfTimeDown(3);
							
							} else {
								_this.rightTimeDown()
							}
						}
						
					}
					
					// 获取到的牌信息
					if (data.card) {
						_this.cardslist = JSON.parse(data.card);
						
						var timeNow = Date.parse(new Date());
						_this.beginTime= _this.formatDate(timeNow);
						_this.isboth++
					}
					// 获取用户信息
					if (data.userInfo) {
						_this.isboth++
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
				var which = this.whichplay(id);
				var index = this.playOrder.indexOf(parseInt(id));
				var selfuserID = this.selfuserid;
				if (which == 'left') {
					clearInterval(this.leftbtnmsg.timeleft);
					this.leftbtnmsg.timebtn = false;
					if (msg == 1) {
						this.leftbtnmsg.isLeftTest = false;
						this.leftbtnmsg.leftText = '不出';
						this.sendRecord[index] = null;
					} 
					// else if (msg == 2) {
					// 	this.leftbtnmsg.isLeftTest = false;
					// 	this.leftbtnmsg.leftText = '要不起';
					// 	this.sendRecord[index] = null;
					// }
					else {
						this.leftbtnmsg.leftChoose = JSON.parse(msg);
						this.sendRecord[index] = this.leftbtnmsg.leftChoose;
						this.leftcount = this.leftcount - parseInt(JSON.parse(msg).length);
						if(this.leftcount==0){
							this.finish(id);
							this.isfinish=true;
						}
					}
				} else if (which == 'right') {
					clearInterval(this.rightbtnmsg.timeright);
					this.rightbtnmsg.timebtn = false;
					if (msg == 1) {
						this.rightbtnmsg.isRightTest = false;
						this.rightbtnmsg.rightText = '不出';
						this.sendRecord[index] = null;
					}
					//  else if (msg == 2) {
					// 	this.rightbtnmsg.isRightTest = false;
					// 	this.rightbtnmsg.rightText = '要不起';
					// 	this.sendRecord[index] = null;
					// } 
					else {
						this.rightbtnmsg.rightChoose = JSON.parse(msg)
						this.sendRecord[index] = this.leftbtnmsg.leftChoose;
						this.rightcount = this.rightcount - (JSON.parse(msg).length);
						if(this.rightcount==0){
							this.finish(id);
							this.isfinish=true;
						}
					}
				}else{
					if(this.palySpaper.length==0){
						this.finish(id);
						this.isfinish=true;
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
				let nowCardLength = 0; //当前发出的牌的张数
				//创建音频
				this.audio = new Audio();
				this.audio.src = this.mp3;
				this.audio.loop=true;
				// 播放音频
				this.audio.play();
				// 发牌定时器
				let timer = setInterval(() => {
				
					// 牌发完，定时器关闭
					if (nowCardLength >= 50) {
						clearInterval(timer);
						this.showpaper = false;
						var first = this.whichplay(this.useridlist[0]);
						this.coutdown(first, 1); //开启抢地主倒计时
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
			cardleft(item, index) {
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
			// 计时
			coutdown(num, type) {
				// num  谁方倒计时  all全部  left 左方  self本方  right 右方
				//  type 哪个操作的倒计时  1抢地主 2加倍 3要不起  4出牌
				if (num == 'all') {
					this.leftTimeDown();
					this.selfTimeDown(type);
					this.rightTimeDown();
				} else if (num == 'left') {
					this.leftTimeDown();
				} else if (num == 'self') {
					this.selfTimeDown(type);
				} else if (num == 'right') {
					this.rightTimeDown();
				}

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
			selfTimeDown(type) {
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
				if (type == 1) {
					_this.selfbtnmsg.getbtn = true;
					_this.selfbtnmsg.getnobtn = true;
				} else if (type == 2) {
					_this.selfbtnmsg.doublebtn = true;
					_this.selfbtnmsg.doublenobtn = true;
				} else if (type == 3) {
					_this.selfbtnmsg.SelfChoose = [];
					var userID = _this.selfuserid;
					var lastcard = _this.getlastCard(userID);
					var which = _this.hintCards(lastcard, _this.palySpaper);
					_this.palySpaper.forEach(item => {
						item.isHint = true;
					})
					_this.palySpaper = _this.palySpaper.slice();
					// if (which) {
						_this.selfbtnmsg.hitbtn = true;
						_this.selfbtnmsg.canclebtn = true;
						_this.selfbtnmsg.sendbtn = true;
						if (_this.isReturn(selfuserID)) {
							_this.selfbtnmsg.canclebtn = false;
						}
					// }else{
						// if(lastcard.length>0){
						// 	_this.selfbtnmsg.nobtn = true;
						// }
					// }
				}
				_this.selfbtnmsg.timeSelf = setInterval(function() {
					_this.selfbtnmsg.selfTime--;
					if (_this.selfbtnmsg.selfTime == 0) {
						clearInterval(_this.selfbtnmsg.timeSelf);
						if (!_this.selfbtnmsg.isChoosebtn) {
							if (type == 1) {
								//抢地主
								var message = {
									userId: selfuserID,
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
								//加倍
								var message = {
									userId: selfuserID,
									funcType: 2,
									msg: "1"
								}
								_this.websocket.send(JSON.stringify(message));
								_this.selfbtnmsg.isChoosebtn = true;
								_this.selfbtnmsg.isSelfTest = false;
								_this.selfbtnmsg.selfText = '不加倍';
								_this.selfbtnmsg.doublebtn = false;
								_this.selfbtnmsg.doublenobtn = false;
							} else if (type == 3) {
								_this.sendTimeOut()
							}
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
			// 处理抢地主,加倍操作
			Grablandlord(type, id, msg) {
				var which = this.whichplay(id);
				if (type == 1) {
					if (this.type1data.isSureRepeat && this.isSureland) {
						this.clearall()
					} else {

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
								} else {
									this.leftbtnmsg.isLeftTest = false;
									this.leftbtnmsg.leftText = '不加倍';
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
								} else {
									this.rightbtnmsg.isRightTest = false;
									this.rightbtnmsg.rightText = '不加倍';
								}
							}
						} else {
							clearInterval(this.selfbtnmsg.timeSelf);
							this.selfbtnmsg.timebtn = false;
							if (type == 1) {
								if (msg == 0) {
									this.selfbtnmsg.isSelfTest = true;
									this.selfbtnmsg.selfText = '抢地主';
								} else {
									this.selfbtnmsg.isSelfTest = false;
									this.selfbtnmsg.selfText = '不抢';
								}
							}
						}

					}


				} else if (type == 2) {
					if (which == 'left') {
						clearInterval(this.leftbtnmsg.timeleft);
						this.leftbtnmsg.timebtn = false;
						if (msg == 0) {
							this.leftbtnmsg.isLeftTest = true;
							this.leftbtnmsg.leftText = '加倍';
						} else {
							this.leftbtnmsg.isLeftTest = false;
							this.leftbtnmsg.leftText = '不加倍';
						}


					} else if (which == 'right') {
						clearInterval(this.rightbtnmsg.timeright);
						this.rightbtnmsg.timebtn = false;

						if (msg == 0) {
							this.rightbtnmsg.isRightTest = true;
							this.rightbtnmsg.rightText = '加倍';
						} else {
							this.rightbtnmsg.isRightTest = false;
							this.rightbtnmsg.rightText = '不加倍';
						}
					}
				}

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
				var selfuserID = _this.selfuserid;
				var message = {
					userId: selfuserID,
					funcType: 1,
					msg: "0"
				}
				_this.websocket.send(JSON.stringify(message));
				clearInterval(_this.selfbtnmsg.timeSelf);
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
				var selfuserID = _this.selfuserid;
				var message = {
					userId: selfuserID,
					funcType: 1,
					msg: "1"
				};
				_this.websocket.send(JSON.stringify(message));
				clearInterval(_this.selfbtnmsg.timeSelf);
				_this.selfbtnmsg.isChoosebtn = true;
				_this.selfbtnmsg.isSelfTest = false;
				_this.selfbtnmsg.selfText = '不抢';
				_this.selfbtnmsg.getbtn = false;
				_this.selfbtnmsg.getnobtn = false;
				_this.selfbtnmsg.timebtn = false;
			},
			// 抢地主询问第二遍
			repeatland() {
				var _this = this;
				var first = _this.whichplay(_this.firstland); //第一个抢地主的人
				if (first == 'left') {
					_this.leftbtnmsg.leftText = '';
					_this.leftbtnmsg.timebtn = true;
					_this.leftTimeDown();
				} else if (first == 'self') {
					_this.selfbtnmsg.selfText = '';
					_this.selfTimeDown(1);
					_this.selfbtnmsg.getbtn = true;
					_this.selfbtnmsg.timebtn = true;
					_this.selfbtnmsg.getnobtn = true;

				} else {
					_this.rightbtnmsg.rightText = '';
					_this.rightTimeDown();
					_this.rightbtnmsg.timebtn = true;
				}
			},

			// 确定地主
			sureLand() {
				var _this = this;
				_this.rightbtnmsg.rightText = '';
				_this.selfbtnmsg.selfText = '';
				_this.leftbtnmsg.leftText = '';
				var userID = _this.selfuserid;
				var which = _this.whichplay(_this.type1data.landid);
				_this.island = true; //显示地主牌
				if (which == 'self') {
					if (_this.type1data.landid == userID) {
						_this.selfbtnmsg.landhead = true;
						for (var i = 0; i < _this.landlordCard.length; i++) {
							_this.palySpaper.push(_this.landlordCard[i]);
						}
						_this.sortCard(_this.palySpaper);
					}
				} else if (which == 'left') {
					_this.leftcount = parseInt(_this.palyLpaper.length) + 3;
					_this.leftbtnmsg.landhead = true;
				} else {
					_this.rightcount = parseInt(_this.palyRpaper.length) + 3;
					_this.rightbtnmsg.landhead = true;
				}
				this.coutdown('all', 2); //开启加倍倒计时
				this.selfbtnmsg.timebtn = true;
				this.selfbtnmsg.doublenobtn = true;
				this.selfbtnmsg.doublebtn = true;
				this.leftbtnmsg.timebtn = true;
				this.rightbtnmsg.timebtn = true;
				//确认地主后改变出牌顺序
				this.changePlayOrder()
			},
			//改变出牌顺序
			changePlayOrder() {
				var index = this.useridlist.indexOf(parseInt(this.type1data.landid));
				this.playOrder = this.useridlist.slice(index).concat(this.useridlist.slice(0, index));
			
			},
			// 不加倍
			nodouble() {
				var _this = this;
				var userID = _this.selfuserid;
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
				var userID = _this.selfuserid;
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
				this.palySpaper[index].checked = !this.palySpaper[index].checked;
				this.palySpaper = this.palySpaper.slice();
			},

			//地主先出牌
			startSend() {
				var landid = this.type1data.landid;
				var which = this.whichplay(landid);
				if (which == 'left') {
					this.leftTimeDown()
				} else if (which == 'self') {
					this.selfTimeDown(3);
					this.selfbtnmsg.timebtn = true;
					this.selfbtnmsg.hitbtn = true;
					this.selfbtnmsg.sendbtn = true;
				} else {
					this.rightTimeDown()
				}

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
						var msg = JSON.stringify(checkdlist);
						var message = {
							userId: userID,
							funcType: 3, //出牌
							msg: msg
						};
						_this.websocket.send(JSON.stringify(message));
						_this.selfbtnmsg.SelfChoose = checkdlist
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
							_this.selfbtnmsg.SelfChoose = checkdlist
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
					// 不是对局   点了提示   出提示牌   没有的话拿提示牌
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
					_this.selfbtnmsg.SelfChoose = cardlist
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
				// console.log('提示')
				// console.log(which)
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
			formatDate(inputTime) {
				// inputTime  时间戳
				var date = new Date(inputTime);
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
				var _this=this;
				_this.isfinish=true;
				_this.clearall();
				_this.accountRes = true;
				var selfuserID = _this.selfuserid;
				_this.landdoublePoint=_this.doublePoint*2;
				var resultList = [];
				var winLose=[];
				// 0输  1赢
				if (id == _this.playOrder[0]) {
					winLose=[1,0,0];
				}else{
					winLose=[0,1,1];
				}
				for(var i=0;i<_this.playOrder.length;i++){
					var point=0;
					var endDouble=_this.doublePoint;
					if(i==0){
						endDouble=_this.landdoublePoint;
					}
					if(winLose[i]==1){
						point=_this.endPoint*endDouble
					}else{
						point=-(_this.endPoint*endDouble)
					}
					
					var data={
					    "userid":_this.playOrder[i] ,
					    "point": point,
					    "goldCoin": 0,
					    "iswin": winLose[i],
					    "beginTime":_this.beginTime,
					    "gametype":1
					}
					resultList.push(data)
				}
				
				if (selfuserID == _this.type1data.landid) {
					uni.request({
					    url: _this.$requestUrl.requestUrl.finishGame,
						method:'POST',
					    data: JSON.stringify(resultList),
						header: {
							'Content-Type' : 'application/json'
						},
					    success: (res) => {
					        console.log(res.data);
					    }
					});
				}
				
				for(var i=0;i<resultList.length;i++){
					var forwho=_this.whichplay(resultList[i].userid);
					if(forwho=='left'){
						_this.leftmoney=resultList[i].point
					}else if(forwho=='right'){
						_this.rightmoney=resultList[i].point
					}else if(forwho=='self'){
						_this.selfmoney=resultList[i].point;
						if(resultList[i].iswin==1){
							_this.isWin = true;
						}else{
							_this.isWin = false;
						}
					}
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
		position:absolute;
		left:50%;
		top:50%;
		transform:translate(-50%,-50%)
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
			transform: translate(-50%, 90%) scale(1, 1);
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
		width: 85%;
		margin-left: -55%;
		height: 1.35rem;
		padding-left: 20%;
	}

	.palyS .cardshowlist {
		margin-bottom:-.28rem;
	}

	@media screen and (max-width: 736px) {
		.mycarlist {
			margin-left: -51%;
			width: 80%;
		}
	}

	.card {
		width: .58rem;
		height: 0.8rem;
		position: relative;
		margin-left: -0.3rem;
		margin-top: 0.19rem;
	}

	.card image {
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
		position: relative;
		height: .35rem;
		margin-bottom:0.5rem;
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
		background: linear-gradient( to right,
		 rgba(0,0,0,0) 0%,
		 rgba(0,0,0,0) 10%, 
		 rgba(0,0,0,0.3) 20%, 
		 rgba(0,0,0,0.4) 30%, 
		 rgba(0,0,0,0.5) 40%, 
		 rgba(0,0,0,0.6) 50%, 
		 rgba(0,0,0,0.5) 60%, 
		 rgba(0,0,0,0.4) 70%, 
		 rgba(0,0,0,0.3) 80%, 
		 rgba(0,0,0,0) 90%, 
		 rgba(0,0,0,0) 100%);
	}
	.waiting {
		text-align: center;
		position:absolute;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);
		font-size:.18rem;
	}
	.waiting text{
		color: #f3e6ac;
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
	.palyLbox .cardlist{
		margin-left:0.1rem;
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

	.accountbox .continue-btn {
		width: 0.98rem;
		height: 0.43rem;
		position: absolute;
		right: 2.32rem;
		bottom: 0.24rem;
	}

	.accountbox .continue-btn img {
		width: 100%;
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
