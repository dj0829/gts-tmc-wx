<template>
	<view class="itinerary">
		<loading>
		</loading>
		<headnavigation titles="我的行程"></headnavigation>
		<view class="selsops1">
			<view class="selsit" @click="secks(item)" :class="seid == item.id ? 'seclk': ''"
				v-for="(item,index) in selst" :key="index">
				<view>{{item.name}}</view>
			</view>
		</view>
		<view class="selsops"> 
			<view class="selsit" @click="seckst(item)" :class="seids == item.id ? 'seclk': ''"
				v-for="(item,index) in selsts" :key="index">
				<image :src="require(`@/static/img/home/${item.img}.png`)" v-if="item.id==seids"></image>
				<image :src="require(`@/static/img/home/${item.img1}.png`)" v-else></image>
				<view>{{item.name}}</view>
			</view>
		</view>
		<view v-if="showlist">
			<view v-if="showlist!=undefined && showlist.length> 0">
				<view v-if="seids == 1">
					<view class="listshow" v-for="(item,index) in showlist" :key="index" @click="slsts(item)">
						<view class="listtops">
							<view class="lstt_l">
								<view style="margin-right:10upx;">
								<image :src="item.ims" mode="" style=""></image>
								</view>
								<view style="font-size: 28upx;">{{company(item.airline)}}{{item.factFlightNo}}</view>	
							</view>
							<view class="lstt_z">
								国内机票
							</view>
							<view class="lstt_r">
								<view class="lstt_text">{{item.statusName}}</view><view class="lstt_Approval">{{item.sale.statusName}}</view>
							</view>
						</view>
						<view class="pash" style="line-height: 50upx;">
							<view style="flex: 2;text-align: left;color: #3B4246;">
								{{cityname(item.depart)}}-{{cityname(item.arrive)}}</view>
							<view></view>
							<view style="flex: 1;text-align: right;color:#FFA63E;font-size:32upx"><span style="font-size:24upx;">￥</span>{{item.salePrice}}</view>
						</view>
						<view style="font-size: 24upx;line-height: 40upx;display: flex;">
							启程时间：<view>{{item.factDepartTime}}</view>
						</view>
						<view style="display: flex;">
							<view style="color: #333333;font-size: 24upx;flex: 1;margin-top:12upx;">
								乘机人: {{item.factName}}
							</view>
						</view>
						<view style="color: #999999;font-size: 20upx;text-align: left;margin:12upx 0;">
							下单时间：{{item.createTime}}
						</view>
					</view>
				</view>
				<view v-if="seids == 10">
					<view class="listshow" v-for="(item,index) in showlist" :key="index" @click="slsts(item)">
						<view class="listtops">
							<view class="lstt_l" style="flex:1">
								<view class="iconfont" style="color: #007aff;">
									&#xe62f;
								</view>
								<view style="margin-left:10upx">火车票</view>
							</view>
							<view class="lstt_Approval"  style="margin-top:8upx;">
								{{rest(item.status)}}
							</view>
						</view>
						<view style="line-height: 50upx;display: flex;justify-content: space-between;margin-top:5upx;">
							<view style="font-size:32upx;color:#333333;font-weight: bold;">
								{{item.fromstation}} - {{item.tostation}}
							</view>
							<view style="color: #FFA63E;font-weight: bold;font-size:32upx;">
								<span style="font-size:24upx">￥</span>{{item.premium}}
							</view>
						</view>
						<view style="font-size: 24upx;line-height: 50upx;">
							出发时间： {{item.departureTime}}
						</view>
						<view style="color: #333333;font-size: 24upx;width: 100%;overflow: scroll;">
							乘车人: {{item.traPassenger.name}}
						</view>
						<view style="color: #999999;font-size: 20upx;text-align: left;margin:12upx 0;">
							下单时间：{{item.createTime}}
						</view>
					</view>
				</view>
				<view v-if="seids == 3">
					<view class="listshow" v-for="(item,index) in showlist" :key="index" @click="slsts(item)">
						<view class="listtops">
							<view class="lstt_l" style="flex:1;">
								<view class="iconfont" style="color: #007aff;">
									&#xe63b;
								</view>
								<view style="margin-left:10upx;">酒店订单</view>
							</view>
							<view class="lstt_Approval" style="margin-top:8upx;">
								{{rests(item.orderStatus)}}
							</view>
						</view>
						<view style="line-height: 50upx;display: flex;justify-content: space-between;margin-top:5upx;">
							<view style="font-size:32upx;color:#333333;font-weight: bold;">
								{{item.hotelName}}
							</view>
							<view style="color: #FFA63E;font-weight: bold;font-size:32upx;">
								<span style="font-size:24upx">￥</span>{{item.totalPrice}}
							</view>
						</view>
						<view style="font-size: 24upx;line-height: 50upx;">
							入住时间: {{arrtimes(item)}}
						</view>
						<view style="color: #333333;font-size: 24upx;width: 100%;overflow: scroll;">
							入住人: {{item.guestName}}
						</view>
						<view style="color: #C8C7CC;font-size: 20upx;text-align: left;margin:12upx 0;">
							下单时间：{{item.createOrderTime}}
						</view>
					</view>
				</view>
			</view>
			<no-data v-else></no-data>
		</view>

		<uni-load-more :loadingType="loadingType" v-if="ispages >= page" :contentText="contentText"></uni-load-more>
		<onPageScrolls :scrolltops="scrolltops"></onPageScrolls>
		<tabBar :currentPage="currentPages"></tabBar>
	</view>
