<template>
	<view class="translist">
		<loading>
		</loading>
		<headnavigation titles="国内机票订单列表"></headnavigation>
		<view class="selsops">
			<view class="selsit" @click="secks(item)" :class="seid == item.id ? 'seclk': ''" v-for="(item,index) in selst" v-if="rotes(item.is)"
			 :key="index">
				{{item.name}}
			</view>
		</view>
		<view class="searchs">
			<input type="text" v-model="passenger" class="seinputs" value="" placeholder="乘机人姓名" />
			<input type="text" v-model="destination" class="seinputs" value="" placeholder="航程" />
			<view class="btnstlist" @click="selist(1)">
				搜索
			</view>
		</view>
		<view v-if="shomlist">
			<view v-if="shomlist!=undefined&&shomlist.length>0">
			<view v-if="(seid != 9 && seid != 11 ) && shomlist.length>0">
				<view class="listshow" v-for="(item,index) in shomlist" :key="index" @click="slsts(item)">
					<view v-if="item[0].departTime.length < 25">
						<view class="listtops">
							<view style="margin-right:10upx;">
								<image :src="item[0].ims" mode="" style=""></image>
							</view>
							<view style="font-size: 28upx;">{{companys(item[0].airline)}}{{(item[0].flightNo.split('/'))[0]}}</view>
							<view class="lstt_l">
								国内机票
							</view>
							<view class="lstt_r">
								<view class="lstt_Approval" :class="item[0].orderStatus == 6 ? 'lstt_Approvals':''">
									{{conpan(item[0].orderStatus)}}
								</view>
								<span class="stri">
									{{item[0].itemStatusname}}
								</span>
							</view>
						</view>
						<view class="pash" style="line-height: 50upx;">
							<view style="text-align: left;color: #3B4246;margin-right:30upx;">{{cityname(item[0].voyagea)}}-{{cityname(item[0].voyages)}}</view>
							<view v-if="item.length == 2">
								[往返]
							</view>
							<view v-if="item.length == 1">
								[单程]
							</view>
							<view style="flex: 1;text-align: right;color:#FFA63E">￥{{item[0].dealingTicketTotalPrice}}</view>
						</view>
						<view style="font-size: 24upx;line-height: 50upx;display: flex;">
							启程时间：<view>{{item[0].departTime}}</view>
							<view style="margin-left: 20upx;">{{item[0].arriveDate}}</view>
						</view>
						<view v-if="item.length == 2" style="font-size: 24upx;line-height: 40upx;display: flex;">
							返程时间：<view>{{item[1].departTime}}</view>
							<view style="margin-left: 20upx;">{{item[1].arriveDate}}</view>
						</view>
					</view>
					<view v-else>
						<view class="listtops">
							<view style="margin-right:10upx;">
								<image :src="item[0].ims" mode="" style=""></image>
							</view>
							<view style="font-size: 28upx;">{{companys(item[0].airline)}}{{(item[0].flightNo.split('/'))[0]}}</view>
							<view class="lstt_l">
								<view class="iconfont" style="color:#007aff;">&#xe637;</view>
								国内机票
							</view>
							<view class="lstt_z" style="color: #007aff;">
								往返
							</view>
							<view class="lstt_r">
								<view class="lstt_Approval">
									{{conpan(item[0].orderStatus)}}
								</view>
								<span class="stri">
									{{item[0].itemStatusname}}
								</span>
							</view>
						</view>
						<view class="pash" style="line-height: 50upx;">
							<view style="flex: 2;text-align: left;color: #3B4246;">{{cityname(item[0].voyagea)}}-{{cityname(item[0].voyages)}}</view>
							<view v-if="item.length == 2">
								[往返]
							</view>
							<view v-if="item.length == 1">
								[单程]
							</view>
							<view style="flex: 1;text-align: right;color:#FFA63E">￥{{item[0].dealingTicketTotalPrice}}</view>
						</view>
						<view style="font-size: 24upx;line-height: 60upx;display: flex;">
							<view>{{(item[0].departTime.split('/'))[0]}}</view>
							<view style="margin-left: 20upx;">{{(item[0].arriveDate.split('/'))[0]}}</view>
						</view>
					</view>
					<view style="display: flex;">
						<view style="font-size: 24upx;flex: 1;">
							乘机人: {{item[0].passengers}}
						</view>
					</view>
					<view style="color: #999999;font-size: 24upx;margin:10upx 0;">
						下单时间：{{item[0].orderingTime}}
					</view>
				</view>
			</view>
			<view v-if="( seid == 11 || seid == 9 ) && shomlist.length>0">
				<view class="listshow" v-for="(item,index) in shomlist" :key="index" @click="slstst(item)">
					<view class="listtops">
						<view style="margin-right:10upx;">
							<image :src="item.ims" mode="" style=""></image>
						</view>
						<view style="font-size: 28upx;">{{companys(item.items[0].airline)}}{{(item.items[0].flightNo.split('/'))[0]}}</view>
						<view class="lstt_l">
							国内机票
						</view>
						<view class="lstt_r">
							<view class="lstt_Approval">
							{{item.statusName}}
							</view>
						</view>
					</view>
					<view class="pash" style="line-height: 50upx;" v-if=" seid == 11 ">
						<view style="flex: 2;text-align: left;color: #3B4246;">{{item.citynames}}-{{item.citynamey}}</view>
						<view style="flex: 1;text-align: right;color:#FFA63E">￥{{item.changeFee}}</view>
					</view>
					<view style="font-size: 24upx;line-height: 50upx;display: flex;" v-if=" seid == 11 ">
						启程时间：<view>{{item.items[0].departTime}}</view>
					</view>
					<view class="pash" style="line-height: 50upx;" v-if=" seid == 9 ">
						<view style="flex: 2;text-align: left;color: #3B4246;">{{item.citynames}}-{{item.citynamey}}</view>
						<view style="flex: 1;text-align: right;color:#FFA63E" v-if="item.status == 7 ||item.status == 8  ">￥{{item.refundAmount}}</view>
					</view>
					<view style="display: flex;">
						<view style="font-size: 24upx;flex: 1;color: #333333;">
							乘机人: {{item.namelist}}
						</view>
					</view>
					<view style="color: #999999;font-size: 24upx;margin:10upx 0;display: flex;" v-if=" seid == 9 ">
						退票时间:<view>{{item.items[0].createTime}}</view>
					</view>
					<view style="color: #999999;font-size: 24upx;margin:10upx 0;" v-if=" seid == 11 ">
						改签时间：{{item.createTime}}
					</view>
				</view>
			</view>
			</view>
			<no-data v-else></no-data>
		</view>
		
		<uni-load-more :loadingType="loadingType" v-if="shomlist!=undefined&&shomlist.length > 9 && ispages != curPage" :contentText="contentText"></uni-load-more>
		<view class="contentnomore" v-if="ispages == curPage">{{contentText.contentnomore}}</view>
		<onPageScrolls :scrolltops="scrolltops"></onPageScrolls>
	</view>
