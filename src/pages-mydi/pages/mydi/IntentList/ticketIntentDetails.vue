<template>
	<view class="trandetails">
		<loading>
		</loading>
		<view class="Navigations">
			<view class="smtis">
				<view @click="rblcok" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
			</view>
			<view class="ongbutns">
				{{tiltext}}
			</view>
			<view class="onright">
				<view class="onrights" @click="cleraes()" v-if="status == 4">
					取消意向单
				</view>
			</view>
		</view>
		<view class="navstop">
			<view style="color:#ffffff;font-size:28upx;margin:20upx 40upx;">
				意向单单号：{{codes}}
			</view>
			<view style="color:#ffffff;font-size:28upx;margin:20upx 40upx;" v-if="ticketdetails != null && status != 1 ">
				订单状态：<span style="font-size:30upx;font-weight:bold;">{{userstatus(ticketdetails.status)}}</span>
			</view>
			<view class="cits_t" v-if="status != 1">
				<view class="cits_t" style="padding:0;">
					<!-- <view style="color: #FF3404;display: flex;">
						<view style="flex: 1;" v-if="ticketdetails != null && status != 1 ">
							订单状态:{{userstatus(ticketdetails.status)}}</view>
										<view v-if="typename ==  2">支付状态:{{pustatus(payStatus)}}</view>
					</view> -->
					<view class="cits_sa">
						<view class="no_ts" style="display: flex;"
							v-if="ticketdetails != null && ticketdetails.flights != null">
							<view
								v-if="ticketdetails != null && ticketdetails.flights != null">
								{{ticketdetails.flights[0].flightNo?company(ticketdetails.flights[0].flightNo.substring(0,2)) : ticketdetails.airline}}{{ticketdetails.flights[0].flightNo}}
							</view>
						</view>
						<view class="no_t" style="text-align: right;"
							v-if="ticketdetails != null && ticketdetails.flights != null">
							{{ticketdetails.flights[0].departDate.substring(0,4)}}年{{ticketdetails.flights[0].departDate.substring(5,7)}}月{{ticketdetails.flights[0].departDate.substring(8,10)}}日
						</view>
					</view>
					<view class="citys">
						<view class="citys_l">
							<view class="scis_t" v-if="ticketdetails != null && ticketdetails.flights != null">
								{{yeada(ticketdetails.flights[0].departDate,0)}}
							</view>
							<view class="scis_o" v-if="ticketdetails != null && ticketdetails.flights != null" style="text-align: left;">
								{{cityname(ticketdetails.flights[0].depart)}}
							</view>
							<view class="scis_b">
							</view>
						</view>
						<view class="citys_l">
							<view>
								<image src="@/static/img/home/home_fly.png" ></image>
							</view>
						</view>
						<view class="citys_l">
							<view class="scis_ts" v-if="ticketdetails != null && ticketdetails.flights != null">
								{{ticketdetails.flights[0].arriveTime}}
							</view>
							<view class="scis_o" v-if="ticketdetails != null && ticketdetails.flights != null">
								{{cityname(ticketdetails.flights[0].arrive)}}
							</view>
						</view>
					</view>
				</view>
				<view style="display: flex;align-items: center;justify-content: space-between;width: calc(100% - 70upx);padding: 0 0 0 30upx;">
					<view style="color: #666666;font-size:24upx;" v-if="status != 1">
						票价：<span style="color:#ffa63e;font-weight:bold;">￥</span><span style="font-weight:bold;font-size:32upx; color:#ffa63e;">{{amounts}}</span>
					</view>
					<view v-if="ticketdetails != null && ticketdetails.flights != null && status != 1" style="color: #666666;font-size:24upx;">
						舱位等级:{{cabinGrade(ticketdetails.flights[0].cabin)}}
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="navback">
			<view class="nalistTop">
				航程信息
				<view class="cits_bts" v-if=" status == 1">订单状态：{{userstatus(ticketdetails.status)}}</view>
			</view>
		</view> -->
		<view class="lisst" v-if="ticketdetails != null && ticketdetails.status == 1">
			<view class="citst">
				<view class="cits_b">
					<view class="cits_bt">
						<view style="color: #333333;font-size:34upx;font-weight:bold;">
							航程信息
						</view>
					</view>
					<view class="cits_bt"
						v-if="ticketdetails != null && ticketdetails.status == 1">
						<span style="flex:0.5;">起始城市</span><span style="flex:1;">{{cityname(ticketdetails.depart)}}-{{cityname(ticketdetails.arrive)}}</span>
					</view>
					<view class="cits_bt" v-if="ticketdetails.flights != null && ticketdetails.status == 1">
						<span style="flex:0.5;">最早出发时间</span><span style="flex:1;">{{ticketdetails.flights[0].minDepartDate}}</span>
					</view>
					<view class="cits_bt" v-if="ticketdetails.flights != null && ticketdetails.status == 1">
						<span style="flex:0.5;">最晚出发时间</span><span style="flex:1;">{{ticketdetails.flights[0].maxDepartDate}}</span>
					</view>
					<view class="cits_bt" v-if="ticketdetails.flights != null && ticketdetails.status == 1">
						<span style="flex:0.5;">价格范围</span><span style="flex:1;">{{ticketdetails.flights[0].minPrice}}~{{ticketdetails.flights[0].maxPrice}}</span>
					</view>
					<view class="cits_bt" v-if="ticketdetails != null && ticketdetails.status == 1">
						<span style="flex:0.5;">乘客人数</span><span style="flex:1;">成人{{ticketdetails.peoples[0]}}人，儿童{{ticketdetails.peoples[1]}}人，婴儿{{ticketdetails.peoples[2]}}人</span>
					</view>
					<view class="cits_bt" v-if="ticketdetails != null && ticketdetails.status == 1">
						<span style="flex:0.5;">舱位等级</span><span style="flex:1;">{{ticketdetails.serviceLevelName}}</span>
					</view>
					<view class="cits_bt" v-if="ticketdetails.status == 1 && ticketdetails.airline">
						<span style="flex:0.5;">首选航司</span><span style="flex:1;">{{company(ticketdetails.airline)}}-{{ticketdetails.airline}}</span>
					</view>
				</view>
			</view>
		</view>
		<view class="lisst" v-if="ticketdetails.status == 1">
			<view class="citst">
				<view class="cits_b">
					<view class="cits_bt">
						<view style="color: #333333;font-size:34upx;font-weight:bold;">
							联系人信息
						</view>
					</view>
					<view class="cits_bt" v-if="ticketdetails.status == 1">
						<span style="flex:0.5">姓名</span><span style="flex:1.5;">{{ticketdetails.contacts}}</span>
					</view>
					<view class="cits_bt" v-if="ticketdetails.status == 1">
						<span style="flex:0.5">手机号</span><span style="flex:1.5;">{{ticketdetails.contactPhone}}</span>
					</view>
				</view>
			</view>
		</view>
		<view class="lisst" v-if="ticketdetails">
			<view class="citst">
				<view class="cits_b">
					<view class="cits_bt">
						<view style="color: #333333;font-size:34upx;font-weight:bold;">
							乘机人信息
						</view>
					</view>
					<view v-for="(item,index) in ticketdetails.travelers" :key="index"
						v-if="ticketdetails.travelers != null">
						<view class="cits_bt">
							<view class="cits_btsy">
								乘机人{{index+1}}
							</view>
						</view>
						<view class="cits_bt">
							<span style="flex:0.5;">姓名</span><span style="flex:1;">{{item.name}}</span>
						</view>
						<view class="cits_bt">
							<span style="flex:0.5;">乘客类型</span><span style="flex:1;">{{passengerType(item.ageType)}}</span>
						</view>
						<view class="cits_bt" v-if="item.cardType != null">
							<span style="flex:0.5;">证件类型</span><span style="flex:1;">{{typeofcertificate(item.cardType)}}</span>
						</view>
						<view class="cits_bt" v-if="item.cardNo != null">
							<span style="flex:0.5;">证件号码</span><span style="flex:1;">{{utils.TuoMin(item.cardNo,item.cardType)}}</span>
						</view>
						<view class="cits_bt">
							<span style="flex:0.5;">联系号码</span><span style="flex:1;">{{utils.TuoMin(item.phone,1)}}</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="lisst" v-if="ticketdetails && ticketdetails.travelType == 1 && ticketdetails.travelerNo == null && ticketdetails.status == 4 && ispaaNo == false">
			<view class="citst">
				<view class="cits_b">
					<view class="istaf">
						<view class="ravelv">
							<view class="ts">
								<view class="rav_left">出差事由</view>
								<view class="ravright">
									<view class="bos">
										<subjects @change="subclcks"></subjects>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="istaf">
						<view class="ravelv">
							<view class="ts">
								<view class="rav_left">归属部门</view>
								<view class="ravright">
									<view class="bos">
										{{attdepartment}}
									</view>
									<!--                      <view class="iconfont">&#xe8a3;</view>-->
								</view>
							</view>
						</view>
						<constCenter :morconst="morconsts" @costcCks="costcCk" :toisblcks="toisblcks"  :isblckt="isblckt" :sttos="sttos"></constCenter>
						<view class="black_mu" @click="isshow" v-if="blac_show"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="lisst" v-if="ticketdetails.note" style="margin-bottom:20upx;">
			<view class="citst">
				<view class="cits_b" v-if="ticketdetails.note != null">
					<view class="cits_bt">

						<span style="flex:0.5;">备注</span><span style="flex:1.5;">{{ticketdetails.note}}</span>
					</view>
				</view>
			</view>
		</view>
		<view class="btnfixd">
			<paybtns businessType="1" productType="1" :recordNo="recordNos" :amount="amounts" @payok="payok"
				v-if="travelType == 2 && status == 5 && payStatus == 1"></paybtns>
			<view class="btnsu" v-if="status == 4" @click="confirm">确认</view>
		</view>
	</view>
