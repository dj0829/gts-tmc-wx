<template>
	<view>
		<view class="black_mu" @click="isshow" v-if="blac_show"></view>
		<loading></loading>
		<!-- 使用出差预订 -->
		<view class="isswflist" :class="switfal ? 'show' : ''">
			<view class="talist" v-for="(item,index) in stlist" :key="index" @click="adduslit(item)">
				<view class="tl_left">
					<view class="tl_tops">
						<view class="tl_rightl">
							{{newicname(item.citys.vehicle)}}
						</view>
						<view class="tl_rights">
							{{newstaname(item.citys)}}
						</view>
					</view>
					<view class="tl_bots">
						{{newdata(item.citys)}}
					</view>
					<view class="tl_botsb">
						出差事由：{{item.reson}}
					</view>
				</view>
				<view class="tl_right">
					<view class="tldv">
						确定
					</view>
				</view>
			</view>
		</view>
		<headnavigation titles="国内机票"></headnavigation>
		<view class="dticket">
			<view class="add_ul">
				<view class="apl_ok">
					<view class="frop_left">
						<text class="iconfont f_icon_lefts">&#xe65c;</text>
						<view class="apl_name">申请类型</view>
					</view>
					<view class="section" style="width: 80%;">
						<picker @change="bindPickerChange($event)" :range="istopt" :range-key="'label'">
							{{istopt[index].label}}
						</picker>
					</view>
					<view class="iconfont" style="">&#xe8a3;</view>
				</view>
			</view>
			<view class="add_ul" v-if="istval == 1 && (tccrBeforeMiddle == 1 || tccrBeforeMiddle == 0  )">
				<view class="apl_ok">
					<view class="frop_left">
						<text class="iconfont f_icon_lefts">&#xe65c;</text>
						<view class="apl_name">出差预订</view>
					</view>
					<view class="section" style="width: 80%;">
						<picker @change="travellistChange($event)" :range="travellist" :range-key="'label'">
							{{travellist[travellistIndex].label}}
						</picker>
					</view>
					<view class="iconfont" style="">&#xe8a3;</view>
					<!-- <view class="iconfont" style="font-size: 50upx;margin-right: 25upx;">&#xe656;</view> -->
				</view>
			</view>

			<view class="add_ul">
				<view class="apl_ok">
					<view class="frop_left">
						<text class="iconfont f_icon_left">&#xe65c;</text>
						<view class="apl_name">起始城市</view>
					</view>
					<view style="width: 70%;">
						<view class="opls">
							<ss-city :sBusirticket="Busirticket" :isretun="isretun" :current="currentPage"></ss-city>
						</view>
					</view>
				</view>
			</view>

			<view class="add_ul">
				<view class="apl_ok" style="height: 90upx;">
					<view class="frop_left">
						<text class="iconfont f_icon_left">&#xe65c;</text>
						<view class="apl_name">最早起飞时间</view>
					</view>
					<view class="frop_pls" style="margin-right: 20upx;">
						<!-- 时间组件 -->
						<view class="adresxt">
							<htimepicker sTime="0" cTime="23" interval="1" @changeTime="minchangeTime">
								<view slot="pCon" class="changeTime">
									<view class="ctiemns" style="color: #C0C0C0;" v-if="mintimeop == ''">
										请选择时间
									</view>
									<view v-else>
										{{mintimeop}}
									</view>
								</view>
							</htimepicker>
						</view>

					</view>
				</view>
			</view>

			<view class="add_ul">
				<view class="apl_ok" style="height: 90upx;">
					<view class="frop_left">
						<text class="iconfont f_icon_left">&#xe65c;</text>
						<view class="apl_name">最晚起飞时间</view>
					</view>
					<view class="frop_pls" style="margin-right: 20upx;">
						<!-- 时间组件 -->
						<view class="adresxt">
							<htimepicker sTime="0" cTime="23" interval="1" @changeTime="maxchangeTime">
								<view slot="pCon" class="changeTime">
									<view class="ctiemns" style="color: #C0C0C0;" v-if="maxtimeop == ''">
										请选择时间
									</view>
									<view v-else>
										{{maxtimeop}}
									</view>
								</view>
							</htimepicker>
						</view>
					</view>
				</view>
			</view>
			<view class="add_ul">
				<view class="apl_ok">
					<view class="frop_left">
						<text class="iconfont f_icon_left">&#xe65c;</text>
						<view class="apl_name">价格范围</view>
					</view>
					<view class="frop_pls">
						<view class="opls" style="color:#3333333;font-size:30upx;"><input class="input_css" type="number" style="margin-right: 4px;margin-left:160upx;"
								v-model="price_floor" /> ~
							<input class="input_css" type="number" style="margin-left: 4px;" v-model="price_ceiling" />
						</view>
					</view>
				</view>
			</view>
			<view class="add_ul">
				<view class="apl_ok">
					<view class="frop_left">
						<text class="iconfont f_icon_left">&#xe65c;</text>
						<view class="apl_name">舱位等级</view>
					</view>
					<view class="frop_pls">
						<view class="opls">
							<radio-group @change="radioChange" class="radios-gr">
								<label v-for="(item, index) in slevel" :key="item.value"
									style="display: flex; margin-right: 20upx;">
									<radio :value="item.value" :checked="index === current"/> <!-- 图标 -->
									<view>{{item.name}}</view> <!-- 选项 -->
								</label>
							</radio-group>
						</view>
					</view>
				</view>
			</view>

			<view class="add_ul">
				<view class="apl_ok">
					<view class="frop_left">
						<text class="iconfont f_icon_lefts">&#xe65c;</text>
						<view class="apl_name">首选舱司</view>
					</view>
					<view class="section" style="width: 80%;">
						<picker @change="tchoiceChange($event)" :range="tchoice" :range-key="'label'">
							{{tchoice[tchoiceIndex].label}}
						</picker>
					</view>
					<view class="iconfont" style="">&#xe8a3;</view>
				</view>
			</view>

			<view class="second_css">
				<!--第二节 -->
				<view>
					<view class="cut_css">
						<view class="title_css">乘机人信息</view>
					</view>
				</view>
			</view>

			<view class="add_ul">
				<view class="apl_ok">
					<view class="frop_left">
						<text class="iconfont f_icon_left">&#xe65c;</text>
						<view class="apl_name">乘客人数</view>
					</view>
					<view class="frop_pls" style="width: 750upx;">
						<view class="opls" style="font-size: 26upx;">
							<span style="color:#333333;">成人</span><input class="input_css" style="margin: 0 10upx;width: 10%;" type="number"
								v-model="cp_number" disabled />人，
							<span style="color:#333333;">小孩</span><input class="input_css" style="margin: 0 10upx;width: 10%;" type="number"
								v-model="xp_number" disabled />人，
							<span style="color:#333333;">婴儿</span><input class="input_css" style="margin: 0 10upx;width: 10%;" type="number"
								v-model="yp_number" disabled/>人
						</view>
					</view>
				</view>
			</view>

			<view class="add_ul">
				<view class="apl_ok">
					<view class="frop_left">
						<text class="iconfont f_icon_left">&#xe65c;</text>
						<view class="apl_name">乘客选择</view>
					</view>
					<view class="frop_pls" style="margin-right:10upx;">
						<view class="opls">
							<passenger :isretun="isretun" @butaluser="butaluser" :butaluserlist="butaluserlist" ref="passengers"></passenger>
						</view>
					</view>
				</view>
			</view>
			<view class="userlist" v-if="deptlists.length > 0">
				<view class="userls" v-for="(item, idnex) in deptlists" :key="idnex">
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
			</view>
			<view class="add_ul">
				<view class="apl_ok">
					<view class="frop_left">
						<text class="iconfont f_icon_left">&#xe65c;</text>
						<view class="apl_name">联系人</view>
					</view>
					<view class="frop_pls" style="margin-right:20upx;">
						<view class="opls"><input style="margin: 0 10upx;" v-model="contact" placeholder="请填写联系人姓名" />
						</view>
					</view>
				</view>
			</view>
			<view class="add_ul">
				<view class="apl_ok">
					<view class="frop_left">
						<text class="iconfont f_icon_left">&#xe65c;</text>
						<view class="apl_name">联系人电话</view>
					</view>
					<view class="frop_pls" style="margin-right:20upx;">
						<view class="opls">
							<input v-if="phonenums != ''" type="text" v-model="phonenums" maxlength="11" @focus="focusfns(1)" value="" />
							<input v-else style="margin: 0 10upx;" v-model="phonenum" type="number"
								placeholder="请填写联系人电话" /></view>
					</view>
				</view>
			</view>

			<view class="third_css">
				<!-- 第三节 -->
				<view>
					<view class="cut_css">
						<view class="title_css" style="font-size: 15px;color: #666666;">备注</view>
					</view>
				</view>
				<view>
					<textarea class="input_css" value="" placeholder="" v-model="remark" />
				</view>
			</view>
			<view class="btn_sbm" @click="onadd">提交</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	/* import hotelsave from '@/api/torowk.js' */
	import tork from '@/api/torowk.js'
	import mydi from '@/api/mydi.js'
	import ssCity from '@/components/view/book/ss-city/ss-city.vue'; //城市
	import passenger from '@/components/view/book/passenger/passenger.vue'
	import htimepicker from '@/components/h-timePicker/h-timePicker.vue'
	export default {
		data() {
			return {
				vehicleBack:0,//往返
				vehicleId:0,//行程id  单程
				travelNos:0,//出差单号
				carld:[],//证件列表
				userlists:[],//用户信息
				deptlists:[],//处理过的出行人
				butaluserlist:[],//出差人
				Busirticket: [{//出发到达目的地
					name: '深圳',
					id: 'SZX'
				}, {
					name: '北京',
					id: 'PKX'
				}],
				remark: '', //备注
				price_ceiling: '',
				price_floor: '',
				currentPage: 'Planeticket', //类型
				isretun: false, //是否事前，事前为true 不能修改指定参数
				blac_show: false,
				stlist: [],
				istval: 1, //申请类型 出差预订
				switfal: false,
				tccrBeforeMiddle: 9,
				istopt: [{
					value: 1,
					label: '因公'
				}, {
					value: 2,
					label: '因私'
				}],
				bt_bol: true,
				travellist: [{
					value: true,
					label: '否'
				}, {
					value: false,
					label: '是'
				}],

				mintimeop: '', //最早时间
				maxtimeop: '', //最晚时间

				slevel: [{
					value: 'F',
					name: '头等舱',
					checked: 'true'
				}, {
					value: 'C',
					name: '商务舱'
				}, {
					value: 'Y',
					name: '经济舱'
				}],
				current: 0,
				slevels: 'F',
				tchoiceIndex: 0,
				tchoice: [{
						value: '',
						label: '不限'
					},
					{
						value: '3U',
						label: '四川航空-3U'
					},
					{
						value: '8L',
						label: '祥鹏航空-8L'
					},
					{
						value: '9C',
						label: '春秋航空-9C'
					},
					{
						value: '9H',
						label: '长安航空-9H'
					},
					{
						value: 'A6',
						label: '红土航空-A6'
					},
					{
						value: 'BK',
						label: '奥凯航空-BK'
					},
					{
						value: 'CA',
						label: '中国航空-CA'
					},
					{
						value: 'CN',
						label: '大新华航-CN'
					},
					{
						value: 'CZ',
						label: '南方航空-CZ'
					},
					{
						value: 'DR',
						label: '瑞丽航空-DR'
					},
					{
						value: 'DZ',
						label: '东海航空-DZ'
					},
					{
						value: 'EU',
						label: '成都航空-EU'
					},
					{
						value: 'FM',
						label: '上海航空-FM'
					},
					{
						value: 'FS',
						label: '航班管家-FS'
					},
					{
						value: 'FU',
						label: '福州航空-FU'
					},
					{
						value: 'G5',
						label: '华夏航空-G5'
					},
					{
						value: 'GJ',
						label: '长龙航空-GJ'
					},
					{
						value: 'GS',
						label: '天津航空-GS'
					},
					{
						value: 'GT',
						label: '桂林航空-GT'
					},
					{
						value: 'GX',
						label: '北部湾航空-GX'
					},
					{
						value: 'GY',
						label: '多彩贵州航空-GY'
					},
					{
						value: 'HO',
						label: '吉祥航空-HO'
					},
					{
						value: 'HU',
						label: '海南航空-HU'
					},
					{
						value: 'JD',
						label: '首都航空-JD'
					},
					{
						value: 'JR',
						label: '幸福航空-JR'
					},
					{
						value: 'KN',
						label: '中联航空-KN'
					},
					{
						value: 'KY',
						label: '昆明航空-KY'
					},
					{
						value: 'LT',
						label: '龙江航空-LT'
					},
					{
						value: 'MF',
						label: '厦门航空-MF'
					},
					{
						value: 'MU',
						label: '东方航空-MU'
					},
					{
						value: 'NS',
						label: '河北航空-NS'
					},
					{
						value: 'OQ',
						label: '重庆航空-OQ'
					},
					{
						value: 'PN',
						label: '西部航空-PN'
					},
					{
						value: 'QW',
						label: '青岛航空-QW'
					},
					{
						value: 'RY',
						label: '江西航空-RY'
					},
					{
						value: 'SC',
						label: '山东航空-SC'
					},
					{
						value: 'TV',
						label: '西藏航空-TV'
					},
					{
						value: 'UQ',
						label: '乌鲁木齐航空-UQ'
					},
					{
						value: 'Y8',
						label: '扬子江快运航空-Y8'
					},
					{
						value: 'Y1',
						label: '英安航空-Y1'
					},
					{
						value: 'ZH',
						label: '深圳航空-ZH'
					}
				],
				firstChoice: '', //首选舱司
				cp_number: '0', //乘客成人人数
				xp_number: '0', //乘客小孩人数
				yp_number: '0', //乘客婴儿人数
				contact: '', //联系人
				phonenum: '', //联系人电话
				phonenums:'',

				boolean: false,
				index: 0,
				travellistIndex: 0,
			}
		},
		onShow() {
			uni.$on("Busirticket_add", res => {
				let rtos = res.data;
				if (res.name == "Planeticket") {
					this.Busirticket = [{
						name: rtos[0].name,
						id: rtos[0].id
					}, {
						name: rtos[1].name,
						id: rtos[1].id
					}];
				}
				uni.$off("Busirticket_add")
			})
		},
		mounted() {
			this.pass_com();
			this.usernams();
		},
		components: {
			ssCity,
			passenger,
			htimepicker,
		},
		methods: {
			TuoMin(no,type){//回显证件号
				return this.utils.TuoMin(no,type)
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
			bt_bols(item) {
				if (item == false) {
					this.bts_k();
				} else {
					this.isretun = false;
				}
			},
			async usernams() { //获取联系人
				try {
					const res = await tork.getContactInfo();
					if (res.code == 200) {
						this.contact = res.data.name;
						this.phonenum = res.data.phone;
						this.phonenums = this.utils.TuoMin(res.data.phone,1);
						
					} else {
						this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e);
				}
			},
			focusfns(va){//清空手机号
				if(va == 1 ){//手机号
					this.phonenum = '';
					this.phonenums = '';
				}
			},
			butaluser(item){//选择当前人员
				this.butaluserlist = item
				if (this.butaluserlist.length != 0) {
					this.cp_number = this.butaluserlist.length;
					this.userlist();
				} else {
					this.cp_number = 0
					this.deptlists = [];
				}
			},
			caname(item) { //回显证件名字
				for (let i = 0; i < this.carld.length; i++) {
					if (this.carld[i].code == item) {
						return this.carld[i].name
					}
				}
			},
			agename(no){//根据生日算出乘客类型
				let nums = this.utils.jsGetAge(no);//获取周岁
				if(nums <= 2){
					return 'INF'
				} else if(2 < nums && nums < 12){
					return 'CHD'
				} else if(nums > 12){
					return 'ADT'
				}
			},
			async userlist() {//获取出行人的信息
				let st = [];
				this.deptlists = [];
				if (this.butaluserlist.length != 0) {
					if (this.butaluserlist[0].travelNo != undefined) {
						this.travelNos = this.butaluserlist[0].travelNo; //事前id
					}
					if (this.butaluserlist[0].vehicleId != undefined) {
						this.vehicleId = this.butaluserlist[0].vehicleId; //事前id
						this.vehicleBack = '';
					}
					
					for (let i = 0; i < this.butaluserlist.length; i++) {
						st.push(this.butaluserlist[i].passengerNo);
					}
					try {
						this.cp_number = 0;//成人
						this.xp_number = 0;//儿童
						this.yp_number = 0;//婴儿
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
								let agetys = this.agename(this.userlists[i].birthdate.substring(0,10));
								this.userlists[i]['ageType'] = agetys;//乘客类型
								console.log(agetys)
								if(agetys == 'ADT'){
									this.cp_number++;
								} else if(agetys == 'CHD'){
									this.xp_number++;
								} else if(agetys == 'INF'){
									this.yp_number++;
								}
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
							}
						} catch (e) {
							console.log(e)
			
						}
					}
			},
			tchoiceChange(e) {
				this.tchoiceIndex = e.detail.value;
				this.firstChoice = this.tchoice[this.tchoiceIndex].value;
			},
			travellistChange(e) {
				this.travellistIndex = e.detail.value
				if (this.travellistIndex === 0) {
					this.bt_bol = true;
				} else if (this.travellistIndex === 1) {
					this.bt_bol = false;
					
				}
				this.bt_bols(this.bt_bol);
			},
			bindPickerChange(e) {
				this.index = e.detail.value
				if (this.index === 0) {
					this.istval = 1;
				} else if (this.index === 1) {
					this.istval = 2;
				}
			},
			isshow() {
				this.blac_show = false;
				this.switfal = false;
				this.travellistIndex = 0
				this.bt_bol = true;
				this.bt_bols(this.bt_bol);
			},

			adduslit(item) { //确定
				this.boolean = true;
				let vehicleIdBack = '';
				if (this.currentPage == 'Planeticket') {
					this.Busirticket = [{
						id: item.citys.deptCityCode,
						name: item.citys.deptCityName
					}, {
						id: item.citys.arrivCityCode,
						name: item.citys.arrivCityName
					}];
				}

				let userlis = [];
				for (var i = 0; i < item.nams.length; i++) { //出差人员
					userlis.push({
						phone: item.nams[i].phone,
						istrue: item.nams[i].tempPerson,
						passengerNo: item.nams[i].passengerNo,
						userName: item.nams[i].userName,
						userId: item.nams[i].id,
						travelNo: item.sit.travelNo,
						vehicleId: item.id, //事前出差单id
						vehicleIdBack: vehicleIdBack
					})
				}
				this.butaluserlist = userlis;
				this.cp_number = this.butaluserlist.length;
				this.userlist();
				this.mokksli = item.sit;
				this.isretun = true;
				this.blac_show = false;
				this.switfal = false;
				this.btns = '\ue618';
				this.isblcks = 1;
			},

			newicname(tm) { //回显类型
				if (tm == 1) {
					return '[机票]'
				} else if (tm == 2) {
					return '[火车]'
				} else {
					return '[酒店]'
				}
			},
			newdata(tm) { //回显时间
				if ((tm.deptDate == null && tm.std != 6) || (tm.inDate == null && tm.outDate == null && tm.std == 6)) {
					return
				}
				let sta = '';
				let stamon = '';
				let stadta = '';
				let end = '';
				let endmon = '';
				let enddta = '';
				if (tm.std != 6) {
					if (tm.std == 4) {
						sta = new Date(tm.deptDate.replace(/-/g, '/')); //出发日期
						stamon = this.dats(sta.getMonth() + 1);
						stadta = this.dats(sta.getDate());
						end = new Date(tm.deptDates.replace(/-/g, '/')); //到达日期
						endmon = this.dats(end.getMonth() + 1);
						enddta = this.dats(end.getDate());
					} else {
						sta = new Date(tm.deptDate.replace(/-/g, '/')); //出发日期
						stamon = this.dats(sta.getMonth() + 1);
						stadta = this.dats(sta.getDate());
					}
				} else {
					sta = new Date(tm.inDate.replace(/-/g, '/')); //出发日期
					stamon = this.dats(sta.getMonth() + 1);
					stadta = this.dats(sta.getDate());
					end = new Date(tm.outDate.replace(/-/g, '/')); //到达日期
					endmon = this.dats(end.getMonth() + 1);
					enddta = this.dats(end.getDate());
				}
				if (tm.goBack == 3) {
					return stamon + '月' + stadta + '日' + '　出发'
				} else if (tm.std == 4) {
					if (tm.goBack === 2) {
						return endmon + '月' + enddta + '日' + '　出发　' + stamon + '月' + stadta + '日' + ' 返回'
					} else if (tm.goBack === 1) {
						return stamon + '月' + stadta + '日' + '　出发　' + endmon + '月' + enddta + '日' + ' 返回'
					}

				} else if (tm.std == 6) {
					return stamon + '月' + stadta + '日' + '　入住　' + endmon + '月' + enddta + '日' + ' 离店'
				}
			},
			newstaname(tm) { //回显城市名称
				if (tm.vehicle == 1 || tm.vehicle == 2) {
					if (tm.goBack === 2) {
						return tm.arrivCityName + '-' + tm.deptCityName;
					} else if (tm.goBack === 1) {
						return tm.deptCityName + '-' + tm.arrivCityName
					} else if (tm.goBack === 3) {
						return tm.deptCityName + '-' + tm.arrivCityName;
					}
				} else {
					return tm.cityName + "　" + tm.remark
				}
			},

			dats(it) {
				if (it < 10) {
					return '0' + it
				} else {
					return it
				}
			},
			rblcok() {
				uni.navigateBack({
					url: '../valist/valist',
				})
			},
			/* 选择出差人员组件 */
			pass_com() {
				let _this = this;

				const userinfo = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //登录信息
				this.tccrBeforeMiddle = userinfo.tccrBeforeMiddle;
			},

			//单选框
			radioChange: function(evt) {
				for (let i = 0; i < this.tchoice.length; i++) {
					if (this.tchoice[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
				this.slevels = evt.detail.value;
			},
			//时间组件
			minchangeTime(mintime) { //选择时间
				this.mintimeop = mintime;
			},
			maxchangeTime(maxtime) { //选择时间
				this.maxtimeop = maxtime;
			},
			async bts_k() { //是否出差预定
				if (this.bt_bol == false) {
					let num = 1;

					try {
						const res = await tork.getAgreeApprvTask({
							type: num
						});

						if (res.code == 200) {
							if (res.data.length == 0) {
								this.bt_bol = true;
								this.travellistIndex = 0;
								uni.showToast({
									title: '没有合适的出差预订!',
									duration: 1000,
									icon: 'none',
								});
							} else {
								this.stlist = [];
								let dat = res.data;
								for (let i in dat) {
									if (num == 1) {
										for (let k in dat[i].tmsGssLink.applyVehicles) {
											let datd = dat[i].tmsGssLink.applyVehicles[k]
											datd.std = num
											this.stlist.push({
												id: dat[i].tmsGssLink.applyVehicles[k].id,
												reson: dat[i].reason,
												citys: datd, //出差信息
												nams: dat[i].tmsGssLink.applyStaffs, //出差人
												sit: {
													deptName: dat[i].deptName, //部门名称
													costcenterName: dat[i].costName,
													deptId: dat[i].deptId, //部门id
													costId: dat[i].costId, //成本中心id
													costName: dat[i].costName, //成本中心名称
													travelNo: dat[i].travelNo, //出差单号
												}
											})
										}
									}
								}
								this.blac_show = true;
								this.switfal = true;
							}
						} else {
							this.bt_bol = true;
							this.travellistIndex = 0;
							uni.showToast({
								title: '没有合适的出差预订!',
								duration: 1000,
								icon: 'none',
							});
						}
					} catch (e) {
						this.bt_bol = true;
						this.travellistIndex = 0;
						uni.showToast({
							title: '没有合适的出差预订!',
							duration: 1000,
							icon: 'none',
						});
						console.log(e)
					}
				} else {
					this.bt_bol = false;
					this.btns = '\ue80c';
					this.isretun = false;
					this.isblcks = 2;
				}
			},
			async onadd() {
				let _this = this;

				let bt_bols = _this.bt_bol; //false为事前 true为事中
				let istvals = _this.istval; //1为因公 2为因私

				let snams = this.Busirticket[0].id; //出发城市
				let enams = this.Busirticket[1].id; //到达城市
				let mintimeop = this.mintimeop; //最早起飞时间
				let maxtimeop = this.maxtimeop; //最晚起飞时间

				let price_ceiling = _this.price_ceiling; //价格上限
				let price_floor = _this.price_floor; //价格下限


				let slevels = _this.slevels;
				let firstChoice = _this.firstChoice; //首选舱司

				let cp_number = _this.cp_number; //乘客成人人数
				let xp_number = _this.xp_number;
				let yp_number = _this.yp_number;

				let contact = _this.contact; //联系人
				let phonenum = _this.phonenum; //联系人电话

				let butalist = this.deptlists; //选择乘客信息
				let remark = this.remark; //备注


				let zu = [parseInt(cp_number), parseInt(xp_number), parseInt(yp_number)]; //乘客人数

				let flights = [];
				flights.push({
					depart: snams,
					arrive: enams,
					minDepartDate: mintimeop,
					maxDepartDate: maxtimeop,
					minPrice: price_floor,
					maxPrice: price_ceiling,
					departDate: mintimeop
				});

				if (snams == '' || enams == '') {
					uni.showToast({
						title: '请输入起始城市',
						duration: 1000,
						icon: 'none'
					});
					return
				} else
				if (mintimeop == '') {
					uni.showToast({
						title: '请输入最早起飞时间',
						duration: 1000,
						icon: 'none'
					});
					return
				} else
				if (maxtimeop == '') {
					uni.showToast({
						title: '请输入最晚起飞时间',
						duration: 1000,
						icon: 'none'
					});
					return
				} else
				if (price_ceiling == '' || price_floor == '') {
					uni.showToast({
						title: '请输入价格范围',
						duration: 1000,
						icon: 'none'
					});
					return
				} else
				if (Number(price_ceiling) <= Number(price_floor)) {
					uni.showToast({
						title: '价格范围有误',
						duration: 1000,
						icon: 'none'
					});
					return
				} else
				if (butalist.length == 0) {
					uni.showToast({
						title: '请选择乘客',
						duration: 1000,
						icon: 'none'
					});
					return
				} else
					// if (p_number.cp_number == "" ) {
					// 	uni.showToast({
					// 		title: '请输入乘客人数',
					// 		duration: 1000,
					// 		icon: 'none'
					// 	});
					// 	return
					// } else
					if (contact == '') {
						uni.showToast({
							title: '请输入联系人姓名',
							duration: 1000,
							icon: 'none'
						});
						return
					} else
				if (phonenum == '') {
					uni.showToast({
						title: '请输入联系人电话',
						duration: 1000,
						icon: 'none'
					});
					return
				} else {
					if (this.boolean == false && this.bt_bol == false) {
						this.bt_bol = true;
					}
					let dat = {};
					let su = [];
					for (let i = 0; i < butalist.length; i++) { //出行人信息
						for (let k in butalist[i].list) {
							let Select_phone = '';
							if (butalist[i].list[k].phone != '') { //电话
								Select_phone = butalist[i].list[k].phone;
							} else {
								Select_phone = butalist[i].list[k].telePhone;
							}
							let birthdate = "";
							if (butalist[i].list[k].birthdate != null) {//生日
								birthdate = butalist[i].list[k].birthdate.substring(0, 10);
							} else {
								birthdate = null
							}
							su.push({
								ageType:butalist[i].list[k].ageType,//乘客类型
								birthday: birthdate,//生日
								cardNo: butalist[i].list[k].okcardNo,//证件号
								cardType: butalist[i].list[k].okcardType,//证件类型
								gender: butalist[i].list[k].gender,//性别
								name: butalist[i].list[k].name,//名字
								phone: Select_phone,//电话
								deptId:butalist[i].list[k].deptId,//部门id
								userId:butalist[i].list[k].userId,//id
								tempPerson:butalist[i].list[k].employeeType,//是否临时出行人
								deptName: butalist[i].list[k].deptName,//部门
								costcenterName: butalist[i].list[k].costcenterName,//成本中心
								passengerNo: butalist[i].list[k].passengerNo,//用户id
							});
						}
					}
					// for (let i in butalist) {
					// 	su.push({
					// 		passengerNo:butalist[i].passengerNo,
					// 		name: butalist[i].userName,
					// 		cardNo: butalist[i].cardNo,
					// 		cardType: butalist[i].cardType,
					// 		phone: butalist[i].phone, //电话
					// 		// employeeType:1,
					// 		costcenterName:butalist[i].costcenterName,
					// 		deptName:butalist[i].deptName,
					// 	})
					// }
					dat = {
						travelType: istvals,
						flights: flights, //航程信息
						serviceLevel: slevels, //舱位等级
						airline: firstChoice, //首选舱司
						peoples: zu, //乘客人数
						travelers: su, //乘客信息
						contacts: contact, //联系人
						contactPhone: phonenum,
						remark: remark, //备注
					
					}
					if (this.bt_bol == false) { //事前
						dat['vehicleId'] = this.vehicleId;
						dat['vehicleBack'] = this.vehicleBack;
						dat['travelerNo'] = this.travelNos;
					}
					let res = await tork.domesticketsave(dat);
					if (res.code == 200) {
						uni.showToast({
							title: '提交成功,工作人员会及时联系你',
							duration: 2000,
							icon: 'none'
						});
						setTimeout(()=>{
							_this.toBlock();
						},1000)
					} else {
						uni.showToast({
							title: res.message,
							duration: 2000,
							icon: 'none'
						});
					}
				}
			},

		},
		computed: {
			...mapState([
				'userinfo',
			])
		},
		
	}
</script>

<style lang="scss" scoped>
	/deep/ .cu-bar .padding-lr .cu_li_left .cu_lis.data-v-8a28e58c {
		width: 200rpx;
		font-size: 35rpx;
		color: #c0c0c0;
	}

	/deep/ .cu-bar .padding-lr .cu_li_right .cu_lis.data-v-8a28e58c {
		width: 200rpx;
		font-size: 35rpx;
		color: #c0c0c0;
	}

	/deep/ .pass_list .icon {
		width: 60rpx;
		color: #6e46fe;
		font-size: 45rpx;
		line-height: 1;
	}

	.black_mu {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: black;
		opacity: 0.5;
		z-index: 888;
	}

	.isswflist {
		position: fixed;
		bottom: 0;
		left: 0;
		transition: all 0.3s ease;
		-webkit-transform: translateY(100%);
		transform: translateY(100%);
		max-height: 50%;
		overflow-y: scroll;
		width: 100%;
		z-index: 1200;
		background: #ffffff;

		.talist {
			width: 100%;
			border-top: 2upx solid #E5E5E5;
			padding: 20upx 0;
			display: flex;

			.tl_left {
				height: 120upx;
				width: 78%;
				margin-left: 2%;

				.tl_tops {
					display: flex;
					width: 100%;
					height: 50upx;
					font-size: 35upx;
					line-height: 50upx;
					color: #333333;

					.tl_rightl {
						width: 20%;
					}

					.tl_rights {
						width: 80%;
						margin-left: 10upx;
						overflow: hidden;
						text-overflow: ellipsis; //文本溢出显示省略号
						white-space: nowrap; //文本不会换行
					}
				}

				.tl_bots {
					width: 100%;
					height: 40upx;
					font-size: 30upx;
					line-height: 30upx;
				}

				.tl_botsb {
					width: 100%;
					height: 40upx;
					font-size: 30upx;
					line-height: 30upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.tl_right {
				width: 20%;
				height: 120upx;
				display: flex;
				align-items: center;
				justify-content: center;

				.tldv {
					width: 100upx;
					height: 50upx;
					line-height: 50upx;
					text-align: center;
					font-size: 30upx;
					color: #E5E5E5;
					background: $uni-color-primary;
					border-radius: 60upx;
				}
			}
		}
	}

	.isswflist::-webkit-scrollbar {
		display: none;
	}

	.show {
		-webkit-transform: translateY(0);
		transform: translateY(0);
	}

	.dticket {
		height: auto;
		.userlist {
			width: calc(100% - 40upx);
			padding: 10upx 0;
			background: #ffffff;
			color: #333333;
			font-size: 30upx;
			margin: 20upx;
			border-radius: 10upx;
		
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
		.add_ul {
			font-size: 30upx;
			line-height: 90upx;
			background: #ffffff;
			margin-bottom: 15upx;

			.apl_ok {
				width: calc(100% - 20upx);
				padding-right: 20upx;
				display: flex;
				justify-content: space-between;
				.section{
					text-align: right;
				}
				.frop_left {
					display: flex;
					width: 40%;

					.f_icon_left {
						color: #ff0000;
						font-size: 20upx;
						margin: 0 10upx 0 10upx;
						transform: scale(0.8);
					}

					.f_icon_lefts {
						color: #ffffff;
						margin: 0 3upx 0 10upx;
						font-size: 20upx;
					}

					.apl_name {
						width: 70%;
						flex:3;
						font-size: 30upx;
						color: #666666;
					}
				}
				::v-deep .icon1 {
					font-size: 45upx;
				}
				.frop_pls {
					width: 60%;
					font-size: 30upx;
					display: flex;
					color: #999999;
					align-items: center;
					text-align: right;
					.ol_pth {
						display: flex;
						padding: 20upx 0;
						align-items: center;
						.olleft {
							width: 110upx;
							height: 80upx;
							font-size: 25upx;
							overflow: hidden;

							.pfls {
								width: 100%;
								display: flex;
								justify-content: center;
								align-items: center;
							}
						}

						.olright {
							margin-left: 20upx;
							width: 100%;
							line-height: 30upx;
							font-size: 25upx;
						}
					}

					.opls {
						width: 100%;
						display: flex;
						align-items: center;
						.radios-gr{
							display: flex;
							align-items: center;
							font-size: 22upx;
							color: #333333;
						}
						input {
							font-size: 30upx !important;
							width: 100%;
							color: #999999;
							border-radius: 8upx;
						}
						.uni-input-placeholder{
							color: #999999;
						}
						.input_css {
							width: 30%;
							height: 50upx;
						}

						.for_value {
							color: black;
						}

						::v-deep .icon {
							color: #567EFE;
						}

						::v-deep .icon1 {
							font-size: 45upx;
						}

						::v-deep .uni-radio-input {
							width: 30upx;
							height: 30upx;
						}
					}
				}
			}
		}
	}

	.third_css {
		margin-top: 10upx;
		padding-bottom: 10upx;
		background-color: #FFFFFF;
		.input_css {
			width: 90%;
			text-align: left;
			height: 180upx;
			margin:30upx;
		}
	}



	.cut_css {
		background-color: #FFFFFF;
		height: 28px;
	}

	.title_css {
		margin-left: 20upx;
		font-size: 32upx;
		font-weight: bold;
		color: #333333;
		line-height: 40px;
	}

	.input_css {
		border: 1px solid #DFDFDF;
		height: 18px;
		min-height: 18px;
		text-align: center;
		font-size: 14px;
		margin-top: 3px;
	}


	.lis {
		background-color: #ffffff;
		background-image: none;
		filter: none;
		border: 0;
		outline: none;
		height: 90upx;
		line-height: 90upx;
		font-size: 30upx;
		width: 100%;
		color: #888888;
		border-radius: 8px;
	}



	.opt_css {
		font-size: 12px;
		padding-top: 5px;
	}



	.btn_sbm {
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		margin-top: 15upx;
		text-align: center;
		background:#3478f6;
		color: #FFFFFF;
		font-size: 17px;
		font-weight: 700;
		display: block;
	}

	// 时间组件样式
	.catleft {
		width: 140upx;
		height: 140upx;
		display: flex;
		align-items: center;
		justify-content: center;

		.catleftimg {
			width: 40upx;
			height: 40upx;
		}
	}

	.adresxt {
		width:100%;
		height: 90upx;
		line-height: 90upx;
		.ctiemns {
			line-height: 90upx;
		}
	}
</style>
<style>
.cu-bar{
	/* width: calc(100% - 80upx); */
    /* padding: 0 70px; */
}

</style>