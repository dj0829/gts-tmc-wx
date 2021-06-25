<template>
	<view class="container">
		<!-- #ifdef APP-PLUS || MP-WEIXIN -->
		<headnavigation titles="首页" :istoblock="2"></headnavigation>
		<!-- #endif -->
		<view class="main_tops">
			<view class="main_les" @click="stmens(1)">
				<view class="main_si">
					{{corporatename.name}}
				</view>
				<view class="iconfont">
					&#xe8a4;
				</view>
			</view>
			<view class="iconfont" style="font-weight: 600;">
				&#xe659;
			</view>
		</view>
		<view :class="{'share-box': corporatshows}" @click="bushowsclose">
		</view>
		<view class="share-item" :class="{'share-show': corporatshows}">
			<view class="stlist">
				<view class="isswflist" @click.stop>
					<view class="corporalist" @click="cornow(item)" v-for="(item,index) in corporatelist" :key="index">
						<view class="itNames">{{item.name}}</view>
						<span class="iconfont" v-if="item.customerNo == corporatename.id" style="color: #3c85fd;">&#xe620;</span>
						<span class="iconfont" v-else style="color: #C0C0C0;">&#xe7bf;</span>
					</view>
				</view>
			</view>
		</view>
		<view class="bo_im">
			<bwSwiper @clickItem="swipclik" :swiperList="swlist" :autoplay="isvideo" :indicatorDots="indicatorDots">
			</bwSwiper>
		</view>
		<view class="book_ci">
			<view class="bos_onet">
				<view class="bos_ones">
					<view class="bo_dvist">
						<view v-for="(item, index) in tabBar" :key="index" class="tabbar_item" @click="us_toks(item)">
							<image :src="item.imgNormal" mode=""></image>
							<view class="text">{{item.text}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bos_one">
				<view class="bo_dvist">
					<view v-for="(item, index) in bodv_list" :key="item.url" class="tabbar_item" @click="us_tok(item)">
						<image :src="item.imgNormal" mode=""></image>
						<view class="text">{{item.text}}</view>
						<view class="nums" v-if="item.istus == true && item.nums > 0">
							{{item.nums}}
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="bocks" v-if="tifeixoks" @click.stop="tifecks">
			</view>
			<view class="tifeix" :class="tifeixoks ? 'show' : ''" @click.stop="tifecks">
				<view class="tiPhones" v-if="setphne == false">
					电话
				</view>
				<view class="tiPhoneste" v-else>
					<view class="tilist" @click="tels(item.phone)" v-for="(item,index) in  phonels" :key="index">
						<view class="ti_tops">
							{{item.name}}
						</view>
						<view class="ti_botn">
							{{item.phone}}
						</view>
					</view>
				</view>
			</view> -->
			<view class="ticketing">
				<view class="ticke">
					<view class="tifot_l">
						票务热线
					</view>
					<view class="tifot_r">
						TEL:18859390059
					</view>
				</view>
				<view class="ticke">
					<view class="tifot_l">
						酒店热线
					</view>
					<view class="tifot_r">
						TEL:18905936655
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dd from 'dingtalk-jsapi';
	import torks from '@/api/torowk.js';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import login from '@/api/login.js';
	import Mydi from '@/api/mydi.js';
	import bwSwiper from '@/components/bw-swiper/bw-swiper.vue';
	import tabBar from '@/components/view/Navigations.vue';
	export default {
		components: {
			tabBar,
			bwSwiper
		},
		data() {
			return {
				corporatshows:false,
				phonels:[{//客服电话
					name:'客服电话',
					phone:'13888888888'
				},{
					name:'酒店客服电话',
					phone:'13888888888'
				}],
				setphne:false,//是否显示
				tifeixoks:false,//是否展示电话列表
				swlist: [],
				isvideo: true,
				indicatorDots: true,
				currentIndex: 0,
				currentPage: 'Book',
				bodv_list: [{
						url: 'maillist',
						text: '航班动态',
						imgNormal: require("@/static/img/home/home_dynamics.png"),
						istus: false,
						nums: 0
					},
					{
						url: 'itinerary',
						text: '我的行程',
						imgNormal: require("@/static/img/home/home_itinerary.png"),
						istus: false,
						nums: 0
					},
					{
						url: 'My_Apps',
						text: '我的申请',
						imgNormal: require("@/static/img/home/home_Apply.png"),
						istus: false,
						nums: 0
					},
					{
						url: 'Examine',
						text: '待我审批',
						imgNormal: require("@/static/img/home/home_Approval.png"),
						istus: true,
						nums: 0
					}
				],
				switfal: false,
				corporatelist: [],
				corporatename: {
					id: 0,
					name: ''
				},
				bt_bol: false,
				ipon: '123',
				btns: "\ue80c",
				dateStr: '',
				daysCount: 365,
				singleDate: true,
				animation: false,
				end: {
					name: ""
				},
				chip: false,
				currentPage: 'Planeticket',
				tabBar: [{
						ul: 'Planeticket',
						text: '国内机票',
						imgNormal: require('@/static/img/home/home_aircraft.png')
					},
					{
						ul: 'Train',
						text: '订火车票',
						imgNormal: require('@/static/img/home/home_Train.png')
					},
					{
						ul: 'Hotel',
						text: '酒店预定',
						imgNormal: require('@/static/img/home/home_Hotel.png')
					},
					{
						ul: 'Vehicleuse',
						text: '用车业务',
						imgNormal: require('@/static/img/home/home_vehicle.png')
					},
					{
						ul: 'Internationalticket',
						text: '国际机票',
						imgNormal: require('@/static/img/home/home_international.png')
					},
					
					{
						ul: 'bag',
						text: '包给我',
						imgNormal: require('@/static/img/home/home_bag.png')
					},
					{
						ul: 'takeOutFood',
						text: '外卖业务',
						imgNormal: require('@/static/img/home/home_takeOutFood.png')
					},
					{
						ul: 'visa',
						text: '高端定制',
						imgNormal: require('@/static/img/home/home_visa.png')
					},
				]
			}
		},
		onShow() {},
		computed: {
			...mapState(['userinfo'])
		},
		mounted() {
			this.search();
		},
		methods: {
			stmens(item){
				if(item == 1){
					this.corcks()
				}
			},
			bushowsclose(){
				this.corporatshows = false;
				this.$emit('isShows',1);
			},
			...mapMutations(['userTokenAi']),
			tifecks(){//点加显示电话按钮
				let that = this;
				if(this.tifeixoks != that.setphne){
					return
				}
				this.tifeixoks = !this.tifeixoks;
				if(that.setphne == false){
					that.setphne = true;
				} else {
					setTimeout(()=>{
						that.setphne = false
					},300)
				}
				
			},
			tels(ph){//拨打电话
				uni.makePhoneCall({
					phoneNumber: ph//电话
				});
			},
			async cornow(its) { //修改当前员工所属公司
				if (its.customerNo != this.corporatename.id) {
					try {
						let res = await torks.changeEnterprise({
							customerId: its.customerNo,
							// #ifdef MP-WEIXIN
							type: 2
							// #endif
						})
						if (res.code == 200) {
							uni.showToast({
								title: '切换成功',
								icon: 'none',
								duration: 1000
							})
							this.corporatshows = false;
							this.changs(1);
							this.corporatename = {
								id: its.customerNo,
								name: its.name,
							}
							uni.setStorageSync("user_list" + uni.getStorageSync('appWxId'), res.data);
						} else {
							uni.showToast({
								title: res.message,
								icon: 'icon',
								duration: 1000
							})
						}
					} catch (e) {
						console.log(e)
						//TODO handle the exception
					}
				} else {
					this.corporatshows = false;
					this.changs(true);
				}
			},
			async corcks() { //获取员工所属的公司信息
				try {
					let res = await torks.currentUserEnterprise();
					if (res.code == 200) {
						this.corporatelist = res.data;
						if(this.corporatelist.length > 0){
							this.corporatshows = true;
							this.changs(false);
						} else {
							return
						}
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 1000
						})
					}
				} catch (e) {
					console.log(e)
			
					//TODO handle the exception
				}
			},
			us_toks(item) {
				if (item.ul == 'Internationalticket') {//国际机票
					uni.showToast({
						title: '疫情影响,暂未开放',
						duration: 1000,
						icon: 'none'
					})
				} else if (item.ul == 'visa') {//高端定制
					uni.navigateTo({
						url: './valist/valist'
					})
				} else if (item.ul == 'takeOutFood') {//外卖
					uni.showToast({
						title: '疫情影响,暂未开放',
						duration: 1000,
						icon: 'none'
					})
				} else if (item.ul == 'bag') {//包给我
					// uni.navigateTo({
					// 	url:'/pages-book/book/mainModules/majorFunction/bagittome/addbagittome'
					// })
					uni.showToast({
						title: '疫情影响,暂未开放',
						duration: 1000,
						icon: 'none'
					})
				} else if (item.ul == 'Vehicleuse') { //用车业务
					// #ifdef APP-PLUS
						// this.showToasts('该用户未开通用车业务')
						uni.navigateTo({
							url: '/pages-book/book/mainModules/majorFunction/carbusiness/carbusinessA'
						})
					//#endif
					
					// #ifdef  H5 || MP-WEIXIN
						uni.navigateTo({
							url: '/pages-book/book/mainModules/majorFunction/carbusiness/carbusiness'
						})
					//#endif
				} else {
					uni.navigateTo({
						url: '/pages-book/book/mainModules/majorFunction/select_list/select_list?type=' + item.ul
					})
				}
			},
			bts_k() {
				if (this.bt_bol) {
					this.bt_bol = false
					this.btns = "\ue80c"
				} else {
					this.bt_bol = true
					this.btns = "\ue618"
				}
			},
			changs(val) {
				if (val == 1) {
					this.search();
				}
				this.$emit('isShows', val);
			},
			async search() { //免登判断
				let _this = this;
				if (uni.getStorageSync('TB_ddvalue') != null && uni.getStorageSync('TB_ddvalue') != undefined && uni
					.getStorageSync('TB_ddvalue') != '') {
					let rec = await login.accountlogins({
						sessionId: uni.getStorageSync('TB_ddvalue'),
						// #ifdef MP-WEIXIN
						type: 2
						// #endif
					}); //免登录
					if (rec.code == 200) {
						uni.setStorageSync("user_list" + uni.getStorageSync('appWxId'), rec.data);
						uni.removeStorageSync('TB_ddvalue');
						_this.sitget();
					}
				} else if (uni.getStorageSync('corpid') != null && uni.getStorageSync('corpid') != undefined && uni
					.getStorageSync('corpid') != '') {
					if (dd.env.platform !== "notInDingTalk") {
						console.log('进入了,开始免登')
						//进行钉钉登录操作
						dd.ready(function() {
							//1.获取免登授权码code
							dd.runtime.permission.requestAuthCode({
								corpId: uni.getStorageSync('corpid'), //企业id
								onSuccess: function(result) {
									var code = result.code;
									var customerNo = uni.getStorageSync('customerNo');

									login.noSecret({
										code: code,
										customerNo: customerNo
									}).then((rec) => {
										if (rec.code == 200) {
											uni.setStorageSync("user_list" + uni
												.getStorageSync('appWxId'), rec.data);
											uni.removeStorageSync('corpid');
											console.log('登录成功，进行接口请求........')
											_this.sitget();
										}
									}).catch((err) => {
										console.log(err)
									})
								},
								onFail: function(err) {
									console('出错了, ' + err);
								}
							});
						});
					} else {
						console.log('不是钉钉客户端')
						uni.removeStorageSync('corpid');
						_this.sitget();
					}
				} else {
					_this.sitget();
				}
			},
			async sitget() { //登录成功后请求
				let datas = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //检验是否是登录状态
				if (datas.token) {
					this.userTokenAi(datas);
					try {
						const res = await torks.queryNotifys();
						if (res.code == 200) {
							let data = res.data;
							let si = [];
							for (let i in data) {
								si.push({
									img: data[i].content,
									address: data[i].address
								});
							}
							this.swlist = si;
						} else {
							uni.showToast({
								title: res.message,
								duration: 1000,
								icon: 'none'
							})
						}
						const resuser = await Mydi.username();
						if (resuser.code == 200) {
							this.$store.commit('user_infos', resuser.data);
							this.corporatename = {
								id: this.userinfo.user.customerId,
								name: this.userinfo.user.customerName,
							}
							uni.setNavigationBarTitle({ //修改页面标题
								title: resuser.data.user.customerName
							});
						}
						const rest = await torks.getApprvListCount();
						if (rest.code == 200) {
							this.bodv_list[3].nums = rest.data;
						} else {
							uni.showToast({
								title: rest.message,
								duration: 1000,
								icon: 'none'
							})
						}
					} catch (e) {
						console.log(e)
					}
				} else {
					this.$store.commit('logout');
					uni.reLaunch({
						url: '../login/login'
					})
				}
			},
			swipclik(item) {
				if (this.utils.zzUrlrge(item.address) == false) {
					window.location.href = item.address
				}
			},
			us_tok(gos) {
				if (gos.url == "maillist") {
					uni.navigateTo({
						url: './flightdynamicst/Flightdynamics'
					})
				} else if (gos.url == 'My_Apps') {
					uni.navigateTo({
						url: '/pages-mydi/pages/mydi/myapplication/myapplication?code=right&is=1'
					})
				} else if (gos.url == 'Examine') {
					uni.navigateTo({
						url: '/pages-mydi/pages/mydi/myapplication/myapplication?code=left&is=1'
					})
				} else if (gos.url == 'itinerary') {
					uni.navigateTo({
						url: './itinerary/itinerary?left=1&right=1'
					})
				}
			}
		},
		onLoad(option) { //option为object类型，会序列化上个页面传递的参数
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		position: relative;
		.main_tops{
			width: calc(100% - 60upx);
			height: 90upx;
			padding: 0 30upx;
			background: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #515151;
			.main_les{
				display: flex;
				height: 90upx;
				align-items: center;
				.main_si{
					max-width: 300upx;
					overflow:hidden;
					white-space:nowrap;
					text-overflow:ellipsis;
				}
				.iconfont{
					font-size: 48upx;
				}
			}
			image{
				width: 50upx;
				height: 50upx;
			}
		}
		.stlist{
			width: 100%;
			max-height: 500upx;
			overflow: scroll;
			.isswflist {
				width: calc(100% - 40upx);
				padding: 20upx;
				min-height: 150upx;
				z-index: 9999;
			
				.corporalist {
					display: flex;
					align-items: center;
					font-size: 35upx;
					padding: 0 20upx;
					line-height: 70upx;
			
					.itNames {
						width: 90%;
					}
				}
			}
		}
		.book_ci {
			width: 100%;
			margin-top: 15upx;
			.bos_onet {
				width: 100%;
				background: #FFFFFF;
				.usernames {
					width: calc(100% - 80upx);
					height: 90upx;
					font-size: 38upx;
					color: #333333;
					border-bottom: 2upx solid #E5E5E5;
					line-height: 90upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 30upx 0 50upx;
				
					.userts {
						width: 90%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
				
				.bos_ones {
					width: 100%;
					.bo_dvist {
						width: calc(100% - 30upx);
						padding: 15upx 15upx 30upx 15upx;
						
						display: flex;
						flex-wrap: wrap;
						align-content: space-between;
				
						.tabbar_item {
							width: 25%;
							font-size: 30upx;
							color: #333333;
							display: flex;
							padding: 24upx 0 10upx 0;
							flex-direction: column;
							justify-content: center;
							align-items: center;
				
							image {
								width: 80upx;
								height: 80upx;
							}
				
							.text {
								margin-top: 20upx;
								line-height: 40upx;
							}
						}
					}
				}
				
				.black_mu {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, .5);
					display: flex;
					align-items: center;
					justify-content: center;
					z-index: 9999;
				}
				
				
			}
			.bos_one {
				width: calc(100% - 30upx);
				padding: 0 15upx;
				.bo_dvist {
					width: 100%;
					margin-top: 15upx;
					display: flex;
					justify-content: space-between;
			
					.tabbar_item {
						position: relative;
						width: 23%;
						height: 150upx;
						border-radius: 15upx;
						font-size: 26upx;
						color: #333333;
						background: #FFFFFF;
						display: flex;
						flex-direction: column;
						align-items: center;
			
						image {
							width: 60upx;
							height: 60upx;
							margin: 20upx 0;
						}
			
						.nums {
							transform: scale(0.8);
							right: -10upx;
							top: -20upx;
							position: absolute;
							width: 50upx;
							height: 50upx;
							background: red;
							border-radius: 50%;
							text-align: center;
							line-height: 50upx;
							font-size: 26upx;
							color: #FFFFFF;
						}
					}
				}
			}
			.bocks{
				position: fixed;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0,0,0,.3);
				z-index: 1000;
				
			}
			.tifeix{
				position: fixed;
				right: 0;
				width: 100upx;
				top: 400upx;
				transition: all 0.5s ease;
				transform: translateX(0);
				display: flex;
				justify-content: flex-end;
				z-index: 1010;
				.tiPhones{
					width: 100upx;
					height: 100upx;
					display: flex;
					align-items: center;
					justify-content: center;
					box-shadow: 0upx -2upx 10upx rgba(89,125,172,.4);
					color: red;
					border-radius: 50%;
					background-color: #FFFFFF;
				}
				.tiPhoneste{
					width: 260upx;
					border-top-left-radius: 20upx;
					border-bottom-left-radius: 20upx;
					padding:10upx 20upx;
					box-shadow: 0upx -2upx 10upx rgba(89,125,172,.4);
					background-color: #FFFFFF;
					overflow: hidden;
					.tilist{
						font-size: 28upx;
					}
				}
			}
			.show {
				width: 300upx;
				transition:width 0.3s;
			}
			.ticketing{
				width: 100%;
				margin-top: 15upx;
				display: flex;
				justify-content: space-between;
				.ticke{
					width: 48%;
					background-color: #FFFFFF;
					border-radius: 12upx;
					padding: 30upx 0;
					color: #333333;
					display: flex;
					flex-direction: column;
					align-items: center;
					line-height: 50upx;
					font-size: 26upx;
					.tifot_l{
						font-weight: 600;
					}
					.tifot_r{
						color: #666666;
					}
				}
			}
		}

		
	}
</style>