</template>

<script>
	import tabBar from '@/components/view/Navigations.vue'
	import tork from '@/api/torowk.js'
	import airports from '../sselect-city/airports.js'
	import certifi from '@/api/certificate.js'
	import noData from '@/components/noData.vue'; //日期
	export default {
		components: {
			noData,
			tabBar
		},
		data() {
			return {
				currentPages: 'Book',
				scrolltops: false, //是否显示
				loadingType: 0,
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				ispages: 0,
				page: 1,


				selsts: [{
					name: '飞机',
					id: 1,
					img:"aircraft",
					img1:"aircraft1"
				}, {
					name: '火车',
					id: 10,
					img:"train",
					img1:"train1"
				}, {
					name: '酒店',
					id: 3,
					img:"hotel",
					img1:"hotel1"
				}],
				seids: 1,
				selst: [{
					name: '我的行程',
					id: 1,
				}, {
					name: '历史行程',
					id: 2,
				}],
				seid: 1,
				hang: [],
				datas: '',
				showlist: null, //数据列表
				address: airports.addressAirportAll, //航空名字
			}
		},
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			this.selist(2);
		},
		onReachBottom: function() {
			let that = this;
			if (that.timer != null) {
				clearTimeout(that.timer);
			}
			that.timer = setTimeout(function() {
				that.getmorenews();
			}, 5);
		},
		onLoad(item) {
			this.seids = item.left;
			this.seid = item.right;
		},
		mounted() {
			this.datast();
			this.citys();
			this.selist(1);
		},
		methods: {
			onPageScroll(res) { //距离页面顶部距离
				if (res.scrollTop < 600) {
					this.scrolltops = false;
				} else {
					this.scrolltops = true;
				}
			},
			async citys() { //获取机场名称
				try {
					let ret = await certifi.queryAirlineList();
					if (ret.code == 200) {
						this.hang = ret.data.airlineDds;
					} else {
						this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e);
				}
			},
			secks(item) {
				this.showlist = null;
				this.seid = item.id;
				this.selist(1);
			},
			seckst(item) {
				this.showlist = null;
				this.seids = item.id;
				this.selist(1);
			},
			cityname(name) { //城市名称
				 return this.utils.airportCName(name);
			},
			company(ie) {
				for (let s in this.hang) {
					if (ie == s) {
						ie = this.hang[s];
						return ie;
					}
				}
			},
			arrtimes(itme) { //酒店入住时间
				return itme.arrivalDate.substring(0, 10) + ' ' + itme.arriveHotelTime
			},
			rests(ite) {
				let arr = [{
					name: '待审核',
					id: 650
				}, {
					name: '处理中',
					id: 100,
				}, {
					name: '待处理',
					id: 115,
				}, {
					name: '预定成功',
					id: 101,
				}, {
					name: '下单失败',
					id: 102,
				}, {
					name: '取消中',
					id: 400
				}, {
					name: '取消成功',
					id: 401
				}, {
					name: '审批拒绝',
					id: 121
				}, {
					name: '占房成功',
					id: 122,
				}, ]
				for (let i in arr) {
					if (arr[i].id == ite) {
						return arr[i].name
					}
				}
			},
			rest(ite) {
				let arr = [{
					name: '占座中',
					id: 1
				}, {
					name: '占座成功',
					id: 2
				}, {
					name: '出票中',
					id: 3,
				}, {
					name: '已出票',
					id: 4
				}, {
					name: '退票中',
					id: 5
				}, {
					name: '改签中',
					id: 6
				}, {
					name: '部分退废',
					id: 7
				}, {
					name: '部分改签',
					id: 8
				}, {
					name: '已退',
					id: 9
				}, {
					name: '订单已废弃',
					id: 10
				}, {
					name: '已改签',
					id: 11
				}, {
					name: '占座失败',
					id: 12
				}, {
					name: '出票失败',
					id: 13
				}];
				for (let i in arr) {
					if (arr[i].id == ite) {
						return arr[i].name
					}
				}
			},
			slsts(item) {
				if (this.seids == 1) {
					uni.navigateTo({
						url: 'itinerarylist/ticklist?data=' + JSON.stringify(item) + '&left=' + this.seids +
							'&right=' + this.seid
					})
				} else if (this.seids == 10) {
					uni.navigateTo({
						url: 'itinerarylist/trainlist?data=' + JSON.stringify(item) + '&left=' + this.seids +
							'&right=' + this.seid
					})
				} else if (this.seids == 3) {
					uni.navigateTo({
						url: 'itinerarylist/hotelist?data=' + JSON.stringify(item) + '&left=' + this.seids +
							'&right=' + this.seid
					})
				}
			},
			async selist(it) { //查询
				let that = this;
				if (it == 1) { //正常查询不是翻页
				}
				let dat = {};
				let res;
				that.page = 1;
				that.loadingType = 0;
				try {
					if (that.seid == 1) { //我的行程
						if (that.seids == 1 || that.seids == 10) {
							dat = {
								pageVO: {
									curPage: that.page, //第几页
									rowNum: 10, //一页多少条
								},
								mssOrderRequest: {
									productType: that.seids,
									flyStartDate: this.datas
								}
							}
							res = await tork.queryMyselfOrders(dat); //火车飞机
							if (it == 1) {

							}
							if (res.code == 200) {
								that.page++; //得到数据之后page+1
								that.ispages = res.data.total; //总共多少页
								that.showlist = res.data.rows || [];
								if (that.seids == 1) {
									for (let k in that.showlist) { //转换城市名
										that.showlist[k]['ims'] = 'http://file.feiren.com/00/02/' + that.showlist[k]
											.airline + '.png'
									}
								}
								if (it == 2) {
									uni.stopPullDownRefresh();
								}
							} else {
								if (it == 2) {
									uni.stopPullDownRefresh();
								}
								that.showToasts(res.message);
							}
						} else {
							dat = {
								pageVO: {
									curPage: that.page, //第几页
									rowNum: 10, //一页多少条
								},
								hotelOrderVo: {
									arrivalStartDate: this.datas
								}
							}
							res = await tork.searchMySelfHotelOrderList(dat); //酒店
							if (it == 1) {

							}
							if (res.code == 200) {
								that.page++; //得到数据之后page+1
								that.ispages = res.data.total; //总共多少页
								that.showlist = res.data.rows || [];
								if (it == 2) {
									uni.stopPullDownRefresh();
								}
							} else {
								if (it == 2) {
									uni.stopPullDownRefresh();
								}
								that.showToasts(res.message);
							}
						}
					} else { //历史行程
						if (that.seids == 1 || that.seids == 10) {
							dat = {
								pageVO: {
									curPage: that.page, //第几页
									rowNum: 10, //一页多少条
								},
								mssOrderRequest: {
									productType: that.seids,
									flyEndDate: this.datas
								}
							}
							res = await tork.queryMyselfOrders(dat); //火车飞机
							if (it == 1) {

							}
							if (res.code == 200) {
								that.page++; //得到数据之后page+1
								that.ispages = res.data.total; //总共多少页
								that.showlist = res.data.rows || [];
								if (that.seids == 1) {
									for (let k in that.showlist) { //转换城市名
										that.showlist[k]['ims'] = 'http://file.feiren.com/00/02/' + that.showlist[k]
											.airline + '.png'
									}
								}
								if (it == 2) {
									uni.stopPullDownRefresh();
								}
							} else {
								if (it == 2) {
									uni.stopPullDownRefresh();
								}
								that.showToasts(res.message);
							}
						} else {
							dat = {
								pageVO: {
									curPage: that.page, //第几页
									rowNum: 10, //一页多少条
								},
								hotelOrderVo: {
									arrivalEndDate: this.datas
								}
							}
							res = await tork.searchMySelfHotelOrderList(dat); //酒店
							if (it == 1) {

							}
							if (res.code == 200) {
								that.page++; //得到数据之后page+1
								that.ispages = res.data.total; //总共多少页
								that.showlist = res.data.rows || [];
								if (it == 2) {
									uni.stopPullDownRefresh();
								}
							} else {
								if (it == 2) {
									uni.stopPullDownRefresh();
								}
								that.showToasts(res.message);
							}
						}
					}
				} catch (e) {
					console.log(e);

				}
			},
			async getmorenews() { //上拉加载
				let that = this;
				if (this.loadingType !== 0) { //loadingType!=0;直接返回
					return false;
				}
				if (this.page > this.ispages) {
					return false;
				}
				this.loadingType = 1;
				uni.showNavigationBarLoading(); //显示加载动画
				let dat = {};
				let res;
				try {
					if (that.seid == 1) { //我的行程
						if (that.seids == 1 || that.seids == 10) {
							dat = {
								pageVO: {
									curPage: that.page, //第几页
									rowNum: 10, //一页多少条
								},
								mssOrderRequest: {
									productType: that.seids,
									flyStartDate: this.datas
								}
							}
							res = await tork.queryMyselfOrders(dat); //火车飞机
							if (res.code == 200) {
								if (res.data.rows == 0) { //没有数据
									this.loadingType = 2;
									uni.hideNavigationBarLoading(); //关闭加载动画
									return;
								}
								this.page++; //每触底一次 page +1
								this.showlist = this.showlist.concat(res.data.rows);
								this.loadingType = 0; //将loadingType归0重置
								uni.hideNavigationBarLoading(); //关闭加载动画
								if (that.seids == 1) {
									for (let k in that.showlist) { //转换城市名
										that.showlist[k]['ims'] = 'http://file.feiren.com/00/02/' + that.showlist[k]
											.airline + '.png'
									}
								}
							} else {
								that.showToasts(res.message);
							}
						} else {
							dat = {
								pageVO: {
									curPage: that.page, //第几页
									rowNum: 10, //一页多少条
								},
								mssOrderRequest: {
									arrivalStartDate: this.datas
								}
							}
							res = await tork.searchMySelfHotelOrderList(dat); //酒店
							if (res.code == 200) {
								if (res.data.rows == 0) { //没有数据
									this.loadingType = 2;
									uni.hideNavigationBarLoading(); //关闭加载动画
									return;
								}
								this.page++; //每触底一次 page +1
								this.showlist = this.showlist.concat(res.data.rows);
								this.loadingType = 0; //将loadingType归0重置
								uni.hideNavigationBarLoading(); //关闭加载动画
							} else {
								that.showToasts(res.message);
							}
						}
					} else { //历史行程
						if (that.seids == 1 || that.seids == 10) {
							dat = {
								pageVO: {
									curPage: that.page, //第几页
									rowNum: 10, //一页多少条
								},
								mssOrderRequest: {
									productType: that.seids,
									flyEndDate: this.datas
								}
							}
							res = await tork.queryMyselfOrders(dat); //火车飞机
							if (res.code == 200) {
								if (res.data.rows == 0) { //没有数据
									this.loadingType = 2;
									uni.hideNavigationBarLoading(); //关闭加载动画
									return;
								}
								this.page++; //每触底一次 page +1
								this.showlist = this.showlist.concat(res.data.rows);
								this.loadingType = 0; //将loadingType归0重置
								uni.hideNavigationBarLoading(); //关闭加载动画
								if (that.seids == 1) {
									for (let k in that.showlist) { //转换城市名
										that.showlist[k]['ims'] = 'http://file.feiren.com/00/02/' + that.showlist[k]
											.airline + '.png'
									}
								}
							} else {
								that.showToasts(res.message);
							}
						} else {
							dat = {
								pageVO: {
									curPage: that.page, //第几页
									rowNum: 10, //一页多少条
								},
								mssOrderRequest: {
									arrivalEndDate: this.datas
								}
							}
							res = await tork.searchMySelfHotelOrderList(dat); //酒店
							if (res.code == 200) {
								if (res.data.rows == 0) { //没有数据
									this.loadingType = 2;
									uni.hideNavigationBarLoading(); //关闭加载动画
									return;
								}
								this.page++; //每触底一次 page +1
								this.showlist = this.showlist.concat(res.data.rows);
								this.loadingType = 0; //将loadingType归0重置
								uni.hideNavigationBarLoading(); //关闭加载动画
							} else {
								that.showToasts(res.message);
							}
						}
					}
				} catch (e) {
					console.log(e);

				}
			},
			datast() {
				let date = new Date();

				let year = date.getFullYear();
				let month = date.getMonth();
				let day = date.getDate();

				let hour = date.getHours();
				let minute = date.getMinutes();
				let second = date.getSeconds();
				//这样写显示时间在1~9会挤占空间；所以要在1~9的数字前补零;
				if (month + 1 < 10) {
					month = '0' + (month + 1);
				}
				if (day < 10) {
					day = '0' + day;
				}
				if (hour < 10) {
					hour = '0' + hour;
				}
				if (minute < 10) {
					minute = '0' + minute;
				}
				if (second < 10) {
					second = '0' + second;
				}
				this.datas = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
			}
		}
	}
