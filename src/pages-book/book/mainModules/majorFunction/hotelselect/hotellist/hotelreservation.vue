<template>
	<view class="hotelreas">
		<loading>
		</loading>
		<headnavigation titles="订单填写"></headnavigation>
		<view class="htos_top">
			<view class="titles">{{datalist.datalist.resName}}</view>
			<!-- <view class="tilopens">{{datalist.hots.supPriceName}}</view> -->
			<view class="tiskt">
				{{datalist.datatiem.choiceDate[0].month}}月{{datalist.datatiem.choiceDate[0].day}}日
				&nbsp;周{{datalist.datatiem.choiceDate[0].week}} - 
				{{datalist.datatiem.choiceDate[1].month}}月{{datalist.datatiem.choiceDate[1].day}}日
				&nbsp;周{{datalist.datatiem.choiceDate[1].week}}
				<view class="tiskttext">
					<view>{{datalist.datatiem.dayCount}}晚</view>
				</view>
			</view>
			<view class="tiskt" style="font-size:22upx;color:#666666;">{{eats(datalist.hots.breakfastCount)}}<span style="color:#e5e5e5;margin-left:10upx;">|</span><span style="margin-left:10upx;" v-if="datalist.hots.roomFeature!=null" v-html="roomFeature"></span>
			</view>
			<view class="tskgout">
				<view class="chekoutl">
					取消规则
				</view>
				<view class="chekouts">
					{{bookingNotesos}}
				</view>
			</view>
		</view>
		<view class="black_mu" @click="isshow" v-if="blac_show"></view>
		<view class="userlist">
			<view class="cu_time">
				<passenger :isretun="isretun" tynames="住客" ref="passengers" @butaluser="bustlist" :butaluserlist="buserlists"  types="2"></passenger>
			</view>
			<view class="userls" v-for="(item, idnex) in deptlists" :key="idnex">
				<view class="use-tles">
					{{ item.name }}
				</view>
				<view class="use_list" v-for="(its,indexs) in item.list" :key="indexs">
					<view class="us_tps">
						<view>{{its.name}}</view>
						<view class="us_rights">
							<picker :range="its.certificateList" :range-key="'cardTypename'" @change="CostCencdChange($event,idnex,indexs,its)">		
								{{ TuoMin(its.certificateList[item.indx[indexs].index].cardNo,its.certificateList[item.indx[indexs].index].cardType) }}
							</picker>
							<view class="iconfont" style="">&#xe8a3;</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="istaf">
			<view class="ravelv" v-if="hoslist.length > 0">
				<view class="ts">
					<view class="rav_left">房间数</view>
					<view class="ravright">
						<view class="bos">
							<picker class="picks" :range="hoslist" :range-key="'name'" @change="hostchang">
								<view class="uni-input">{{hoslist[hostindex].name}}</view>
							</picker>
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">最早到店</view>
					<view class="ravright">
						<view class="bos">
							<picker class="picks" mode="time" :value="times" start="09:01" end="21:01" @change="bindTimeChange">
								<view class="uni-input">{{times}}</view>
							</picker>
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">最晚到店</view>
					<view class="ravright">
						<view class="bos">
							<picker class="picks" mode="time" :value="timed" start="09:01" end="21:01" @change="bindTimeChanges">
								<view class="uni-input">{{timed}}</view>
							</picker>
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
			<view class="ravelv" v-if="datalist.hots.supplierType == 5">
				<view class="ts">
					<view class="rav_left">特殊需求</view>
					<view class="ravright">
						<view class="bos">
							<input type="text" v-model="orderRemark" placeholder="如：尽量安排大床/无烟房等" value="" />
						</view>
					</view>
				</view>
			</view>
			<view class="ravelv" v-if="datalist.datlist.isbtd  == 1 && resonIds != -1" style="margin-bottom:30upx;">
				<view class="ts">
					<view class="rav_left">出行事由</view>
					<view class="ravright">
						<view class="bos">
							<!-- <input type="text" v-model="reson" placeholder="请输入出行事由" value="" /> -->
							<subjects @change="subclcks" :type="toisblcks"  :oldResonIds="old_resonIds"></subjects>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="istaf" v-if="isshowcenter">
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">归属部门</view>
					<view class="ravright">
						<view class="bos">
							{{attdepartment}}
						</view>
					</view>
				</view>
				<constCenter :morconst="morconsts" @costcCks="costcCk" :toisblcks="toisblcks"  :isblckt="isblckt" :sttos="sttos"></constCenter>
			</view>
		</view>
		<!-- <view class="istaf" v-if="datalist.datlist.isbtd  == 1 && resonIds != -1" style="margin-bottom:30upx;">
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">出行事由</view>
					<view class="ravright">
						<view class="bos">
							<input type="text" v-model="reson" placeholder="请输入出行事由" value="" />
							<subjects @change="subclcks" :oldResonIds="old_resonIds"></subjects>
						</view>
					</view>
				</view>
			</view>
		</view> -->
		<view class="istaf">
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">联系人</view>
					<view class="ravright">
						<view class="bos">
							<input type="text" v-model="user_name" placeholder="请输入联系人" value="" />
						</view>
					</view>
				</view>
			</view>
			<view class="ravelv">
				<view class="ts" style="border:0;">
					<view class="rav_left">联系电话</view>
					<view class="ravright">
						<view class="bos">
							<input v-if="user_ipones != ''" type="text" v-model="user_ipones" maxlength="11" @focus="focusfns(1)" value="" />
							<input v-else type="number" v-model="user_ipone" maxlength="11"  placeholder="请输入联系电话" value="" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="costlists" :class="costs ? 'show' : ''">
			<view class="costl_t">
				费用明细
			</view>
			<view class="costlist_s">
				<view class="cost_li costs">
					<view class="scse_l">
						总房价：
					</view>
					<view class="scse_r">
						<view class="corssize" style="line-height: 60upx;">
							￥{{firPrices}}
						</view>
						<p style="line-height: 30upx;">(每晚价格都有浮动，以实际价格为准)</p>
					</view>
				</view>
				<view class="cost_li costs">
					<view class="scse_l">
						房间数量：
					</view>
					<view class="scse_r">
						<view  >
							{{hostindex + 1}}间
						</view>
					</view>
				</view>
				<view class="cost_li costs">
					<view class="scse_l">
						住宿天数：
					</view>
					<view class="scse_r">
						<view  >
							{{timeli}}晚
						</view>
					</view>
				</view>
				<view class="cost_li costs">
					<view class="scse_l">
						总人数：
					</view>
					<view class="scse_r">
						<view  >
							{{userlists.length}}人
						</view>
					</view>
				</view>
				<view class="cost_li costs">
					<view class="scse_l">
						服务费：
					</view>
					<view class="scse_r">
						<span class="corssize">
							￥{{Brokerage}}
						</span>
						<span style="margin-left: 10upx;">
							x&nbsp;{{userlists.length}}份
						</span>
					</view>
				</view>
				<view class="cost_li">
					<view class="scse_l">
						总额：
					</view>
					<view class="scse_r">
						<view class="corssize" style="font-size:40upx;">
							￥{{connum}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btnbottm">
			<view class="btnbo_left">
				<view class="money"><span style="font-size:24upx;">￥</span>{{connum}}</view>
				<view class="scslist" @click="clikst">
					费用详情
				</view>
			</view>
			<view class="btnbo_right" :class="isbtns ? 'btoks':''" v-if="rotes('tms:hotel:reserve')" @click="btnok">
				<view>提交下单</view>
			</view>
		</view>
	</view>
</template>

<script>
	import constCenter from '@/components/view/book/cost-center/costCenter.vue'
	import passenger from "@/components/view/book/passenger/passenger";
	import order from '@/api/order.js'
	import tork from '@/api/torowk.js'
	import mydi from '@/api/mydi.js'
	import subjects from '@/components/view/book/subject-matter/subjectMatter.vue'
	export default {
		components:{
			passenger,
			subjects,
			constCenter
		},
		data() {
			return {
				orderRemark:'',//特殊要求
				old_resonIds:0,//默认事由id  (事前)
				resonIds:-1,
				isretun: false,
				deptlists:[],//处理过后的旅客信息
				isbtns:false,//是否点击了提交
				isGetStaffList:false,//是否没有审批流
				resids: 0,
				bookingNotesos: '',
				supplierNo: 0,
				timeli: 0,
				reson: '', //出行事由
				resonName:'',
				orderRoomInfos: [], //当前房价信息
				user_name: '', //联系人
				user_ipones:'',
				user_ipone: '', //联系电话
				Brokerage: 0, //服务费
				costs: false,
				times: '18:00',
				timed: '20:00',
				hoslist: [],
				hostindex: 0, //当前房间数量
				CostCenter: [],
				CostCi: false,
				CostCis: false, //是否有部门审批人
				TravelDepartlist: [], //部门审批人
				TravelCostCenlist: [], //成本中心
				scardns: [],
				userlists: [], //用户列表
				slid: 1,
				switfal: false,
				ullist: [{
					name: '成本中心',
					id: 1
				}],
				slitlist: [],
				sli_namelist: [],
				cbname: '', //成本中心名称
				cbid: '', //成本中心id
				botname: '', //当前选择的成本中心名称
				slit_id_checd: 0, //当前点击成本中心的id
				treeLists: [], //归属部门列表
				ops_list: false, //归属部门

				attdepartment: '', //归属部门
				CostCenterlist: [], //成本中心审批人
				isswf: true, //true为成本中心 false为部门   审批人
				Deparapprover: [], //部门审批人
				NameCenter: {
					name: '',
					id: ''
				},
				connum: 0,
				indes: 0,
				user_lists: [],
				si_pl: '',
				use_text: '',
				hots_num: '1间',
				blac_show: false,
				shos: false,
				// id_list: [{
				// 	id: 1,
				// 	name:'1间'
				// }],
				// htosfor:[{
				// 	name: '房间1:',
				// 	userlist: [],//入住人
				// 	icon: '\ue632'
				// }],//房间信息
				datalist: {},
				cshttext: '',
				texttime: '',

				orderUseDateDetails: [],
				firPrices: 0,
				isblckt: false,//事前是否违规再次审批
				sttos:1,//事前是否违规再次审批  1为开启二次审批 3为违规再次审批
				vehicleId: '',
				Deparapp: [],
				hotel: '',
				yaDuoRoom: '',
				proDataJson: '',
				linkManPassengerNo:'',//联系人旅客编号
				isshowcenter:false,//是否显示审批信息
				roomFeature:'',
				buserlists:[],//回填用户列表
				carld:[],//证件列表
				morconsts:{},//事前默认成本中心
				toisblcks:1,//1事前2事中
			}
		},
		onLoad(item) {
			let oplist = JSON.parse(uni.getStorageSync("hotelreservation_data"));
			this.datalist = oplist;
			this.isblckt = this.datalist.isblckt; //超标审批
			var str =this.datalist.hots.roomFeature;
			if(str != null){
				this.roomFeature= str.replace(/、/g,"<span style='color:#e5e5e5;'> | </span>")
			}
			this.id_list = [];
			this.cshttext = this.datalist.hots; //当前酒店信息
			this.toisblcks = this.datalist.datlist.isblcks;
		},
		mounted() {
			this.userlists = this.datalist.datlist.butalist;//出行人信息
			this.buserlists = this.userlists;	
			this.userlistoks();
			this.usernams();//获取联系人
			this.HotelBrokerages(); //获取手续费
			if(this.isblckt){//是否 超标审批
				this.sttos = 3;//1为事前审批 3为超标审批
				this.isshowcentermt();//是否显示审批信息
			} else {
				if (this.datalist.isarsrl == false && this.toisblcks == 1) { //事前 不是免审 不是免审
					this.getRuleMainSetting(); //获取公司是否 改签 事前是否 需要审核
				} else {
					this.isshowcentermt();//是否显示审批信息
				}
			}
			
			if (this.toisblcks == 1) { //判断是否事前 不是免审
				this.attdepartment = this.datalist.datlist.mokksli.deptName;
				this.NameCenter = {
					name: this.datalist.datlist.mokksli.costName,
					id: this.datalist.datlist.mokksli.costId
				}
				this.morconsts = {
					name: this.datalist.datlist.mokksli.costName,
					id: this.datalist.datlist.mokksli.costId
				};
			} else {
				const data = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //获取归属部门
				if (data.deptName) {
					this.attdepartment = data.deptName;
				}
			}
			if(this.datalist.datlist.isbtd ==2){ //除了因私 别的都不能修改用户
				this.isretun = false;
				
			} else {
				this.isretun = true;
			}
			this.toZHXBooks(); //价格校验
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
			TuoMin(no,type){//回显证件号
				return this.utils.TuoMin(no,type)
			},
			subclcks(data){//返回当前选中的事由id
				this.reson = data.id;
				this.resonName = data.name;
			},
			bustlist(item){//修改出行人
				this.buserlists = item;
				if(this.buserlists.length != 0){
					this.userlistoks();
				} else {
					this.deptlists = [];
					this.hoslist = [];
				}
				this.prics();
			},
			caname(item) { //回显证件名字
				for (let i = 0; i < this.carld.length; i++) {
					if (this.carld[i].code == item) {
						return this.carld[i].name
					}
				}
			},
			CostCencdChange(e, index,ins, trus) { //选择当前证件
				let ev = e.detail.value;//当前修改的下标
				this.deptlists[index].indx[ins].index = ev;//当前修改的下标
				this.deptlists[index].list[ins].okcardType = trus.certificateList[ev].cardType;//修改当前选中的证件类型
				this.deptlists[index].list[ins].okcardNo = trus.certificateList[ev].cardNo;//修改当前选中的证件号
				if(trus.certificateList[ins].firstName != null && trus.certificateList[ev].lastName != null){//判断是否存在证件名
					this.deptlists[index].list[ins].name = trus.certificateList[ev].firstName + trus.certificateList[ev].lastName;//修改成选中的证件名
				}
			},
			async userlistoks() {
				let st = [];
				this.deptlists = [];
				if (this.buserlists.length != 0) {
					this.hoslist = [];
					let leng = this.buserlists.length; //入住人数量
					for (let i = 0; i < leng; i++) { //重置房间数量
						this.hoslist.push({
							id: i + 1,
							name: (i + 1) + '间'
						})
					}
					this.hostindex = leng - 1;//默认跟着人数走
					this.resonIds = 0;
					if (this.buserlists[0].vehicleId != undefined) {
						this.vehicleId = this.buserlists[0].vehicleId; //事前id
						this.reson = this.buserlists[0].reson;
						this.old_resonIds = this.buserlists[0].reson;
					}
					for (let i = 0; i < this.buserlists.length; i++) {
						st.push(this.buserlists[i].passengerNo);
					}
					try {
						const res = await mydi.getPassengerListByNos(st);//获取用户的证件信息
						if (res.code == 200) {
							this.carld = res.data.cardTypeList; //证件类型
							this.userlists = res.data.passList; //用户信息
							let cotypes = '';//部门名称
							let deptlist = [];//根据部门分类
							for (let i = 0; i < this.userlists.length; i++) {
								this.userlists[i]['carval'] = '';
								if (this.userlists[i].certificateList[0].firstName != null && this.userlists[i].certificateList[0].lastName !=
									null) {
									this.userlists[i].name = this.userlists[i].certificateList[0].firstName + this.userlists[i].certificateList[
										0].lastName;
								}
								for (let k = 0; k < this.userlists[i].certificateList.length; k++) {//插入证件名称
									this.userlists[i].certificateList[k]['cardTypename'] = this.caname(this.userlists[i].certificateList[k].cardType);
								}
								this.userlists[i]['okcardType'] = this.userlists[i].certificateList[0].cardType;//储存当前选中的证件类型
								this.userlists[i]['okcardNo'] = this.userlists[i].certificateList[0].cardNo;//储存当前选中的证件号
								if(cotypes.indexOf(this.userlists[i].deptId) == -1){//不存在的新部门
									deptlist.push({
										indx:[{index:0}],
										id:this.userlists[i].deptId,
										name:this.userlists[i].deptName,
										list:[this.userlists[i]]
									})
									
									cotypes = cotypes + ',' + this.userlists[i].deptId;
								} else {//存在
									for(let k in deptlist){
										if(deptlist[k].id == this.userlists[i].deptId){
											deptlist[k].list.push(this.userlists[i]);
											deptlist[k].indx.push({index:0});
										}
									}
								}
							}
							this.deptlists = deptlist;//重组后的部门人员信息
						}
					} catch (e) {
						console.log(e)
						
					}
				}
			},
			isshowcentermt(){
				//1事前2事中 3事前违规在次 
				if(this.datalist.datlist.isbtd == 1 && !this.datalist.isarsrl){ //因公 非免审
					if(this.toisblcks == 2 ||
					(this.toisblcks == 1 && this.isblckt == true)){//事前需要二审
						this.isshowcenter = true;//显示审批信息
					}
				}
			},
			async getRuleMainSetting() { //事前是否二次过审
				try {
					let res = await order.RuleMainSetting();

					let stw = res.data.examineSwitch.split(',');
					for (let i in stw) {
						/**
						 * 3代表事前二次过审
						 */
						if (stw[i] == 3) {
							//如果用户不是免审 就要事前二次过审
							if(!this.isblckt){
								this.sttos = 1;
								this.isblckt = true;
							}
						}
					}
					this.isshowcentermt();//是否显示审批信息
				} catch (e) {
					console.log(e);

				}
			},
			focusfns(va){//清空手机号
				if(va == 1 ){//手机号
					this.user_ipone = '';
					this.user_ipones = '';
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
			async HotelBrokerages() { //获取手续费
				try {
					const res = await tork.getHotelBrokerage();
					if (res.code == 200) {
						this.Brokerage = res.data;
					} else {
						this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e);
				}
			},
			async toZHXBooks() { //实时查询当前房型价格
				let that = this;

				try {
					let dats = that.datalist;
					console.log(dats.datatiem)
					uni.showLoading({title: '房价校验中',mask:true});
					if (dats.hots.supplierType == 5) {//中航信
						let res = await tork.toZHXBook({
							checkInDate: dats.datatiem.choiceDate[0].re,
							checkOutDate: dats.datatiem.choiceDate[1].re,
							holMidId: dats.datlist.hotelCode,
							hotelId: dats.hots.hotelCode,
							proId: dats.hots.proId,
							ratePlanCode: dats.hots.ratePlanCode,
							vendorCode: dats.hots.vendorCode
						})
						if (res.code == 200) {
							let dat = res.data
							if (dat.hasOwnProperty('error')) {
								this.hotelError(dat);
							} else {
								that.resids = dats.datalist.resId;
								that.orderRoomInfos = dat.roomPrice; //采购价
								that.bookingNotesos = dat.resBaseInfo.cancelDescription; //取消规则
								let prics = dat.userRoom.proSaleInfoDetailsTarget; //销售采购价
								let sit = [];
								that.supplierNo = dat.resBaseInfo.supplierNo;
								that.firPrices = 0;
								for (let k in prics) {
									sit.push({
										useDate: k,
										amountPrice: prics[k].amountPrice,
										oneDateaAmountPrice: prics[k].amountPriceSum,
									})
									that.firPrices += prics[k].amountPriceSum;
									this.timeli += 1;
								}
								this.prics();
								this.orderUseDateDetails = sit;
							}
						}
					} else if (dats.hots.supplierType == 4) {//艺龙
						let res = await tork.toELONGBook({
							hotelDetailSearchReq: {
								checkinDate: dats.datatiem.choiceDate[0].re,
								checkoutDate: dats.datatiem.choiceDate[1].re,
								proId: dats.hots.proId,
								productUniqueId: dats.hots.productUniqueId,
								channelData: dats.hots.channelData
							},
							holMidId: dats.datlist.hotelCode
						})
						if (res.code == 200) {
							let dat = res.data
							if (dat.hasOwnProperty('error')) {
								this.hotelError(dat);
							} else {
								that.resids = dat.hotel.id;
								that.orderRoomInfos = dat.orderRoomInfos; //采购价
								that.bookingNotesos = dat.hotel.description; //取消规则
								let prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
								let sit = [];
								that.supplierNo = dat.hotel.supplierNo;
								that.firPrices = 0;
								for (let k in prics) {
									sit.push({
										useDate: k,
										amountPrice: prics[k].amountPrice,
										oneDateaAmountPrice: prics[k].amountPriceSum,
									})
									that.firPrices += prics[k].amountPriceSum;
									this.timeli += 1;
								}
								this.prics();
								this.orderUseDateDetails = sit;
							}
						}
					} else if (dats.hots.supplierType == 6) {//云游酒店
						let res = await tork.toYYOUBook({
							roomInfo: {
								checkInDate: dats.datatiem.choiceDate[0].re,
								checkOutDate: dats.datatiem.choiceDate[1].re,
								roomId: dats.hots.productUniqueId,
								holMidId: dats.datalist.resId,
								roomTypeId: dats.hots.proId,
								supplierId: dats.hots.vendorCode,
								// 是否可以取消
								policyType: dats.hots.cancelable,
								// 取消时限
								lastCancelTime: dats.hots.policyRemark,
								// 取消条款信息
								cancelPolicyInfo: dats.hots.bookingNotes
							},
							hotelCode: dats.hots.hotelCode
						})
						if (res.code == 200) {
							let dat = res.data
							if (dat.hasOwnProperty('error')) {
								this.hotelError(dat);
							} else {
								that.resids = dats.datalist.resId;
								that.orderRoomInfos = dat.orderRoomInfos; //采购价
								that.bookingNotesos = dat.room.bookingNotes; //取消规则
								let prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
								let sit = [];
								that.supplierNo = dat.hotel.supplierNo;
								that.firPrices = 0;
								for (let k in prics) {
									sit.push({
										useDate: k,
										amountPrice: prics[k].amountPrice,
										oneDateaAmountPrice: prics[k].amountPriceSum,
									})
									that.firPrices += prics[k].amountPriceSum;
									this.timeli += 1;
								}
								this.prics();
								this.orderUseDateDetails = sit;
							}
						}
					} else if (dats.hots.supplierType == 7) {//华住
						let res = await tork.toHuazhuBook({
							checkInDate: dats.datatiem.choiceDate[0].re,
							checkOutDate: dats.datatiem.choiceDate[1].re,
							hotelId: dats.hots.resId,
							guaranteeMode: dats.hots.guaranteeMode,
							roomTypeId: dats.hots.proId,
							rateCode: dats.hots.productUniqueId,
							activityId: dats.hots.activityId,
							rateCodeType: dats.hots.rateCodeType
						})
						if (res.code == 200) {
							let dat = res.data
							if (dat.hasOwnProperty('error')) {
								this.hotelError(dat);
							} else {
								that.resids = dat.hotel.id;
								that.orderRoomInfos = dat.orderRoomInfos; //采购价
								that.bookingNotesos = dat.hotel.description; //取消规则
								that.hotel = dat;
								let prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
								let sit = [];
								that.supplierNo = dat.hotel.supplierNo;
								that.firPrices = 0;
								for (let k in prics) {
									sit.push({
										useDate: k,
										amountPriceSum:prics[k].amountPriceSum,
										amountPrice: prics[k].amountPrice,
										oneDateaAmountPrice: prics[k].distributionSalePrice
									})
									that.firPrices += prics[k].amountPriceSum;
									this.timeli += 1;
								}
								this.prics();
								this.orderUseDateDetails = sit;
							}
						}
					} else if (dats.hots.supplierType == 9) {//亚朵酒店
						let res = await tork.toYaduoBook({
							hotelDetailSearchReq: {
								checkinDate: dats.datatiem.choiceDate[0].re,
								checkoutDate: dats.datatiem.choiceDate[1].re,
								proId: dats.hots.proId,
								productUniqueId: dats.hots.productUniqueId,
								holMidId: dats.datlist.hotelCode,
								cityName: dats.datlist.city.name,
								supplierType: dats.hots.supplierType,
								travelType: dats.datlist.isbtd,
								hotelCode: dats.hots.resId
							}
						})
						if (res.code == 200) {
							let dat = res.data
							if (dat.hasOwnProperty('error')) {
								this.hotelError(dat);
							} else {
								that.resids = dat.hotel.id;
								that.orderRoomInfos = dat.orderRoomInfos; //采购价
								that.bookingNotesos = dat.hotel.description; //取消规则
								let prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
								that.yaDuoRoom = dat.room;
								let sit = [];
								that.supplierNo = dat.hotel.supplierNo;
								that.firPrices = 0;
								for (let k in prics) {
									sit.push({
										useDate: k,
										amountPrice: prics[k].amountPrice,
										oneDateaAmountPrice: prics[k].amountPriceSum,
										breakfastNum: prics[k].breakfastNum
									})
									that.firPrices += prics[k].amountPriceSum;
									this.timeli += 1;
								}
								this.prics();
								this.orderUseDateDetails = sit;
							}
						}
					} else if (dats.hots.supplierType == 8) {//锦江酒店
						let res = await tork.toJinJiangBook({
							hotelDetailSearchReq: {
								checkinDate: dats.datatiem.choiceDate[0].re,
								checkoutDate: dats.datatiem.choiceDate[1].re,
								proId: dats.hots.proId,
								productUniqueId: dats.hots.productUniqueId,
								holMidId: dats.datlist.hotelCode,
								cityName: dats.datlist.city.name,
								supplierType: dats.hots.supplierType,
								travelType: dats.datlist.isbtd,
								hotelCode: dats.hots.hotelCode
							}
						})
						if (res.code == 200) {
							let dat = res.data
							if (dat.hasOwnProperty('error')) {
								this.hotelError(dat);
							} else {
								that.resids = '';
								that.orderRoomInfos = dat.orderRoomInfos; //采购价
								that.bookingNotesos = dat.hotel.cancelDescription; //取消规则
								let prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
								that.proDataJson = dat.room.proDataJson; //产品信息
								that.linkManPassengerNo = dat.linkManPassengerNo;
								that.yaDuoRoom = dat.room;
								let sit = [];
								that.supplierNo = dat.hotel.supplierNo;
								that.firPrices = 0;
								for (let k in prics) {
									sit.push({
										otherFee: prics[k].otherFee,
										useDate: k,
										amountPrice: prics[k].amountPrice,
										oneDateaAmountPrice: prics[k].amountPriceSum,
										breakfastNum: prics[k].breakfastNum
									})
									that.firPrices += prics[k].amountPriceSum;
									this.timeli += 1;
								}
								this.prics();
								this.orderUseDateDetails = sit;
							}
						}
					} else if (dats.hots.supplierType == 10) {//如家酒店
						let res = await tork.toHomeInnsBook({
							homeInnsPriceCheck: {
								checkinDate: dats.datatiem.choiceDate[0].re,
								checkoutDate: dats.datatiem.choiceDate[1].re,
								roomTypeId: dats.hots.proId,
								hotelId: dats.hots.hotelCode
							}
						})
						if (res.code == 200) {
							let dat = res.data
							if (dat.hasOwnProperty('error')) {
								this.hotelError(dat);
							} else {
								that.resids = dat.hotel.id;
								that.orderRoomInfos = dat.orderRoomInfos; //采购价
								that.bookingNotesos = dat.hotel.description; //取消规则
								let prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
								let sit = [];
								that.supplierNo = dat.hotel.supplierNo;
								that.firPrices = 0;
								for (let k in prics) {
									sit.push({
										useDate: k,
										amountPrice: prics[k].amountPrice,
										oneDateaAmountPrice: prics[k].amountPriceSum,
									})
									that.firPrices += prics[k].amountPriceSum;
									this.timeli += 1;
								}
								this.prics();
								this.orderUseDateDetails = sit;
							}
						}
					} else if (dats.hots.supplierType == 11) {//美团酒店
						let res = await tork.toMeituanBook({
							hotelDetailSearchReq: {
								checkinDate: dats.datatiem.choiceDate[0].re,
								checkoutDate: dats.datatiem.choiceDate[1].re,
								proId: dats.hots.proId,
								productUniqueId: dats.hots.productUniqueId,
								holMidId: dats.datlist.hotelCode,
								cityName: dats.datlist.city.name,
								supplierType: dats.hots.supplierType,
								travelType: dats.datlist.isbtd,
								hotelCode: dats.hots.resId
							}
						})
						if (res.code == 200) {
							let dat = res.data; 
							if (dat.hasOwnProperty('error')) {
								this.hotelError(dat);
							} else {
								that.resids = '';
								that.orderRoomInfos = dat.orderRoomInfos; //采购价
								that.bookingNotesos = dat.hotel.cancelDescription; //取消规则
								let prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
								that.proDataJson = dat.room.proDataJson; //产品信息
								that.linkManPassengerNo = dat.linkManPassengerNo;
								that.yaDuoRoom = dat.room;
								let sit = [];
								that.supplierNo = dat.hotel.supplierNo;
								that.firPrices = 0;
								for (let k in prics) {
									sit.push({
										otherFee: prics[k].otherFee,
										useDate: k,
										amountPrice: prics[k].amountPrice,
										oneDateaAmountPrice: prics[k].amountPriceSum,
										breakfastNum: prics[k].breakfastNum
									})
									that.firPrices += prics[k].amountPriceSum;
									this.timeli += 1;
								}
								this.prics();
								this.orderUseDateDetails = sit;
							}
						}
					} else if (dats.hots.supplierType == 12) {//腾邦酒店
						let res = await tork.toOwnBook({
							"holMidId": dats.datlist.hotelCode,
							"hotelDetailSearchReq": {
								"checkinDate": dats.datatiem.choiceDate[0].re,
								"checkoutDate": dats.datatiem.choiceDate[1].re,
								"proId": dats.hots.proId
							}
						})
						if (res.code == 200) {
							let dat = res.data
							if (dat.hasOwnProperty('error')) {
								this.hotelError(dat);
							} else {
								that.resids = dat.hotel.id;
								that.orderRoomInfos = dat.orderRoomInfos; //采购价
								that.bookingNotesos = dat.hotel.description; //取消规则
								let prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
								let sit = [];
								that.supplierNo = dat.hotel.supplierNo;
								that.firPrices = 0;
								for (let k in prics) {
									sit.push({
										useDate: k,
										amountPrice: prics[k].amountPrice,
										oneDateaAmountPrice: prics[k].amountPriceSum,
									})
									that.firPrices += prics[k].amountPriceSum;
									this.timeli += 1;
								}
								this.prics();
								this.orderUseDateDetails = sit;
							}
						}
					}
					uni.hideLoading();
				} catch (e) {
					uni.hideLoading();
					console.log(e)
				}

			},
			hotelError(dat) {
				this.close()
				this.showToasts(dat.error);
				setTimeout(() => {
					uni.navigateBack({})
				}, 1000)
			},
			async btnok() {
				let dats = this.datalist;
				let that = this;
				let deptlists = this.deptlists;
				let NameCenter = that.NameCenter; //成本中心
				let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
				let TravelDepartlist = that.TravelDepartlist; //部门审批人
				let apprvTaskStaffts = []; //审核人员
				let user_name = this.user_name; //联系人
				let user_ipone = this.user_ipone; //联系电话
				let isbtd = dats.datlist.isbtd; //1因公2因私
				let isblcks = dats.datlist.isblcks; //1事前 2事中
				if(deptlists[0].list.length == 0){
					that.showToasts("最少一名入住人！");
					return
				}
				if(this.isshowcenter == true){
					if (NameCenter.id == '') {
						that.showToasts("请选择成本中心！");
						return
					} else if (TravelCostCenlist.length == 0 && this.CostCi == true) {
						that.showToasts("清选择成本审批人！");
						return
					} else if (TravelDepartlist.length == 0 && this.CostCis == true) {
						that.showToasts("清选择部门审批人！");
						return
					} else if( that.CostCis == false && that.CostCi == false && that.isGetStaffList == true){//除了免审 其他必须有审批流程
						that.showToasts("未配置审批流程，请联系管理员设置！");
						return
					}
				}
				if (that.reson == '' && isbtd == 1) {
					that.showToasts("请输入出行事由！");
					return
				}
				if (user_name == '') {
					that.showToasts("请输入联系人！");
					return
				} else if (user_ipone == '' || this.utils.zzPhone(user_ipone)) {
					that.showToasts("请输入正确的联系电话！");
					return
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
							cardNo: deptlists[i].list[k].okcardNo,
							cardType: deptlists[i].list[k].okcardType,
							name: deptlists[i].list[k].name,
							phone: Select_phone,
							deptName:deptlists[i].list[k].deptName,
							costcenterName:deptlists[i].list[k].costcenterName,
							passengerNo:deptlists[i].list[k].passengerNo,
							employeeType:deptlists[i].list[k].employeeType,
						});
					}
				}
				let dat = {};
				let attrtime = this.times.split(':').join(''); //最早入店时间
				let atendtime = this.timed.split(':').join(''); //最晚入店时间
				let room;
				if (this.datalist.hots.supplierType == 9 || this.datalist.hots.supplierType == 8 || this.datalist.hots.supplierType == 11) {
					room = this.yaDuoRoom;
				} else {
					room = this.hotel.room;
				}
				let hotel = this.hotel.hotel;
				//7-华住 8-锦江 9-亚朵
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
				if (JSON.stringify(dats.limitNativeRule) == '{}') {
					ists = 0;
					invs = ""
				} else {
					let issu = [];
					issu.push(dats.limitNativeRule)
					invs = JSON.stringify({
						information: issu
					});
					ists = 1
				}
				dat = {
					supplierType: this.datalist.hots.supplierType,
					orderRoomInfos: {
						checkInDate: dats.datatiem.choiceDate[0].res,
						checkOutDate: dats.datatiem.choiceDate[1].res,
						orderRoomInfos: this.orderRoomInfos
					},
					orderCreateReq: {
						breakfastCount: dats.hots.breakfastCount, //早餐类型
						hotelImg: dats.datalist.imgUrl,
						dbCancelRule: this.bookingNotesos, //取消规则
						bookCount: this.hostindex + 1, //房间数量
						linkManName: user_name, //联系人
						linkManMobile: user_ipone, //联系电话
						proId: dats.hots.proId,
						zhxResId: dats.hots.hotelCode,
						bedTypeName: dats.hots.bedTypeName, //房间类型
						beforeTotalPrice: this.connum, //总价
						checkInDate: dats.datatiem.choiceDate[0].res,
						checkOutDate: dats.datatiem.choiceDate[1].res,
						arriveHotelTime: dats.datatiem.choiceDate[0].re + " " + this.timed + ":00",
						cityName: dats.datalist.cityName,
						endArriveTime: atendtime, //最晚入住时间
						hotelAddress: dats.datalist.address, //酒店地址
						hotelPhone: dats.datalist.resPhone, //酒店电话
						proName: dats.hots.supPriceName,
						resName: dats.datalist.resName,
						startArriveTime: attrtime, //最早入住时间
						supplierNo: this.supplierNo,
						isviolation: ists,
						violation: invs,
						orderUseDateDetails: this.orderUseDateDetails,
						productUniqueId: dats.hots.productUniqueId,
					},
					hotelBookExtendReq: {
						apprvTaskEntity: {
							taskType: isblcks, //1为事前2为事中，
							beforeMiddle: 2, //1为事前2为事中
							reason: that.resonName, //理由
							reasonId:that.reson,
						},
						passengers: usersalist, //出行人信息
						travelType: isbtd //因公因私
					},
					roomInfo: {
						bedTypeName: dats.hots.bedTypeName, //房间类型,
						checkInDate: dats.datatiem.choiceDate[0].res,
						checkOutDate: dats.datatiem.choiceDate[1].res,
						breakfastCount: dats.hots.breakfastCount, //早餐类型
						supplierId: dats.hots.vendorCode, // 云游用 供应商编码 supplyCode
						cancelType: dats.hots.cancelable, //云游用 取消类型
						lastCancelTime: dats.hots.policyRemark, // 云游用 最晚取消时间
						cancelPolicyInfo: dats.hots.bookingNotes, // 云游用 取消条款
					},
					hotelSingleAvailRq: {
						amountPrice: dats.hots.firPrice,
						bedTypeName: dats.hots.bedTypeName, //房间类型
						cancelPolicyInfo: '',
						checkInDate: dats.datatiem.choiceDate[0].re,
						checkOutDate: dats.datatiem.choiceDate[1].re,
						hotelId: dats.hots.hotelCode,
						proId: dats.hots.proId,
						ratePlanCode: dats.hots.ratePlanCode,
						roomTypeName: '',
						vendorCode: dats.hots.vendorCode,
					}
				}
				if(this.datalist.hots.supplierType != 10 && this.datalist.hots.supplierType != 5){//除了如家和中航信
					dat.orderCreateReq['resId'] = this.resids;
				}
				if(this.datalist.hots.supplierType == 5){
					dat.orderCreateReq['orderRemark'] = this.orderRemark;
				}
				if (this.datalist.hots.supplierType == 7) { //华珠
					dat.orderCreateReq['rateCodeType'] = room.rateCodeType;
					dat['holAddOrder'] = {
						guaranteeMode: room.guaranteeMode,
						adults: dats.datlist.butalist.length,
						childs: 0,
						hotelId: hotel.id,
						roomTypeId: room.proId,
						roomCount: this.hostindex + 1,
						rateCode: room.productUniqueId,
						activityId: room.activityId,
					}
				} else if (this.datalist.hots.supplierType == 9 || this.datalist.hots.supplierType == 8|| this.datalist.hots.supplierType == 11) {
					dat.orderRoomInfos.checkInDate = dats.datatiem.choiceDate[0].res.substring(0, 10);
					dat.orderRoomInfos.checkOutDate = dats.datatiem.choiceDate[1].res.substring(0, 10);
					dat.orderCreateReq['changeRule'] = room.changeRule;
					dat.orderCreateReq['cashScale'] = room.cashScale;
					dat.orderCreateReq['ruleValue'] = room.ruleValue;
					dat.orderCreateReq['cancelPenalty'] = room.cancelPenalty;
					if (this.datalist.hots.supplierType == 8 || this.datalist.hots.supplierType == 11) {//锦江 || 美团
						dat.orderCreateReq['linkManPassengerNo'] = this.linkManPassengerNo;
						dat.orderCreateReq['proDataJson'] = this.proDataJson; //产品数据
						if(this.datalist.hots.supplierType == 11){//美团
							dat.orderCreateReq['totalRebateRateProfit'] = room.totalRebateRateProfit; //佣金
						}
					} else {//亚朵
						dat.orderCreateReq.arriveHotelTime = this.timed.substring(0,2);
					}
				} else {
					dat.orderCreateReq['channelData'] = dats.hots.channelData;
				}
				if(this.datalist.hots.supplierType == 5){
					dat.orderCreateReq['orderRemark'] = this.orderRemark;
				}
				if (that.isshowcenter == true && isbtd == 1) { //事中因公 不是免审 或者 事前需要二次审批
					let inst = 0; //1事前审批 2事中审批  3超标审批 4改签审批
					if (this.isblckt == true) { //是否超规审批 或者事前需要审批
						inst = this.sttos;
					} else {
						inst = isblcks;
					}
					dat.hotelBookExtendReq.apprvTaskEntity.beforeMiddle = isblcks;
					dat.hotelBookExtendReq.apprvTaskEntity.taskType = inst;
					dat.hotelBookExtendReq.apprvTaskEntity['remark'] = invs;
					dat.hotelBookExtendReq.apprvTaskEntity['apprvTaskStaffs'] = apprvTaskStaffts; //审批人信息
					dat.hotelBookExtendReq.apprvTaskEntity['costId'] = NameCenter.id; //成本中心id
					dat.hotelBookExtendReq.apprvTaskEntity['costName'] = NameCenter.name; //成本中心名称
				}
				if (isblcks == 1  && isbtd == 1) { //事前 因公 
					dat.hotelBookExtendReq.apprvTaskEntity.beforeMiddle = 1;
					dat.hotelBookExtendReq.apprvTaskEntity['travelNo'] = this.datalist.datlist.mokksli.travelNo; //出差单号
					dat.hotelBookExtendReq.apprvTaskEntity['vehicleId'] = this.vehicleId;
					dat.hotelBookExtendReq.apprvTaskEntity['costId'] = NameCenter.id; //成本中心id
					dat.hotelBookExtendReq.apprvTaskEntity['costName'] = NameCenter.name; //成本中心名称
				}
				try {
					this.isbtns = true;
					let res = await tork.hotelBook(dat);

					if (res.code == 200) {
						that.showToasts('预定成功！');
						setTimeout(() => {
							uni.setStorageSync("sworders_od", {
								type: 'hotel',
								data: res.data.transationOrderNo
							});
							uni.switchTab({
								url: '/pages/order/order',
								success: function() {}
							})
						}, 1000)
					} else {
						that.showToasts(res.message);
					}
					this.isbtns = false;
				} catch (e) {
					this.isbtns = false;
					//TODO handle the exception
				}
			},
			prics() { //总价
				//Brokerage手续费
				//firPrices 几天所有的单间房钱
				//
				//hostindex+1 几间房
				//userlists.length 人数
				//timeli天数
				this.connum = (this.hostindex + 1) * this.timeli * this.Brokerage + this.firPrices * (this.hostindex + 1);
			},
			hostchang(e) { //选择房间数量
				this.hostindex = e.detail.value;
				this.prics();
			},
			bindTimeChange(e) {
				this.times = e.target.value
			},
			bindTimeChanges(e) {
				this.timed = e.target.value
			},
			clikst() { //费用详情
				if (this.costs) {
					this.costs = false;
					this.blac_show = false;
				} else {
					this.costs = true;
					this.blac_show = true;
				}
			},
			adsl(it) {
				if (it < 10) {
					return '0' + it
				} else {
					return it
				}
			},
			// isad(item){ //回显当前人员的状态
			// 	if(item.is == 0){
			// 		return 'cl_vals'
			// 	} else if(item.is == this.indes){
			// 		return 'ad_vals'
			// 	} else {
			// 		return 'ck_vals'
			// 	}
			// },
			// ad_cions(item,index){ //点击添加或者移除
			// 	if(item.is == 0){ //判断是否没在房间
			// 		this.texttime = ''
			// 		this.user_lists[index].is = this.indes;
			// 		this.htosfor[this.indes - 1].userlist.push(this.user_lists[index]);
			// 	} else if(item.is ==  this.indes){ //如果在当前房间则移除
			// 		this.texttime = ''
			// 		let arrs = this.htosfor[this.indes - 1].userlist;//当前房间
			// 		for (var i = 0; i < arrs.length; i++) { //删除当前房间存在的人
			// 			if(arrs[i].passengerNo == item.passengerNo){
			// 				arrs.splice(i,1)
			// 			}
			// 		}
			// 		this.user_lists[index].is = 0; //重置当前人员
			// 	} else {
			// 		return
			// 	}
			// },
			// addmon(item,index){ //点加修改房间人员
			// 	this.use_text = '请从以下旅客中选择入住人';
			// 	this.si_pl = 'fots';
			// 	this.indes = (index + 1);//获取当前点击房间的下标
			// 	this.shos = true
			// 	this.blac_show = true;
			// },
			// hos_lk(){ //选择房间数量
			// 	this.use_text = '选择房间数量';
			// 	this.si_pl = 'fot';
			// 	this.shos = true
			// 	this.blac_show = true;
			// },
			isshow() { //点击弹出层
				this.shos = false;
				this.ops_list = false
				this.blac_show = false;
				this.switfal = false;
				this.costs = false;
			},
			// ad_cion(item){ //点击改变房间数量
			// 	this.hots_num = item.name;
			// 	let num = item.id;//点击房间数量
			// 	this.connum = num * this.datalist.hots.conPrice * this.datalist.datatiem.dayCount
			// 	let nums = this.htosfor.length;//当前房间数量
			// 	if(num > nums){ //判断是添加还是删除房间
			// 		for (let i = 0; i < num - nums; i++) {
			// 			this.htosfor.push({
			// 				name: '房间' + (nums + 1 +i) + ':',
			// 				userlist: [],//入住人
			// 				icon: '\ue632'
			// 			})
			// 		}
			// 	} else if(nums > num){
			// 		for (let i = nums - 1; i>=0; i--) {
			// 			if(i+1 > num){
			// 				if(this.htosfor[i].userlist.length > 0){
			// 					let arr = this.htosfor[i].userlist;//当前删除房间的人员
			// 					for (let i = 0; i < arr.length; i++) {
			// 						for (let k = 0; k < this.user_lists.length; k++) {
			// 							if(arr[i].userId == this.user_lists[k].userId){
			// 								this.user_lists[k].is = 0;//重置当前删除房间的人员
			// 							}
			// 						}
			// 					}

			// 				}
			// 				this.htosfor.splice(i,1);
			// 			}
			// 		}
			// 	}
			// 	this.blac_show = false;
			// 	this.shos = false;
			// },
			eats(is) {
				if (is == 0 || is == null) {
					return '无早餐'
				} else if (is == 1) {
					return '单早餐'
				} else if (is == 2) {
					return '双早餐'
				}
			},
			sour(item) {
				return item.bookingNotes;
			},
		}
	}
