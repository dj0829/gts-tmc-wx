<template>
	<view class="cu-bar">
		
		<view class="padding-lr" :class=" [{'animation-slide-right':animation },{ 'Hotel_lr':current == 'Hotel'}]" @tap="startClick('left')">
			<view class="cu_li_left" v-if="current == 'Planeticket'">
				<view v-if="Busirticket[0].name != ''">{{ Busirticket[0].name }}</view>
				<view class="cu_lis" v-else>出发城市</view>
			</view>
			<view class="cu_li_left" v-if="current == 'Train'">
				<view v-if="Busitraiket[0].name != ''">{{ Busitraiket[0].name }}</view>
				<view class="cu_lis" v-else>出发城市</view>
			</view>
				<view class="cu_li_left Hotel_left" v-if="current == 'Hotel'">
				<view v-if="tsta_Hotelket.name">{{ tsta_Hotelket.name }}</view>
				<view class="cu_lis" v-else>入住城市</view>
			</view>
		</view>
		<view class="bt_li" @tap="toggle()" v-if="current != 'Hotel'"><view class="iconfont icon1">&#xe60e;</view></view>
		<view class="padding-lr padding-lr_r" :class="animation ? 'animation-slide-left' : ''" @click="startClick('right')">
			<view class="cu_li_right" v-if="current == 'Planeticket'">
				<view class="cu_li" v-if="Busirticket[1].name != ''">{{ Busirticket[1].name }}</view>
				<view class="cu_lis " v-else>到达城市</view>
			</view>
			<view class="cu_li_right" v-if="current == 'Train'">
				<view   v-if="Busitraiket[1].name != ''">{{ Busitraiket[1].name }}</view>
				<view class="cu_lis " v-else>到达城市</view>
			</view>
			<view class="cu_li_right" v-if="current == 'Hotel'">
				<view class="iconfont" @click.stop="posiAd">&#xe642;</view>
			</view>
		</view>
	</view>
</template>

<script>
import torok from '@/api/torowk.js'
import {mapState} from 'vuex';
export default {
	props: {
		isretun: {
			type:Boolean,
			default: false
		},
		current: {
			type: String,
			default: ''
		},
		sBusirticket:{
			type: Array,
			default: ()=>{ return [] }//出差飞机城市
		},
		sBusitraiket:{
			type: Array,
			default: ()=>{ return [] } //出差火车城市
		},
		tsta_Hotelket:{
			type: Object,
			default: ()=>{ return {} } //出差酒店城市
		},
	},
	data() {
		return {
			Busirticket: [{
				name: '深圳',
				id: 'SZX'
			}, {
				name: '北京',
				id: 'BJS'
			}],
			Busitraiket: [{
				name: '深圳',
				id: 'shenzhen'
			}, {
				name: '北京',
				id: 'beijing'
			}],
			sta_Hotelket: {id:"shenzhen",name:"深圳"},//出差酒店城市
			animation: false
		}
	},
	watch:{
		sBusirticket(data){
			this.Busirticket = data;
		},
		sBusitraiket(data){
			if(data.length > 0){
				this.Busitraiket = data;
			}
		},
		tsta_Hotelket(data){
			this.sta_Hotelket = data;
		}
	},
	onLoad() {
	},
	methods: {
		posiAd(){//获取当前位置
			// #ifdef MP-WEIXIN
			this.isGetLocation();
			// #endif
			// #ifdef H5
			this.locations();
			// #endif
			// #ifdef APP-PLUS
			this.getLocationInfo();
			// #endif
		},
		isGetLocation(a = "scope.userLocation") { // 3. 检查当前是否已经授权访问scope属性，参考下截图
			var _this = this;
			uni.getSetting({
				success(res) {
					if (!res.authSetting[a]) { //!res.authSetting[a] //3.1 每次进入程序判断当前是否获得授权，如果没有就去获得授权，如果获得授权，就直接获取当前地理位置
						_this.getAuthorizeInfo()
					} else {
						_this.getLocationInfo()
					}
				}
			});
		},
		getAuthorizeInfo(a = "scope.userLocation") { //1. uniapp弹窗弹出获取授权（地理，个人微信信息等授权信息）弹窗
			var _this = this;
			uni.authorize({
				scope: a,
				success() { //1.1 允许授权
					_this.getLocationInfo();
				},
				fail() { //1.2 拒绝授权
					uni.showToast({
						title: '你拒绝了授权!',
						icon: 'none',
						duration: 1000
					})
					uni.navigateBack({})
				}
			})
		},
		getLocationInfo() { //2. 获取地理位置
			var _this = this;
			uni.getLocation({
				type: 'gcj02',
				success: function(res) {
					_this.adderss(res.longitude, res.latitude)
				}
			});
		},
		locations() {
			let _this = this;
			let ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/micromessenger/i) == 'micromessenger') {
				_this.$wechat.location(function(callback) {
					console.log('位置获取成功', callback)
					let call = callback;
					_this.adderss(call.longitude, call.latitude)
				})
			} else {
				_this.adderss(114.057641, 22.502942)
				uni.showModal({
					content: '请在微信浏览器中打开',
					showCancel: false
				});
			}
		},
		async adderss(longitude, latitude,sit) { //获取当前坐标下的城市
			let dats = {
				location: latitude + ',' + longitude,
				get_poi:1,
				poi_options:"policy=3"
			}
			try{
				let res = await torok.geocoder(dats);
				
				let dat = res.result; //获取当前的位置和坐标
				let str = dat.address_component.city;
				if (str.indexOf("市") != -1 || str.indexOf("州") != -1){
				    str = str.substring(0, str.length - 1)
				    console.log('删除城市的最后一个字',str)
				}
				uni.$emit('Busirticket_adds',{name:'Hotel',data:{
					type:'keyword',
					city:{
						id:0,
						name:str
					},
					id:longitude +',' + latitude,
					data:dat.pois[0].title//当前地标
				}})
			}catch(err){
				console.log(err)
				//TODO handle the exception
			}
		},
		toggle() {//城市左右交换
			if(this.isretun){
				return
			}
			if(this.current == 'Planeticket'){
				this.animation= true;
				setTimeout(()=>{
				    this.animation = false;
				}, 1000)
				let temp = null; //交换飞机票城市
				temp = this.Busirticket[0];
				uni.$emit('Busirticket_add',{name:'Planeticket',data:[this.Busirticket[1],temp]});
			} else if (this.current == 'Train'){
				this.animation= true;
				setTimeout(()=>{
				    this.animation = false;
				}, 1000)
				let temp = null; //交换火车票城市
				temp = this.Busitraiket[0];
				uni.$emit('Busirticket_add',{name:'Train',data:[this.Busitraiket[1],temp]});
			}
		},
		startClick(ts) { //开始城市
			if(this.isretun){
				return
			}
			let _this = this
			let cus = this.current;
			let list = '';
			if(cus == "Hotel"){
				list = this.tsta_Hotelket.name;
			}
			if(cus == "Planeticket" && this.Busirticket[0].name.length > 1){
				list = JSON.stringify([{name:this.Busirticket[0].name,id:this.Busirticket[0].id},{name:this.Busirticket[1].name,id:this.Busirticket[1].id}])
			}
			if(cus == "Train" && this.Busitraiket[0].name.length > 1){
				list = JSON.stringify([{name:this.Busitraiket[0].name,id:this.Busitraiket[0].id},{name:this.Busitraiket[1].name,id:this.Busitraiket[1].id}])
			}
			uni.navigateTo({
				url: '/pages/book/sselect-city/selectcity?sta='+ ts +'&type=' + cus + '&list=' + list + '&types=0',
			});
		},
	}
}
</script>

