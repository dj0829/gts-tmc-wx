<template>
	<view class="container999">
		<headnavigation :titles="topcity"></headnavigation>
		<view v-if="isShow">
			<view class="top">
				<!-- 退改 -->
				<view class="black_mu" @click="isshow" v-if="switfals">
					<view class="isswflist" @click.stop="" :class="switfal ? 'show' : ''">
						<view class="isstop">
							<view>
								{{sittext}}
							</view>
							<view @click="isshow" class="iconfont" style="color: #C0C0C0;font-size: 50upx;">
								&#xe641;
							</view>
						</view>
						<view class="isstops">
							<p v-if="stlistad.remark != null && stlistad.remark != undefined"> 1.{{stlistad.remark}}</p>
							<p v-if="stlistad.refundTicketDes != null && stlistad.refundTicketDes != undefined">
								2.改签规定：{{stlistad.refundTicketDes}}</p>
							<p v-if="stlistad.signTicketDes != null && stlistad.signTicketDes">
								3.签转规定：{{stlistad.signTicketDes}}</p>
						</view>
					</view>
				</view>
				<!-- 机票详情 -->
				<view class="stsbt">
					<view class="below" v-if="packlist.planeSize != null">
						<image :src="packlist.ims" mode=""></image>
						{{packlist.airlinename}}{{packlist.no}} / {{model(packlist.plane)}}{{packlist.plane}}
						{{packlist.planeSize}}
						<span style="margin-left:30upx;font-size:22upx;">{{date}} 周{{timelist.week}}</span>
					</view>
					<view class="below" v-else>
						<image :src="packlist.ims" mode=""></image>
						{{packlist.airlinename}}{{packlist.no}}
						<span style="margin-left:30upx; font-size:22upx;">{{date}} 周{{timelist.week}} </span>
					</view>
				</view>
				<view class="above">
					<!-- 时间地址 -->
					<view class="above_left">
						<view class="go_off">
							{{packlist.departTime}}
						</view>
						<view class="arrival_time" v-if="packlist.departTerminal != null">
							{{packlist.departs}}{{packlist.departTerminal}}
						</view>
						<view class="arrival_time" v-else>
							{{packlist.departs}}
						</view>
					</view>
					<view class="above_centre">
						<view style="color:#007AFF">
							<view style="text-align: center;font-size: 22upx;" v-if="packlist.nonstop == true">经停
								{{arrivalAirport}}</view>
						</view>
						<view>
							<image src="@/static/img/home/home_fly.png" ></image>
						</view>
						<view style="font-size: 20upx;color:#999999">
							{{packlist.flightTime}}
						</view>
					</view>
					<view class="above_right" style="text-align: left;">
						<view class="go_off">
							{{packlist.arriveTime}}
							<span v-if="packlist.isarriveTime == true">+1</span>
						</view>
						<view class="arrival_time" v-if="packlist.arriveTerminal != null">
							{{packlist.arrives}}{{packlist.arriveTerminal}}
						</view>
						<view class="arrival_time" v-else>
							{{packlist.arrives}}
						</view>
					</view>
				</view>
			</view>
			<view class="middle">
				<!-- 舱位 -->
				<view class="contract">
					<view class="contract_left" @click="contract_left" :class="contract_lefts ? 'contract_lefta':'' ">
						经济舱
					</view>
					<view class="contract_right" @click="contract_right"
						:class="contract_rights ? 'contract_righta':'' ">
						头等/商务舱
					</view>
				</view>
			</view>
			<view class="mian">
				<loading>
				</loading>
				<view class="reserve" v-for="(item,index) in particulars" :key="index">
					<view class="reserve_left">
						<view class="money" v-if="item.minSalePrice != undefined"><span
								style="font-size:24upx;">￥</span><span
								style="font-size:46upx;">{{item.minSalePrice}}</span>
							<image src="@/static/img/official.png" class="official" v-if="item.priceSource == 1"></image>
							<!-- 1 官方 -->
							<image src="@/static/img/purchase.png" class="official" v-if="item.priceSource == 2"></image>
							<!-- 2 外采 -->
							<span class="change" v-if="item.changeFare == true">协议价</span>
						</view>
						<view class="shidisc" v-bind:id="item.levels" v-if="item.discoun != '全价'">
							{{company(item.level,item.cabinName)}}{{item.discount}}折 <span
								style="color:#afafaf;padding:0 10upx;font-size:10upx;"> | </span> <span
								style="font-size:22upx;padding-left:10upx;color:#007AFF;" @click="ctlist(item)">
								退改规则</span>
						</view>
						<view class="shidisc" v-bind:id="item.levels" v-else>{{company(item.level,item.cabinName)}}
							<span style="font-size:22upx;">{{item.discoun}}</span>
							<span style="color:#afafaf;padding:0 10upx;font-size:10upx;"> | </span>
							<span style="font-size:22upx;color:#007AFF;" @click="ctlist(item)">退改规则</span>
						</view>
					</view>

					<view class="reserve_right">
						<view class="but" @click="book(item,index)">预订</view>
						<view class="buts">{{compot(item.stock)}}</view>
					</view>
				</view>
			</view>
			<violation @emviolation="emviolation" :platformlist="platformlist" :notbooking="notbooking" :limitNativeRule="limitNativeRule" :rulesReasons="rulesReasons"></violation>
		</view>
		<view v-else>
			<image class="praImg" src="@/static/img/praImg.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import violation from '@/components/view/book/violation/violation.vue'
	import order from '@/api/order.js'
	import airports from 'pages/book/sselect-city/airports.js'
	import tork from '@/api/torowk.js'
	import certifi from '@/api/certificate.js'
	export default {
		components:{
			violation
		},
		data() {
			return {
				isShow:false,
				bool: false,
				userlist: null,
				tickarray: [],
				dates: [],
				timelist: {},
				sale: [],
				sittext: '退改规则',
				butalist: [],
				butNo: [],
				date: '',
				none: '',
				lei: '',
				stlistad: {},
				stlistads: {},
				backrule: {}, //退改签规则
				noticerefund: [ //退票说明
					"1、退票规定：起飞前2小时(含)以前收取5%的退票手续费;起飞前2小时(不含)以后收取10%的退票手续费;(具体以航司审核为准)",
					"2、改期规定：起飞前2天(含)允许免费改期1次;起飞前2小时(含)以前收取0%的改期手续费;起飞前2小时(不含)以后收取5%的改期手续费;(具体以航司审核为准)",
					"3、签转规定：不得签转"
				],

				switfals: false,
				switfal: false,
				particulars: [],
				limitNativeRule: {},
				contract_lefts: true,
				contract_rights: false,
				isblckt: false, //事前是否2次审批
				staleve: false,
				chines: {
					index: 0
				},
				rulesReasons: [], //超规类型
				platformlist: [], //处理过的违规信息
				pookis: false, //是否再次审批
				notbooking: false, //是否政策不可预定
				packlist: {}, //当前端的值
				shippingSpace: {}, //当前舱位信息
				isarsrl: false, //是否需要审核
				RuleMa: '', //
				RuleMas: true, //飞机退票是否需要审核
				cabinst: [],
				address: [], //城市集合
				arrivalAirport: '', //经停
				civilServiceTicket: '',
				topcity: ''
			}
		},
		onLoad(item) {
			let dats = JSON.parse(uni.getStorageSync("particularst_data"));
			this.searchData = dats.searchData;//查询页面信息
			this.civilServiceTicket = dats.searchData.civilServiceTicket; //是否公务员
			this.packlist = dats.dataOne; //当前段的信息
			this.topcity = this.packlist.departs + " - " + this.packlist.arrives;
			this.timelist = this.packlist.timelists;
			this.date = this.timelist.re.substring(5, 10);
		},
		mounted() {
			this.transit();//查询当前舱位信息
			this.arrivals();//经停
			
		},
		methods: {
			emviolation(dat){//继续预订
				this.limitNativeRule = dat.davalue;//处理过的违规信息
				this.othotrlis();//触发跳转下一页
			},	
			model(ie) {
				if (ie.substring(0, 1) == 3) {
					ie = '空客'
				} else {
					ie = '波音'
				}
				return ie;
			},
			
			isshow() {
				this.switfal = false;
				this.costs = false;
				setTimeout(() => {
					this.switfals = false;
				}, 200)
				setTimeout(() => {
					this.blac_show = false;
				}, 200)
			},
			contract_left() {
				this.contract_lefts = true;
				this.contract_rights = false;
				let datw = this.tickarray;
				let arris = [];
				for (var i = 0; i < datw.length; i++) {
					if (datw[i].level == 'Y') {
						arris.push(datw[i])
					}
				}
				this.particulars = arris;
			},
			company(ie, cabinName) {//舱位需要后天配置
				for (let k in this.particulars) {
					if(cabinName != null) return cabinName 
					if (ie == 'F' && cabinName == null) {
						return '头等舱'
					} else if (ie == 'C' && cabinName === null) {
						return '商务舱'
					} else if (ie == 'Y' && cabinName === null) {
						return '经济舱'
					}
				}
				return ie;
			},
			compot(ie) {
				if (ie == 'A') {
					return ''
				} else {
					return '剩余票' + ie + '张';
				}
			},
			contract_right() {
				let datw = this.tickarray;
				let dat = this.userindex;
				let arris = [];
				this.contract_lefts = false;
				this.contract_rights = true;
				for (var i = 0; i < datw.length; i++) {
					if (datw[i].level == 'F' || datw[i].level == 'C') {
						arris.push(datw[i])
					}
				}
				this.particulars = arris;
			},
			
			async transit() { //查询舱位
				try{
					let datcab = await certifi.fetchCabins({
						flightNo:this.packlist.no,//航班号
						searchNo:this.packlist.searchNo//当前查询编号
					})
					if(datcab.code == 200){
						this.particulars = datcab.data;//当前舱位信息
						for (let k in this.particulars) {
							if (typeof(this.particulars[k].discount) == 'number') {
								if (this.particulars[k].discount < 1) {
									let num = (this.particulars[k].discount * 10);
									this.particulars[k].discount = num;
									k, this.particulars[k].discount = num.toFixed(1);
									this.particulars[k].discoun = '不全价'
								} else {
									this.particulars[k].discoun = '全价'
								}
							}
						}
						this.tickarray = [...this.particulars];
						this.contract_left();
						this.isShow = true;
					} else if(datcab.code == 101){
						this.showToasts(datcab.message);
						let  that = this;
						setTimeout(()=>{
							that.toBlock();
						},1000)
						
					} else {
						this.showToasts(datcab.message);
						return
					}
					
				}catch(e){
					//TODO handle the exception
				}
				
			},
			async arrivals(){
				let red = await certifi.getPlaneStop({
					'flightNo': this.packlist.no,
					'depDate': this.packlist.departDate
				}); //查询经停航班
				if (red.code == 200) {
					this.address = airports.addressAirportAll; //航空名字
					if (red.data.flightLegBriefs != null) {
						this.arrivalAirport = red.data.flightLegBriefs[0].arrivalAirport;
					}
					this.arrivalAirport = this.utils.airportCName(this.arrivalAirport);
				} else {
					this.showToasts(red.message);
					return
				}
			},
			othotrlis() {//进入下一页 或者选择第二个航程
				try{
					let dataOne = { //当前航程信息
						flightsts: this.packlist,//当前航程信息
						limitNativeRule: this.limitNativeRule,//当前违规信息
						shippingSpace: this.shippingSpace, //当前座位信息
						isblckt:this.isblckt//当前段是否超规
					}
					if (this.searchData.none == 'single') { // 单程
						let data = {
							searchData:this.searchData,//查询页面数据
							isarsrl:this.isarsrl,//是否免审
						}
						data.searchData['dataOne'] = dataOne;//航线舱位信息
						uni.setStorageSync("predetermine_data", JSON.stringify(data));
						uni.navigateTo({
							url: 'predetermine/predetermine'
						})
					} else {//往返
						if(this.searchData.isto == 1){//选完第一端航程 点击跳转选第二段
							this.searchData['dataOne'] = dataOne;//当前航程信息
							this.searchData.isto = 2;
							uni.setStorageSync("ticketinquiry_data", JSON.stringify(this.searchData));
							uni.navigateTo({
								url: '../../ticketInquiry/ticketinquiry'
							})
						} else {//已选完两端航程
							let data = {
								searchData:this.searchData,//查询页面数据
								isarsrl:this.isarsrl,//是否免审
							}
							data.searchData['dataTwo'] = dataOne;//航线舱位信息
							uni.setStorageSync("predetermine_data", JSON.stringify(data));
							uni.navigateTo({
								url: 'predetermine/predetermine'
							})
						}
					}
				}catch(e){
					console.log(e)
					//TODO handle the exception
				}
			},
			async ctlist(item) { //点击查看说明
				try {
					let data = {
						airlineCode: this.packlist.airline, //航司编码
						cabin: item.cabin, //舱位
						depDate: this.packlist.departDate, //起飞时间
						airRoute: this.packlist.depart + this.packlist
							.arrive, //航线：CANPVG（出发地到达地）
					}
					const ret = await tork.getRefundChangeRule(data);
					if (ret.code == 200) {
						this.backrule = ret.data;
						this.stlistad = this.backrule
						this.sittext = '退改规则'
						this.switfals = true;
						setTimeout(() => {
							this.switfal = true;
						}, 200);
					} else {
						this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e);
				}
			},
			async book(item, index) {
				this.isblckt = false;
				this.shippingSpace = item;//当前舱位信息
				if (this.searchData.isbtd == 2) {//因私
					this.othotrlis(); //跳转订单页面
				} else {
					let level = item.level; //舱位等级/** 服务等级, F:头等舱; C:商务舱; Y:经济舱 */
					let user = {};
					let minSalePriceCheck = [];
					let arr = [];
					let ast = [];
					let flights = this.packlist;
					minSalePriceCheck.push({ //当前航班信息
						flightNo: flights.no, //航班号
						departDateTime: flights.departDate.substring(0, 10) + " " + flights
							.departTime + ':00', //时间
						minSalePrice: flights.minPrice //最低价
					})
					if (this.searchData.isblcks == 4) { //获取改签 正常单的用户编号
						arr = this.searchData.userlistnos;
						for (let i = 0; i < arr.length; i++) {
							ast.push({
								passengerNo: arr[i]
							})
						}
					} else {
						let sarr = this.searchData.butalist;
						for (let i = 0; i < sarr.length; i++) {
							arr.push(sarr[i].passengerNo)
							ast.push({
								passengerNo: sarr[i].passengerNo
							})
						}
					}
					this.isarsrl = await this.apiutils.judgeApprv(arr); //用户是否免审  true为免审
					user = {
						"depart":  flights.depart, //出发点,
						"arrive":  flights.arrive, //到达地
						"fuelFee":  flights.fuelFee, //本次航班燃油费,
						"taxFee":  flights.taxFee, //本次航班基建费,
						"minSalePrice":  flights.minPrice, //本次航班最低价,
						"salePrice": item.salePrices[0].price, //舱位票面价,
						"peopleNum": ast.length, //出行人数（用于校验同行人数规则）,
						"departDate": flights.departDate, //起飞日期,
						'departTime': flights.departTime, //,（用于校验提前预定天数规则）,
						'level': level,
						'discount': item.discount, //折扣,
						'airline': flights.airline, //航司编码,
						'hcType': this.searchData.none == 'single' ? 1:2, //单程或者往返
						'staffIds': ast, //用户编号
						'flightNo': flights.no, //航班号
						'minSalePriceCheck': minSalePriceCheck, //list对象
					}
					try {
						let res = await certifi.ruleCheck(user); //获取是否超规
						if (res.code == 200) {
							this.limitNativeRule = {};
							if (JSON.stringify(res.data.limitNativeRule) == '{}') { //没有违规
								this.othotrlis(); //跳转订单页面
							} else {
								this.rulesReasons = res.data.rulesReason; //违规原因
								this.rulesReasons.unshift({
									chineseDesc: '　'
								})
								let dal = res.data.limitNativeRule; //违规信息
								this.limitNativeRule = dal;
								this.platformlist = [];
								let sust = []
								this.notbooking = false;
								this.isblckt = false;
								for (let k in dal) { //插入所有的违规信息
									sust.push({
										index: 0,
										name: this.platnams(k),
										names: k,
										list: this.platname(dal[k]),
										ishow:false
									})
								}
								let sitshows = false;
								for (let p in sust) {
									for (let k in sust[p].list) {
										if(sust[p].list[k].va != 1){
											sitshows = true;
											sust[p].ishow = true;
											if (sust[p].list[k].va == 4) {
												this.notbooking = true;
											}
											if (sust[p].list[k].va == 5) {
												this.isblckt = true; //是否再次审批
											}
										}
									}
								}
								if(sitshows == true){
									this.platformlist = sust;
								} else {
									this.othotrlis();
								}
							}
						} else {
							this.showToasts(res.message)
						}
					} catch (e) {
						console.log(e)

					}
				}
			},
			platnams(name) {
				if (name == 'highLimit') {
					return '高价限制超规'
				} else if (name == 'starLevelLimit') {
					return '低价限制超规'
				} else if (name == 'agreementFlightLimit') {
					return '限定协议航班限制超规'
				} else if (name == 'reserveLimit') {
					return '提前预定限制超规'
				} else if (name == 'positionLimit') {
					return '仓位限制超规'
				} else if (name == 'discountLimit') {
					return '折扣限制超规'
				} else if (name == 'accNumberLimit') {
					return '同行人数限制超规'
				}
			},
			platname(list) {
				let su = [];
				for (let k in list) {
					if (k == 1) {
						su.push({
							va: k,
							name: '只记录不提示',
							list: list[k]
						})
					} else if (k == 2) {
						su.push({
							va: k,
							name: '超规不必选择原因',
							list: list[k]
						})

					} else if (k == 3) {
						su.push({
							va: k,
							name: '超规必须选择原因',
							list: list[k],
							reasons: ''
						})

					} else if (k == 4) {
						su.push({
							va: k,
							name: '不可预定',
							list: list[k]
						})
					} else if (k == 5) {
						su.push({
							va: k,
							name: '超规需重新审核',
							list: list[k]
						})
					}
				}
				return su;
			}
		}
	}
