<template>
	<view class="translist">
		<loading>
		</loading>
		<headnavigation titles="意向单列表"></headnavigation>
		<view class="selsops" v-model="selstName">
			<view class="selsit" @click="secks(item)" :class="seid == item.id ? 'seclk': ''"
				v-for="(item,index) in selst" :key="index">
				{{item.name}}
			</view>
		</view>
		<view class="searchs">
			<input type="text" v-model="guestName" class="seinputs" value="" :placeholder="placeholders" />
			<view class="box_left" @click="opclk">
				{{optios}}
				<view class="iconfont" style="color: #C0C0C0;font-size: 50upx;margin-left: 5upx;">&#xe656;</view>
			</view>
			<view class="tads" @click="isshow" v-if="blac_show">
			</view>
			<view class="fxd_list" :class="shos ? 'show' : ''" v-if="blac_show">
				<view class="fx_u">
					选择订单类型
				</view>
				<view class="fxd_lists">
					<view class="fd_li" v-for="(item,index) in array" :key="index" @click="seachopt(item)">
						<view class="fa_lef">{{item.value}}</view>
						<view class="ok_ioc" v-if="orderStatus == item.id"><text class="iconfont"
								style="color:#007aff;">&#xe60b;</text></view>
					</view>
				</view>
			</view>
			<view class="btnstlist" @click="selist(1)">
				搜索
			</view>
			<view class="btnstlist" @click="newIntentionList()">
				新建
			</view>
		</view>
		<view v-if="showlist">
			<view v-if="showlist!=undefined && showlist.length > 0">
				<view class="listshow" v-for="(item,index) in showlist" :key="index" @click="slsts(item)">
					<view class="" v-if="seid == 2">
						<view class="listtops">
							<view class="lstt_l">
								<view class="iconfont" style="color: #007aff;">
									&#xe63b;
								</view>
								酒店意向单
							</view>
							<view class="lstt_r" :class="item.orderStatus == 4 ? 'lstt_rs' : ''">
								{{rest(item.orderStatus)}}
							</view>
						</view>
						<view
							style="line-height: 50upx;display: flex;justify-content: space-between;color:#333333;font-weight:bold;font-size:32upx;">
							<view>
								{{item.hotelName}}
							</view>
						</view>
						
						<view style="font-size: 24upx;line-height: 50upx;">
							入住时间: {{arrivalDate(item.arrivalDate)}}
						</view>
						<view style="color: #333333;font-size: 24upx;width: 100%;overflow: scroll;line-height: 50upx;">
							入住人: {{item.guestNames}}
						</view>
					</view>
					<view class="" v-if="seid == 1">
						<view>
							<view class="listtops">
								<view class="lstt_l">
									<view class="iconfont" style="color:#007aff;">&#xe637;</view>
									机票意向单
								</view>
								<view class="lstt_r" :class="item.status == 2 ? 'lstt_rs':''">
									{{conpan(item.status)}}
								</view>
							</view>
							<view class="pash" style="line-height: 50upx;">
								<view class="cityname">
									<view style="text-align: left; font-weight:bold;">
										{{cityname(item.depart)}}-{{cityname(item.arrive)}}</view>
									<view class="goBack">
										[{{item.voyageTypeName}}]
									</view>
								</view>
								<view style="text-align: left; font-size:26upx;color:#666666;">
									<view>{{item.serviceLevelName}}</view>
								</view>
							</view>
							<view style="font-size: 24upx;line-height: 60upx;display: flex;">
								启程时间： <view>{{item.departDate}}</view>
							</view>
						</view>
						<view style="display: flex;" v-if="item.travelers != null && item.travelers.length > 0">
							<view style="font-size: 24upx;flex: 1;">
								乘机人: {{trnames(item.travelers)}}
							</view>
						</view>
						<view style="font-size: 24upx;text-align: left;margin-top:20upx;color:#999999;">
							下单时间：{{item.createTime}}
						</view>
					</view>
				</view>
			</view>
			<no-data v-else></no-data>
		</view>
		<uni-load-more :loadingType="loadingType" v-if="ispages > page" :contentText="contentText"></uni-load-more>
		<view class="contentnomore" v-if="ispages == curPage">{{contentText.contentnomore}}</view>
	</view>
</template>

