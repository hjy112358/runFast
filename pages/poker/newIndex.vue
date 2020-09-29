<template>
	<view class="content">
		<view class="testsend">
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
		<view class="play2 palybox">
			<!-- <view class="landhead">
				<image src="../../static/image/landlord.png" mode=""></image>
			</view> -->
			<view class="headimg">
				<image src="../../static/image/head.png" mode=""></image>
			</view>
			<view class="playbg flex alignitem-end">
				<view class="flex juscon-between alignitem-start">
					<view class="playmsg">
						<view class="flex juscon-between alignitem-center playlever">
							<view class="playlevel flex juscon-center alignitem-center">
								<text>LV1</text>
							</view>
							<text>昵称</text>
						</view>
						<view class="beans flex juscon-start alignitem-center">
							<image src="../../static/image/dou.png" mode=""></image>
							<text>1.45万</text>
						</view>
					</view>
					<view class="cardnum">
						<text>{{leftcount}}</text>
					</view>
				</view>

			</view>
		</view>

		<!-- 我 -->
		<view class="play3 palybox ">
			<view class="flex  juscon-between alignitem-start mymsg">
				<view class="pos-r">
					<view class="landhead" v-show='landself'>
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
										<text>LV1</text>
									</view>
									<text>昵称</text>
								</view>
							</view>
							<view class="beansdetail flex juscon-between alignitem-center">
								<image src="../../static/image/dou.png" class="dou"></image>
								<text>1.56万</text>
								<image src="../../static/image/add.png" class="add"></image>
							</view>
						</view>
					</view>
				</view>

			</view>
			<view class="cardlist  cardnormal mycarlist flex juscon-center">
				<view class="clearfix mycardbox">
					<view class="card big cardwrap big-card" v-for='(item,index) in play3paper' :key="index" :style="mycardleft(play3paper,item,index)"
					 @tap='checkCard(item,index)'>
						<image :src="item.src" mode=""></image>
					</view>
				</view>

				<view class="mark" v-show='showmark'>
					<text>{{markmsg}}</text>
				</view>
			</view>
			<view class="flex juscon-between doublemsg">
				<view class="double  flex alignitem-center juscon-center">
					<text>15</text>
				</view>
				<view class="chat">
					<image src="../../static/image/chat.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class=" palybox mybox ">
			<!-- 信息展示 -->
			<view class="msgbox">
				<text v-if='istext' class="istext">{{msg}}</text>
				<text v-else class="notext">{{msg}}</text>
			</view>
			<!-- 出牌展示区 -->
			<view class="cardlist clearfix cardnormal cardshowlist">
				<view class="card big cardwrap big-card" v-for='(item,index) in chooseArray' :key="index" :style="mycardleft(chooseArray,item,index)">
					<image :src="item.src" mode=""></image>
				</view>
			</view>
			<!-- 出牌按钮 -->
			<view class="paperOperate ">
				<view class="flex juscon-center alignitem-center" v-show='sendBtn'>
					<view class="flex juscon-center alignitem-center" v-show='isme'>
						<view class="nopaper" @tap='sendNo()'>
							<image src="../../static/image/cancle.png" mode=""></image>
						</view>
						<view class="hit" @tap='hit()'>
							<image src="../../static/image/hit.png" mode=""></image>
						</view>
					</view>
					<view class="countDown ">
						<view class="">
							<image src="../../static/image/time.png" mode=""></image>
							<text>{{sendTime}}</text>
						</view>
					</view>

					<view class="surePaper" @tap='showcard()'>
						<image src="../../static/image/sendpaper.png" mode=""></image>
					</view>
				</view>

			</view>
			<!-- 抢地主按钮 -->
			<view class="grabCardbox flex alignitem-center juscon-center" v-show='timeBtn'>
				<view class="noGrad " @tap='need()'>
					<image src="../../static/image/needland.png" mode=""></image>
				</view>
				<view class="countDown ">
					<view class="">
						<image src="../../static/image/time.png" mode=""></image>
						<text>{{timer}}</text>
					</view>
				</view>
				<view class="grabCard " @tap="noNeed()">
					<image src="../../static/image/noland.png" mode=""></image>
				</view>
			</view>
			<!-- 加倍 -->
			<view class="grabCardbox flex alignitem-center juscon-center" v-show='showdouble'>
				<view class="noGrad " @tap='nodouble()'>
					<image src="../../static/image/nodouble.png" mode=""></image>
				</view>
				<view class="countDown ">
					<view class="">
						<image src="../../static/image/time.png" mode=""></image>
						<text>{{doubletime}}</text>
					</view>
				</view>
				<view class="grabCard bigdouble" @tap="bigdouble()">
					<image src="../../static/image/bigdouble.png" mode=""></image>
				</view>
				<view class="grabCard " @tap="double()">
					<image src="../../static/image/doublebtn.png" mode=""></image>
				</view>
			</view>
			<!-- 要不起 -->
			<!-- -->
			<view class="grabCardbox flex alignitem-center juscon-center" v-show='nocard'>
				<view class="countDown ">
					<view class="">
						<image src="../../static/image/time.png" mode=""></image>
						<text>{{notime}}</text>
					</view>
				</view>
				<view class="nocard" @tap='sendNo()'>
					<image src="../../static/image/nobig.png" mode=""></image>
				</view>
			</view>


		</view>
		<!-- 右玩家 -->
		<view class="play4 palybox">
			<!-- <view class="landhead">
				<image src="../../static/image/landlord.png" mode=""></image>
			</view> -->
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
								<text>LV1</text>
							</view>
							<text>昵称</text>
						</view>
						<view class="beans flex juscon-start alignitem-center">
							<image src="../../static/image/dou.png" mode=""></image>
							<text>1.45万</text>
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
				<transition name="bounce1" v-if="showLeft">
					<image src="../../static/image/card/cardBack.png" class="papermove"></image>
				</transition>
				<transition name="bounce2" v-if="showSelf">
					<image src="../../static/image/card/cardBack.png" class="papermove"></image>
				</transition>
				<transition name="bounce3" v-if="showRight">
					<image src="../../static/image/card/cardBack.png" class="papermove"></image>
				</transition>
			</view>

			<view class="" class="startbtn" @tap="sendpaper()" v-show='showstart'>
				<image src="../../static/image/start.png" mode=""></image>
			</view>
		</view>
	</view>
