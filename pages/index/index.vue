<template>
	<view class="content">
		<view class="play1 palybox">
			<text class="player">玩家1</text>
			<uni-list>
				<uni-list-item title="" note="" v-for='(index,key) in play1' :key="index">
					<image src="/static/paper.png" class="paper"></image>
				</uni-list-item>
			</uni-list>
		</view>
		<view class="play2 palybox">
			<text class="player">玩家2</text>
			<view class="listrans">
				<uni-list>
					<uni-list-item title="" note="" v-for='(index,key) in play2' :key="index">
						<image src="/static/paper.png" class="paper"></image>
					</uni-list-item>
				</uni-list>
			</view>

		</view>
		<view class="play3 palybox">
			<uni-list>
				<uni-list-item title="" note="" v-for='(index,key) in play3' :key="index">
					<image src="/static/paper.png" class="paper"></image>
				</uni-list-item>
			</uni-list>
			<text class="player">玩家3</text>
		</view>
		<view class="play4 palybox">
			<text class="player">玩家4</text>
			<view class="listrans">
				<uni-list>
					<uni-list-item title="" note="" v-for='(index,key) in play4' :key="index">
						<image src="/static/paper.png" class="paper"></image>
					</uni-list-item>
				</uni-list>
			</view>

		</view>
		<view class="paperCenter">
			<image src="/static/paper.png" class="paper"></image>
			<text class="send" @tap="sendpaper()">发牌</text>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				paperLength: 12,
				play1: [],
				play2: [],
				play3: [],
				play4: []
			}
		},
		methods: {
			sendpaper: function() {
				var _this = this
				
				var time1 = setInterval(function() {
					_this.play1.push(1);
					clearInterval(time1)
				}, 100)
				// setTimeout(function(){
				// 	clearInterval(time1)
				// },600)
				
				var time2 = setInterval(function() {
					_this.play2.push(1)
					clearInterval(time2)
				}, 200)
				// setTimeout(function(){
				// 	clearInterval(time2)
				// },1200)
				var time3 = setInterval(function() {
					_this.play3.push(1)
					clearInterval(time3)
				}, 300)
				// setTimeout(function(){
				// 	clearInterval(time3)
				// },1800)
				var time4 = setInterval(function() {
					_this.play4.push(4)
					clearInterval(time4)
				}, 400)
				// setTimeout(function(){
				// 	clearInterval(time4)
				// },2400)


			}
		},
		onLaunch: function() {
			console.log('App Launch');
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

	image.paper {
		width: 50rpx;
		height: 100rpx
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

	.player {
		font-size: 20rpx;
		display: block;
		margin: 0 auto
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

	.play2 {
		position: absolute;
		top: 50%;
		left: 10rpx;
		transform: translateY(-50%);
		width:180rpx
	}

	.play2 .player {
		float: left;
		width: 20rpx;
		/* margin-right: 40rpx */
	}
	.play2  .listrans{
		width:150rpx
	}
	.listrans {
		transform: rotate(90deg);
		/* transform-origin:20% 40%; */
		float: left;
	}

	.play3 {
		position: absolute;
		bottom: 10rpx;
		left: 50%;
		transform: translateX(-50%)
	}

	.play4 {
		position: absolute;
		top: 50%;
		right: 10rpx;
		transform: translateY(-50%);
		width:180rpx
	}

	.play4 .player {
		float: right;
		width: 20rpx;
	}

	.play4 .listrans {
		float: right;
		width:150rpx;
		/* margin-right:40rpx */
	}
</style>