<script>
	import airports from '@/pages/book/sselect-city/airports.js'
	import certifi from '@/api/certificate.js'
	import order from '@/api/order.js'
	import noData from '@/components/noData.vue'; //日期
	export default {
		components: {
			noData
		},
		data() {
			return {
				placeholders:'乘机人姓名',
				address:[],
				hang:[],
				optios: "订单状态",
				blac_show: false,
				shos: false,
				guestName: '',
				orderStatus: 10,
				seid: 1,
				loadingType: 0,
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				selstName: '',
				selst: [{
					name: '机票意向单',
					id: 1
				}, {
					name: '酒店意向单',
					id: 2
				}],
				ispages: 0,


				page: 1,
				showlist: null, //酒店列表
				array:[],//当前状态
				arrayh: [{//酒店状态
					id: 10,
					value: '全部'
				}, {
					id: 0,
					value: '待审批'
				}, {
					id: 1,
					value: '通过'
				}, {
					id: 2,
					value: '拒绝'
				}, {
					id: 3,
					value: '已确认'
				}, {
					id: 4,
					value: '已取消'
				}],
				arrayt: [{//机票状态
					id: 10,
					value: '全部'
				},{
				  id: 1,
				  value: '待审批'
				},{
				  id: 2,
				  value: '取消'
				},{
				  id: 3,
				  value: '拒单'
				},{
				  id: 4,
				  value: '已审批'
				},{
				  id: 5,
				  value: '已预订'
				}],
				curPage: 0
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
				that.selist(3);
			}, 5);
		},
		onShow() {
			this.citys();
			this.selist(1)
		},
		mounted(){
			this.array = this.arrayt;//默认机票状态
			this.address = airports.addressAirportAll; //航空名字
		},
		methods: {
			trnames(list){
				let na = [];
				for (let k in list) {
					na.push(list[k].name)
				}
				return na.join(',')
			},
			conpan(ie) {
				let arr = this.arrayt;
				for (let i in arr) {
					if (arr[i].id == ie) {
						return arr[i].value
					}
				}
			},
			cityname(name) { //城市名称
				let that = this;
				for (let j = 0; j < that.address.length; j++) {
					if (name == that.address[j].airportCode) {
						return that.address[j].cityCName;
					}
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
			seachopt(item) { //选择类型
				this.orderStatus = item.id
				this.optios = item.value
				// this.getnewsList();
				this.blac_show = false;
				this.shos = false;
			},
			isshow() {
				this.blac_show = false;
				this.shos = false;
			},
			opclk() {
				this.blac_show = true;
				this.shos = true;
			},
			bindPickerChange(e) {
				this.setData({
					index: e.detail.value
				})
			},
			newIntentionList() {
				if(this.seid == 2){
					uni.navigateTo({
						url: '/pages/book/valist/hotel/hotel'
					})
				} else {
					uni.navigateTo({
						url: '/pages/book/valist/domesticairTicket/domesticairTicket'
					})
				}
			},
			rest(ite) {
				let arr = this.arrayh;
				for (let i in arr) {
					if (arr[i].id == ite) {
						return arr[i].value
					}
				}
			},
			arrivalDate(tiem) {
				if(tiem != null && tiem != ''){
					return tiem.substring(0, 10) 
				} else {
					return ''
				}
				
			},
			slsts(item) { //查看当前详情
				if(this.seid == 1){
					uni.navigateTo({
						url: 'ticketIntentDetails?code=' + item.no
					})
				} else {
					uni.navigateTo({
						url: 'intentdetails?code=' + item.requireNo,
					})
				}
			},
			secks(item) {
				this.seid = item.id;
				if(this.seid == 2){
					this.placeholders = '入住人姓名';
				} else {
					this.placeholders = '乘机人姓名';
				}
				this.array = this.seid == 1 ? this.arrayt : this.arrayh;
				this.orderStatus = 10;//恢复默认
				this.optios = '订单状态';
				this.selist(1);
			},
			company(ie) {
				for (let s in this.hang) {
					if (ie == s) {
						ie = this.hang[s];
						return ie;
					}
				}
			},
			companys(ies) {
				let ie = ies.split('/');
				for (let s in this.hang) {
					if (ie[0] == s) {
						return this.hang[s]
					}
				}
			},
			async selist(it) { //酒店查询
				let that = this;
				let status = '';
				if(it == 3){ //下拉加载
					if (this.loadingType !== 0) { //loadingType!=0;直接返回
						return false;
					}
					if (this.page > this.ispages) {
						return false;
					}
					this.loadingType = 1;
					uni.showNavigationBarLoading(); //显示加载动画
				} else {
					that.page = 1;
					that.loadingType = 0;
				}
				if (this.orderStatus == 10) {
					status = '';
				} else {
					status = this.orderStatus;
				}
				if (it == 1) {

				}
				let dat = {};
				let res;
				if(this.seid == 2){//酒店
					dat = {
						pageVO: {
							curPage: that.page, //第几页
							rowNum: 10, //一页多少条
						},
						hotelOrderVo: {
							guestName: this.guestName,
							orderStatus: status
						}
					}
				} else {
					dat = {
						curPage: that.page, //第几页
						rowNum: 10, //一页多少条
						travelName: this.guestName,
						status: status
					}
				}
				
				try {
					if(that.seid == 2){
						res = await order.searchHotelRequireList(dat);
					} else {
						res = await order.toSearch(dat);
					}
					if (res.code == 200) {
						that.page++; //得到数据之后page+1
						if(that.seid == 2){
							if(it == 3){//下拉加载
								if (res.data.rows == 0) { //没有数据
									that.loadingType = 2;
									uni.hideNavigationBarLoading(); //关闭加载动画
									return;
								}
								that.page++; //每触底一次 page +1
								that.curPage = res.data.curPage;
								that.showlist = that.showlist.concat(res.data.rows);
								that.loadingType = 0; //将loadingType归0重置
								uni.hideNavigationBarLoading(); //关闭加载动画
							} else {
								that.ispages = res.data.total; //总共多少页
								that.showlist = res.data.rows || [];
							}
							
						} else {
							if(it == 3){//下拉加载
								if (res.data.records == 0) { //没有数据
									that.loadingType = 2;
									uni.hideNavigationBarLoading(); //关闭加载动画
									return;
								}
								that.page++; //每触底一次 page +1
								that.curPage = res.data.curPage;
								that.showlist = that.showlist.concat(res.data.records);
								that.loadingType = 0; //将loadingType归0重置
								uni.hideNavigationBarLoading(); //关闭加载动画
							} else {
								that.ispages = res.data.total; //总共多少页
								that.showlist = res.data.records || [];
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
				} catch (e) {
					console.log(e)

				}
			},
			async getmorenews() { //上拉加载
				
				let dat = {};
				let res;
				dat = {
					pageVO: {
						curPage: this.page, //第几页
						rowNum: 10, //一页多少条
					},
					hotelOrderVo: {
						guestName: this.guestName,
						orderStatus: this.orderStatus
					}
				}

				try {
					res = await order.searchHotelRequireList(dat);

					if (res.code == 200) {
						if (res.data.rows == 0) { //没有数据
							this.loadingType = 2;
							uni.hideNavigationBarLoading(); //关闭加载动画
							return;
						}
						this.page++; //每触底一次 page +1
						this.curPage = res.data.curPage;
						this.showlist = this.showlist.concat(res.data.rows);
						this.loadingType = 0; //将loadingType归0重置
						uni.hideNavigationBarLoading(); //关闭加载动画
					} else {
						this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e)

				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.translist {
		position: relative;
		width: 100%;
		padding-bottom: 20upx;

		.contentnomore {
			color: #777777;
			font-size: 14px;
			text-align: center;
			margin-top: 10px;
		}

		.selsops {
			width: 100%;
			height: 90upx;
			background: #FFFFFF;
			overflow: scroll;
			display: flex;
			white-space: nowrap;
			font-size: 30upx;
			border-bottom: 1px solid #dfdfdf;

			.selsit {
				width: 100%;
				display: inline-block;
				line-height: 90upx;
				text-align: center;
				color: #666666;
				padding: 0 60upx;
				height: 86upx;
				border-bottom: 6upx solid #FFFFFF;
			}

			.seclk {
				border-bottom: 6upx solid #007aff;
				color: #007aff;
			}
		}

		.searchs {
			width: 100%;
			height: 100upx;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;

			.box_left {
				border: 1px solid #dfdfdf;
				color: #8b8888;
				border-radius: 5upx;
				width: 30%;
				height: 60upx;
				margin-left: 15upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 30upx;
			}

			.tads {
				position: fixed;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: #333333;
				opacity: 0.3;
			}

			.fxd_list {

				position: fixed;
				z-index: 9999;
				bottom: 630upx;
				left: 0;
				width: 100%;
				transition: all 0.3s ease;
				-webkit-transform: translateY(100%);
				transform: translateY(100%);

				.fx_u {
					width: 100%;
					height: 90upx;
					background: #F6F6F6;
					line-height: 90upx;
					text-align: center;
					color: #C0C0C0;
				}

				.fxd_lists {
					width: 100%;
					max-height: 540upx;
					overflow: scroll;

					.fd_li {
						width: 100%;
						height: 90upx;
						background: #FFFFFF;
						border-bottom: 2upx solid #F1F1F1;
						display: flex;
						line-height: 90upx;

						.fa_lefs {
							text-align: center;
							width: 100%;
						}

						.fa_lef {
							width: 85%;
							text-indent: 70upx;
						}

						.ok_ioc {
							text-align: center;
							width: 15%;
						}
					}
				}
			}

			.seinputs {
				width: 35%;
				font-size: 30upx;
				margin-left: 20upx;
				text-indent: 15upx;
				height: 60upx;
				border-radius: 5upx;
				border: 1px solid #dfdfdf;
			}

			.btnstlist {
				width: calc(30% - 80upx);
				border-radius: 7upx;
				margin-left: 10upx;
				margin-right: 10upx;
				height: 60upx;
				line-height: 60upx;
				text-align: center;
				background-color: $uni-color-primary;
				color: #FFFFFF;
				font-size: 30upx;
			}
		}

		.selsops::-webkit-scrollbar {
			display: none;
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
				color: #333333;
				font-size: 20upx;

				.lstt_l {
					display: flex;
					align-items: center;
					flex: 1;

					image {
						width: 35upx;
						height: 35upx;
					}
				}

				.lstt_r {
					padding: 3px 5px;
					font-size: 10px;
					color: #007AFF;
					background: #dbf0ff;
					border-radius: 5px;
					text-align: right;
				}

				.lstt_rs {
					padding: 3px 5px;
					font-size: 10px;
					color: #999999;
					background: #f0f0f0;
					border-radius: 5px;
				}
			}
		}
	}
</style>
