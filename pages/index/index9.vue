<template>
	<view class="content">
		<view class="play1 palybox">
			<text class="player">玩家1</text>
			<transition-group appear tag="uni-list" name="list">
				<uni-list-item title="" note="" v-for='(item,index) in play1' :key="index" :class="{'marl':index!=0}">
					<image src="/static/paper.png" class="paper"></image>
				</uni-list-item>
			</transition-group>
		</view>
		<view class="play2 palybox">
			<view class="playtext">
				<text class="player">玩家2</text>
			</view>
			<view class="listrans">
				<transition-group appear tag="uni-list" name="list">
					<uni-list-item v-for='(item,index) in play2' :key="index" :class="{'mart':index!=0}">
						<image src="/static/paper.png"></image>
					</uni-list-item>
				</transition-group>
			</view>
		</view>
		<view class="play3 palybox">
			<transition-group appear tag="uni-list" name="list">
				<uni-list-item title="" note="" v-for='(item,index) in play3' :key="index" :class="{'marl':index!=0}">
					<image src="/static/paper.png" class="paper"></image>
				</uni-list-item>
			</transition-group>
			<text class="player">玩家3</text>
		</view>
		<view class="play4 palybox">
			<view class="playtext">
				<text class="player">玩家4</text>
			</view>
			<view class="listrans">
				<transition-group appear tag="uni-list" name="list">
					<uni-list-item title="" note="" v-for='(item,index) in play4' :key="index" :class="{'mart':index!=0}">
						<image src="/static/paper.png" class="paper"></image>
					</uni-list-item>
				</transition-group>
			</view>
		</view>
		<view class="paperCenter"> 
			<view class="paperbox">
				<image src="/static/paper.png" class="paper"></image>
			</view>
			<transition name="bounce" v-if="show">
				<image src="/static/paper.png" class="papermove"></image>
			</transition>
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
	export default {
		data() {
			return {
				paperLength: 10,
				play1: [],
				play2: [],
				play3: [],
				play4: [],
				show: true,
				show1: false,
				show2: false,
				show3: false,
				audio: {},
				mp3: '/static/f.mp3'
			}
		},
		methods: {
			sendpaper: function() {
				var _this = this;
				_this.paperLength--;
				//创建音频
				_this.audio = new Audio();
				_this.audio.src = _this.mp3;
				// 播放音频
				_this.audio.play();
				if (_this.paperLength >= 0) {
					_this.show = !_this.show;
					setTimeout(function() {
						_this.play1.push(1);
						_this.show = !_this.show;
					}, 100)
					setTimeout(function() {
						_this.sendTwo()
						_this.show1 = !_this.show1;
					}, 100)
				}
			},
			sendTwo() {
				var _this = this;
				setTimeout(function() {
					_this.show1 = !_this.show1;
				}, 100)
				setTimeout(function() {
					_this.play2.push(1);
					_this.show2 = !_this.show2;
					_this.sendThree()
				}, 200)
			},
			sendThree() {
				var _this = this;
				setTimeout(function() {
					_this.show2 = !_this.show2;
				}, 100)
				setTimeout(function() {
					_this.play3.push(1);
					_this.show3 = !_this.show3;;
					_this.sendFour()
				}, 200)
			},
			sendFour() {
				var _this = this;
				setTimeout(function() {
					_this.show3 = !_this.show3;
				}, 100)
				setTimeout(function() {
					_this.play4.push(1);
					// 发牌结束 关闭音频
					if (_this.paperLength > 0) {
						_this.sendpaper();
					} else {
						_this.audio.pause();
					}
				}, 200)
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

	.listrans uni-list-item {
		width: 100rpx;
		height: 50rpx
	}

	.listrans uni-list-item image {
		max-width: 100%;
		width: 50rpx;
		height: 100rpx
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

	.play2 uni-list-item,
	.play4 uni-list-item {
		display: block;
	}

	.play2 image,
	.play4 image {
		transform: rotate(90deg);
	}

	.play2 .listrans {
		margin-left: 40rpx
	}

	.play4 .listrans {
		margin-right: 40rpx
	}

	.marl {
		margin-left: -35rpx
	}

	.mart {
		margin-top: -35rpx
	}
	.palybox ,.paperCenter{
		-webkit-transform-style: preserve-3d;
		transform-style: preserve-3d;
	}

	.list-enter-active,
	.list-leave-active {
		transition: 1s;
		webkit-transform: translateZ(0); 
		transform: translateZ(0);
		webkit-transform: translate3d(0,0,0); 
		transform: translate3d(0,0,0);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}

	.list-enter-active {
		opacity: 0.9;
	}

	.list-leave-to {
		opacity: 1;
	}

	.bounce-enter-active {
		animation: bounce-in .1s;
		/* 防止动画卡帧 */
		webkit-transform: translateZ(0);
		transform: translateZ(0);
		webkit-transform: translate3d(0,0,0); 
		transform: translate3d(0,0,0);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}

	.bounce-leave-active {
		animation: bounce-in .1s;
		webkit-transform: translateZ(0);
		transform: translateZ(0);
		webkit-transform: translate3d(0,0,0); 
		transform: translate3d(0,0,0);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}

	.bounce1-enter-active {
		animation: bounce1-in .1s;
		webkit-transform: translateZ(0);
		transform: translateZ(0);
		webkit-transform: translate3d(0,0,0); 
		transform: translate3d(0,0,0);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}

	.bounce1-leave-active {
		animation: bounce1-in .1s;
		webkit-transform: translateZ(0);
		transform: translateZ(0);
		webkit-transform: translate3d(0,0,0); 
		transform: translate3d(0,0,0);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}

	.bounce2-enter-active {
		animation: bounce2-in .1s;
		webkit-transform: translateZ(0);
		transform: translateZ(0);
		webkit-transform: translate3d(0,0,0); 
		transform: translate3d(0,0,0);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}

	.bounce2-leave-active {
		animation: bounce2-in .1s;
		webkit-transform: translateZ(0);
		transform: translateZ(0);
		webkit-transform: translate3d(0,0,0); 
		transform: translate3d(0,0,0);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}

	.bounce3-enter-active {
		animation: bounce3-in .1s;
		webkit-transform: translateZ(0);
		transform: translateZ(0);
		webkit-transform: translate3d(0,0,0); 
		transform: translate3d(0,0,0);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}

	.bounce3-leave-active {
		animation: bounce3-in .1s;
		webkit-transform: translateZ(0);
		transform: translateZ(0);
		webkit-transform: translate3d(0,0,0); 
		transform: translate3d(0,0,0);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}

	.papermove {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		margin-top: -17rpx;

	}

	/* 发牌时的过渡 */
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

		form {
			left: 0%;
		}

		to {
			left: 400%;
		}
	}
</style>