</template>

<script>
	import subjects from '@/components/view/book/subject-matter/subjectMatter.vue'
	import constCenter from '@/components/view/book/cost-center/costCenter.vue'
	import order from '@/api/order.js'
	import airports from '@/pages/book/sselect-city/airports.js'
	import tork from '@/api/torowk.js'
	import certifi from '@/api/certificate.js'

	export default {
		components:{
			constCenter,
			subjects
		},
		data() {
			return {
				sttos: 1, //事前是否违规再次审批  1为开启二次审批 3超规审批
				isblckt: false, //事中改签是否走超标审批流 事前是否违规再次审批
				toisblcks:2,//意向单类型 1事前 2事中
				morconsts:{},//事前默认成本中心
				isGetStaffList:false,//是否无审批流
				status: '',
				recordNos: 0,
				requireNo: '',
				amounts: 0,
				clearst: false,
				clears: false,
				isclsks: false, //是否从列表点进详情
				ltes: 0,
				ist: 0,
				numprice: '999', //总价
				apprvStatus: '', //审批状态：0-待审批，1-审批中 2-通过，3-驳回，4-撤回, 5-免审， 9-无效 10表示没有审批单
				payStatus: '', //支付状态 1 为待支付 2 支付中 3 为已支付，4 为挂帐支付
				orderStatus: '', //
				tiltext: '意向单详情',
				userlist: [], //乘客列表
				typename: '',
				switfal: false,
				codes: 0,

				amountPrice:0,//订单金额
				ticketdetails: {}, //机票详情
				apprvTaskReason: '出差事由', //出差事由
				RuleMas: false, //当前用户是否免审
				RuleMa: '',
				saleOrderNo: '',
				attdepartment: '', //归属部门
				NameCenter: {
					name: '',
					id: ''
				},
				TravelCostCenlist: [], //成本中心
				CostCis: false, //是否有部门审批人
				CostCenterlist: [], //成本中心审批人
				CostCi: false,
				isswf: true, //true为成本中心 false为部门   审批人
				travelNo: '',
				travelType: '',//1因公 2因私
				hotelOrder: '',
				hang: [],
				reson: '', //出行事由
				resonName:'',
				costs: false,
				hoslist: [],
				CostCenter: [],
				userlists: [], //用户列表
				slid: 1,
				ullist: [{
					name: '成本中心',
					id: 1
				}],
				slitlist: [],
				sli_namelist: [],
				TravelDepartlist: [],
				treeLists: [], //归属部门列表
				ops_list: false, //归属部门
				Deparapprover: [], //部门审批人
				blac_show: false,
				shos: false,
				datalist: {},
				address: [],
				Deparapp: [],
				butalist:[],//出差人员
				ispaaNo:false,//是否免审
				nuarry:[],//出差人pass集合
			}
		},
		onLoad(item) {
			this.ist = item.ist;
			this.codes = item.code;
			this.isclsks = item.isck;
		},
		mounted() {
			this.slet();
			const data = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //获取归属部门
			if (data.deptName) {
				this.attdepartment = data.deptName;
			}
		},
		methods: {
			subclcks(data){//返回当前选中的事由id
				this.reson = data.id;
				this.resonName = data.name
			},
			costcCk(item){//更改成本信息
				this.CostCis = item.CostCis;
				this.CostCi = item.CostCi;
				this.isGetStaffList = item.isGetStaffList;
				this.NameCenter = {
					name:item.NameCenter.name,
					id:item.NameCenter.id
				};
				this.TravelCostCenlist = item.TravelCostCenlist;
				this.TravelDepartlist = item.TravelDepartlist;
			},	
			cabinGrade(cabin) {
				if ('Y' == cabin) {
					return '经济舱'
				} else if ('C' == cabin) {
					return '商务舱'
				} else if ('F' == cabin) {
					return '头等舱'
				}
			},
			company(ie) {
				if (ie != undefined && ie != null && ie != '') {
					for (let s in this.hang) {
						if (ie == s) {
							ie = this.hang[s];
							return ie;
						}
					}
				} else {
					return '';
				}

			},
			yeada(item, num) {
				if (num == 0) {
					return item.substring(11, 16)
				} else if (num == 1) {
					let week = new Date(item.replace(/-/g, '/')).getDay();
					if (week == 0) {
						week = 7
					}
					let ts = item.substring(5, 10).split('-');
					return ts[0] + '月' + ts[1] + '日' + ' 周' + this.weeks[week - 1]
				}
			},
			passengerType(type) {
				if ('ADT' == type) {
					return '成人';
				} else if ('CHD' == type) {
					return '儿童';
				} else if ('INF' == type) {
					return '婴儿';
				} else if (type != null) {
					return type;
				} else {
					return '成人';
				}
			},
			typeofcertificate(type) {
				if ('NI' == type) {
					return '身份证';
				} else if ('PP' == type) {
					return '护照';
				} else if ('HX' == type) {
					return '回乡证';
				} else if ('TB' == type) {
					return '台胞证';
				} else if ('GA' == type) {
					return '港澳通行证';
				} else if ('HY' == type) {
					return '国际海员证'
				} else if ('ID' == type) {
					return '其他';
				} else {
					return type;
				}
			},
			cityname(name) { //城市名称
				return this.utils.airportCtName(name);
			},
			async confirm() {
				let dat = [];
				if (this.ticketdetails.travelerNo != null || this.travelType == 2) {
					dat = {
						requireNo: this.codes,
						flights: this.ticketdetails.flights,
						travelerList: this.ticketdetails.travelers,
						name: this.ticketdetails.contacts,
						phone: this.ticketdetails.contactPhone,
					}
				} else if (this.ticketdetails.travelerNo == null && this.travelType == 1) {
					if(this.ispaaNo == false){
						if (this.reson == null || this.reson == '') {
							this.showToasts('请输入出差事由！');
							return;
						}
						if (this.NameCenter.id == '') {
							this.showToasts('请选择成本中心！');
						
							return;
						}
						if(this.CostCis == false && this.CostCi == false && this.isGetStaffList == true){//除了免审 其他必须有审批流程
							this.showToasts("未配置审批流程，请联系管理员设置！");
							return
						}
						if (this.CostCi) {
							if (this.TravelCostCenlist == null || this.TravelCostCenlist.length == 0) {
								this.showToasts('请选择成本审批人！');
						
								return;
							}
						}
						if (this.CostCis) {
							if (this.TravelDepartlist == null || this.TravelDepartlist.length == 0) {
								this.showToasts('请选择部门审批人！');
						
								return;
							}
						}
					}
					let apprvTaskStaffts = [];//审核人员
					for (var i = 0; i < this.TravelCostCenlist.length; i++) { //成本中心审批人
						apprvTaskStaffts.push({
							deptCost: 2,
							nodeId: this.TravelCostCenlist[i].nodeId,
							personId: this.TravelCostCenlist[i].personId,
							staffId: this.TravelCostCenlist[i].staffId,
							staffName: this.TravelCostCenlist[i].staffName
						})
					}
					for (var i = 0; i < this.TravelDepartlist.length; i++) { //部门审批人
						apprvTaskStaffts.push({
							deptCost: 1,
							nodeId: this.TravelDepartlist[i].nodeId,
							personId: this.TravelDepartlist[i].personId,
							staffId: this.TravelDepartlist[i].staffId,
							staffName: this.TravelDepartlist[i].staffName
						})
					}
					let apprvTaskStaffs = {
						costId: this.NameCenter.id,
						costName: this.NameCenter.name,
						reason: this.resonName,
						reasonId:this.reson,
						apprvTaskStaffs: apprvTaskStaffts
					}
					dat = {
						requireNo: this.codes,
						flights: this.ticketdetails.flights,
						travelerList: this.ticketdetails.travelers,
						name: this.ticketdetails.contacts,
						phone: this.ticketdetails.contactPhone,
						apprvTaskEntity: apprvTaskStaffs, //成本中心
					}
				}
				let res = await order.requireBooking(dat);
				if (res.code == 200) {
					this.payStatus = res.data.payStatus; //支付状态
					this.slet();
				} else {
					this.showToasts(res.message)
				}
			},
			isshow() { //点击弹出层
				this.shos = false;
				this.ops_list = false
				this.blac_show = false;
				this.switfal = false;
				this.costs = false;
			},
			payok() {
				this.ltes = 1;
				this.slet('wx');
			},
			async slet(va) { //查询意向单
				let that = this;
				if (that.ltes == 0) {

				}
				try {
					const res = await order.getDetail({
						no: this.codes
					});
					const ret = await certifi.queryAirlineList(); //获取航空公司名称

					if (res.code == 200) {
						if (va == 'wx' && (res.data.paymentStatus == 1 || res.data.paymentStatus == 2)) {

							that.tiltext = '订单支付中...';
							setTimeout(() => {
								that.slet('wx')
							}, 1000)
						} else {
							that.ltes = 0;
							that.nuarry = [];
							that.tiltext = '意向单详情';
							that.ticketdetails = res.data || {};
							that.travelNo = res.data.no;
							that.status = res.data.status;
							that.travelType = res.data.travelType;
							that.butalist = res.data.travelers;//出差人
							if(that.ticketdetails.travelType == 1 && that.ticketdetails.travelerNo == null){//因公 事中
								for (var i = 0; i < that.butalist.length; i++) {
									that.nuarry.push(that.butalist[i].passengerNo) //获取出行人员id
								}
								that.ispaaNo = await that.apiutils.judgeApprv(that.nuarry);//用户是否免审  true为免审
							}
							that.hang = ret.data.airlineDds; //航空公司名
							that.apprvTaskReason = res.data.apprvTaskReason;
							that.address = airports.addressAirportAll; //航空名字
							that.recordNos = res.data.tradeNo; //销售单号
							that.amounts = res.data.amountPrice; //订单金额
							this.payStatus = res.data.payStatus; //支付状态
						}
					} else {
						that.showToasts(res.message);

					}
				} catch (e) {
					console.log(e)

				}
			},
			userstatus(ite) { //订单状态
				let arr = [{
					id: 1,
					value: '待审批'
				}, {
					id: 2,
					value: '取消'
				}, {
					id: 3,
					value: '拒单'
				}, {
					id: 4,
					value: '已审批'
				}, {
					id: 5,
					value: '已预订'
				}]
				for (let i in arr) {
					if (arr[i].id == ite) {
						return arr[i].value
					}
				}
			},
			catype(it) { //返回证件类型
				if (it == 1) {
					return '身份证' //NI
				} else if (it == 2) {
					return '护照' //PP
				} else if (it == 3) {
					return '台胞证' //TB
				} else if (it == 4) {
					return '港澳通行证' //GA
				}
			},
			cleraes() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定是否取消订单！',
					success: function(res) {
						if (res.confirm) {
							that.closedi();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			async closedi() { //取消订单
				let that = this;
				try {
					let res = await order.cancel({
						no: this.codes
					})

					if (res.code == 200) {
						this.showToasts("取消成功!");
						setTimeout(() => {
							that.toBlock();
						}, 500)
					} else {

						this.showToasts(res.message)
					}
				} catch (e) {
					console.log(e);

				}
			},
			rblcok() {
				this.toBlock();
			}
		}
	}
</script>

<style scoped lang="scss">
	.btnfixd {
		position: fixed;
		width: 100%;
		height: 110upx;
		bottom: 0upx;
		left: 0;
		line-height: 110upx;
		text-align: center;
		display: flex;
		z-index: 99;

		.btnsu {
			width: 100%;
			height: 110upx;
			color: #FFFFFF;
			background: #109DED;
		}
	}

	.citys {
		width: calc(100% - 60upx);
		padding: 20upx 35upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.citys_l {
			flex: 1;
			text-align: right;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			image {
				width: 150upx;
				height: 20upx;
				margin-bottom: 40upx;
			}
			.scis_t {
				line-height: 60upx;
				font-size: 48upx;
				font-weight: bold;
				width: 100%;
				color: #333333;
				align-items: left;
				text-align: left;
			}
			.scis_ts {
				line-height: 60upx;
				font-size: 48upx;
				font-weight: bold;
				width: 100%;
				color: #333333;
				align-items: left;
				text-align: right;
			}
			.scis_o {
				line-height: 50upx;
				font-size: 30upx;
				color: #333333;
				width: 100%;
				text-align: right;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.scis_b {
				line-height: 60upx;
				font-size: 28upx;
				color: #C8C7CC;
			}

			.scis_s {
				position: relative;
				margin: 0 auto;
				border-radius: 35upx;
				width: 130upx;
				line-height: 35upx;
				height: 35upx;
				color: $uni-color-primary;
				border: 2upx solid $uni-color-primary;

				.sci_l {
					position: absolute;
					width: 30upx;
					height: 2upx;
					background: $uni-color-primary;
					top: 16upx;
					right: 130upx;
				}

				.sci_r {
					position: absolute;
					width: 30upx;
					height: 2upx;
					background: $uni-color-primary;
					top: 16upx;
					left: 130upx;
				}
			}
		}
	}

	.trandetails {
		padding-bottom: 120upx;
		.Navigations {
			/*  #ifdef  APP-PLUS || MP-WEIXIN */
			padding-top: 60upx;
			/*  #endif  */
			width: 100%;
			height: 90upx;
			display: flex;
			align-items: center;
			background: linear-gradient(to right, #4e92fd 0%, #6e46fe 100%);
			justify-content: space-between;

			.ongbutns {
				color: #FFFFFF;
				text-align: center;
			}

			.onright {
				font-size: 30upx;
				padding-right: 10upx;
				color: #FFFFFF;
			}
		}

		.black_mu {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, .5);
			z-index: 888;

			.show {
				-webkit-transform: translateY(0);
				transform: translateY(0);
			}
		}

		.show {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}


		.userlist {
			position: fixed;
			bottom: 0;
			left: 0;
			transition: all 0.3s ease;
			-webkit-transform: translateY(100%);
			transform: translateY(100%);
			min-height: 200upx;
			width: 100%;
			z-index: 889;
			background: #ffffff;

			.userlist_top {
				display: flex;
				font-size: 30upx;
				height: 90upx;
				width: 100%;
				background: #f1f1f1;
				align-items: center;
				text-align: center;

				.btns {
					width: 20%;
					color: $uni-color-primary;
				}

				.oli {
					width: 60%;
					color: #c8c7cc;
				}
			}

			.usarbotm {
				width: 100%;
				padding: 40upx 0;
				display: flex;
				align-items: center;
				font-size: 30upx;

				.stname {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;

					.stve {
						padding: 0 15upx;
						height: 40upx;
						line-height: 40upx;
						border-radius: 8upx;
					}

					.stnamet {
						border: 2upx solid #999999;
						color: #999999;
					}

					.stnames {
						background: $uni-color-primary;
						border: 2upx solid $uni-color-primary;
						color: #FFFFFF;
					}
				}
			}
		}

		.flight {
			display: flex;
		}

		.navstop {
			position: relative;
			width: calc(100% - 40upx);
			padding: 20upx 20upx 20upx 20upx;
			font-size: 28upx;
			color: #FFFFFF;
			background: linear-gradient(to right, #4e92fd 0%, #6e46fe 100%);
			margin-bottom: 20upx;
			.cits_t {
				width: calc(100% - 20upx);
				padding: 10upx;
				background: #FFFFFF;
				color: #333333;
				line-height: 50upx;
				border-radius: 15upx;
			}
			.cits_sa {
				width: calc(100% - 60upx);
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 20upx 40upx 0 35upx;
				font-size: 28upx;
				color: #666666;
				.no_t {
					height: 40upx;
					line-height: 40upx;
				}
				.no_ts {
					height: 40upx;
					line-height: 40upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}

		.navback {
			font-size: 28upx;
			color: #3c85fd;
			background-color: #109DED;
			padding: 0 20upx;

			.nalistTop {
				width: calc(100% - 40upx);
				padding: 0 20upx;
				display: flex;
				justify-content: space-between;
				line-height: 60upx;
				background-color: #F5FAFD;
				border-top-left-radius: 15upx;
				border-top-right-radius: 15upx;
			}
		}
		.lisst {
			font-size: 28upx;
			width: calc(100% - 40upx);
			padding: 0 20upx 20upx 20upx;

			.citst {
				width: 100%;
				.cits_t {
					width: calc(100% - 40upx);
					padding: 20upx;
					background: #F5FAFD;
					color: #333333;
					line-height: 50upx;
				}

				.cits_b {
					width: calc(100% - 40upx);
					color: #333333;
					padding: 20upx 20upx;
					background: #FFFFFF;
					border-radius: 15upx;
					.cits_bt {
						display: flex;
						line-height: 60upx;
						align-items: center;
						font-size: 30upx;
						color:#333333;
						margin-left: 10upx;
						// justify-content: space-between;
						span:nth-child(1){
							color: #999999;
						}
						.cits_bt_content {
							display: flex;
						}

						.cits_bts {
							flex: 1;
						}

						.cits_bt_child {
							color: red;
							display: flex;
						}

						.cits_btsy {
							flex: 1;
							font-size: 30upx;
							color: #23b60f;
						}
					}

					.istaf {
						width: 100%;
						margin-top: 20upx;
						font-size: 30upx;

						.ravelv {
							width: calc(100% - 40upx);
							padding: 0 20upx;
							min-height: 90upx;
							background: #FFFFFF;
							margin-bottom: 20upx;

							.ts {
								line-height: 90upx;
								display: flex;

								.rav_left {
									width: 25%;
									color: #999999;
								}

								.ravright {
									width: 75%;
									display: flex;

									.bos {
										width: 93%;
										height: 90upx;
										overflow: scroll;
										display: flex;
										align-items: center;
									}

									.bost {
										width: 110upx;
										height: 80upx;
										font-size: 25upx;
										overflow: hidden;
										background: red;
									}
								}
							}
						}

						.ravelvs {
							width: calc(100% - 40upx);
							padding: 0 20upx;
							height: 140upx;
							background: #FFFFFF;
							margin-bottom: 20upx;

							.ts {
								line-height: 140upx;
								display: flex;

								.rav_left {
									width: 25%;
									text-align: center;
									color: #c0c0c0;
								}

								.ravright {
									width: 70%;
									height: 140upx;
									display: flex;
									align-items: center;

									.bost {
										text-align: center;
										width: 160upx;
										height: 120upx;
										overflow: hidden;
									}
								}
							}
						}
					}

					.optslist {
						position: fixed;
						bottom: 0;
						left: 0;
						transition: all 0.3s ease;
						-webkit-transform: translateY(100%);
						transform: translateY(100%);
						min-height: 200upx;
						width: 100%;
						z-index: 889;
						background: #ffffff;

						.btns {
							width: 100%;
							height: 90upx;
							display: flex;
							text-align: center;
							line-height: 90upx;
							font-size: 35upx;
							background: #E5E5E5;

							.btns_z {
								flex: 1;
								height: 90upx;
								color: $uni-color-primary;
							}
						}

						.stlist {
							width: 100%;
							height: 400upx;
							background: #E5E5E5;
							display: flex;

							.sltleft {
								height: 400upx;
								width: 30%;

								.ulsk_list {
									width: 100%;
									height: 90upx;
									text-align: center;
									font-size: 35upx;
									line-height: 90upx;
								}

								.cked {
									background: #FFFFFF;
								}
							}

							.sltright {
								width: 70%;
								height: 400upx;
								background: #FFFFFF;

								.sltrig_top {
									width: 100%;
									height: 90upx;
									overflow: scroll;
									line-height: 90upx;
									font-size: 25upx;
									display: flex;
									border-bottom: 2upx solid #F1F1F1;

									.sltiig_top_left {
										width: 140upx;
										text-indent: 20upx;
										color: #F1F1F1;
									}

									.sltiig_top_right {
										padding: 0 5px;
										min-width: 100upx;
										text-indent: 10upx;
										color: #333333;
									}

									.stis {
										color: $uni-color-primary !important;
									}
								}

								.sltrig_bot {
									width: calc(100% -20upx);
									height: 310upx;
									padding-left: 20upx;
									overflow: scroll;

									.striglist {
										width: 100%;
										height: 90upx;
										border-bottom: 2upx solid #F1F1F1;
										line-height: 90upx;
										display: flex;

										.stlis_left {
											width: 90%;
										}

										.stlis_right {
											width: 10%;
											text-align: center;
										}
									}
								}
							}
						}

						.botmis {
							width: 100%;
							height: 60upx;
							font-size: 30upx;
							color: $uni-color-primary;
							text-align: center;
							line-height: 60upx;
						}
					}
				}
			}

			.btuserlist {
				width: 100%;
				margin-top: 20upx;
				border-radius: 15upx;
				background: #FFFFFF;

				.btuse {
					color: #C8C7CC;
					width: calc(100% - 40upx);
					padding: 20upx;

					.btul {
						margin-top: 10upx;
						color: #333333;

						.user_t {
							display: flex;
							width: 100%;
							height: 50upx;
							line-height: 50upx;
							font-size: 28upx;

							.user_l {
								flex: 3;
							}

							.user_os {
								flex: 7;
								text-align: left;
							}

							.user_o {
								flex: 6;
								display: flex;
								justify-content: flex-end;
								align-items: center;

								.uses_sp {
									margin-left: 20upx;
									height: 40upx;
									line-height: 40upx;
									border-radius: 5upx;
									padding: 2upx 6upx;
									background: red;
									color: #FFFFFF;
								}

								.uses_st {
									margin-left: 20upx;
									height: 40upx;
									line-height: 40upx;
									border-radius: 5upx;
									padding: 2upx 6upx;
									background: #FF9000;
									color: #FFFFFF;
								}
							}

							.user_r {
								flex: 2;
								justify-content: flex-end;
								display: flex;
								color: #FF9000;
							}

							.user_t {
								flex: 3;
							}
						}
					}
				}

				.liass {
					width: calc(100% - 40upx);
					padding: 0 20upx;
					display: flex;
					color: #C8C7CC;
					line-height: 80upx;

					.liass_l {
						font-size: 35upx;
						flex: 1;
					}

					.liass_r {
						color: #333333;
						text-align: right;
						flex: 2;
					}

					.liass_p {
						text-align: right;
						flex: 1;
						font-size: 35upx;
						color: #FF9000;
					}
				}
			}
		}
	}
</style>
