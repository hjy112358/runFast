<template>
	<view class="content">
		<view class="play1 palybox">
			<text class="player">玩家1</text>
			<uni-list>
				<uni-list-item title="" note="" v-for='(index,key) in play1' :key="index" :class="{'marl':index!=0}">
					<image src="/static/paper.png" class="paper"></image>
				</uni-list-item>
			</uni-list>
		</view>
		<view class="play2 palybox">
			<view class="playtext">
				<text class="player">玩家2</text>
			</view>
			<view class="listrans">
				<uni-list>
					<uni-list-item v-for='(item,index) in play2' :key="index" :class="{'mart':index!=0}">
						<image src="/static/paper.png"></image>
					</uni-list-item>
				</uni-list>
			</view>
		</view>
		<view class="play3 palybox">
			<uni-list>
				<uni-list-item title="" note="" v-for='(index,key) in play3' :key="index" :class="{'marl':index!=0}">
					<image src="/static/paper.png" class="paper"></image>
				</uni-list-item>
			</uni-list>
			<text class="player">玩家3</text>
		</view>
		<view class="play4 palybox">
			<view class="playtext">
				<text class="player">玩家4</text>
			</view>

			<view class="listrans">
				<uni-list>
					<uni-list-item title="" note="" v-for='(index,key) in play4' :key="index" :class="{'mart':index!=0}">
						<image src="/static/paper.png" class="paper"></image>
					</uni-list-item>
				</uni-list>
			</view>
		</view>
		<view class="paperCenter">
			<view class="paperbox">
				<image src="/static/paper.png" class="paper"></image>
				<!--<image src="/static/paper.png" class="papermove"></image> -->
			</view>
			<text class="send" @tap="sendpaper()">发牌</text>
		</view>
	</view>
</template>

<script>
	// import uniList from '../../components/uni-list/uni-list.vue'
	// import uniListItem from '../../components/uni-list-item/uni-list-item.vue'
	export default {
		data() {
			return {
				paperLength: 13,
				play1: [],
				play2: [],
				play3: [],
				play4: []
			}
		},
		components: {
			// uniList,
			// uniListItem
		},
		methods: {
			sendpaper: function() {
				var _this = this
				var time1 = setInterval(function() {
					_this.play1.push(1);
					_this.play2.push(1);
					_this.play3.push(1);
					_this.play4.push(1);
				}, 150)
				setTimeout(function() {
					clearInterval(time1)
				}, 2100)


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

	image.paper,
	image.papermove {
		width: 50rpx;
		height: 100rpx
	}

	.paperbox {
		position: relative;
	}

	image.papermove {
		margin-left: -50rpx
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
		/* float: left; */
		margin-left:40rpx
	}

	.play4 .listrans {
		/* float: right; */
		margin-right:40rpx
	}

	.marl {
		margin-left: -35rpx
	}

	.mart {
		margin-top: -35rpx
	}
</style>