</script>

<style lang="scss" scoped>
	* {
		font-size: 30upx;
	}

	.change {
		margin-left: 23px;
		font-size: 15px;
		color: #3c85fd;
		font-weight: 600;
	}

	.official {
		height: 20px;
		width: 20px;
		margin-left: 10px;
	}

	.top {
		width: calc(100% - 40upx);
		background: #ffffff;
		margin: 20upx 20upx 0 20upx;
		border-top-left-radius: 15upx;
		border-top-right-radius: 15upx;
		border-bottom: 2px solid rgba(233, 233, 233, 0.5);
		box-shadow: 0 4upx 8upx rgba(221, 221, 221, 0.5);

		.black_mu {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, .5);
			z-index: 888;

			.isswflist {
				position: fixed;
				bottom: 0;
				left: 0;
				transition: all 0.3s ease;
				-webkit-transform: translateY(100%);
				transform: translateY(100%);
				min-height: 150upx;
				border-top-left-radius: 15upx;
				border-top-right-radius: 15upx;
				width: calc(100% - 80upx);
				z-index: 889;
				background: #ffffff;
				padding: 40upx;
				font-size: 30upx;

				.isstop {
					color: $uni-color-primary;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 30upx;
				}

				.isstops {
					padding-bottom: 20upx;
				}
			}

			.show {
				-webkit-transform: translateY(0);
				transform: translateY(0);
			}
		}

		.stsbt {
			display: flex;
			position: relative;
			font-size: 22upx;
			padding-top: 44upx;
			margin-left: 30upx;

			.below {
				display: flex;
				font-size: 22upx;
				text-align: center;
				color: #666666;
				padding-bottom: 20upx;

				image {
					width: 30upx;
					height: 30upx;
					margin-right: 10upx;
				}
			}

		}

		.above {
			padding: 20upx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 0 80upx 40upx 80upx;

			.above_left {
				width: calc(50% - 100upx);
				text-align: right;

				// margin-right: 20upx;
				.city {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					color: #abbdd3;
				}

				.go_off {
					font-size: 48upx;
					font-weight: bold;
					text-align: left;
					// margin-left: 80upx;
				}

				.arrival_time {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					color: #666666;
					font-size: 22upx;
					text-align: left;
					// margin-left: 80upx;
				}
			}

			.above_right {
				width: calc(50% - 100upx);
				text-align: right;

				// margin-right: 20upx;
				.go_off {
					font-size: 48upx;
					font-weight: bold;
					text-align: right;
					// margin-left: 80upx;
				}

				.arrival_time {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					color: #666666;
					font-size: 22upx;
					text-align: right;
					// margin-left: 80upx;
				}
			}

			.above_centre {
				width: 200upx;
				text-align: center;
				margin-top: 20upx;
				margin: 0 10upx;

				view {
					margin-top: 15upx;

					image {
						width: 150upx;
						height: 20upx;
					}
				}
			}
		}
	}

	.middle {
		width: calc(100% - 40upx);
		margin: 0 20upx;

		// display: flex;
		.contract {
			width: 100%;
			display: flex;
			line-height: 90upx;
			background: #FFFFFF;
			border-bottom-left-radius: 15upx;
			border-bottom-right-radius: 15upx;

			.contract_left {
				text-align: center;
				color: #666666;
				font-size: 28upx;
				font-weight: bold;
				margin-left: 40upx;
			}

			.contract_right {
				margin-left: 80upx;
				text-align: center;
				color: #666666;
				font-size: 28upx;
				font-weight: bold;
			}
		}

		.contract_lefta {
			color: #007aff !important;
			line-height: 90upx;
			border-bottom: 6upx solid #007aff;
		}

		.contract_righta {
			color: #007aff !important;
			line-height: 90upx;
			border-bottom: 6upx solid #007aff;
			margin-left: 100upx;
		}
	}

	.mian {
		.reserve {
			width: calc(100% - 40upx);
			display: flex;
			text-indent: 20upx;
			padding: 30upx 0;
			// padding-bottom: 30upx;
			// display: flex;
			margin: 10upx 20upx;
			background: #FFFFFF;
			align-items: center;
			justify-content: space-between;
			border-radius: 15upx;

			.reserve_left {

				.money {
					color: #FFA63E;
					font-size: 46upx;
					font-weight: bold;
				}

				.shidisc {
					color: #666666;
					margin-top: 10upx;
					font-size: 22upx;
				}
			}

			.reserve_right {
				margin-right: 30upx;
				text-indent: initial;

				.but {
					width: 106upx;
					height: 56upx;
					background: #FFA63E;
					text-align: center;
					line-height: 60upx;
					border-radius: 8upx;
					color: #FFFFFF;
					font-size: 30upx;
					margin-left: 25upx;
				}

				.buts {
					width: 160upx;
					line-height: 40upx;
					text-align: center;
					color: #DF4F4F;
					font-size: 22upx;
					margin-top: 12upx;
				}
			}
		}
	}

	
	.praImg {
		width: 100%;
	}
</style>
