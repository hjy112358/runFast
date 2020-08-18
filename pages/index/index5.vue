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
			<transition name="bounce" v-if="show" >
				<image src="/static/paper.png" class="papermove"></image>
			</transition>
			<transition name="bounce1" v-if="show1" >
				<image src="/static/paper.png" class="papermove"></image>
			</transition>
			<transition name="bounce2" v-if="show2" >
				<image src="/static/paper.png" class="papermove"></image>
			</transition>
			<transition name="bounce3" v-if="show3" >
				<image src="/static/paper.png" class="papermove"></image>
			</transition>
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
				play4: [],
				show: true,
				show1:false,
				show2:false,
				show3:false
			}
		},
		components: {
			// uniList,
			// uniListItem
		},
		methods: {
			sendpaper: function() {
				// 
				var _this=this;
				_this.show = !_this.show;
				var time1 = setInterval(function() {
					_this.play1.push(1);
					clearInterval(time1)
					_this.show = !_this.show;
					
				}, 300)
				setTimeout(function(){
					 _this.sendTwo()
					 _this.show1 = !_this.show1;
				},300)
				
			},
			sendTwo(){
				var _this=this;
				setTimeout(function(){
					 _this.show1 = !_this.show1;
				},300)
				setTimeout(function(){
					 _this.play2.push(1);
					 _this.show2 = !_this.show2;
					 _this.sendThree()
				},600)
			
			},
			sendThree(){
				var _this=this;
				setTimeout(function(){
					 _this.show2 = !_this.show2;
				},600)
				setTimeout(function(){
					 _this.play3.push(1);
					 _this.show3 = !_this.show3;;
					 _this.sendFour()
				},900)
			
			},
			sendFour(){
				var _this=this;
				setTimeout(function(){
					 _this.show3 = !_this.show3;
				},900)
				setTimeout(function(){
					 _this.play4.push(1);
				},1200)
			
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

	/* image.papermove {
		margin-left: -50rpx
	} */

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
	.bounce-enter-active {
		animation: bounce-in .3s;
	}
	
	.bounce-leave-active {
		animation: bounce-in .3s;
	}
	
	.bounce1-enter-active {
		animation: bounce1-in .3s;
	}
	
	.bounce1-leave-active {
		animation: bounce1-in .3s;
	}
	.bounce2-enter-active {
		animation: bounce2-in .3s;
	}
	
	.bounce2-leave-active {
		animation: bounce2-in .3s;
	}
	.bounce3-enter-active {
		animation: bounce3-in .3s;
	}
	
	.bounce3-leave-active {
		animation: bounce3-in .3s;
	}
	.papermove{
		position:absolute;
		left:50%;
		top:50%;
		transform:translate(-50%,-50%);
		margin-top:-17rpx;
		
	}
	/* 玩家1 */
	@keyframes bounce-in {
		form {
			top:10%;
			opacity: 1;
		}
		to{
			top:-80%;
			opacity: 0.5;
		}
	}
	/* 玩家2 */
	@keyframes bounce1-in {
		form {
			left:0%;
			opacity: 1;
		}
		to{
			left:-400%;
			opacity: 0.5;
			
		}
	}
	
	/* 玩家3 */
	@keyframes bounce2-in {
		form {
			top:80%;
			opacity: 1;
		}
		to{
			top:200%;
			opacity: 0.5;
		}
	}
	/* 玩家4 */
	@keyframes bounce3-in {
		form {
			left:0%;
			opacity: 1;
		}
		to{
			left:400%;
			opacity: 0.5;
		}
	}
	
</style>