</template>

<script>
	import certifi from '@/api/certificate.js'
	import order from '@/api/order.js'
	import airports from '@/pages/book/sselect-city/airports.js'
	import noData  from '@/components/noData.vue'; //日期
	export default {
			components: {
			noData
		},
		data() {
			return {
				scrolltops:false,//是否显示
				passenger: '',
				destination: '',
				seid: null,
				loadingType: 0,
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				selst: [{
					name: '全部',
					id: null,
					is: 'tms:dps:list'
				}, {
					name: '已出票',
					id: 5,
					is: 'tms:dps:list'
				}, {
					name: '待出票',
					id: 4,
					is: 'tms:dps:list'
				}, {
					name: '退废票',
					id: 9,
					is: 'tms:dps:refund:list'
				}, {
					name: '改签票',
					id: 11,
					is: 'tms:dps:change:list'
				}],
				ispages: 0,

				outward: '',
				arrival: '',

				page: 1,
				shomlist: null,
				hang: [],
				Status: [],
				curPage: 1
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
		onShow() {
			this.citys();

		},
		onLoad(item) {
			if (item.no != 0) {
				if (item.type == 'aircraft') { //正常票下单
					this.seid = null;
					uni.navigateTo({
						url: './planeordersaircraft?code=' + item.no
					})
				} else if (item.type == 'airTicketChanges') { //改签单
					this.seid = 11;
					uni.navigateTo({
						url: './planchange/planchanges?code=' + item.no
					})
				}

			}
		},
		methods: {
			onPageScroll(res){//距离页面顶部距离
				if(res.scrollTop <600){
					this.scrolltops = false;
				} else {
					this.scrolltops = true;
				}
			},
			flist(st) {
				let s = st.split('/')
				return s[0]
			},
			slsts(item) { //查看当前详情
				uni.navigateTo({
					url: 'planeordersaircraft?code=' + item[0].transationOrderNo
				})
			},
			slstst(item) {
				if (this.seid == 11) { //查看改签单详情
					uni.navigateTo({
						url: 'planchange/planchanges?code=' + item.no
					})
				} else if (this.seid == 9) { //查看退费单详情
					uni.navigateTo({
						url: 'chargebackdetails/chargebackdetailsl?code=' + item.no
					})
				}
			},
			secks(item) {
				this.shomlist = null;
				this.seid = item.id;
				this.selist(1);
				uni.stopPullDownRefresh();
			},
			async selist(it) { //飞机查询
				let that = this;
				that.page = 1;
				that.loadingType = 0;
				let dat = {};
				let res;
				try {
					if (that.seid == 9) { //退废票
						dat = {
							curPage: that.page, //第几页
							rowNum: 10, //一页多少条
							passenger: this.passenger,
							destination: this.destination,
						}
						res = await order.queryOrderRefundList(dat); //查询国内退废列表
					} else if (that.seid == 11) { //改签票
						dat = {
							pageVO: {
								curPage: that.page, //第几页
								rowNum: 10
							},
							search: {
								passenger: this.passenger,
								destination: this.destination,
							}

						}
						res = await order.queryChangeInfo(dat);
					} else { //查询全部
						dat = {
							pageVO: {
								curPage: that.page, //第几页
								rowNum: 10, //一页多少条
							},
							mssOrderRequest: {
								productType: "1", //类型 1为飞机
								orderState: this.seid,
								passenger: this.passenger,
								destination: this.destination,
							}
						}
						res = await order.queryOrders(dat);
					}

					if (res.code == 200) {
						let that = this;
						that.page++; //得到数据之后page+1
						let datalist = [];
						if (that.seid == 9) { //退费票
							that.ispages = res.data.pageData.total; //总共多少页
							datalist = res.data.pageData.records || [];
						} else {
							that.ispages = res.data.total; //总共多少页
							datalist = res.data.rows || [];
						}
						that.address = airports.addressAirportAll; //航空名字
						if (that.seid == 11 || that.seid == 9) {
							for (let k in datalist) { //转换城市名
								datalist[k]['ims'] = 'http://file.feiren.com/00/02/' + datalist[k].items[0].airline + '.png'
								datalist[k]['namelist'] = that.username(datalist[k].items);
								datalist[k]['companys'] = that.company(datalist[k].items[0].airline);
								if (that.seid == 11) {
									datalist[k]['citynames'] = that.cityname(datalist[k].items[0].origDepart);
									datalist[k]['citynamey'] = that.cityname(datalist[k].items[0].origArrive);
								} else {
									datalist[k]['citynames'] = that.cityname(datalist[k].items[0].depart);
									datalist[k]['citynamey'] = that.cityname(datalist[k].items[0].arrive);
								}
							}
						} else {
							for (let k in datalist) { //转换城市名
								if (datalist[k][0].voyage.length > 10) {
									datalist[k][0]['ims'] = 'http://file.feiren.com/00/02/' + (datalist[k][0].airline.split('/'))[0] +
										'.png'
									let nas = datalist[k][0].voyage.split('/');
									let names = nas[0].split('-');
									datalist[k][0]['voyagea'] = names[0]
									datalist[k][0]['voyages'] = names[1]
								} else {
									datalist[k][0]['ims'] = 'http://file.feiren.com/00/02/' + datalist[k][0].airline + '.png'
									let names = datalist[k][0].voyage.split('-');
									datalist[k][0]['voyagea'] = names[0]
									datalist[k][0]['voyages'] = names[1]
								}
								if (datalist[k][0].itemStatus != null && datalist[k][0].itemStatus != undefined) {
									if (datalist[k][0].itemStatus.includes('2,3')) {
										datalist[k][0]['itemStatusname'] = '(改,退)';
									} else if (datalist[k][0].itemStatus.includes('2')) {
										datalist[k][0]['itemStatusname'] = '(改)';
									} else if (datalist[k][0].itemStatus.includes('3')) {
										datalist[k][0]['itemStatusname'] = '(退)';
									} else if (datalist[k][0].itemStatus.includes('1') || datalist[k][0].itemStatus.includes('1')) {
										datalist[k][0]['itemStatusname'] = '';
									}
								} else {
									datalist[k][0]['itemStatusname'] = '';
								}
							}
						}
						this.shomlist = datalist;
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
					console.log(e);

				}
			},
			username(list) { //乘机人
				if (list.length > 0) {
					let sue = [];
					for (let i = 0; i < list.length; i++) {
						sue.push(list[i].name)
					}
					return [...new Set(sue)].join(',')
				} else {
					return ""
				}
			},
			cityname(name) { //城市名称
				return this.utils.airportCtName(name);
			},
			async citys() { //获取机场名称
				try {
					let ret = await certifi.queryAirlineList();
					if (ret.code == 200) {
						this.selist(1);
						this.hang = ret.data.airlineDds;
					} else {
						this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e);
				}
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
			conpan(ie) {
				let arr = [{
						name: '预订中',
						id: 1
					}, {
						name: '待审批',
						id: 2
					},
					{
						name: '待支付',
						id: 3
					},
					{
						name: '出票中',
						id: 4
					},
					{
						name: '已出票',
						id: 5
					}, {
						name: '已取消',
						id: 6
					}, {
						name: '已拒单',
						id: 7
					}, {
						name: '待支付',
						id: 8
					}, {
						name: '待审批',
						id: 9
					}, {
						name: '已登账',
						id: 10
					}
				]
				for (let i in arr) {
					if (arr[i].id == ie) {
						return arr[i].name
					}
				}
			},
			async getmorenews() {
				let that = this;
				if (that.loadingType !== 0) { //loadingType!=0;直接返回
					return false;
				}
				if (that.page > that.ispages) {
					return false;
				}
				that.loadingType = 1;
				uni.showNavigationBarLoading(); //显示加载动画
				let dat = {};
				let res;
				try {
					if (that.seid == 9) {
						dat = {
							curPage: that.page, //第几页
							rowNum: 10, //一页多少条
							passenger: this.passenger,
							destination: this.destination,
						}
						res = await order.queryOrderRefundList(dat);
					} else if (that.seid == 11) {
						dat = {
							pageVO: {
								curPage: that.page, //第几页
								rowNum: 10
							},
							search: {
								passenger: this.passenger,
								destination: this.destination,
							}
						}
						res = await order.queryChangeInfo(dat);
					} else {
						dat = {
							pageVO: {
								curPage: that.page, //第几页
								rowNum: 10, //一页多少条
							},
							mssOrderRequest: {
								productType: "1", //类型 1为飞机
								orderState: that.seid,
								passenger: this.passenger,
								destination: this.destination,
							}
						}
						res = await order.queryOrders(dat);
					}

					if (res.code == 200) {
						if (res.data.rows == 0) { //没有数据
							that.loadingType = 2;
							uni.hideNavigationBarLoading(); //关闭加载动画
							return;
						}
						that.page++; //每触底一次 page +1
						let datalist = [];
						if (that.seid == 9) { //退费票
							that.curPage = res.data.pageData.pages; //当前多少页
							datalist = res.data.pageData.records || [];
						} else {
							that.curPage = res.data.pages; //当前多少页
							datalist = res.data.rows || [];
						}
						that.loadingType = 0; //将loadingType归0重置
						uni.hideNavigationBarLoading(); //关闭加载动画
						that.address = airports.addressAirportAll; //航空名字
						if (that.seid == 11|| that.seid == 9) {
							for (let k in datalist) { //转换城市名
								datalist[k]['ims'] = 'http://file.feiren.com/00/02/' + datalist[k].items[0].airline + '.png'
								datalist[k]['namelist'] = that.username(datalist[k].items);
								datalist[k]['companys'] = that.company(datalist[k].items[0].airline);
								if (that.seid == 11) {
									datalist[k]['citynames'] = that.cityname(datalist[k].items[0].origDepart);
									datalist[k]['citynamey'] = that.cityname(datalist[k].items[0].origArrive);
								} else {
									datalist[k]['citynames'] = that.cityname(datalist[k].items[0].depart);
									datalist[k]['citynamey'] = that.cityname(datalist[k].items[0].arrive);
								}
							}
						} else {
							for (let k in datalist) { //转换城市名
								if (datalist[k][0].voyage.length > 10) {
									datalist[k][0]['ims'] = 'http://file.feiren.com/00/02/' + (datalist[k][0].airline.split('/'))[0] +
										'.png'
									let nas = datalist[k][0].voyage.split('/');
									let names = nas[0].split('-');
									datalist[k][0]['voyagea'] = names[0]
									datalist[k][0]['voyages'] = names[1]
								} else {
									datalist[k][0]['ims'] = 'http://file.feiren.com/00/02/' + datalist[k][0].airline + '.png'
									let names = datalist[k][0].voyage.split('-');
									datalist[k][0]['voyagea'] = names[0]
									datalist[k][0]['voyages'] = names[1]
								}
								if (datalist[k][0].itemStatus != null && datalist[k][0].itemStatus != undefined) {
									if (datalist[k][0].itemStatus.includes('2,3')) {
										datalist[k][0]['itemStatusname'] = '(改,退)';
									} else if (datalist[k][0].itemStatus.includes('2')) {
										datalist[k][0]['itemStatusname'] = '(改)';
									} else if (datalist[k][0].itemStatus.includes('3')) {
										datalist[k][0]['itemStatusname'] = '(退)';
									} else if (datalist[k][0].itemStatus.includes('1') || datalist[k][0].itemStatus.includes('1')) {
										datalist[k][0]['itemStatusname'] = '';
									}
								} else {
									datalist[k][0]['itemStatusname'] = '';
								}
							}
						}
						that.shomlist = that.shomlist.concat(datalist);
					} else {
						that.showToasts(res.message);
					}
				} catch (e) {
					console.log(e);

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

		.Navigation {
			width: 100%;
			height: 90upx;
			display: flex;
			align-items: center;
			background: linear-gradient(to right, #4E92FD 0%, #6E46FE 100%);

			.ongbutn {
				width: 86%;
				color: #FFFFFF;
				text-align: center;
			}
		}

		.selsops {
			width: 100%;
			height: 90upx;
			background: #FFFFFF;
			overflow: scroll;
			display: flex;
			white-space: nowrap;
			font-size: 30upx;
			border-bottom:1px solid #dfdfdf;
			.selsit {
				display: inline-block;
				line-height: 90upx;
				text-align: center;
				color: #666666;
				padding: 0 25upx;
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
			.seinputs {
				width: 35%;
				font-size: 30upx;
				margin-left: 20upx;
				text-indent: 15upx;
				height: 60upx;
				border-radius: 5upx;
				color: #c0c0c0;
				border:1px solid #dfdfdf;
			}
			.uni-input-placeholder{
				color: #c0c0c0;
			}

			.btnstlist {
				width: calc(30% - 80upx);
				border-radius: 7upx;
				margin-left: 20upx;
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
				color: #666666;
				font-size: 20upx;
				.lstt_l {
					display: flex;
					align-items: center;
					flex: 1;
					margin-left: 40upx;
					image {
						width: 35upx;
						height: 35upx;
					}
				}
				image {
					width: 35upx;
					height: 35upx;
				}
				.lstt_z {
					flex: 0.3;
				}

				.lstt_r {
					display: flex;
					// flex: 1;
					text-align: right;
					.lstt_Approval{
						padding: 5upx 10upx;
						font-size:20upx;
						color: #007AFF;
						background: #dbf0ff;
						border-radius: 10upx;
					}
					.lstt_Approvals{
						padding: 5upx 10upx;
						font-size:20upx;
						color: #999999;
						background: #f0f0f0;
						border-radius: 10upx;
					}
					.stri {
						color: red;
						font-size: 26upx;
					}
				}
			}

			.pash {
				width: 100%;
				display: flex;
				color: #333333;
				font-size: 32upx;
				font-weight: bold;
				margin-top: 10upx;
				image {
					width: 35upx;
					height: 30upx;
				}
			}
		}
	}
</style>
