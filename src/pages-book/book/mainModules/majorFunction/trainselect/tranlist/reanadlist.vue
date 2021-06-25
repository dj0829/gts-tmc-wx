<template>
	<view class="readlist" v-if="datalist">
		<view class="black_mu" @click="isshow" v-if="blac_show"></view>
		<loading></loading>

		<headnavigation titles="确定信息"></headnavigation>
		<view class="rea_t">
			<view class="tan_t_t">
				<view class="above">
					<!-- 时间地址 -->
					<view class="above_left">
						<view style="font-size:26upx;text-align: left;margin-bottom:10upx;">
							{{times(datalist.ranst.item.dats)}}</view>
						<view class="go_off"></view>
						<view class="go_off">
							{{ datalist.ranst.item.fromTime }}
						</view>
						<view class="arrival_time">
							{{ datalist.ranst.item.fromStation }}
						</view>
					</view>
					<view class="above_centre">
						<view style="font-size: 20upx;color:#DBDBFF">
							{{ datalist.ranst.item.trainNo }}
						</view>
						<view>
							<image src="@/static/img/home/home_stopover.png"></image>
						</view>
						<view style="font-size: 20upx;color:#DBDBFF">
							{{timey(datalist.ranst.item.runTimeSpan)}}
						</view>
						<view class="tan_bt">经停信息</view>
					</view>
					<view class="above_right" style="text-align: left;">
						<view style="font-size:26upx;text-align: left;margin-bottom:10upx;margin-left:35upx;">
							{{times(datalist.ranst.item.dats)}}</view>
						<view class="go_off">
							{{ datalist.ranst.item.toTime }}
						</view>
						<view class="arrival_time">
							{{ datalist.ranst.item.toStation }}
						</view>
					</view>
				</view>
				<view style="font-size:26upx;margin-left:46upx;">
					<span>{{datalist.astlis.seatName}}</span><span
						style="margin-left:20upx;">￥{{ datalist.astlis.price }}</span>
				</view>
			</view>
		</view>
		<view v-show="allseat == true" class="cseat">
			<view class="seat_a">
				<view style="font-size:34upx;color:#333333;margin-left:26upx;padding-top:30upx;font-weight: bold;">在线选座
				</view>
				<view style="display: flex;">
					<view class="seat_le">
						<view v-for="(item,index) in seat" :key="index">
							<view v-if="item.name == 'A'">
								<span style="margin-right:20upx;">窗</span>
								<view class="seat" @click="picks(item)"
									:class="seids(item.id) == item.id ? 'pickseat' : '' ">
									{{ item.name }}
								</view>
							</view>
							<view v-if="item.name !='A' && item.name != 'D' && item.name != 'F'">
								<view class="seat" @click="picks(item)"
									:class="seids(item.id) == item.id ? 'pickseat' : '' ">
									{{ item.name }}
								</view>
							</view>
							<view v-if="item.name == 'D'">
								<span style="margin:0 40upx;">过道</span>
								<view class="seat" @click="picks(item)"
									:class="seids(item.id) == item.id ? 'pickseat' : '' ">
									{{ item.name }}
								</view>
							</view>
							<view v-if="item.name == 'F' && seat.length == 3">
								<span style="margin:0 40upx;">过道</span>
								<view class="seat" @click="picks(item)"
									:class="seids(item.id) == item.id ? 'pickseat' : ''">
									{{ item.name }}
								</view>
								<span style="margin-left:20upx;">窗</span>
							</view>
							<view v-if="item.name == 'F'  && seat.length != 3">
								<view class="seat" @click="picks(item)"
									:class="seids(item.id) == item.id ? 'pickseat' : ''">
									{{ item.name }}
								</view>
								<span style="margin-left:30upx;">窗</span>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-show="secseat == true" class="seat_a">
				<view style="display: flex;">
					<view class="seat_le">
						<view v-for="(item,index) in seats" :key="index">
							<view v-if="item.name == 'A'">
								<span style="margin-right:20upx;">窗</span>
								<view class="seat" @click="picks(item)"
									:class="seids(item.id) == item.id ? 'pickseat' : '' " v-if="item.name =='A'">
									{{item.name}}
								</view>
							</view>
							<view class="seat" @click="picks(item)"
								:class="seids(item.id) == item.id ? 'pickseat' : '' "
								v-if="item.name !='A' && item.name != 'D' && item.name != 'F'">
								{{item.name}}
							</view>
							<view v-if="item.name == 'D'">
								<span style="margin:0 40upx;">过道</span>
								<view class="seat" @click="picks(item)"
									:class="seids(item.id) == item.id ? 'pickseat' : '' ">
									{{item.name}}
								</view>
							</view>
							<view v-if="item.name == 'F' && seats.length == 3">
								<span style="margin:0 40upx;">过道</span>
								<view class="seat" @click="picks(item)"
									:class="seids(item.id) == item.id ? 'pickseat' : ''">
									{{item.name}}
								</view>
								<span style="margin-left:20upx;">窗</span>
							</view>
							<view v-if="item.name == 'F'  && seats.length != 3">
								<view class="seat" @click="picks(item)"
									:class="seids(item.id) == item.id ? 'pickseat' : ''">
									{{ item.name }}
								</view>
								<span style="margin-left:30upx;">窗</span>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="userlist">
			<view class="cu_time" v-if="toisblcks != 4">
				<passenger :isretun="isretun" ref="passengers" @butaluser="bustlist" :butaluserlist="butalist"
					types="2"></passenger>
			</view>
			<view class="userls" v-for="(item, idnex) in deptlists" :key="idnex" v-if="toisblcks != 4">
				<view class="use-tles">
					{{ item.name }}
				</view>
				<view class="use_list" v-for="(its,indexs) in item.list" :key="indexs">
					<view class="us_tps">
						<view>{{its.name}}</view>
						<view class="us_rights">
							<picker :range="its.certificateList" :range-key="'cardTypename'"
								@change="CostCencdChange($event,idnex,indexs,its)">
								{{ TuoMin(its.certificateList[item.indx[indexs].index].cardNo,its.certificateList[item.indx[indexs].index].cardType) }}
							</picker>
							<view class="iconfont" style="">&#xe8a3;</view>
						</view>
					</view>
				</view>
			</view>
			<view class="userls" v-if="toisblcks == 4">
				<view class="use-tles">
					改签用户
				</view>
				<view class="use_list" v-for="(item, idnex) in deptlists" :key="idnex">
					<view class="us_tps">
						<view>{{item.name}}</view>
						<view class="us_rights">
							<view class="">
								{{TuoMin(item.certNo,item.cardType)}}
							</view>
							<view class="iconfont" style="">&#xe8a3;</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="costlists" :class="costs ? 'show' : ''">
			<!-- <view class="costl_t">
				费用明细
			</view> -->
			<view class="costlist_s" v-if="tkShowId == 1">
				<view class="cost_li costs">
					<view class="scse_l">
						<view>票价</view>
						<view style="border-top:1px dashed #c0c0c0;min-width:300upx;max-height:10upx;margin-top:40upx;">
						</view>
					</view>
					<view class="scse_r">
						<view class="corssize">
							￥{{datalist.astlis.price}}
						</view>
						<view>
							x{{butalist.length}}人
						</view>
					</view>
				</view>
				<view class="cost_li costs">
					<view class="scse_l">
						<view>服务费</view>
						<view style="border-top:1px dashed #c0c0c0;min-width:300upx;max-height:10upx;margin-top:40upx;">
						</view>
					</view>
					<view class="scse_r">
						<view class="corssize">
							￥{{Brokerage}}
						</view>
						<view>
							x{{butalist.length}}份
						</view>
					</view>
				</view>
				<view class="cost_li costs">
					<view class="scse_l">
						<view>保险</view>
						<view style="border-top:1px dashed #c0c0c0;min-width:300upx;max-height:10upx;margin-top:40upx;">
						</view>
					</view>
					<view class="scse_r">
						<view class="corssize">
							￥{{bxPrice}}
						</view>
						<view>
							x{{butalist.length}}份
						</view>
					</view>
				</view>
				<view class="cost_li costs">
					<view class="scse_l">
						<view>总额</view>
						<view style="border-top:1px dashed #c0c0c0;min-width:300upx;max-height:10upx;margin-top:40upx;">
						</view>
					</view>
					<view class="scse_r">
						<view class="corssize">
							￥{{onprice}}
						</view>
					</view>
				</view>
			</view>
			<view class="tansList" v-if="tkShowId == 2" v-html="tansLists">
			</view>
		</view>
		<!-- 改签并且购买了保险就提示 -->
		<!-- <view class="ipablos" v-if="toisblcks == 4 && datalist.ranst.insOrders == true">
			温馨提示：改签时需重新购买保险，原票购买的保险需在我的订单详情中手动去退保，退保成功后保费会原路退回
		</view> -->
		<view class="istaf" v-if="insurancesList.length > 0">
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">火车保险</view>
					<view class="ravright">
						<view class="bos">
							<view class="navigas" :class="insurancesIndex == 0 ? 'navimd':''">
								<picker :range="insurancesList" :range-key="'name'" @change="chineseChange($event)">
									{{ insurancesList[parseInt(this.insurancesIndex)].name }}
								</picker>
							</view>
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
				<view class="tswos" v-if="this.insurancesIndex != 0">
					<view class="tswo_le">
						旅程安心 | 保额 {{tans(tansAmount)}}
					</view>
					<view class="tswo_ri">
						请阅读<span @click="clikst(2)">投保须知</span>
					</view>
				</view>
			</view>
		</view>
		<view class="istaf" v-if="datalist.ranst.isbtd == 1 && resonIds != -1 ">
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">出行事由</view>
					<view class="ravright">
						<view class="bos">
							<subjects @change="subclcks" :type="toisblcks" :oldResonIds="old_resonIds"></subjects>
							<!-- <input type="text" v-model="reson" placeholder="请输入出行事由" value="" /> -->
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
		</view>
		<view class="istaf" v-if="isshowcenter">
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left" style="color:#333333;">归属部门</view>
					<view class="ravright">
						<view class="bos bot">
							<view v-if="attdepartment != null">{{attdepartment}}</view>
						</view>
					</view>
				</view>
				<constCenter :morconst="morconsts" @costcCks="costcCk" :toisblcks="toisblcks"  :isblckt="isblckt" :sttos="sttos"></constCenter>
			</view>
		</view>
		<view class="istaf">
			<view class="ravelv">
				<view class="ts" v-if="(datalist.astlis.seatName == '硬座' || datalist.astlis.seatName == '二等座') && toisblcks != 4">
					<view class="rav_left">接受无座</view>
					<view class="ravright">
						<view class="bos">
							<switch class="section-right" :checked="treatmentStatu.checked" @change="switchChange" />
						</view>
					</view>
				</view>
				<view class="ts">
					<view class="rav_left">联系人</view>
					<view class="ravright">
						<view class="bos">
							<input type="text" v-model="user_name" placeholder="请输入联系人" value="" />
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
				<view class="ts">
					<view class="rav_left">联系电话</view>
					<view class="ravright">
						<view class="bos">
							<input v-if="user_ipones != ''" type="text" v-model="user_ipones" maxlength="11" @focus="focusfns(1)" value="" />
							<input v-else type="number" v-model="user_ipone" maxlength="11"  placeholder="请输入联系电话" value="" />
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
		</view>

		<view class="oksl">
			<view class="oksl_l" @click="clikst(1)">
				<view>
					<span style="font-size:24upx;">￥</span><span>{{onprice}}</span>
				</view>
				<view class="scslist">
					费用详情
					<view class="imgs">
						<image v-if="homex" src="@/static/img/home/home_x.png"></image>
						<image v-if="homes" src="@/static/img/home/home_s.png"></image>
					</view>
				</view>
			</view>
			<view class="oksl_r" :class="isbtns ? 'btoks':''" v-if="toisblcks != 4 && rotes('tms:tra:reserve')"
				@click="okadd">
				下一步
			</view>
			<view class="oksl_r" :class="isbtns ? 'btoks':''" v-if="toisblcks == 4 && rotes('tms:tra:change')"
				@click="uprean">
				申请改签
			</view>
		</view>
	</view>