</script>

<style scoped lang="scss">
	.itinerary {
		width: 100%;
		height: 100%;
		padding-bottom: 120upx;
		.selsops1{
			color: #FFFFFF;
			font-size: 26upx;
			font-weight: bold;
			background: linear-gradient(to right, #4e92fd 0%, #6e46fe 100%);
			width: 100%;
			line-height: 90upx;
			display: flex;
			.selsit{
				margin: 0 auto;
			}
			.seclk {
				border-bottom: 6upx solid white;
			}
		}
		.selsops {
			width: 100%;
			line-height: 76upx;
			background: #FFFFFF;
			overflow: scroll;
			display: flex;
			white-space: nowrap;
			font-size: 30upx;
			margin-bottom: 20upx;
			padding: 20upx 0;
			text-align: center;
			.selsit:nth-child(1){
				image{
					width: 50upx;
					height: 24upx;
				}
			}
			.selsit {
				display: flex;
				width: 160upx;
				line-height: 54upx;
				text-align: center;
				color: #666666;
				padding: 10upx 25upx;
				border-radius: 50upx;
				margin-left: 30upx;
				image{
					width: 36upx;
					height: 36upx;
					margin-top: 10upx;
					margin-left: 15upx;
				}
				view{
					margin-left: 15upx;
				}
			}

			.seclk {
				color: #3175F6;
				background: #dbf0ff;
				// border-bottom: 6upx solid $uni-color-primary;
			}
		}

		.listshow {
			width: calc(100% - 80upx);
			margin: 20upx 20upx 0 20upx;
			padding: 20upx;
			font-size: 35upx;
			border-radius: 15upx;
			background: #FFFFFF;

			.listtops {
				width: 100%;
				display: flex;
				color: #666666;
				.lstt_l {
					display: flex;
					align-items: center;
					flex: 1;
					font-size: 20upx;
					image {
					width: 35upx;
					height: 30upx;
					}
				}

				.lstt_z {
					flex: 0.3;
					font-size: 20upx;
					margin-top: 5upx;
				}

				.lstt_r {
					display: flex;
					flex: 0.5;
					text-align: right;
					font-size: 24upx;
					.stri {
						color: red;
						font-size: 26upx;
					}
					.lstt_text{
						margin-top: 5upx;
						margin-right: 20upx;
						margin-left: 20upx;
					}
					.lstt_Approval{
						padding: 5upx 10upx;
						font-size:20upx;
						color: #007AFF;
						background: #dbf0ff;
						border-radius: 10upx;
					}
				}
				.lstt_Approval{
					padding: 5upx 10upx;
					font-size:20upx;
					color: #007AFF;
					background: #dbf0ff;
					border-radius: 10upx;
			}
			}

			.pash {
				width: 100%;
				display: flex;
				color: #C0C0C0;
				font-size: 32upx;
				color: #333333;
				font-weight: bold;
				margin: 10upx 0 0 0;
				image {
					width: 35upx;
					height: 30upx;
				}
			}
		}
	}
</style>
