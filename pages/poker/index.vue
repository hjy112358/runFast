<template>
	<!-- 出牌效果 -->
	<view class="content">
		<!-- <view class="play1 palybox">
			<text class="player">玩家1</text>
			<view class="cardlist clearfix cardnormal">
				<view class="card big card big-card" v-for='(item,index) in play1paper' :key="index" :style="cardleft(play1paper)">
					<view class="nocheck"></view>
					<view class="card-num-left big-num" :style="cardcolor(item)">{{item.cardvalue}}</view>
					<view class="carimg">
						<image :src="cardimg(item)" mode="" class="card-type"></image>
						<view class="card-num-right big-num" :style="cardcolor(item)">{{item.cardvalue}}</view>
					</view>
				</view>
			</view>
		</view> -->
		<view class="play2 palybox">
			<view class="playtext">
				<text class="player">玩家2</text>
			</view>
			<view class="listrans">
				<view class="cardlist clearfix">
					<view class="card big card big-card" v-for='(item,index) in play2paper' :key="index" :style="cardtop(play2paper)">
						<view class="nocheck"></view>
						<view class="card-num-left big-num" :style="cardcolor(item)">{{item.cardvalue}}</view>
						<view class="carimg">
							<image :src="cardimg(item)" mode="" class="card-type"></image>
							<view class="card-num-right big-num" :style="cardcolor(item)">{{item.cardvalue}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="play3 palybox mybox">
			<view class="paperOperate clearfix" v-show='sendBtn'>
				<view class="nopaper" @tap='sendNo()'>
					<text>不出</text>
				</view>
				<view class="surePaper" @tap='showcard()'>
					<text>出牌</text>
				</view>
			</view>
			<view class="cardlist clearfix cardnormal">
				<view class="card big card big-card" v-for='(item,index) in play3paper' :key="index" :style="mycardleft(play3paper,item)"
				 @mousemove="mousemove(item)" @mouseup="mouseup(item)" @mousedown="mousedown(item)">
					<view class="nocheck"></view>
					<view class="card-num-left big-num" :style="cardcolor(item)">{{item.cardvalue}}</view>
					<view class="carimg">
						<image :src="cardimg(item)" mode="" class="card-type"></image>
						<view class="card-num-right big-num" :style="cardcolor(item)">{{item.cardvalue}}</view>
					</view>
				</view>
			</view>
			<text class="player">我</text>
		</view>
		<view class="play4 palybox">
			<view class="playtext">
				<text class="player">玩家4</text>
			</view>
			<view class="listrans">
				<view class="cardlist clearfix">
					<view class="card big card big-card" v-for='(item,index) in play4paper' :key="index" :style="cardtop(play4paper)">
						<view class="nocheck"></view>
						<view class="card-num-left big-num" :style="cardcolor(item)">{{item.cardvalue}}</view>
						<view class="carimg">
							<image :src="cardimg(item)" mode="" class="card-type"></image>
							<view class="card-num-right big-num" :style="cardcolor(item)">{{item.cardvalue}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="paperCenter" v-show='showpaper'>
			<view class="paperbox">
				<image src="/static/paper.png" class="paper"></image>
			</view>
		<!-- 	<transition name="bounce" v-if="show">
				<image src="/static/paper.png" class="papermove"></image>
			</transition> -->
			<transition name="bounce1" v-if="show1">
				<image src="/static/paper.png" class="papermove"></image>
			</transition>
			<transition name="bounce2" v-if="show2">
				<image src="/static/paper.png" class="papermove"></image>
			</transition>
			<transition name="bounce3" v-if="show3">
				<image src="/static/paper.png" class="papermove"></image>
			</transition>
			<text class="send" @tap="sendpaper()">发牌</text>
		</view>
	</view>
</template>

<script>
	import uniList from '../../components/uni-list/uni-list.vue'
	import uniListItem from '../../components/uni-list-item/uni-list-item.vue'
	export default {
		data() {
			return {
				play1: [],
				play2: [],
				play3: [],
				play4: [],
				play1paper: [],
				play2paper: [],
				play3paper: [],
				play4paper: [],
				show: true,
				show1: false,
				show2: false,
				show3: false,
				audio: {},
				mp3: '/static/f.mp3',
				moveChange: false,
				first: false,
				showpaper: true,
				sendBtn: false
			}
		},
		components: {
			uniList,
			uniListItem
		},
		created() {
			window.addEventListener('resize', this.handleResize)
		},
		methods: {
			sendpaper() {
				// 生成指定发牌张数
				var sendcard = this.dealPoker(52);
				var cardOdd = []
				var cardEven = []
				// 随机拆分成四组，依次分发给玩家
				for (var i = 0; i < sendcard.length; i++) {
					if (i % 2 == 0) {
						cardEven.push(sendcard[i])
					} else {
						cardOdd.push(sendcard[i])
					}
				}
				for (var j = 0; j < cardEven.length; j++) {
					if (j % 2 == 0) {
						this.play1.push(cardEven[j])
					} else {
						this.play3.push(cardEven[j])
					}
				}
				for (var k = 0; k < cardOdd.length; k++) {
					if (k % 2 == 0) {
						this.play2.push(cardOdd[k])
					} else {
						this.play4.push(cardOdd[k])
					}
				}
				this.sendplay()
			},
			generatePoker() {
				// 生成扑克牌
				// 第一步:定义四个花色
				var cardType = ['ht', 'hx', 'mh', 'fk']; //'黑桃、红心、梅花、方块'
				// 第二步:定义13张普通牌
				var cardValue = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
				// 第三步:定义2张特殊牌，大王与小王
				// var specialCard = ['big', 'small'];
				// 第四步:根据上述数组生成54张牌
				var allCards = [];
				for (var i = 0, len1 = cardType.length; i < len1; i++) {
					for (var j = 0, len2 = cardValue.length; j < len2; j++) {
						allCards.push({
							type: cardType[i],
							cardvalue: cardValue[j],
							checked: false
						});
					}
				}
				// allCards = allCards.concat(specialCard);
				return allCards;
			},
			// 发牌
			dealPoker(num) {
				if (!num || num > 54 || typeof(num) !== 'number') {
					throw '错误，传入的数字非法，只能是[1-54]';
				}
				// 生成扑克牌
				var allCards = this.generatePoker();
				// 洗牌
				var randomCards = this.shuffle(allCards);
				return randomCards.slice(0, num);
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
			// 根据花色显示相应颜色
			cardcolor(item) {
				var color;
				if (item.type == 'fk' || item.type == 'hx') {
					color = '#f00'
				} else if (item.type == 'mh' || item.type == 'ht') {
					color = '#000'
				}
				return {
					color: color
				};
			},
			// 花色图片
			cardimg(item) {
				var imgsrc = '';
				if (item.type == 'ht') {
					imgsrc = '../../static/ht.png'
				} else if (item.type == 'hx') {
					imgsrc = '../../static/hx.png'
				} else if (item.type == 'mh') {
					imgsrc = '../../static/mh.png'
				} else if (item.type == 'fk') {
					imgsrc = '../../static/fk.png'
				}
				return imgsrc
			},
			cardleft(play) {
				var len = play.length;
				var marginL = '-36rpx'
				// if (parseInt(len / 6) >= 1) {
				// 	marginL = '-36rpx'
				// } else {
				// 	marginL = '-34rpx'
				// }
				return {
					marginLeft: marginL
				}
			},
			cardtop(play) {
				var len = play.length;
				var marginT = '-74rpx'
				// if (parseInt(len / 6) >= 1) {
				// 	marginT = '-74rpx'
				// } else {
				// 	marginT = '-64rpx'
				// }
				return {
					marginTop: marginT
				}
			},
			mycardleft(play, item) {
				var len = play.length;
				var marginL = '-60rpx';
				var marginT = 0;
				// if (parseInt(len / 6) >= 1) {
				// 	marginL = '-60rpx'
				// }   else {
				// 	marginL = '-34rpx'
				// }
				if (item.checked) {
					marginT = '-20rpx'
				} else {
					marginT = '0'
				}
				return {
					marginLeft: marginL,
					marginTop: marginT
				}
			},
			sendplay() {
				var _this = this;
				//创建音频
				_this.audio = new Audio();
				_this.audio.src = _this.mp3;
				// 播放音频
				_this.audio.play();
				if (_this.play2.length > 0) {
					_this.show1 = !_this.show1;
					setTimeout(function() {
						_this.play2paper.push(_this.play1[0]);
						_this.sortCard(_this.play2paper)
						_this.play2 = _this.play2.slice(1)
						_this.show1 = !_this.show1;
					}, 100)
					setTimeout(function() {
						_this.sendThree()
						_this.show2 = !_this.show2;
					}, 100)
				} else {
					_this.showpaper = false;
					_this.sendBtn = true
					return false;
				}
			},
			// sendTwo() {
			// 	var _this = this;
			// 	if (_this.play2.length > 0) {
			// 		setTimeout(function() {
			// 			_this.show1 = !_this.show1;
			// 		}, 100)
			// 		setTimeout(function() {
			// 			_this.play2paper.push(_this.play2[0]);
			// 			_this.sortCard(_this.play2paper)
			// 			_this.play2 = _this.play2.slice(1);
			// 			// 发牌结束 关闭音频
			// 			// if (_this.play2.length > 0) {
			// 			_this.show2 = !_this.show2;
			// 			_this.sendThree()
			// 			// } else {
			// 			// 	_this.showpaper = false;
			// 			// 	_this.sendBtn=true
			// 			// 	_this.audio.pause();
			// 			// }

			// 		}, 200)
			// 	} else {
			// 		_this.showpaper = false;
			// 		_this.sendBtn = true
			// 		return false
			// 	}
			// },
			sendThree() {
				var _this = this;
				if (_this.play3.length > 0) {
					setTimeout(function() {
						_this.show2 = !_this.show2;
					}, 100)
					setTimeout(function() {
						_this.play3paper.push(_this.play3[0]);
						_this.sortCard(_this.play3paper)
						_this.play3 = _this.play3.slice(1);
						// 发牌结束 关闭音频
						// if (_this.play3.length > 0) {
						_this.show3 = !_this.show3;;
						_this.sendFour()
						// } else {
						// 	_this.showpaper = false;
						// 	_this.sendBtn=true
						// 	_this.audio.pause();
						// }

					}, 200)
				} else {
					_this.showpaper = false;
					_this.sendBtn = true
					return false
				}
			},
			sendFour() {
				var _this = this;
				if (_this.play4.length > 0) {
					setTimeout(function() {
						_this.show3 = !_this.show3;
					}, 100)
					setTimeout(function() {
						_this.play4paper.push(_this.play4[0]);
						_this.sortCard(_this.play4paper)
						_this.play4 = _this.play4.slice(1);
						// 发牌结束 关闭音频
						if (_this.play4.length > 0) {
							_this.sendplay();
						} else {
							_this.showpaper = false;
							_this.sendBtn = true
							_this.audio.pause();
						}
					}, 200)
				} else {
					_this.showpaper = false;
					_this.sendBtn = true
					console.log(_this.showpaper)
					return false
				}
			},
			sortCard(cards) {
				return cards.sort((a, b) => {
					let num = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2']
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
			mousedown(item) {
				console.log('mousedown')
				console.log(item.type + item.cardvalue)
				this.moveChange = true
				// this.first = !event.checked
			},
			mousemove(item) {
				if (this.moveChange) {
					console.log('mousemove', event)
					item.checked = !item.checked
				}
			},
			mouseup(item) {
				console.log('mouseup')
				// this.moveChange = false
			},
			// 出牌
			showcard() {

			},
			// 出牌规则
			cardRule() {
				//以下为出牌规则
				var rules = {
					_rules: [
						new danzRule(),
						new duiRule(),
						new sandRule(),
						new zandRule(),
						new shunzRule(),
						new liandRule()
					],
					valids: function(_pukes, _curPukes) {
						for (var i = 0; i < this._rules.length; i++) {
							if (this._rules[i].valid(_pukes, _curPukes)) {
								return true;
							}
						}
						return false;
					}
				};

				function danzRule() {
					//单张规则
				}
				danzRule.prototype.valid = function(_pukes, _curPukes) {
					//校验
					var pukes = _pukes; //玩家的牌
					var curPukes = _curPukes; //左面的牌
					if (pukes && pukes.length == 1) {
						//比较牌面值
						if (!curPukes || !curPukes.length) {
							return true;
						}
						if (curPukes[0].dians == 2 && pukes[0].dians < 15) {
							//2特殊处理
							return false;
						}
						if (pukes[0].dians == 2 && curPukes[0].dians < 15) {
							//2特殊处理
							return true;
						}
						return pukes[0].dians > curPukes[0].dians;
					}
					return false;
				}

				function duiRule(_pukes, _curPukes) {
					//两张规则
				}
				duiRule.prototype.valid = function(_pukes, _curPukes) {
					//校验
					var pukes = _pukes; //玩家的牌
					var curPukes = _curPukes; //左面的牌
					if (pukes && pukes.length == 2) {
						//比较牌面值
						if (pukes[0].dians > 14 && pukes[1].dians > 14) {
							return true;
						}
						if (pukes[0].dians != pukes[1].dians) {
							return false;
						}
						if (!curPukes || !curPukes.length) {
							return true;
						} else {
							if (curPukes.length != 2) {
								return false;
							}
							if (curPukes[0].dians > 14 && curPukes[1].dians > 14) {
								return false;
							}
							if (curPukes[0].dians != curPukes[1].dians) {
								return false;
							}
							if (curPukes[0].dians == 2) {
								return false;
							}
						}
						if (pukes[0].dians == 2) {
							return true;
						}
						return pukes[0].dians > curPukes[0].dians;
					}
					return false;
				}

				function sandRule() {
					//三带
				}
				sandRule.prototype.valid = function(_pukes, _curPukes) {
					//校验
					var pukes = _pukes; //玩家的牌
					var curPukes = _curPukes; //左面的牌
					if (pukes && (pukes.length >= 3)) {
						//比较牌面值
						var books = getBooks(pukes);
						if (!valid(books)) return false;
						if (!curPukes || !curPukes.length) return true;
						if (curPukes.length != books.length) return false;
						var books2 = getBooks(curPukes);
						if (!valid(books2)) return false;
						return getSum(books) > getSum(books2);
					}
					return false;

					function getSum(books) {
						var sum = 0;
						for (var i = 0; i < books.length; i++) {
							if (books[i] == 3) {
								if (i == 2) return 9999;
								sum += i;
							}
						}
						return sum;
					}

					function valid(books) {
						//验证三带是否有效
						var counts3 = 0,
							countsd = 0,
							d2 = true,
							start = false,
							startIndex = -1;

						for (var i = 0; i < books.length; i++) {
							if (start && books[i] == 3 && startIndex != (i - 1)) {
								return false;
							} else {
								startIndex = i;
							}
							if (books[i] == 3) {
								if (!start) {
									start = true;
									startIndex = i;
								}
								counts3++;
							}
							if (books[i] == 1) {
								d2 = false;
							}
						}

						for (var i = 0; i < books.length; i++) {
							if (d2 && books[i] == 2) {
								countsd++;
							} else if (!d2 && books[i] == 1) {
								countsd++;
							}
						}
						return counts3 > 0 && counts3 == countsd;
					}

					function getBooks(pukes) {
						//返回三带的每个点数的个数
						var books = [];
						for (var i = 0; i < pukes.length; i++) {
							if (!books[pukes[i].dians]) {
								books[pukes[i].dians] = 1;
							} else {
								books[pukes[i].dians]++;
							}
						}
						return books;
					}
				}


				function zandRule() {
					//炸弹
				}
				zandRule.prototype.valid = function(_pukes, _curPukes) {
					var pukes = _pukes; //玩家的牌
					var curPukes = _curPukes; //左面的牌
					if (pukes && pukes.length == 4) {
						if (!allEqual(pukes)) {
							return false;
						}
						if (!curPukes || (curPukes.length > 0 && curPukes.length != 4) || !allEqual(curPukes)) {
							return true;
						} else {
							if (pukes[0].dians == 2) {
								return true;
							}
							if (curPukes[0].dians == 2) {
								return false;
							}
							return pukes[0].dians > curPukes[0].dians;
						}

					}
					return false;

					function allEqual(pukes) {
						if (!pukes || !pukes.length) return false;
						var base = pukes[0].dians;
						for (var i = 1; i < pukes.length; i++) {
							if (base != pukes[i].dians) {
								return false;
							}
						}
						return true;
					}

				}

				function liandRule() {
					//连对
				}
				liandRule.prototype.valid = function(_pukes, _curPukes) {
					var pukes = _pukes; //玩家的牌
					var curPukes = _curPukes; //左面的牌
					if (pukes && pukes.length >= 6) {
						if (!verificationCoherence(pukes)) {
							return false;
						}
						if (!curPukes || curPukes.length <= 0) {
							return true;
						}
						if (!verificationCoherence(curPukes)) {
							return false;
						}
						if (pukes.length != curPukes.length) {
							return false;
						}
						return getSumDians(pukes) > getSumDians(curPukes);
					}
					return false;

					function getSumDians(pukes) {
						var sum = 0;
						for (var i = 0; i < pukes.length; i++) {
							sum += pukes[i].dians;
						}
						return sum;
					}

					function verificationCoherence(pukes) {
						//验证连贯性
						if (!pukes || !pukes.length) return false;
						var books = [];
						for (var i = 0; i < pukes.length; i++) {
							if (pukes[i].dians == 2 || pukes[i].dians > 14) {
								return false;
							}
							if (!books[pukes[i].dians]) {
								books[pukes[i].dians] = 1;
							} else {
								books[pukes[i].dians]++;
							}
							if (books[pukes[i].dians] > 2) {
								return false;
							}
						}
						var start = false;

						for (var i = 0; i < books.length; i++) {
							if (books[i] && books[i] != 2) {
								return false;
							}
							if (books[i] == 2 && !start) {
								start = true;
							}
							if (start && books[i] != 2) {
								return false;
							}
						}

						return true;
					}
				}

				function shunzRule() {
					//顺子
				}
				shunzRule.prototype.valid = function(_pukes, _curPukes) {
					var pukes = _pukes; //玩家的牌
					var curPukes = _curPukes; //左面的牌
					if (pukes && pukes.length >= 5) {
						if (!verificationCoherence(pukes)) {
							return false;
						}
						if (!curPukes || curPukes.length <= 0) {
							return true;
						}
						if (!verificationCoherence(curPukes)) {
							return false;
						}
						if (pukes.length != curPukes.length) {
							return false;
						}
						return getSumDians(pukes) > getSumDians(curPukes);
					}
					return false;

					function getSumDians(pukes) {
						var sum = 0;
						for (var i = 0; i < pukes.length; i++) {
							sum += pukes[i].dians;
						}
						return sum;
					}

					function verificationCoherence(pukes) {
						//验证连贯性
						if (!pukes || !pukes.length) return false;
						var books = [];
						for (var i = 0; i < pukes.length; i++) {
							if (pukes[i].dians == 2 || pukes[i].dians > 14) {
								return false;
							}
							if (!books[pukes[i].dians]) {
								books[pukes[i].dians] = 1;
							} else {
								return false;
							}
						}
						var start = false;
						for (var i = 0; i < books.length; i++) {
							if (books[i] == 1 && !start) {
								start = true;
							}
							if (start && !books[i]) {
								return false;
							}
						}
						return true;
					}

				}
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
		justify-content: center;
	}

	.carimg image {
		width: 40rpx;
		height: 40rpx;
	}

	.mybox .carimg image {
		width: 50rpx;
		height: 50rpx;
	}

	.card-num-left {
		text-align: left;
	}

	.card-num-right {
		text-align: right;
	}

	.card {
		width: 50rpx;
		height: 88rpx;
		border: 1px solid #ccc;
		border-image: initial;
		border-color: #ccc;
		background: #f1f1f1;
		border-radius: 4px;
		font-family: monospace;
		padding: 3px;
		position: relative
	}

	.mybox .card {
		width: 80rpx;
		height: 126rpx;
	}

	.cardnormal .card {
		float: left;
	}

	.big-num {
		font-size: 18rpx;
		font-weight: bold;
	}

	.mybox .big-num {
		font-size: 30rpx;
		font-weight: bold;
	}

	.clearfix:after {
		content: "";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}

	.clearfix {
		*zoom: 1;
	}

	.listrans .card {
		transform: rotate(90deg);
	}

	.play4 .listrans .card {
		transform: rotate(-90deg);
	}

	.listrans .card {
		margin-top: -50rpx;
		margin-left: 0
	}

	image.paper,
	image.papermove {
		width: 50rpx;
		height: 100rpx
	}

	.paperbox {
		position: relative;
	}

	.send {
		font-size: 15rpx;
		display: block;
		width: 40rpx;
		height: 25rpx;
		background: #F0AD4E;
		color: #fff;
		text-align: center;
		line-height: 25px;
		border-radius: 8rpx;
		margin: 0 auto;
	}

	.paperCenter {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
	}

	.play2 .playtext {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.play4 .playtext {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.play4 .playtext {
		float: right;
	}

	.player,
	.playtext .player {
		font-size: 20rpx;
		display: block;
		margin: 0 auto;

	}

	.palybox {
		text-align: center;
	}

	.play1 {
		position: absolute;
		top: 10rpx;
		left: 50%;
		transform: translateX(-50%)
	}

	.play3 {
		position: absolute;
		bottom: 10rpx;
		left: 50%;
		transform: translateX(-50%)
	}

	.play2 {
		position: absolute;
		top: 50%;
		left: 10rpx;
		transform: translateY(-50%);
	}

	.play4 {
		position: absolute;
		top: 50%;
		right: 10rpx;
		transform: translateY(-50%);
	}

	.play2 .player {
		width: 20rpx;
	}

	.play4 .player {
		width: 20rpx;
	}

	.play2 image {
		transform: rotate(0deg);
	}

	.play2 .listrans {
		margin-left: 40rpx
	}

	.play4 .listrans {
		margin-right: 40rpx
	}

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

	.bounce-enter-active {
		animation: bounce-in .1s;
	}

	.bounce-leave-active {
		animation: bounce-in .1s;
	}

	.bounce1-enter-active {
		animation: bounce1-in .1s;
	}

	.bounce1-leave-active {
		animation: bounce1-in .1s;
	}

	.bounce2-enter-active {
		animation: bounce2-in .1s;
	}

	.bounce2-leave-active {
		animation: bounce2-in .1s;
	}

	.bounce3-enter-active {
		animation: bounce3-in .1s;
	}

	.bounce3-leave-active {
		animation: bounce3-in .1s;
	}

	.papermove {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		margin-top: -17rpx;
	}

	/* 发牌时的动画过渡 */
	/* 玩家1 */
	@keyframes bounce-in {
		from {
			top: 10%;
		}

		to {
			top: -80%;
		}
	}

	/* 玩家2 */
	@keyframes bounce1-in {
		from {
			left: 0%;
		}

		to {
			left: -400%;
		}
	}

	/* 玩家3 */
	@keyframes bounce2-in {
		from {
			top: 80%;
		}

		to {
			top: 200%;
		}
	}

	/* 玩家4 */
	@keyframes bounce3-in {

		from {
			left: 0%;
		}

		to {
			left: 400%;
		}
	}

	.paperOperate {
		margin-bottom: 45rpx;
	}

	.nopaper,
	.surePaper {
		font-size: 16rpx;
		float: left;
		padding: 10rpx 20rpx;
		background: #008000;
		border-radius: 10rpx;
		color: #fff;
	}

	.nopaper {
		margin-right: 10rpx
	}
</style>