</template>

<script>
	import constCenter from '@/components/view/book/cost-center/costCenter.vue'
	import passenger from "@/components/view/book/passenger/passenger";
	import certifi from '@/api/certificate.js'
	import order from '@/api/order.js'
	import tork from '@/api/torowk.js'
	import mydi from '@/api/mydi.js';
	import subjects from '@/components/view/book/subject-matter/subjectMatter.vue'
	export default {
		components: {
			passenger,
			subjects,
			constCenter
		},
		data() {
			return {
				treatmentStatu: {
					checked: false
				},//是否接受无座默认值为不接受
				tansAmount:0,//保额
				tansLists:'',//当前保险的投保须知
				tkShowId:1,//1显示费用详情 2显示投保须知  
				old_resonIds:0,//默认事由id  (事前)
				resonIds:-1,
				isretun: false,
				deptlists: [], //处理过后的旅客信息
				isbtns: false, //是否点击了提交
				isGetStaffList: false, //是否无审批流
				isshowcenter: false, //是否显示审批信息
				insurancesList: [], //火车保险
				insurancesIndex: 0, //当前所选保险
				reson: '',//出行事由
				resonName:'',
				CostCi: false,
				CostCis: false, //是否有部门审批人
				costs: false,
				onprice: 0, //总价
				user_name: '', //联系人
				user_ipones:'',
				user_ipone: '', //联系电话
				TravelDepartlist: [], //部门审批人
				TravelCostCenlist: [], //成本中心
				scardns: [],
				userlists: [], //用户列表
				
				switfal: false,
				homex: false,
				homes: true,
				
				treeLists: [], //归属部门列表
				ops_list: false, //归属部门

				

				datalist: null,
				cardlist: [],
				oprefs: [{
					'oprefs_1': ''
				}, {
					'oprefs_2': ''
				}, {
					'oprefs_3': ''
				}, {
					'oprefs_4': ''
				}, {
					'oprefs_5': ''
				}],
				NameCenter: {
					name: '',
					id: ''
				},
				blac_show: false,
				attdepartment: '', //归属部门
				carld: [], //证件列表
				scardnno: [], //证件值
				nameno: [], //证件名
				Brokerage: 0, //单人火车票手续费
				RuleMa: '',
				RuleMas: false,
				ismokksli: false, //是否出差预定
				isblckt: false, //事中改签是否走超标审批流 事前是否违规再次审批
				sttos: 1, //事前是否违规再次审批  1为开启二次审批 3为违规再次审批
				vehicleId: '', //事前id

				allseat: false,
				secseat: false, //第二排座位

				pick: [],
				butalist: [], //现在的出差人
				picklist: [],
				seat: [],
				seats: [],
				isGift: false, //是否赠送
				isDefaulConfig: false, //是否默认
				getTravelPolicys: {}, //保险规则
				bxPrice: 0, //当前选择保险价格
				toisblcks: 1, //1事前2事中 3事前违规在次 4改签
				deptlists: [],
				
				morconsts:{},//事前默认成本中心
			};
		},
		onLoad(itm) {
			let dat = uni.getStorageSync('reanadlistData');
			let ists = dat.ranst.mokksli;
			if (JSON.stringify(ists) != "{}") {
				this.ismokksli = true;
			}
			this.datalist = dat || {};
			this.toisblcks = this.datalist.ranst.isblcks;
			this.onprice = this.datalist.astlis.price;

		},
		mounted() {
			this.butalist = this.datalist.ranst.butalist;
			if (this.toisblcks == 1) { //判断是否事前
				this.attdepartment = this.datalist.ranst.mokksli.deptName;
				this.NameCenter = {
					name: this.datalist.ranst.mokksli.costName,
					id: this.datalist.ranst.mokksli.costId
				}
				this.morconsts = {//事前默认成本中心
					name: this.datalist.ranst.mokksli.costName,
					id: this.datalist.ranst.mokksli.costId
				}
			} else {
				const data = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //获取归属部门
				if (data.deptName) {
					this.attdepartment = data.deptName;
				}
			}
			let nuarry = [];
			
			this.isblckt = this.datalist.isblckt; //超标审批
			if (this.isblckt) {
				this.sttos = 3; //1为事前审批 3为超标审批
				this.isshowcentermt(); //是否显示审批信息
			} else {
				//改签或者事前  不是免审
				if (this.toisblcks == 4 || (this.toisblcks == 1 && this.datalist.isarsrl == false)) {
					this.getRuleMainSetting(); //获取公司是否 改签 事前是否 需要审核
				} else {
					this.isshowcentermt(); //是否显示审批信息
				}
			}
			
			if (this.datalist.ranst.isbtd == 2) { //除了因私 别的都不能修改用户
				this.isretun = false;
			} else {
				this.isretun = true;
			}
			this.usernams(); //获取联系人
			this.getBrokerage(); //火车票单人手续费
			this.userlist(); //用户信息
			this.getTravelPolicyst(); //获取保险规则
		},
		methods: {
			switchChange(e) {
				let value = e.target.value
				let that = this
				this.$set(this.treatmentStatu, 'checked', value) // 将点击改变的状态赋给treatmentStatu.checked
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
			focusfns(va){//清空手机号
				if(va == 1 ){//手机号
					this.user_ipone = '';
					this.user_ipones = '';
				}
			},
			TuoMin(no,type){//回显证件号
				return this.utils.TuoMin(no,type)
			},
			tans(prc){//回显保险价格
				return this.utils.upPrcies(prc);
			},
			subclcks(data){//返回当前选中的事由id
				this.reson = data.id;
				this.resonName = data.name
			},
			timey(time) {
				let dat = parseInt(time / 60);
				let sti = ''
				if (time > dat * 60) {
					sti = time - (dat * 60);
					return dat + '小时' + sti + '分'
				} else {
					return dat + '小时'
				}
			},
			times(item) {
				let tiem = item.split('-');
				return tiem[1] + '月' + tiem[2]
			},
			bustlist(item) {
				this.butalist = item;
				this.seat = [];
				this.seats = [];
				if (this.butalist.length != 0) {
					this.userlist();
					this.onprices();
				} else {
					this.deptlists = [];
					this.onprices();
				}
			},
			async getTravelPolicyst() {
				try {
					let res = await certifi.getTravelPolicy(); //保险规则
					if (res.code == 200) {
						this.getTravelPolicys = res.data;
					} else {
						this.showToasts(res.message);
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			chineseChange(e) {
				this.insurancesIndex = e.detail.value;
				if(this.insurancesIndex != 0){
					this.tansAmount = this.insurancesList[this.insurancesIndex].amount//保额
					this.tansLists = this.insurancesList[this.insurancesIndex].brief//当前保险的投保须知
				}
				this.onprices();
			},
			//座位显示
			showseat() {
				try {
					let _this = this;
					let userlen = this.butalist.length;
					let sst = this.datalist.ranst.item.trainNo.substring(0, 1);
					let slv = this.datalist.astlis.seatName;
					if (userlen > 1) {
						this.secseat = true;
					} else if (userlen == 1) {
						this.secseat = false;
					}
					if (sst == 'G' || sst == 'C' || sst == 'D') {
						this.allseat = true;
						if (slv == '二等座') {
							if (this.secseat) {
								this.seat.push({
									id: '1',
									value: '1A',
									name: 'A'
								}, {
									id: '2',
									value: '1B',
									name: 'B'
								}, {
									id: '3',
									value: '1C',
									name: 'C'
								}, {
									id: '4',
									value: '1D',
									name: 'D'
								}, {
									id: '5',
									value: '1F',
									name: 'F'
								})

								this.seats.push({
									id: '6',
									value: '2A',
									name: 'A'
								}, {
									id: '7',
									value: '2B',
									name: 'B'
								}, {
									id: '8',
									value: '2C',
									name: 'C'
								}, {
									id: '9',
									value: '2D',
									name: 'D'
								}, {
									id: '10',
									value: '2F',
									name: 'F'
								})
							} else {
								this.seat.push({
									id: '1',
									value: '1A',
									name: 'A'
								}, {
									id: '2',
									value: '1B',
									name: 'B'
								}, {
									id: '3',
									value: '1C',
									name: 'C'
								}, {
									id: '4',
									value: '1D',
									name: 'D'
								}, {
									id: '5',
									value: '1F',
									name: 'F'
								})

							}

						} else if (slv == '一等座') {
							if (this.secseat) {
								this.seat.push({
									id: '1',
									value: '1A',
									name: 'A'
								}, {
									id: '2',
									value: '1C',
									name: 'C'
								}, {
									id: '3',
									value: '1D',
									name: 'D'
								}, {
									id: '4',
									value: '1F',
									name: 'F'
								})
								this.seats.push({
									id: '5',
									value: '2A',
									name: 'A'
								}, {
									id: '6',
									value: '2C',
									name: 'C'
								}, {
									id: '7',
									value: '2D',
									name: 'D'
								}, {
									id: '8',
									value: '2F',
									name: 'F'
								})
							} else {
								this.seat.push({
									id: '1',
									value: '1A',
									name: 'A'
								}, {
									id: '2',
									value: '1C',
									name: 'C'
								}, {
									id: '3',
									value: '1D',
									name: 'D'
								}, {
									id: '4',
									value: '1F',
									name: 'F'
								})
							}
						} else if (slv == '商务座') {
							if (this.secseat) {
								this.seat.push({
									id: '1',
									value: '1A',
									name: 'A'
								}, {
									id: '2',
									value: '1C',
									name: 'C'
								}, {
									id: '3',
									value: '1F',
									name: 'F'
								}, )
								this.seats.push({
									id: '4',
									value: '2A',
									name: 'A'
								}, {
									id: '5',
									value: '2C',
									name: 'C'
								}, {
									side: 'side',
									id: '6',
									value: '2F',
									name: 'F'
								})
							} else {
								this.seat.push({
									id: '1',
									value: '1A',
									name: 'A'
								}, {
									id: '2',
									value: '1C',
									name: 'C'
								}, {
									id: '3',
									value: '1F',
									name: 'F'
								}, )
							}
						} else {
							this.allseat = false;
						}
					}
				} catch (e) {
					console.log('生成座位报错', e)
					//TODO handle the exception
				}

			},
			seids(id) {
				for (let i = 0; i < this.pick.length; i++) {
					if (id == this.pick[i].id) {
						return id;
					}
				}
			},
			//选座
			picks(item) {
				let _this = this;
				let boolean = false;
				let index = '';
				if (_this.pick.length > 0) {
					for (let i = 0; i < _this.pick.length; i++) {
						if (item.id == _this.pick[i].id) {
							boolean = true;
							index = i;
						}
					}
					if (boolean) {
						this.pick.splice(index, 1)
						this.picklist.splice(index, 1)
						return
					} else {
						if (_this.pick.length == this.deptlists[0].list.length) {
							if (this.deptlists[0].list.length == 1) {
								_this.pick.splice(0, 1);
								_this.picklist.splice(0, 1);
								_this.pick.push({
									id: item.id
								});
								_this.picklist.push({
									item
								});
							} else {
								uni.showToast({
									title: '只能选择' + this.deptlists[0].list.length + '人',
									duration: 5000,
									icon: 'none'
								});
							}
						} else {
							_this.pick.push({
								id: item.id
							})
							_this.picklist.push({
								item
							})
							return
						}
					}
				} else {
					this.pick.push({
						id: item.id
					})
					this.picklist.push({
						item
					})
				}
			},
			async usernams() { //获取联系人
				try {
					const res = await tork.getContactInfo();
					if (res.code == 200) {
						this.user_name = res.data.name;
						this.user_ipone = res.data.phone;
						this.user_ipones = this.utils.TuoMin(res.data.phone,1);
						
					} else {
						this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e);
				}
			},
			CostCencdChange(e, index, ins, trus) { //选择当前证件
				let ev = e.detail.value; //当前修改的下标
				this.deptlists[index].indx[ins].index = ev; //当前修改的下标
				this.deptlists[index].list[ins].okcardType = trus.certificateList[ev].cardType; //修改当前选中的证件类型
				this.deptlists[index].list[ins].okcardNo = trus.certificateList[ev].cardNo; //修改当前选中的证件号
				if (trus.certificateList[ins].firstName != null && trus.certificateList[ev].lastName != null) { //判断是否存在证件名
					this.deptlists[index].list[ins].name = trus.certificateList[ev].firstName + trus.certificateList[ev]
						.lastName; //修改成选中的证件名
				}
			},
			CostCenterChange(e, index) { //选择当前成本中心审批人
				this.CostCenter[index].index = e.detail.value;
			},
			DeparappChange(e, index) { //选择当前部门审批人
				this.Deparapp[index].index = e.detail.value;
			},
			async getRuleMainSetting() { //查询当前用户改签是否需要审核 和 事前是否二次过审

				try {
					let res = await order.RuleMainSetting();

					if (this.toisblcks == 4) { //改签
						this.RuleMa = res.data.examinePattern; //改签是否需要审核
						let stw = this.RuleMa.split(',');
						for (let i in stw) {
							/**
							 * 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
							 */
							if (stw[i] == 5) {
								this.RuleMas = true;
							}
						}
						this.isshowcentermt();
					} else if (this.toisblcks == 1) { //事前
						let stw = res.data.examineSwitch.split(',');
						for (let i in stw) {
							/**
							 * 3代表事前二次过审
							 */
							if (stw[i] == 3) {
								//如果用户不是免审 就要事前二次过审
								if (!this.isblckt) {
									this.sttos = 1; //1为事前审批
									this.isblckt = true;
								}
							}
						}

						this.isshowcentermt();
					}
				} catch (e) {
					console.log(e);

				}
			},
			isshowcentermt() {
				//1事前2事中 3事前违规在次 4改签
				if (this.datalist.ranst.isbtd == 1 && !this.datalist.isarsrl) { //因公 非免审
					if (this.toisblcks == 2 || //事中
						(this.toisblcks == 4 && (this.RuleMas || this.isblckt == true)) || ///改签是否需要审批
						(this.toisblcks == 1 && this.isblckt == true)) {
						this.isshowcenter = true; //显示审批信息
					}
				}
			},
			async getBrokerage() { //火车票单人手续费

				try {
					const res = await tork.getBrokerage();

					if (res.code == 200) {
						if(this.toisblcks == 4){ //改签服务费
							this.Brokerage = res.data.ticketChange;//改签服务费
						} else {
							this.Brokerage = res.data.trainBooking;//预订服务费
						}	
						
						let su = res.data.insurances;
						this.insurancesList = [];
						//改签现在不能投保 需后端开发完成
						if (su.length > 0 && this.toisblcks != 4) {
							let sus = [];
							sus.push({
								name: '请选择一个保险',
								id: 0,
								isGift: false,
								buyPrice: 0
							})
							for (let i = 0; i < su.length; i++) {
								let sprice = 0;
								if (su[i].isGift) {
									sprice = 0
								} else {
									sprice = su[i].buyPrice;
								}
								sus.push({
									amount:su[i].amount,//保额
									brief:su[i].brief,//产品须知
									name: su[i].name, //保险名称
									id: su[i].insuranceNo, //保险code
									buyPrice: sprice, //保险价格
									isGift: su[i].isGift //是否赠送
								})
								if (su[i].isDefault == true) { //是否默认
									this.insurancesIndex = i + 1;
								}
							}
							this.insurancesList = sus;
							if(this.insurancesIndex != 0){//默认保险
								this.tansAmount = this.insurancesList[this.insurancesIndex].amount//保额
								this.tansLists = this.insurancesList[this.insurancesIndex].brief//当前保险的投保须知
							}
						}
					} else {
						this.showToasts(res.message);
					}
					this.onprices();
				} catch (e) {
					console.log(e);

				}
			},
			onprices() { //总价
				this.bxPrice = 0;
				if (this.insurancesIndex > 0) {
					this.bxPrice = this.insurancesList[this.insurancesIndex].buyPrice;
				}
				//车票费+手续费+保险  * 人数
				this.onprice = ((this.datalist.astlis.price + this.Brokerage + this.bxPrice) * 1000 * this.butalist
					.length) / 1000
			},
			clikst(id) { //费用详情
				let that = this;
				if(this.costs == true){
					this.costs = false;
					this.blac_show = false;
					this.homes = true;
					this.homex = false;
					if(this.tkShowId != id){ //判断是不是当前点击的内容
						setTimeout(()=>{
							that.costs = true;
							that.blac_show = true;
							that.homes = false;
							that.homex = true;	
						},500)
					}
				} else {
					this.costs = true;
					this.blac_show = true;
					this.homes = false;
					this.homex = true;
				}
				this.tkShowId = id;
			},
			async uprean() { //申请改签
				if (this.isbtns) {
					return
				}
				let that = this;
				let userlists = this.deptlists;
				let ranst = that.datalist.ranst.item;
				let NameCenter = that.NameCenter; //成本中心
				let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
				let TravelDepartlist = that.TravelDepartlist; //部门审批人
				let apprvTaskStaffts = []; //审核人员
				let user_name = this.user_name; //联系人
				let user_ipone = this.user_ipone; //联系电话
				let isbtd = that.datalist.ranst.isbtd; //1因公2因私
				let isblcks = that.toisblcks; //1事前 2事中
				let ists = 0;
				let invs = "";
				if (JSON.stringify(that.datalist.nativeTrainRules) == '{}') {
					ists = 0;
					invs = "";
				} else {
					invs = JSON.stringify({
						information: [that.datalist.nativeTrainRules]
					});
					ists = 1;
				}
				if (this.isshowcenter == true) {
					if (NameCenter.id == '') {
						that.showToasts("请选择成本中心！");
						return
					} else if (TravelCostCenlist.length == 0 && this.CostCi == true) {
						that.showToasts("请选择成本审批人！");
						return
					} else if (TravelDepartlist.length == 0 && this.CostCis == true) {
						that.showToasts("请选择部门审批人！");
						return
					} else if (that.isGetStaffList ==
						true) { //除了免审 其他必须有审批流程
						that.showToasts("未配置审批流程，请联系管理员设置！");
						return
					} else if(that.reson == ''){
						that.showToasts("请输入出差事由");
						return
					}
				}
				if (user_name == '') {
					that.showToasts("请输入联系人！");
					return
				} else if (user_ipone == '' || this.utils.zzPhone(user_ipone)) {
					that.showToasts("请输入正确的联系电话！");
					return
				}
				for (var i = 0; i < TravelCostCenlist.length; i++) { //成本中心审批人
					apprvTaskStaffts.push({
						deptCost: 2,
						nodeId: TravelCostCenlist[i].nodeId,
						personId: TravelCostCenlist[i].personId,
						staffId: TravelCostCenlist[i].staffId,
						staffName: TravelCostCenlist[i].staffName
					})
				}
				for (var i = 0; i < TravelDepartlist.length; i++) { //部门审批人
					apprvTaskStaffts.push({
						deptCost: 1,
						nodeId: TravelDepartlist[i].nodeId,
						personId: TravelDepartlist[i].personId,
						staffId: TravelDepartlist[i].staffId,
						staffName: TravelDepartlist[i].staffName
					})
				}
				let dat = {};
				let inst = '';
				if (this.isblckt == true) { //是否超规审批 或者事前需要审批
					inst = this.sttos;
				} else {
					inst = isblcks;
				}
				let getTravelPolicys = that.getTravelPolicys; //保险规则判断是否要选择保险
				if (getTravelPolicys != null && isbtd == 1 && this.insurancesList.length > 0) { //只有因公才判断保险
					if (getTravelPolicys.trainInsuranceProduct == 1) { //1是必选 2是非必选
						if (this.insurancesIndex == 0) {
							that.showToasts("请选择一个保险")
							return
						}
					}
				}
				dat = {
					trainBook: {
						zxbs:that.datalist.astlis.seatType,//座位类型
						queryKey: that.datalist.ranst.queryKey, //火车编码
						seatName: that.datalist.astlis.seatName,
						trainNo: ranst.trainNo,
						fromStation: ranst.fromStation,
						fromStationCode: ranst.fromStationCode,
						fromTime: ranst.fromTime, //出发时间
						toStation: ranst.toStation,
						trainDate: ranst.dats, //出发日期
						toStationCode: ranst.toStationCode,
						toTime: ranst.toTime, //到达时间
						toTrainDate: ranst.toTrainDate, //到达日期
						isviolation: ists, //0没超规 1超规
						illegal: invs, //超规信息
						travelTypeorth: isbtd, //因公1 因私2
						price: that.datalist.astlis.purchasePrice
					},
					saleOrderNo: that.datalist.ranst.saleOrderNo,
					passengerNos: that.datalist.ranst.passengerNos.join(';')
				}
				if (that.isshowcenter == true && isbtd == 1) { //因公需要审批 不是免审
					dat.trainBook['apprvTasks'] = {
						agree: false,
						taskType: inst, //1为事前2为事中，3超标 4为改签   审批类型
						beforeMiddle: 2, //1为事前2为事中
						reason:'', //出差事由
						apprvTaskStaffs: apprvTaskStaffts, //审批人信息
						costId: NameCenter.id, //成本中心id
						costName: NameCenter.name, //成本中心名称
						examinePattern: that.RuleMa,
						remark: invs
					}	
				} else {
					dat.trainBook['apprvTasks'] = {
						agree: false,
						taskType: inst, //1为事前2为事中，3超标 4为改签   审批类型
						beforeMiddle: 2, //1为事前2为事中
						reason:'', //出差事由
						examinePattern: that.RuleMa,
						remark: invs
					}
				}
				if (this.insurancesIndex != 0) { //是否选择了保险
					dat.trainBook['insCode'] = this.insurancesList[this.insurancesIndex].id;
					dat.trainBook['insPrice'] = this.insurancesList[this.insurancesIndex].buyPrice;
				} else {
					dat.trainBook['insPrice'] = 0;
				}
				try {
					this.isbtns = true;
					const res = await order.applyChangeTrain(dat);
					if (res.code == '200') {
						if (res.data.msgCode == '100') {
							that.showToasts("提交改签成功！")
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/order/order'
								})
							}, 1000)
						} else {
							this.showToasts(res.data.msgInfo);
						}
					} else {
						uni.showToast({
							title: res.message,
							duration: 5000,
							icon: 'none'
						});
					}

					this.isbtns = false;
				} catch (e) {
					this.isbtns = false;
					console.log(e);

				}
			},
			async okadd() { //提交订单
				let that = this;
				let picklist = this.picklist; //选座
				let sst = this.datalist.ranst.item.trainNo.substring(0, 1);
				let slv = this.datalist.astlis.seatName;
				let deptlists = this.deptlists; //出行人
				let ranst = that.datalist.ranst.item;
				let NameCenter = that.NameCenter; //成本中心
				let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
				let TravelDepartlist = that.TravelDepartlist; //部门审批人
				let apprvTaskStaffts = []; //审核人员
				let user_name = this.user_name; //联系人
				let user_ipone = this.user_ipone; //联系电话
				let isbtd = that.datalist.ranst.isbtd; //1因公2因私
				let isblcks = that.toisblcks; //1事前 2事中
				if (deptlists[0].list.length > 5) {
					that.showToasts('出行人不能大于5个!');
					return
				}
				// if (sst == 'G' || sst == 'C' || (sst == 'D' && slv != '动卧')) {
				// 	if (picklist.length < this.deptlists[0].list.length && slv != '无座') {
				// 		that.showToasts("请选座！");
				// 		return
				// 	}
				// }

				
				// for(i)

				if (this.isshowcenter == true) { //是否需要审批
					if (NameCenter.id == '') {
						that.showToasts("请选择成本中心！");
						return
					} else if (TravelCostCenlist.length == 0 && that.CostCi == true) {
						that.showToasts("请选择成本审批人！");
						return
					} else if (TravelDepartlist.length == 0 && that.CostCis == true) {
						that.showToasts("请选择部门审批人！");
						return
					} else if (that.CostCis == false && that.CostCi == false && that.isGetStaffList ==
						true) { //除了免审 其他必须有审批流程
						that.showToasts("未配置审批流程，请联系管理员设置！");
						return
					} else if(that.reson == ''){
						that.showToasts("请输入出差事由");
						return
					}
				}
				if (user_name == '') {
					that.showToasts("请输入联系人！");
					return
				} else if (user_ipone == '' || this.utils.zzPhone(user_ipone)) {
					that.showToasts("请输入正确的联系电话！");
					return
				}
				let getTravelPolicys = that.getTravelPolicys; //保险规则判断是否要选择保险
				if (getTravelPolicys != null && isbtd == 1 && isblcks != 4 && this.insurancesList.length > 0) { //只有因公才判断保险
					if (getTravelPolicys.trainInsuranceProduct == 1) { //1是必选 2是非必选
						if (this.insurancesIndex == 0) {
							that.showToasts("请选择一个保险")
							return
						}
					}
				}
				//座位排序
				let seatNos = [];
				for (let i = 0; i < this.picklist.length; i++) {
					seatNos.push(
						this.picklist[i].item.value
					)
				}
				seatNos.sort()
				let seatNo = '';
				let len = seatNos.length;
				for (let i = 0; i < len; i++) {
					seatNo += seatNos[i];
				}
				let usersalist = [];
				let ists = 0;
				for (let i = 0; i < deptlists.length; i++) { //出行人信息
					for (let k in deptlists[i].list) {
						let Select_phone = '';
						if (deptlists[i].list[k].phone != '') {
							Select_phone = deptlists[i].list[k].phone;
						} else {
							Select_phone = deptlists[i].list[k].telePhone;
						}
						let birthdate = "";
						if (deptlists[i].list[k].birthdate != null) {
							birthdate = deptlists[i].list[k].birthdate.substring(0, 10);
						} else {
							birthdate = null
						}
						usersalist.push({
							passengerType: "ADT",
							cardNo: deptlists[i].list[k].okcardNo,
							cardType: deptlists[i].list[k].okcardType,
							gender: deptlists[i].list[k].gender,
							name: deptlists[i].list[k].name,
							passengerBirth: birthdate,
							phone: Select_phone,
							deptName: deptlists[i].list[k].deptName,
							costcenterName: deptlists[i].list[k].costcenterName,
							passengerNo: deptlists[i].list[k].passengerNo,
							employeeType: deptlists[i].list[k].employeeType,
							passengerType: 1
						});
					// var fal = us.find(item=> item.type != I) 
					}
				}
			

				
				for (var i = 0; i < TravelCostCenlist.length; i++) { //成本中心审批人
					apprvTaskStaffts.push({
						deptCost: 2,
						nodeId: TravelCostCenlist[i].nodeId,
						personId: TravelCostCenlist[i].personId,
						staffId: TravelCostCenlist[i].staffId,
						staffName: TravelCostCenlist[i].staffName
					})
				}
				for (var i = 0; i < TravelDepartlist.length; i++) { //部门审批人
					apprvTaskStaffts.push({
						deptCost: 1,
						nodeId: TravelDepartlist[i].nodeId,
						personId: TravelDepartlist[i].personId,
						staffId: TravelDepartlist[i].staffId,
						staffName: TravelDepartlist[i].staffName
					})
				}
				let invs = "";
				if (JSON.stringify(that.datalist.nativeTrainRules) == '{}') {
					ists = 0;
					invs = ""
				} else {
					invs = JSON.stringify({
						information: [this.datalist.nativeTrainRules]
					});
					ists = 1
				}
				let dat = {
					zxbs:that.datalist.astlis.seatType,//座位类型
					sfjswz:that.datalist.astlis.seatName == '无座' ? '0' : this.treatmentStatu.checked == true ? '0' : '1',
					trainPassengerList: usersalist, //出行人信息
					person: user_name, //联系人
					cellphone: user_ipone, //联系电话
					email: '', //邮箱
					fromStation: ranst.fromStation,
					fromStationCode: ranst.fromStationCode,
					fromTime: ranst.fromTime,
					price: that.datalist.astlis.purchasePrice,
					runTimeSpan: ranst.runTimeSpan,
					seatName: that.datalist.astlis.seatName,
					toStation: ranst.toStation,
					toStationCode: ranst.toStationCode,
					toTime: ranst.toTime,
					toTrainDate: ranst.toTrainDate, //达到日期
					trainClass: ranst.trainClass,
					trainNo: ranst.trainNo,
					trainDate: ranst.dats, //出发日期
					travelTypeorth: isbtd, //因公1 因私2
					queryKey: that.datalist.ranst.queryKey, //火车编码
					isviolation: ists, //0没超规 1超规
					illegal: invs, //超规信息
					seatNo: seatNo, //座位
				}
				if (that.isshowcenter == true && isbtd == 1) { //事中因公 不是免审 或者 事前需要二次审批
					let inst = 0; //1事前审批 2事中审批  3超标审批 4改签审批
					if (this.isblckt == true) { //是否超规审批 或者事前需要审批
						inst = this.sttos;
					} else {
						inst = isblcks;
					}
					dat['apprvTasks'] = {
						taskType: inst, //1事前审批  2事中审批  3超标审批流  4改签审批流
						beforeMiddle: isblcks, //1为事前2为事中
						reason:this.resonName, //出差事由
						reasonId:this.reson,
						apprvTaskStaffs: apprvTaskStaffts, //审批人信息
						costId: NameCenter.id, //成本中心id
						costName: NameCenter.name, //成本中心名称
						remark: invs
					}
				} else if (isblcks == 1 && isbtd == 1 && that.isshowcenter == false) { //事前因公 免审或者 不需要二次审批
					dat['apprvTasks'] = {
						taskType: isblcks,
						beforeMiddle: 1,
						reason:this.resonName, //出差事由
						reasonId:this.reson,
						costId: NameCenter.id, //成本中心id
						costName: NameCenter.name, //成本中心名称
					}
				} else if (isbtd == 2 || (isbtd == 1 && that.isshowcenter == false)) { //因私 或者 因公免审
					dat['apprvTasks'] = {
						taskType: isblcks, //1为事前2为事中，
						beforeMiddle: 2, //1为事前2为事中
						reason:this.resonName, //出差事由
						reasonId:this.reson,
					}
				}

				if (isblcks == 1) { //判断是否事前
					dat.apprvTasks['vehicleId'] = that.vehicleId; //事前id
					dat.apprvTasks['travelNo'] = that.datalist.ranst.mokksli.travelNo; //出差单号
				}
				if (this.insurancesIndex != 0) { //是否选择了保险
					dat['insCode'] = this.insurancesList[this.insurancesIndex].id;
					dat['insPrice'] = this.insurancesList[this.insurancesIndex].buyPrice;
				} else {
					dat['insPrice'] = 0;
				}
				
				console.log("616打印",usersalist)
				var niflag = usersalist.every(function(item){
					return item.cardType == 'NI'
				})
				console.log("inflag",niflag)
				if(niflag == false){
					uni.showModal({
						title: '提示',
						content: '当前证件可能预定不成功，建议使用身份证下单',
						cancelText: "取消", // 取消按钮的文字  
						confirmText: "继续下单", // 确认按钮文字  
						showCancel: true, // 是否显示取消按钮，默认为 true
						success: (res) => {
							if(res.confirm) {  
								//点击了确定
								this.isokktwo(dat)	
							} else {  
								
								//点击了取消
							}  
						} 
					})
				}else{
					this.isokktwo(dat)	
				}
				
			},

			async isokktwo(dat){
				try {
					this.isbtns = true;
					const res = await tork.bookTrain(dat); //预定订单

					if (res.code == 200) {
						this.showToasts("创建订单成功");
						setTimeout(() => {
							uni.setStorageSync("sworders_od", {
								type: 'train',
								data: res.data
							});
							uni.switchTab({
								url: '/pages/order/order',
								success: function() {}
							})
						}, 1000)
					} else {
						this.isbtns = false;
						uni.showToast({
							title: res.message,
							duration: 5000,
							icon: 'none'
						});
					}
				} catch (e) {
					this.isbtns = false;
					console.log(e)

				}
			},
			
			isshow() {
				this.ops_list = false
				this.blac_show = false;
				this.switfal = false;
				this.costs = false;
			},
			
			
			vals(num, st) { //回显证件号
				for (let i = 0; i < st.length; i++) {
					if (num == i) {
						return st[i].cardNo
					}
				}
			},
			
			caname(item) { //回显证件名字
				for (let i = 0; i < this.carld.length; i++) {
					if (this.carld[i].code == item) {
						return this.carld[i].name
					}
				}
			},
			async userlist() {
				let st = [];
				this.deptlists = [];
				//触发获取出差事由接口
				// 待开发
				
				if (this.toisblcks == 4) { //改签状态下不能修改乘客证件
					for (let i = 0; i < this.butalist.length; i++) {
						this.deptlists.push({
							phone: this.butalist[i].phone,
							name: this.butalist[i].name,
							certType: this.butalist[i].certType,
							certNo: this.butalist[i].certNo,
						})
					}
					this.resonIds = 0;
					this.old_resonIds = this.datalist.ranst.apprvReasonId;
				} else {
					if (this.butalist.length != 0) {
						this.resonIds = 0;
						if (this.butalist[0].vehicleId != undefined) {
							this.vehicleId = this.butalist[0].vehicleId; //事前id
							// this.resonIds = this.butalist[0].reson;//事前事由id
							this.reson = this.butalist[0].reson;
							this.old_resonIds = this.butalist[0].reson;
						}
						
						for (let i = 0; i < this.butalist.length; i++) {
							st.push(this.butalist[i].passengerNo);
						}
						try {
							const res = await mydi.getPassengerListByNos(st); //获取用户的证件信息
							if (res.code == 200) {
								this.carld = res.data.cardTypeList; //证件类型
								this.userlists = res.data.passList; //用户信息
								let cotypes = ''; //部门名称
								let deptlist = []; //根据部门分类
								for (let i = 0; i < this.userlists.length; i++) {
									this.userlists[i]['carval'] = '';
									if (this.userlists[i].certificateList[0].firstName != null && this.userlists[i]
										.certificateList[0].lastName !=
										null) {
										this.userlists[i].name = this.userlists[i].certificateList[0].firstName + this
											.userlists[i].certificateList[
												0].lastName;
									}
									for (let k = 0; k < this.userlists[i].certificateList.length; k++) { //插入证件名称
										this.userlists[i].certificateList[k]['cardTypename'] = this.caname(this
											.userlists[i].certificateList[k].cardType);
									}
									this.userlists[i]['okcardType'] = this.userlists[i].certificateList[0]
									.cardType; //储存当前选中的证件类型
									this.userlists[i]['okcardNo'] = this.userlists[i].certificateList[0]
									.cardNo; //储存当前选中的证件号
									if (cotypes.indexOf(this.userlists[i].deptId) == -1) { //不存在的新部门
										deptlist.push({
											indx: [{
												index: 0
											}],
											id: this.userlists[i].deptId,
											name: this.userlists[i].deptName,
											list: [this.userlists[i]]
										})

										cotypes = cotypes + ',' + this.userlists[i].deptId;
									} else { //存在
										for (let k in deptlist) {
											if (deptlist[k].id == this.userlists[i].deptId) {
												deptlist[k].list.push(this.userlists[i]);
												deptlist[k].indx.push({
													index: 0
												});
											}
										}
									}
								}
								this.deptlists = deptlist; //重组后的部门人员信息
								this.showseat();
							}
						} catch (e) {
							console.log(e)

						}
					}
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	.readlist {
		width: 100%;
		padding-bottom: 120upx;

		.black_mu {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: black;
			opacity: 0.5;
			z-index: 860;
		}

		.rea_t {
			width: 100%;

			.tan_t_t {
				width: calc(100% - 40upx);
				padding: 20upx 20upx 40upx 20upx;
				color: #FFFFFF;
				font-size: 35upx;
				background: linear-gradient(to right, #4E92FD 0%, #6E46FE 100%);

				.above {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin: 0 46upx 40upx 46upx;

					.above_left {
						color: #FFFFFF;
						width: calc(50% - 130upx);
						text-align: right;

						// margin-right: 20upx;
						.city {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							color: #abbdd3;
						}

						.go_off {
							font-size: 56upx;
							font-weight: bold;
							text-align: left;
							// margin-left: 80upx;
						}

						.arrival_time {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							color: #FFFFFF;
							font-size: 26upx;
							text-align: left;
							margin-top: 10upx;
							margin-left: 5upx;
						}
					}

					.above_right {
						width: calc(50% - 130upx);
						text-align: right;
						color: #FFFFFF;

						// margin-right: 20upx;
						.go_off {
							font-size: 56upx;
							font-weight: bold;
							text-align: right;
							// margin-left: 80upx;
						}

						.arrival_time {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							color: #FFFFFF;
							font-size: 26upx;
							text-align: left;
							margin-left: 35upx;
							margin-top: 10upx;
						}
					}

					.above_centre {
						width: 200upx;
						text-align: center;
						margin-bottom: 10upx;
						margin: 0 20upx;
						position: relative;

						view {
							margin-top: 15upx;

							image {
								width: 200upx;
								height: 44upx;
							}
						}

						.tan_bt {
							position: absolute;
							top: 50upx;
							left: 50upx;
							font-size: 20upx;
							color: #FFFFFF;
						}
					}
				}
			}

			.tea_tal {
				width: calc(100% - 20upx);
				font-size: 30upx;
				padding: 0 10upx;
				height: 70upx;
				color: #ffffff;
				background: #4089e8;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.tea_tab {
				font-size: 35upx;
				width: calc(100% - 20upx);
				padding: 10upx 10upx;
				color: #333333;
				background: #ffffff;

				.tae_lis {
					color: #333333;
					display: flex;
					line-height: 50upx;
					align-items: center;
					justify-content: space-between;
				}
			}
		}

		.userlist {
			width: calc(100% - 40upx);
			padding: 10upx 0;
			background: #ffffff;
			color: #333333;
			font-size: 30upx;
			margin: 20upx;
			border-radius: 10upx;

			.cu_time {
				width: calc(100% - 40upx);
				margin-top: 10upx;
				padding: 10upx 20upx 15upx 20upx;
				background-color: #FFFFFF;
				border-bottom: 2upx solid #f1f1f1;
				border-radius: 10upx;
			}

			.userls {
				width: calc(100% - 80upx);
				padding: 10upx 40upx 15upx 40upx;
				background-color: #FFFFFF;
				border-bottom: 2upx solid #f1f1f1;
				border-radius: 15upx;
				margin-top: 20upx;
				color: #333333;

				.use-tles {
					font-size: 34upx;
					line-height: 50upx;
					font-weight: 600;
				}

				.use_list {
					width: 100%;

					.us_tps {
						display: flex;
						height: 80upx;
						align-items: center;
						justify-content: space-between;

						.us_rights {
							display: flex;
						}
					}

					.kaihu {
						width: 100%;
						display: flex;
						font-size: 28upx;
						// flex-direction: column;
						// justify-content: center;
						margin-top: 20upx;
						text-indent: 35upx;
						align-items: center;
						position: relative;

						input {
							margin-left: 30upx;
							text-indent: 30upx;
							font-size: 28upx;
							border: 1upx solid #C0C0C0;
							border-radius: 10upx;
						}

						.absts {
							margin-left: 30upx;
							position: absolute;
							width: 350upx;
							// height: 300upx;
							background-color: #FFFFFF;
							z-index: 200;
						}
					}
				}

			}

			.userls:last-child {
				border: 0;
			}
		}

		

		.costlists {
			position: fixed;
			bottom: 0;
			left: 0;
			padding-bottom: 90upx;
			transition: all 0.3s ease;
			-webkit-transform: translateY(100%);
			transform: translateY(100%);
			width: 100%;
			z-index: 870;
			line-height: 90upx;
			overflow: auto;
			border-top-left-radius: 20upx;
			border-top-right-radius: 20upx;
			background: #ffffff;
			font-size: 30upx;

			.costl_t {
				width: 100%;
				height: 90upx;
				text-align: center;
			}
			.tansList{
				height: 800upx;
				padding: 0 20upx;
				text-indent: 20upx;
				font-size: 24upx;
				color: #333333;
			}
			.costlist_s {
				width: calc(100% - 20upx);
				padding-left: 40upx;
				margin-top: 30upx;
				margin-bottom: 40upx;
				.cost_li {
					width: 100%;
					height: 90upx;
					display: flex;

					.scse_l {
						display: flex;
						justify-content: space-between;
						margin-right: 20upx;
						width: 62%;
					}

					.scse_r {
						margin-left: 20upx;
						display: flex;
						justify-content: space-between;
						width: 200upx;

						.corssize {
							color: #FF9000;
						}
					}
				}
			}
		}
		.show {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}
		.ipablos{
			color: #FF9000;
			line-height: 30upx;
			padding: 0 40upx;
			font-size: 22upx;
		}
		
		.istaf {
			width: 100%;
			margin-top: 20upx;
			font-size: 30upx;
			.ravelv {
				width: calc(100% - 80upx);
				padding: 0 20upx;
				background: #FFFFFF;
				margin-left: 20upx;
				border-radius: 15upx;
				.tswos{
					padding: 0 20upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 22upx;
					color: #333333;
					height:70upx;
					.tswo_le{
						color: #FF9000;
					}
					.tswo_ri{
						span{
							color: #007AFF;
						}
					}
				}
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

		.oksl {
			position: fixed;
			left: 0;
			bottom: 0;
			color: #FFFFFF;
			width: 100%;
			line-height: 88upx;
			display: flex;
			line-height: 90upx;
			background: #FFFFFF;
			z-index: 880;

			.oksl_l {
				width: 70%;
				height: 90upx;
				color: #FF9000;
				font-size: 45upx;
				text-indent: 20upx;
				display: flex;
				justify-content: space-between;
				margin-top: 10upx;

				.scslist {
					display: flex;
					padding-right: 10upx;
					font-size: 26upx;
					color: #666666;

					.imgs {
						image {
							width: 25upx;
							height: 15upx;
						}
					}
				}
			}

			.oksl_r {
				width: 30%;
				font-size: 35upx;
				line-height: 74upx;
				vertical-align: inherit;
				text-align: center;
				background: #FFA63E;
				border-radius: 50upx;
				margin: 20upx;
			}

			.btoks {
				background-color: #b3b3b3;
				color: #FFFFFF;
			}
		}

		.cseat {
			width: calc(100% - 40upx);
			margin-left: 20upx;
			margin-top: 20upx;

			.seat_a {
				font-size: 28upx;
				background: #FFFFFF;
				border-radius: 15upx;
				margin-bottom: 20upx;

				.seat_fo {
					width: 20%;
					text-align: center;
					color: #c0c0c0;
				}

				.seat_le {
					width: 100%;
					display: flex;
					align-items: center;
					margin-left: 26upx;
					color: #999999;
					font-size: 22upx;
					margin-top: 30upx;
					padding-bottom: 20upx;

					.seat {
						display: inline-block;
						font-size: 26upx;
						color: #666;
						cursor: pointer;
						background-image: url(http://img20.360buyimg.com/uba/jfs/t7282/74/1658256725/1195/7e270fe2/599e6afbN59d51b35.png);
						background-repeat: no-repeat;
						background-size: 70upx;
						background-position: center; //图片居中
						width: 75upx;
						text-align: center;
						line-height: 60upx;
						margin: 7upx;
					}

					.pickseat {
						display: inline-block;
						font-size: 26upx;
						color: #666;
						cursor: pointer;
						background-image: url(http://img30.360buyimg.com/uba/jfs/t7588/281/1633648098/1268/b1d85178/599e6bbcNfb1b597a.png);
						background-repeat: no-repeat;
						background-size: 70upx;
						background-position: center; //图片居中
						width: 75upx;
						text-align: center;
						line-height: 60upx;
						margin: 7upx;
					}
				}
			}

		}




	}
</style>