<style lang="scss" scoped>
.cu-bar {
	display: flex;
	width: calc(100% - 40upx);
	padding: 0 20upx;
	position: relative;
	align-items: center;
	justify-content: space-between;
	position: relative;
	.bt_li {
		width: 90upx;
		height: 90upx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		left: 50%;
		margin-left: -45upx;
		.icon1{
      width: 40px;
			color: $uni-color-primary;
      text-align: center;
			font-size: 65upx;
      // #ifdef MP-WEIXIN
      margin-left: 6rpx;
      // #endif
		}
	}
	.padding-lr {
		width: 50%;
		color: black;
		height: 90upx;
		line-height: 90upx;
		font-size: 40upx;
		.cu_li_left {
			width: 200rpx;
			font-size: 34upx;
			overflow: hidden;
			text-overflow: ellipsis; //文本溢出显示省略号
			white-space: nowrap; //文本不会换行
			color: black;
			.cu_lis {
				font-size: 35upx;
				color: #c0c0c0;
			}
      .cu_li{
        // #ifdef MP-WEIXIN
        margin-left: 60px;
        text-align: right;
        // #endif
      }
		}
		.Hotel_left{
			width: auto;
			min-width: 200upx;
			max-width: 600upx;
		}
		.cu_li_right {
      // #ifdef MP-WEIXIN
			width: 200upx;
			float: right;
      // #endif
			overflow: hidden;
			text-overflow: ellipsis; //文本溢出显示省略号
			white-space: nowrap; //文本不会换行
			text-align: right;
			font-size: 34upx;
			color: black;
			.cu_lis {
				width: 100%;
				font-size: 35upx;
				color: #c0c0c0;
			}
			.iconfont{
				font-size: 50upx;
				color: #007AFF;
			}
		}
	}
	.Hotel_lr{
		width: 100%;
	}
	.padding-lr_r {
		text-align: right;
	}

	.animation-slide-left {
		animation-name: slide-left;
		animation-duration: 0.5s;
	}
	.animation-slide-right {
		animation-name: slide-right;
		animation-duration: 0.5s;
	}
	@keyframes slide-left {
		0% {
			opacity: 0;
			transform: translateX(-500upx);
		}

		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}
	@keyframes slide-right {
		0% {
			opacity: 0;
			transform: translateX(500upx);
		}

		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}
}
</style>
