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
				<view class="onrights" @click="cleraes()" v-if="orderStatus == 1">
					取消意向单
				</view>
			</view>
		</view>
		<view class="navstop">
			<view style="color:#ffffff;font-size:28upx;margin:20upx 40upx;">
				意向单单号：{{codes}}
			</view>
			<view style="color:#ffffff;font-size:28upx;margin:20upx 40upx;">
				订单状态：<span style="font-size:30upx;font-weight:bold;">{{userstatus(orderStatus)}}</span>
			</view>
		</view>
		<view class="lisst">
			<view class="citst">
				<view class="cits_b">
					<view class="cits_bt">
						<span style="flex:0.5;">酒店名称</span><span style="flex:1;">{{plsitsti.hotelName}}</span>
					</view>
					<view class="cits_bt" v-if="plsitsti.hotelPhone != null">
						<span style="flex:0.5;">酒店电话</span><span style="flex:1;">{{plsitsti.hotelPhone}}}</span>
					</view>
					<view class="cits_bt" v-if="plsitsti.bedTypeName != null">
						<span style="flex:0.5;">酒店床型</span><span style="flex:1;">{{plsitsti.bedTypeName}}</span>
					</view>
					<view class="cits_bt">
						<span style="flex:0.5;">房间数量</span><span style="flex:1;">{{plsitsti.bookCount}}间</span>
					</view>
					<view class="cits_bt" v-if="plsitsti.proName != null">
						<span style="flex:0.5;">房间类型</span><span style="flex:1;">{{plsitsti.proName}}</span>
					</view>
					<view class="cits_bt" v-if="plsitsti.hotelAddress != null">
						<span style="flex:0.5;">酒店地址</span><span style="flex:1;">{{plsitsti.hotelAddress}}</span>
					</view>
				</view>
				<view class="cits_b">
					<view class="cits_bt">
						<span style="flex:0.5;">入住城市</span><span style="flex:1;">{{plsitsti.city}}</span>
					</view>
					<view class="cits_bt">
						<span style="flex:0.5;">入住日期</span><span style="flex:1;">{{plsitsti.arrivalDate}}</span>
					</view>
					<view class="cits_bt">
						<span style="flex:0.5;">离开日期</span><span style="flex:1;">{{plsitsti.departureDate}}</span>
					</view>
					<view class="cits_bt">
						<span style="flex:0.5;">最晚到店</span><span style="flex:1;">{{plsitsti.arriveHotelTime}}</span>
					</view>
					<view class="cits_bt" v-if="plsitsti.guestNames != null">
						<span style="flex:0.5;">入住人</span><span style="flex:1;">{{ plsitsti.guestNames }}</span>
					</view>
					<view class="cits_bt" v-if="plsitsti.contactName != null">
						<span style="flex:0.5;">联系人</span><span style="flex:1;">{{plsitsti.contactName}}</span>
					</view>
					<view class="cits_bt" v-if="plsitsti.contactNumber != null">
						<span style="flex:0.5;">联系电话</span><span style="flex:1;">{{plsitsti.contactNumber}}</span>
					</view>
					<view class="cits_bt" v-if="plsitsti.salePrice != null">
						<span style="flex:0.5;">总价</span><span style="flex:1;color:#FFA63E;"><span
								style="font-weight:bold;font-size:24upx;color:#FFA63E;">￥</span>{{plsitsti.salePrice}}</span>
					</view>
					
				</view>
			</view>
		</view>
		<view class="isdvlist" v-show="travelType === '1' && travelNo == null && orderStatus === '1' && ispaaNo == false">
			<view class="istaf">
				<view class="ravelv">
					<view class="ts">
						<view class="rav_left">出差事由:</view>
						<view class="ravright">
							<view class="bos">
								<subjects @change="subclcks"></subjects>
							</view>
							<!-- <view class="iconfont">&#xe8a3;</view> -->
						</view>
					</view>
				</view>
			</view>
			<view class="istaf">
				<view class="ravelv">
					<view class="ts">
						<view class="rav_left">归属部门:</view>
						<view class="ravright">
							<view class="bos">
								{{attdepartment}}
							</view>
							<!-- <view class="iconfont">&#xe8a3;</view> -->
						</view>
					</view>
				</view>
				<constCenter :morconst="morconsts" @costcCks="costcCk" :toisblcks="toisblcks"  :isblckt="isblckt" :sttos="sttos"></constCenter>
			</view>
		</view>
		<view class="lisst">
			<view class="citst">
				<view class="cits_b">
					<view class="cits_bt" v-if="orderStatus === '0'">
						<span style="flex:0.5;">备注</span><span style="flex:1;"
							v-show="plsitsti.remark != null">{{plsitsti.remark}}</span>
					</view>
					<view class="cits_bt" v-else>
						<span style="flex:0.5;">取消规则</span><span style="flex:1;"
							v-show="plsitsti.cancelReason != null">{{plsitsti.cancelReason}}</span>
					</view>
				</view>
			</view>
		</view>
		<view class="btnfixd">
			<paybtns businessType="1" productType="4" :recordNo="recordNos" :amount="amounts" @payok="payok"
				intent-details="1" v-if="this.travelType == 2 && this.payStatus == 1"></paybtns>
			<!-- v-if="(payStatus == 1 || payStatus == 2)&& tlement == 1"-->
			<view class="btn" v-if="orderStatus == 1 && hotelOrder == null" @click="confirm">确认</view>
		</view>
	</view>