</script>

<style>
	page {
		background: #edf0f5;
	}
</style>
<style scoped lang="scss">
	$brgk_blue: linear-gradient(to right, #4E92FD 0%, #6E46FE 100%);

	.hotelreas {
		width: 100%;
		padding-bottom: 100upx;

		.black_mu {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: black;
			opacity: 0.5;
			z-index: 850;
		}

		.userlist {
			width: 100%;
			padding: 10upx 0;
			background: #ffffff;
			color: #333333;
			font-size: 30upx;
			margin-top: 20upx;
			.cu_time {
				width: calc(100% - 40upx);
				margin-top: 10upx;
				padding: 10upx 20upx 15upx 20upx;
				background-color: #FFFFFF;
				// border-bottom: 2upx solid #f1f1f1;
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
				.use-tles{
					font-size: 34upx;
					line-height: 50upx;
					font-weight: 600;
				}
				.use_list{
					width: 100%;
					.us_tps{
						display: flex;
						height: 80upx;
						align-items: center;
						justify-content: space-between;
						.us_rights{
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
		
		
		.hotsev {
			width: 100%;
			background: #FFFFFF;
			font-size: 35upx;

			.hots {
				width: 100%;
				height: 90upx;
				border-bottom: 2upx solid #F1F1F1;
				display: flex;
				align-items: center;
				justify-content: center;

				.htos_left {
					text-align: right;
					width: 25%;
				}

				.htos_right {
					width: 70%;
					display: flex;
					overflow: scroll;

					.htos_adli {
						padding: 10upx 10upx;
					}

					.picks {
						width: 100%;
					}
				}
			}
		}

		.htos_top {
			width: 100%;
			background: #FFFFFF;
			padding: 36upx 20upx;
			line-height: 45upx;
			border-radius: 15upx;
			color: #333333;
			.titles {
				font-weight: bold;
				font-size: 34upx;
				margin-left: 10upx;
			}
			.tilopens {
				font-size: 28upx;
			}

			.tiskt {
				margin-left: 10upx;
				font-size: 28upx;
				color: #333333;
				display: flex;
				font-weight: bold;
				margin-top: 30upx;
				.tiskttext {
						border: 1px solid #ececec;
						border-radius: 30upx;
						width: 66upx;
						line-height: 35upx;
						font-size: 18upx;
						color: #333333;
						text-align: center;
						box-shadow: 0 2upx 2upx rgba(233, 233, 233, 0.5);
						margin-left: 60upx;
						view{
							margin-top: 5upx;
						}
					}
			}

			.tskgout {
				background: #fdf9f8;
				width:calc(100% - 40upx);
				padding: 15upx 0;
				border-radius: 15upx;
				margin-top: 20upx;
				font-size: 22upx;
				.chekoutl {
					color:#333333;
					font-weight: bold;
					margin-left: 20upx;
				}
				.chekouts {
					margin-left: 20upx;
					width: 78%;
					color: #B04D4D;
				}
			}
		}
		.istaf {
			width: 100%;
			margin-top: 20upx;
			font-size: 30upx;
			.ravelv {
				width: 100%;
				// width: calc(100% - 80upx);
				// padding: 0 20upx;
				padding-right: 20upx;
				background: #FFFFFF;
				// margin-left: 20upx;
				// border-radius: 15upx;
				// margin-bottom: 20upx;
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
						color: #666666;
						font-size: 28upx;
					}
			
					.ravright {
						width: 75%;
						display: flex;
			
						.bos {
							width: 85%;
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
		.costlists {
			position: fixed;
			bottom: 0;
			left: 2%;
			transition: all 0.3s ease;
			-webkit-transform: translateY(100%);
			transform: translateY(100%);
			width: 96%;
			z-index: 870;
			line-height: 90upx;
			font-size: 30upx;
			background-color: #FFFFFF;
			color: #333333;
			border-top-left-radius: 12upx;
			border-top-right-radius: 12upx;

			.costl_t {
				width: 100%;
				height: 90upx;
				text-align: center;
			}

			.costlist_s {
				width: calc(100% - 20upx);
				border-top: 2upx solid #C8C7CC;
				border-bottom: 2upx solid #C8C7CC;
				padding-left: 20upx;

				.cost_li {
					width: 100%;
					height: 90upx;
					display: flex;

					.scse_l {
						width: 30%;

					}

					.scse_r {
						width: 70%;
						padding-right: 20upx;
						text-align: right;

						.corssize {
							color: #FF9000;
						}

						p {
							color: red;
							font-size: 22upx;
						}
					}
				}

				.costs {
					border-bottom: 2upx solid #D0DEE5;
				}
			}
		}

		.show {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}

		.btnbottm {
			width: 100%;
			height: 90upx;
			// line-height: 90upx;
			background: #FFFFFF;
			position: fixed;
			bottom: 0upx;
			left: 0;
			z-index: 100;
			display: flex;

			.btnbo_left {
				width: 70%;
				height: 90upx;
				color: #FF9000;
				font-size: 45upx;
				text-indent: 20upx;
				display: flex;
				justify-content: space-between;
				.money{
					margin-left: 10upx;
					font-size: 46upx;
					margin-top: 15upx;
				}
				.scslist {
					margin-right: 20upx;
					padding-right: 10upx;
					font-size: 26upx;
					color: #007AFF;
					margin-top: 25upx;

				}
			}

			.btnbo_right {
				width: 210upx;
				text-align: center;
				height: 74upx;
				color: #FFFFFF;
				background: #FFA63E;
				border-radius: 50upx;
				margin-top: 10upx;
				view{
					height: 30upx;
					margin-top: 15upx;
				}
			}
		}
	}
</style>