</template>


<script>
	import uniList from '../../components/uni-list/uni-list.vue'
	import uniListItem from '../../components/uni-list-item/uni-list-item.vue'
	export default {
		data() {
			return {
				play2: [],
				play3: [],
				play4: [],
				play2paper: [],
				play3paper: [],
				play4paper: [],
				showLeft: false,
				showSelf: false,
				showRight: false,
				audio: {},
				mp3: '/static/f.mp3',
				showpaper: false, //发牌
				showstart: true, //开始游戏
				sendBtn: false,
				chooseArray: [], //选择的牌
				pushcard: [],
				timer: 5, // 计时器
				timeBtn: false,
				landlordCard: [], //地主牌
				// landlordCardBG: [{},{},{}], //地主牌
				island: false, //是否显示地主牌列表
				landsure: false, //是否抢地主
				isturn: 'other',
				testcard: [{
					card: '3',
					isHint: true
				},{
					card: '3',
					isHint: true
				},{
					card: '3',
					isHint: true
				},{
					card: '4',
					isHint: true
				}],
				nocard: false, //要不起按钮
				isfirst: true, //监测是否第一次就是null
				hintcard: [], //提示选中的牌
				istext: true,
				msg: '', //操作显示文字
				doubletime: 5, //加倍倒计时
				notime: 5, //要不起倒计时
				sendTime: 5, //出牌倒计时
				showdouble: false, //是否显示加倍
				checkland: false, //是否选择了抢地主
				checkcard: false, //是否出牌
				checkNOtime: false, //是否要不起
				isme: true, //是否第一个出牌
				markmsg: '',
				showmark: false,
				landself: false, //地主头像
				leftcount: 0, //玩家牌数
				rightcount: 0 //玩家牌数

			}
		},
		components: {
			uniList,
			uniListItem
		},
		created() {
			var _this=this;
			_this.remFn();
			var ws=null;
			ws = new WebSocket("ws://127.0.0.1:9229/c4db463f-2ccd-416b-90c1-946c80606cd9");
			 ws.onmessage = function(evt) {
					console.log(evt)
				};
			
				ws.onclose = function(evt) {
					console.log(evt)
				};
			
				ws.onopen = function(evt) {
					console.log("连接成功");
					_this.sendpaper()
				};
		},
		
		watch: {
			// 监听是否是本家出牌
			isturn(val, oldVal) {
				var which = this.hintCards(this.testcard, this.play3paper);
				if (!which) {
					this.sendBtn = false;
					this.nocard = true;
					this.noTime()
					this.showmark = true;
					this.markmsg = '您没有大过对家的牌'
				} else {
					this.sendBtn = true;
					this.sendDown();
					this.isfirst = false
				}
				if (!oldVal) {
					this.sendBtn = true;
					this.sendDown();
					this.nocard = false;
					this.showmark = false;
					this.markmsg = ''
				}
			}
		},
		methods: {
			// 测试轮到本家出牌
			test() {
				this.isturn = 'me'
			},
			//发牌
			sendpaper() {
				// 生成指定发牌张数
				var cardArr = this.dealPoker(54);
				let PersonNum = 3; // 人数
				let Arr = []; //根据玩家人数生成数组
				for (let i = 0; i < PersonNum; i++) {
					Arr.push([]);
				}
				// 给每位玩家发牌
				cardArr.forEach((v, v_index) => {
					Arr.forEach((n, n_index) => {
						if (v_index % PersonNum == n_index) {
							n.push(v);
						}
					});
				});
				this.showstart = false;
				this.showpaper = true;
				this.play2 = Arr[0];
				this.play3 = Arr[1];
				this.play4 = Arr[2];
				this.sendLeft();
			},
			// 生成扑克牌
			generatePoker() {
				// 生成扑克牌
				// 牌的顺序
				// 3,4,5,6,7,8,9,10, J , Q , K , A , 2 ,小王,大王
				// 3,4,5,6,7,8,9,10, 11, 12, 13, 14, 15, 16 ,17
				// 第一步:定义四个花色
				var cardType = ['ht', 'hx', 'mh', 'fk']; //'黑桃、红心、梅花、方块'
				// 第二步:定义13张普通牌
				var cardValue = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
				// 第三步:定义2张特殊牌，大王与小王

				var specialCard = [{
						type: 'small',
						cardvalue: 'small',
						cartext: 'JOKER',
						checked: false,
						card: 16,
						isHint: true,
						src: '../../static/image/card/16.png'
					},
					{
						type: 'big',
						cardvalue: 'big',
						cartext: 'JOKER',
						checked: false,
						card: 17,
						isHint: true,
						src: '../../static/image/card/17.png'
					}
				]
				// 第四步:根据上述数组生成54张牌
				var allCards = [];

				for (var i = 0, len1 = cardType.length; i < len1; i++) {
					for (var j = 0, len2 = cardValue.length; j < len2; j++) {
						var card;
						if (cardValue[j] == 'J') {
							card = 11
						} else if (cardValue[j] == 'Q') {
							card = 12
						} else if (cardValue[j] == 'K') {
							card = 13
						} else if (cardValue[j] == 'A') {
							card = 14
						} else if (cardValue[j] == '2') {
							card = 15
						} else {
							card = cardValue[j]
						}
						var imgsrc = '../../static/image/card/' + card + '-' + cardType[i] + '.png'
						allCards.push({
							type: cardType[i],
							cardvalue: cardValue[j],
							checked: false,
							card: card,
							cartext: cardValue[j],
							isHint: true,
							src: imgsrc
						});
					}
				}

				allCards = allCards.concat(specialCard);
				return allCards;
			},
			// 生成指定张数的牌并洗牌
			dealPoker(num) {
				if (!num || num > 54 || typeof(num) !== 'number') {
					throw '错误，传入的数字非法，只能是[1-54]';
				}
				// 生成扑克牌
				var allCards = this.generatePoker();
				// 洗牌
				var randomCards = this.shuffle(allCards);
				randomCards = randomCards.slice(0, num)
				for (var i = 0; i < 3; i++) {
					var index = Math.floor(Math.random() * randomCards.length)
					var land = randomCards[index];
					randomCards.splice(index, 1);
					this.landlordCard.push(land);
				}

				return randomCards;
			},
			// 洗牌
			shuffle(arr) {
				if (!arr) {
					throw '错误，请传入正确数组';
				}
				var newArr = arr.slice(0);
				for (var i = newArr.length - 1; i >= 0; i--) {
					// 随机范围[0,1)
					var randomIndex = Math.floor(Math.random() * (i + 1));
					var itemAtIndex = newArr[randomIndex];
					newArr[randomIndex] = newArr[i];
					newArr[i] = itemAtIndex;
				}
				return newArr;
			},


			// 改变左边跟右边玩家牌的堆叠位置
			cardtop(play) {
				var len = play.length;
				var marginT = '-0.74rem'
				return {
					marginTop: marginT
				}
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
			// 给左玩家发牌
			sendLeft() {
				var _this = this;
				var _this = this;
				//创建音频
				_this.audio = new Audio();
				_this.audio.src = _this.mp3;
				// 播放音频
				_this.audio.play();
				if (_this.play2.length > 0) {
					setTimeout(function() {
						_this.showLeft = !_this.showLeft;
					}, 100)
					setTimeout(function() {
						_this.play2paper.push(_this.play2[0]);
						_this.leftcount = _this.play2paper.length;
						_this.sortCard(_this.play2paper)
						_this.play2 = _this.play2.slice(1);
						// 发牌结束 关闭音频
						if (_this.play3.length > 0) {
							_this.showSelf = !_this.showSelf;
							_this.sendSelf()
						}
						_this.isclose()
					}, 100)
				} else {
					_this.isclose()
					return false
				}
			},
			// 给本家发牌
			sendSelf() {
				var _this = this;
				if (_this.play3.length > 0) {
					setTimeout(function() {
						_this.showSelf = !_this.showSelf;
					}, 100)
					setTimeout(function() {
						_this.play3paper.push(_this.play3[0]);
						_this.sortCard(_this.play3paper)
						_this.play3 = _this.play3.slice(1);
						if (_this.play4.length > 0) {
							_this.showRight = !_this.showRight;;
							_this.sendRight()
						}
						_this.isclose()

					}, 200)
				} else {
					_this.isclose()
					return false
				}
			},
			// 给右玩家发牌
			sendRight() {
				var _this = this;
				if (_this.play4.length > 0) {
					setTimeout(function() {
						_this.showRight = !_this.showRight;
					}, 100)
					setTimeout(function() {
						_this.play4paper.push(_this.play4[0]);
						_this.rightcount = _this.play4paper.length;
						_this.sortCard(_this.play4paper)
						_this.play4 = _this.play4.slice(1);
						if (_this.play2.length > 0) {
							_this.showLeft = !_this.showLeft;
							_this.sendLeft();
						}
						_this.isclose()
					}, 200)
				} else {
					_this.isclose()
					return false
				}
			},
			// 判断发牌是否结束
			isclose() {
				var _this = this
				if (_this.play2.length == 0 && _this.play3.length == 0 && _this.play4.length == 0) {
					_this.audio.pause();
					_this.timeBtn = true;
					_this.showpaper = false;
					_this.counDown();
				}
			},
			// 给牌排序
			sortCard(cards) {
				return cards.sort((a, b) => {
					let num = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2', 'small', 'big']
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
			// 选择牌
			checkCard(item, index) {
				// 选择牌
				this.play3paper[index].checked = !this.play3paper[index].checked;
			},
			// 出牌倒计时
			sendDown() {
				var _this = this;
				var time = setInterval(function() {
					_this.sendTime--;
					if (_this.sendTime == 0 && !(_this.checkcard)) {
						clearInterval(time);
						_this.sendBtn = false;
						_this.sendNo();
					}
				}, 1000);

			},
			// 出牌
			showcard() {
				var _this = this;
				_this.checkcard = true;
				_this.chooseArray = [];
				var newarry = _this.play3paper;
				var reloadarry = []
				if (_this.hintcard.length > 0) {
					for (var index in _this.play3paper) {
						if (_this.play3paper[index].checked) {
							_this.chooseArray.push(_this.play3paper[index]);
						} else {
							reloadarry.push(_this.play3paper[index])
						}
					}
					_this.chooseArray = _this.hintcard;
					_this.play3paper = reloadarry;
					_this.sendBtn = false;
				} else {
					var checkd = []
					for (var index in _this.play3paper) {
						if (_this.play3paper[index].checked) {
							checkd.push(_this.play3paper[index]);
						} else {
							reloadarry.push(_this.play3paper[index])
						}
					}
					var result = _this.judgeCards(checkd);
					var last = _this.judgeCards(_this.testcard);
					if (result) {
						var follow = _this.follow(last, result);
						if (follow) {
							_this.chooseArray = checkd
							_this.play3paper = reloadarry;
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

			// 叫地主倒计时
			counDown() {
				var _this = this;
				var time = setInterval(function() {
					_this.timer--;
					if (_this.timer == 0 && !(_this.checkland)) {
						clearInterval(time);
						_this.timeBtn = false;
						_this.noNeed();
					}
				}, 1000);

			},
			// 抢地主
			need() {
				var _this = this;
				_this.checkland = true;
				for (var i = 0; i < _this.landlordCard.length; i++) {
					_this.play3paper.push(_this.landlordCard[i]);
				}
				console.log(_this.landlordCard)
				_this.sortCard(_this.play3paper);
				_this.island = true;
				_this.timeBtn = false;
				_this.landsure = true;
				_this.msg = '叫地主';
				_this.istext = true;
				_this.closemsg();
				_this.landself = true;
				setTimeout(function() {
					_this.showdouble = true;
					_this.doubleDown()
				}, 1500)

			},
			// 不抢地主
			noNeed() {
				var _this = this;
				_this.checkland = true;
				_this.timeBtn = false;
				_this.msg = '不叫';
				_this.istext = false;
				_this.closemsg();
				setTimeout(function() {
					_this.showdouble = true;
					_this.doubleDown()
				}, 1500)
			},
			// 加倍倒计时
			doubleDown() {
				var _this = this;
				var time = setInterval(function() {
					_this.doubletime--;
					if (_this.doubletime == 0 && !(_this.checkdouble)) {
						clearInterval(time);
						_this.showdouble = false;
						_this.nodouble();
					}
				}, 1000);

			},
			// 不加倍
			nodouble() {
				this.showdouble = false;
				this.msg = '不加倍';
				this.checkdouble = true;
				this.istext = false;
				this.closemsg()
			},
			// 超级加倍
			bigdouble() {
				this.showdouble = false;
				this.msg = '超级加倍';
				this.istext = false;
				this.checkdouble = true;
				this.closemsg()
			},
			// 加倍
			double() {
				this.showdouble = false;
				this.checkdouble = true;
				this.msg = '加倍';
				this.istext = false;
				this.closemsg()
			},
			// 要不起倒计时
			noTime() {
				var _this = this;
				var time = setInterval(function() {
					_this.notime--;
					if (_this.notime == 0 && !(_this.checkNOtime)) {
						clearInterval(time);
						_this.nocard = false;
						_this.sendNo();
					}
				}, 1000);
			},
			// 不出
			sendNo() {
				this.sendBtn = false;
				this.nocard = false;
				this.msg = '不出';
				this.istext = false;
				this.showmark = false;
				this.checkNOtime = true;
				this.closemsg()
			},

			// 提示
			hit() {
				var which = this.hintCards(this.testcard, this.play3paper)
				console.log(which);
				this.play3paper.forEach(item => {
					item.checked = false;
					this.hintcard = []
				})
				if (which) {
					for (var i = 0; i < which.length; i++) {
						for (var j = 0; j < this.play3paper.length; j++) {
							if (which[i] == this.play3paper[j].card && this.play3paper[j].checked == false) {
								this.play3paper[j].checked = true;
								this.hintcard.push(this.play3paper[j])
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
			closemsg() {
				var _this = this
				setTimeout(function() {
					_this.msg = ''
				}, 1000)

			}

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

	.play2 .playbg {
		margin-left: -0.2rem
	}

	.play2 {
		position: absolute;
		top: .6rem;
		left: .5rem;
		height: 1.4rem;
		overflow: hidden;
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

	.play2 .playmsg,
	.play4 .playmsg {
		height: 0.42rem;
	}

	.play2 .playlever,
	.play4 .playlever {
		margin-top: -.05rem
	}

	.play3 .playlever {
		margin-top: -0.05rem;
		margin-left: 0.3rem;
	}

	.play3 .playmsg {
		margin-right: 0;
		margin-bottom: .05rem;
		background: url(../../static/image/self.png) no-repeat;
		height: .2rem;
		background-size: 100% 100%;
	}

	.play4 .playmsg {
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

	.play3 .headimg,
	.play3 .playbg {
		height: 1.56rem;
	}

	.headimg image {
		width: 1.22rem;
		height: 1.56rem;
	}

	.play4 .headimg image {
		transform: rotateY(180deg)
	}

	.play4 {
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
		bottom: .4rem;
		width: 85%;
		margin-left: -60%;
		height: 1.35rem;
		padding-left: 20%;
	}


	@media screen and (max-width: 736px) {
		.mycarlist {
			margin-left: -53%;
			width: 80%;
		}
	}

	.card {
		width: .78rem;
		height: 1.16rem;
		position: relative;
		margin-left: -0.55rem;
		margin-top: 0.19rem;
	}

	.card image {
		width: .78rem;
		height: 1.16rem;
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
		transform: translateY(-65%)
	}

	.mybox .card,
	.mybox .card image {
		width: .5rem;
		height: .8rem;
	}
	.mybox .card{
		margin-left:-.25rem
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

	.landhead image {
		width: .35rem;
		height: .39rem;
	}

	.play4 .landhead {
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