</template>

<script>
	import subjects from '@/components/view/book/subject-matter/subjectMatter.vue'
	import constCenter from '@/components/view/book/cost-center/costCenter.vue'
	import order from '@/api/order.js'
	import tork from '@/api/torowk.js'
	export default {
		components:{
			subjects,
			constCenter
		},
		data() {
			return {
				ispaaNo:false,//是否免审
				butalist:[],//入住人信息
				isGetStaffList:false,//是否无审批流
				sttos: 1, //事前是否违规再次审批  1为开启二次审批 3超规审批
				isblckt: false, //事中改签是否走超标审批流 事前是否违规再次审批
				toisblcks:2,//意向单类型 1事前 2事中
				morconsts:{},//事前默认成本中心
				recordNos: 0,
				requireNo: '',
				amounts: 0,
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
				nuarry:[],//出行人id

				plsitsti: {},
				apprvTaskReason: '出差事由', //出差事由
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
				travelType: '',
				hotelOrder: '',
				reson: '', //出行事由
				resonName:'',
				costs: false,
				CostCenter: [],
				slid: 1,
				ullist: [{
					name: '成本中心',
					id: 1
				}],
				slitlist: [],
				sli_namelist: [],
				TravelDepartlist: [],
				cbname: '', //成本中心名称
				cbid: '', //成本中心id
				botname: '', //当前选择的成本中心名称
				slit_id_checd: 0, //当前点击成本中心的id
				treeLists: [], //归属部门列表
				ops_list: false, //归属部门
				Deparapprover: [], //部门审批人
				blac_show: false,
				shos: false,
				isblckt: false,
				Deparapp: [],
				apprvTaskStaffs: []
			}
		},
		onLoad(item) {
			this.ist = item.ist;
			this.codes = item.code;
		},
		mounted() {
			this.slet();
			const data = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //获取归属部门
			if (data.deptName) {
				this.attdepartment = data.deptName;
			}
		},
		methods: {
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
			subclcks(data){//返回当前选中的事由id
				this.reson = data.id;
				this.resonName = data.name
			},
			async confirm() {
				let dat = [];
				if (this.travelNo != null || this.travelType == 2) { //因私 或者事前
					dat = {
						requireNo: this.codes
					}
				} else if (this.travelNo == null && this.travelType == 1) { //因公  事中
					if(this.ispaaNo == false){
						if (this.reson == null || this.reson == '') {
							this.showToasts('请输入出差事由！');
						
							return;
						}
						if (this.NameCenter.id == '') {
							this.showToasts('请选择成本中心！');
							return;
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
					dat = {
						requireNo: this.codes,
						apprvTaskEntity: {
							apprvTaskStaffs: apprvTaskStaffts,
							costId: this.NameCenter.id,
							costName: this.NameCenter.name,
							beforeMiddle: 2,
							reason: this.resonName,
							reasonId:this.reson,
							taskType: 2
						}
					}
				}
				let res = await order.confirmOrder(dat);
				if (res.code == 200) {
					this.slet();
				} else {
					this.showToasts(res.message);
				}
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
					const res = await order.intentDetails({
						requireNo: this.codes
					});

					if (res.code == 200) {
						if (va == 'wx' && (res.data.hotelOrder.paymentStatus == 1 || res.data.hotelOrder
								.paymentStatus == 2)) {

							that.tiltext = '订单支付中...';
							setTimeout(() => {
								that.slet('wx')
							}, 1000)
						} else {
							that.ltes = 0;
							that.tiltext = '意向单详情';
							that.plsitsti = res.data.holRequire;
							that.travelNo = res.data.holRequire.travelNo;
							that.travelType = res.data.holRequire.travelType;
							that.apprvTaskReason = res.data.apprvTaskReason;
							that.numprice = res.data.holRequire.salePrice; //总价
							that.orderStatus = res.data.holRequire.orderStatus;
							that.hotelOrder = res.data.hotelOrder;
							that.butalist = JSON.parse(res.data.holRequire.travelers);//入住人信息
							if(that.travelType == 1 && that.travelNo == null){//因公 事中
								that.nuarry = [];
								for (var i = 0; i < that.butalist.length; i++) {
									that.nuarry.push(that.butalist[i].passengerNo) //获取出行人员id
								}
								that.ispaaNo = await that.apiutils.judgeApprv(that.nuarry);//用户是否免审  true为免审
							}
							that.amounts = res.data.holRequire.salePrice;
							if (res.data.saleOrder != null) {
								that.payStatus = res.data.saleOrder.payStatus; //支付状态
								that.recordNos = res.data.saleOrder.transationOrderNo;
							}
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
					let res = await order.cancelHolRequire({
						requireNo: this.codes
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
		}

		.show {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}

		.btnfixd {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			line-height: 110upx;
			z-index: 9999;
			text-align: center;
			display: flex;

			.btn {
				width: 100%;
				height: 110upx;
				color: #FFFFFF;
				background: #109DED;
				padding-bottom: 1rpx;
			}
		}

		.userlist {
			width: 100%;
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

		.navstop {
			width: calc(100% - 80upx);
			padding: 20upx 40upx 30upx 40upx;
			font-size: 28upx;
			color: #FFFFFF;
			background: linear-gradient(to right, #4e92fd 0%, #6e46fe 100%);
		}
		.isdvlist{
			width: calc(100% - 40upx);
			border-radius: 20upx;
			margin:  10upx 20upx;
			padding:  20upx 0;
			background-color: #FFFFFF;
			.istaf {
				width: 100%;
				font-size: 30upx;
			
				.ravelv {
					width: calc(100% - 40upx);
					min-height: 90upx;
					background: #FFFFFF;
					margin-bottom: 20upx;
			
					.ts {
						line-height: 90upx;
						display: flex;
						.rav_left {
							width: 25%;
							text-align: center;
							color: #c0c0c0;
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
								color: #333333;
								margin-left: 30upx;
								.navigas{
									width: 100%;
									
								}
								.swname {
									line-height: 90upx;
									font-size: 30upx;
									color: #333333;
									padding: 0 10upx;
								}
					
								.userlists {
									height: 90upx;
									font-size: 30upx;
									margin: 0 10upx;
								}
					
								input {
									font-size: 30upx;
									width: 100%;
									color: #333333;
									margin-right: 10upx;
									margin-bottom: 5upx;
								}
								.navimd{
									color: #C0C0C0;
								}
							}
					
							.bot {
								display: flex;
							}
					
							.bost {
								width: 93%;
					
								.userlists {
									font-size: 30upx;
									margin: 0 10upx;
								}
							}
						}
					}
				}
			}
		}
		.lisst {
			left: 0;
			top: 110upx;
			width: calc(100% - 40upx);
			padding: 20upx 20upx 10upx 20upx;

			.citst {
				width: 100%;

				.cits_b:nth-child(1) {
					padding-top: 20upx;
					border-top-left-radius: 15upx;
					border-top-right-radius: 15upx;
				}

				.cits_b:last-child {
					padding-bottom: 30upx;
					border-bottom-left-radius: 15upx;
					border-bottom-right-radius: 15upx;
				}

				.cits_b {
					width: calc(100% - 40upx);
					color: #333333;
					padding: 0 20upx;
					background: #FFFFFF;
					font-size: 30upx;

					.cits_bt {
						display: flex;
						line-height: 60upx;
						align-items: center;
						justify-content: space-between;

						span:nth-child(1) {
							color: #999999;
						}

						.cits_bts {
							display: flex;
							flex: 1;
						}

						.cits_btsy {
							display: flex;
							flex: 1;
							color: #F48F00;
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
