<template>
	<view class="content">
		<view class="">
			<button type="primary" @tap='test()'>测试</button>
		</view>
		<view class="landlordCard clearfix">
			<view class="card big cardohter big-card " v-for='(item,index) in landlordCard' :key="index" v-show='island'>
				<view class="" v-if="landsure">
					<view class="card-num-left big-num" :style="cardcolor(item)">{{item.cartext}}</view>
					<view class="carimg">
						<image :src="cardimg(item)" mode="" class="card-type"></image>
						<view class="card-num-right big-num" :style="cardcolor(item)">{{item.cartext}}</view>
					</view>
				</view>
				<view class="" v-else>
					<image src="/static/paper.png" class="paper"></image>
				</view>

			</view>
		</view>
		<view class="play2 palybox">
			<view class="playtext">
				<text class="player">左玩家</text>
			</view>
			<view class="listrans">
				<view class="cardlist clearfix">
					<view class="card big cardohter big-card " v-for='(item,index) in play2paper' :key="index" :style="cardtop(play2paper)">
						<image src="/static/paper.png" class="paper"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="play3 palybox mybox">
			<!-- 出牌展示区 -->
			<view class="cardlist clearfix cardnormal cardshowlist">
				<view class="card big cardwrap big-card" v-for='(item,index) in chooseArray' :key="index" :style="mycardleft(chooseArray,item,index)">
					<view class="card-num-left big-num" :style="cardcolor(item)">{{item.cartext}}</view>
					<view class="carimg">
						<image :src="cardimg(item)" mode="" class="card-type"></image>
						<view class="card-num-right big-num" :style="cardcolor(item)">{{item.cartext}}</view>
					</view>
				</view>
			</view>
			<!-- 出牌按钮 -->
			<view class="paperOperate clearfix" >
				<view class="" v-show='sendBtn'>
					<view class="nopaper" @tap='sendNo()'>
						<text>不出</text>
					</view>
					<view class="hit" @tap='hit()'>
						<text>提示 </text>
					</view>
					<view class="surePaper" @tap='showcard()'>
						<text>出牌</text>
					</view>
				</view>
				
				<view class="nocard" @tap='sendNo()' v-show='nocard'>
					<text>要不起</text>
				</view>
			</view>

			<!-- 抢地主按钮 -->
			<view class="grabCardbox clearfix" v-show='timeBtn'>
				<view class="noGrad fl" @tap='noNeed()'>
					<text>不抢</text>
				</view>
				<view class="countDown fl">
					<view class="">
						<image src="../../static/time.png" mode=""></image>
						<text>{{timer}}</text>
					</view>
				</view>
				<view class="grabCard fl" @tap="need()">
					<text>抢地主</text>
				</view>
			</view>
			<view class="cardlist clearfix cardnormal mycarlist">
				<view class="card big cardwrap big-card" v-for='(item,index) in play3paper' :key="index" :style="mycardleft(play3paper,item,index)"
				 @tap='checkCard(item,index)'>
					<view class="card-num-left big-num" :style="cardcolor(item)">{{item.cartext}}</view>
					<view class="carimg">
						<image :src="cardimg(item)" mode="" class="card-type"></image>
						<view class="card-num-right big-num" :style="cardcolor(item)">{{item.cartext}}</view>
					</view>
					
				</view>
				<view class="mark" v-show='nocard'>
					<text>您没有牌大过上家</text>
				</view>
			</view>
			<text class="player">我</text>
		</view>
		<view class="play4 palybox">
			<view class="playtext">
				<text class="player">右玩家</text>
			</view>
			<view class="listrans">
				<view class="cardlist clearfix ">
					<view class="card big cardohter big-card" v-for='(item,index) in play4paper' :key="index" :style="cardtop(play4paper)">
						<image src="/static/paper.png" class="paper"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="paperCenter" v-show='showpaper'>
			<view class="paperbox">
				<image src="/static/paper.png" class="paper"></image>
			</view>
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
				play2: [],
				play3: [],
				play4: [],
				play2paper: [],
				play3paper: [],
				play4paper: [],
				show1: false,
				show2: false,
				show3: false,
				audio: {},
				mp3: '/static/f.mp3',
				showpaper: true,
				sendBtn: false,
				chooseArray: [], //选择的牌
				pushcard: [],
				timer: 5, // 计时器
				timeBtn: false,
				landlordCard: [], //地主牌
				island: false, //是否显示地主牌列表
				landsure: false, //是否抢地主
				isturn: 'other',
				testcard :[{card:'3',isHint:true}],
				nocard:false, //要不起按钮
				isfirst:true,   //监测是否第一次就是null
				hintcard:[]   //提示选中的牌
			}
		},
		components: {
			uniList,
			uniListItem
		},
		created() {
			window.addEventListener('resize', this.handleResize)
		},
		watch: {
			// 监听是否是本家出牌
			isturn(val, oldVal) { 
				var which = this.hintCards(this.testcard, this.play3paper);
				if(!which){
					this.sendBtn=false;
					this.nocard=true;
					
				}else{
					this.sendBtn=true;
					this.isfirst=false
				}
				if(!oldVal){
					this.sendBtn=true;
					this.nocard=false
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
				this.play2 = Arr[0]
				this.play3 = Arr[1]
				this.play4 = Arr[2]
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
						isHint: true
					},
					{
						type: 'big',
						cardvalue: 'big',
						cartext: 'JOKER',
						checked: false,
						card: 17,
						isHint: true
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
						allCards.push({
							type: cardType[i],
							cardvalue: cardValue[j],
							checked: false,
							card: card,
							cartext: cardValue[j],
							isHint: true
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
			// 根据花色显示相应颜色
			cardcolor(item) {
				var color;
				if (item.type == 'fk' || item.type == 'hx' || item.type == 'big') {
					color = '#f00'
				} else if (item.type == 'mh' || item.type == 'ht' || item.type == 'small') {
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
				} else if (item.type == 'big') {
					imgsrc = '../../static/big.png'
				} else if (item.type == 'small') {
					imgsrc = '../../static/small.png'
				}
				return imgsrc
			},
			// 改变左边跟右边玩家牌的堆叠位置
			cardtop(play) {
				var len = play.length;
				var marginT = '-74rpx'
				return {
					marginTop: marginT
				}
			},
			// 改变当前自己牌的堆叠位置
			mycardleft(play, item, index) {
				var marginL = '-50rpx';
				var marginT = '19rpx';
				if (item.checked) {
					marginT = '0rpx'
				} else {
					marginT = '19rpx'
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
						_this.show1 = !_this.show1;
					}, 100)
					setTimeout(function() {
						_this.play2paper.push(_this.play2[0]);
						_this.sortCard(_this.play2paper)
						_this.play2 = _this.play2.slice(1);
						// 发牌结束 关闭音频
						if (_this.play3.length > 0) {
							_this.show2 = !_this.show2;
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
						_this.show2 = !_this.show2;
					}, 100)
					setTimeout(function() {
						_this.play3paper.push(_this.play3[0]);
						_this.sortCard(_this.play3paper)
						_this.play3 = _this.play3.slice(1);
						// 发牌结束 关闭音频
						if (_this.play4.length > 0) {
							_this.show3 = !_this.show3;;
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
						_this.show3 = !_this.show3;
					}, 100)
					setTimeout(function() {
						_this.play4paper.push(_this.play4[0]);
						_this.sortCard(_this.play4paper)
						_this.play4 = _this.play4.slice(1);
						// 发牌结束 关闭音频
						if (_this.play2.length > 0) {
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
					_this.island = true
				}
			},
			// 叫地主倒计时
			counDown() {
				var _this = this;
				var time = setInterval(function() {
					_this.timer--;
					if (_this.timer == 0) {
						clearInterval(time);
						_this.timeBtn = false;
					}
				}, 1000);

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
			// 出牌
			showcard() {
				this.chooseArray = [];
				var newarry = this.play3paper;
				var reloadarry = []
				if(this.hintcard.length>0){
					for (var index in this.play3paper) {
						if (this.play3paper[index].checked) {
							this.chooseArray.push(this.play3paper[index]);
						} else {
							reloadarry.push(this.play3paper[index])
						}
					}
					this.chooseArray=this.hintcard;
					this.play3paper = reloadarry;
				}else{
					var checkd=[]
					for (var index in this.play3paper) {
						if (this.play3paper[index].checked) {
							checkd.push(this.play3paper[index]);
						} else {
							reloadarry.push(this.play3paper[index])
						}
					}
					var result = this.judgeCards(checkd);
					var last=this.judgeCards(this.testcard);
					if (result) {
						var follow=this.follow(last,result);
						if(follow){
							this.chooseArray=checkd
							this.play3paper = reloadarry;
						}else{
							this.chooseArray = [];
							alert("你出的牌比不上家")
						}
						
					} else {
						this.chooseArray = [];
						alert("你出的牌不符合规则")
					}
				}
				
			},
			// 抢地主
			need() {
				for (var i = 0; i < this.landlordCard.length; i++) {
					this.play3paper.push(this.landlordCard[i]);
				}
				this.sortCard(this.play3paper);
				this.island = false;
				this.timeBtn = false;
				this.landsure = true;
			},
			// 不抢地主
			noNeed() {
				this.timeBtn = false;
			},
			// 不出
			sendNo(){
				this.sendBtn=false;
				this.nocard=false
			},
			// 提示
			hit() {
				var which = this.hintCards(this.testcard, this.play3paper)
				console.log(which);
				this.play3paper.forEach(item => {
					item.checked = false;
					this.hintcard=[]
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
				if(!(this.isfirst)&&!which){
					this.isfirst=true;
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
		width: 70rpx;
		height: 126rpx;
	}

	.cardshowlist {
		width: 55%;
		margin: 0 auto
	}

	.cardnormal .card {
		float: left;
	}

	.big-num {
		font-size: 18rpx;
		font-weight: bold;
	}

	.mybox .big-num {
		font-size: 24rpx;
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
		transform: translateX(-48%);
		width: 90%;
		text-align: center;
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
		margin-left: 55rpx
	}

	.play4 .listrans {
		margin-right: 55rpx
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
		margin-bottom: 10rpx;
		max-width: 240rpx;
		margin: 0 auto;
		margin-bottom: 20rpx;
	}

	.nopaper,
	.hit,
	.surePaper {
		font-size: 16rpx;
		float: left;
		padding: 10rpx 20rpx;
		background: #008000;
		border-radius: 10rpx;
		color: #fff;
	}
	.nocard{
		font-size: 16rpx;
		display:inline-block;
		padding: 10rpx 20rpx;
		background: #008000;
		border-radius: 10rpx;
		color: #fff;
	}

	.hit {
		margin: 0 10rpx
	}

	.mycarlist {
		height: 180rpx;
		display: inline-block;
	}

	.cardohter {
		padding: 0;
		background: transparent;
		border: 0
	}

	.cardshowlist {
		position: absolute;
		top: -69%;
		left: 50%;
		transform: translateX(-50%);
		width: auto;
	}

	.fl {
		float: left
	}

	.grabCardbox {
		display: inline-block;
	}

	.noGrad,
	.grabCard {
		width: 90rpx;
		height: 40rpx;
		background: #64b923;
		border-radius: 40rpx;
		color: #fff;
		font-size: 18rpx;
		line-height: 40rpx;
		font-weight: 530;
	}

	.grabCard {
		background: #f59104;
	}

	.countDown text {
		font-size: 20rpx;
		color: #FF5A5F;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		margin-top: 1rpx
	}

	.countDown {
		width: 50rpx;
		height: 50rpx;
		position: relative;
		margin: 0 20rpx;
		margin-top: -15rpx;

	}

	.countDown image {
		width: 50rpx;
		height: 50rpx;
	}

	/* 地主牌展示 */
	.landlordCard .card {
		float: left;
		margin-right: 20rpx;
		border: 1px solid #ccc;
		border-image: initial;
		border-color: #ccc;
		background: #f1f1f1;
		border-radius: 4px;
		font-family: monospace;
		text-align: center;
	}

	.landlordCard {
		margin-top: 20rpx;

	}
	.mark{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 60%;
		display: table;
	}
	.mark text{
		display: table-cell;
		vertical-align: middle;
		color:orange;
		padding-top:30px;
		font-size:30rpx;
		font-family: cursive;
		font-weight: bold;
	}
</style>
