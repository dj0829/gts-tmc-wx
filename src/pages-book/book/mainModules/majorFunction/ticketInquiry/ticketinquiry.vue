<template>
	<view class="mian container999">
		<loading>
		</loading>
		<!-- <view class="White">

		</view> -->
		
		<view class="top">
			<headnavigation :titles="pltitles"></headnavigation>
			<datatiem @change="lischang" :isretun="isretun" :ishtoel="ishtoel" :singleDate="singleDate" :startDate="startDate"></datatiem>
		</view>

		<view class="air_ticket">
			<view class="wei">
				<view v-if="dataList.length > 0 && item.isshow == true" @click="particulars(item,index)" v-for="(item,index) in dataList"
				 :key='index' class="ticket">
					<view class="above">
						<view class="airticket">
							<view class="airtts">
								<view class="airfons">{{item.departTime}}</view> <!-- 出发时间 -->
								<view  class="airticketimg">
									<image src="@/static/img/home/home_go.png"></image>
									<view v-if="item.nonstop == true">经停</view>
								</view>
								<view class="airfons arrclass">{{item.arriveTime}} <span v-if="item.isarriveTime" >+1</span> </view> <!-- 返回时间 -->
							</view>
							<view class="airtts">
								<view class="travel_time">
									<view class="travfomts" v-if="item.departTerminal != null">{{item.departs}}{{item.departTerminal}}</view><!-- 出发城市 -->
									<view class="travfomts" v-else>{{item.departs}}</view><!-- 出发城市 -->
								</view>
								<view class="travel_time">
									<view class="travfomts" style="text-align: right;" v-if="item.arriveTerminal != null">{{item.arrives}}{{item.arriveTerminal}}</view>
									<view class="travfomts" style="text-align: right;" v-else>{{item.arrives}}</view>
									<!-- 返回城市 -->
								</view>
							</view>
						</view>
						<view class="low" v-if="item.lowprice!=null">
							{{item.lowprice}}
						</view>
						<view class="price">
							<view style="font-size: 40upx;">
								<view><span style="font-size:24upx;">￥</span>{{item.minPrice}}</view> <!-- 机票价格 -->
								<view class="discountjia" v-if="item.minDiscount != 1">
									{{item.minPriceCabinCode}}{{item.minDiscount}}折
								</view>
								<view class="discountjia" v-else>
									<span style="color: red">全价</span>
								</view>
							</view>
						</view>
					</view>
					<view class="airport">
						<view class="stsbt">
							<image :src="item.ims" mode=""></image>
							<view style="">{{company(item.airline)}}</view>
							<view style="">{{item.no}}/</view>
							<view style="">{{model(item.plane)}}{{item.plane}}</view>
							<view style="" v-if="item.planeSize != null">{{item.planeSize}}</view>
						</view>

						<view class="stsbt">
							<view class="stasb" v-if="civilServiceTicket != undefined && civilServiceTicket == 1">
								<p>公</p>
							</view>
							<view class="stass" v-if="item.shared == true">
								<p>共享</p>
							</view>
						</view>
						<view>
						<view style="text-indent: 20upx;color: #666666;font-size: 22upx;line-height: 50upx;margin-right:20upx">
							<p>{{mealss(item.meals)}}</p>
						</view>
					</view>
					</view>
					<view class="ting">
						<view v-if="item.shared == true">承运航班:{{item.operatingNo}}</view>
					</view>
				</view>
				<view class="tiaklistImg" v-if="dataList.length == 0">
					<image class="gjImg" v-if="imgFlag" src="@/static/img/m_ticketList.png" mode=""></image>
					<image class="noData" v-else src="@/static/img/noData.png" mode="widthFix"></image>
					<div class="rblcok" v-if="!imgFlag" @click="rblcok">重新搜索</div>
				</view>
				<view :class="{'share-box': companyd_click}" @click="companym_click">
				</view>
				<view class="share-item" :class="{'share-show': companyd_click}">
					<view class="share">
						<view @click="cancels">取消</view>
						<view @click="reset">重置</view>
						<view @click="confirm" class="cancel" >确定</view>
					</view>
					<view class="choice">
						<view class="left_choice">
							<view @click="choice(item,index)" v-for="(item,index) in userchoice" :key="item.id" class="_choice" :class="itid == item.id ? 'icheds':''">
								{{item.text}}
							</view>
						</view>
						<view class="right_choice">
							<!-- 起飞时段 -->
							<view @click="take(item,index)" v-for="(item,index) in usertake" :key="index" class="take" :class="item.id == it || item.id == ir || item.id == iw || ie.indexOf(item.id) != -1 || item.id == iq || item.id == ih || iy.indexOf(item.id) != -1 || iu.indexOf(item.id) != -1 ? 'takes':''">
								{{item.text}}
								<view class="iconfont" style="color:#007aff;font-size: 28upx;" v-if="item.id == it || item.id == ir || item.id == iw || ie.indexOf(item.id) != -1 || item.id == iq || item.id == ih || iy.indexOf(item.id) != -1 || iu.indexOf(item.id) != -1">&#xe620;</view>
							</view>
						</view>
					</view>
					
				</view>
				<view class="mask" v-if="companyi_click" @click="companym_click">
				</view>
				<view class="screen" v-if="companyd_click">
					
				</view>
			</view>
		</view>
		<!-- 下面导航 disabled-->
		<view class="tail">
			<view @click="cut(item,index)" v-for="(item,index) in tabBar" :key="item.ul" class="tabbar_item" :class="isid == item.ul ? 'iched':''">
				<view class="iconfont" style="color:#007aff;" v-if="isid == item.ul">{{item.imgnor}}</view>
				<view class="iconfont" style="color:#c0c4ce;" v-if="isid != item.ul">{{item.imgNormal}}</view>
				<view class="text">{{item.text}}</view>
			</view>
		</view>
		<onPageScrolls :scrolltops="scrolltops"></onPageScrolls>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import certifi from '@/api/certificate.js'
	import airports from 'pages/book/sselect-city/airports.js'
	import datatiem from '@/components/view/book/date-picker/date-picker.vue'
	export default {
		components: {
			datatiem
		},
		data() {
			return {
				pltitles:'',
				scrolltops:false,//是否显示
				isretun: false,
				startDate: '',
				ishtoel: 'ticketinqu',
				singleDate: true,
				city: '', //去的城市
				citys: '', //来的城市
				time: '', //时间
				times: '', //时间
				check: '',
				timelist: '', //时间的集合
				none: '', //判断
				booll: false,
				imgFlag:true,
				
				shu: [],
				dataList: [],
				usermap: [],
				flights: [],
				userrw: [],
				hang: [],
				aviations: [],
				dateshu: [],
				address: [], //城市集合
				butalist: [],
				dats: {},
				datas: {},
				companyi_click: false, //弹出层
				companys_click: false, //保险
				companyd_click: false, //筛选
				text: '时间',
				cong: false, //重置
				isblcks: '', //1事前2事中
				isbtd: '', //1因公2因私
				isid: 'Time', //默认值
				itid: 'Transit', //起飞默认
				it: 'Unlimited', //起飞时段
				ir: 'Unlimiteda', //起飞经停
				iw: 'Unlimiteds', //舱位
				ie: 'Unlimitedh', //航空公司
				iq: 'Unlimitede', //机型
				ih: 'Unlimitedg', //共享
				iy: 'Unlimitedk', //起降机场
				iu: 'Unlimitedj', //到达机场
				civilServiceTicket: '',
				usertake: [],
				filter: [{
					id: '0',
					name: '起飞',
					value: 'Unlimiteda'
				// }, {
				// 	id: '1',
				// 	name: '舱位',
				// 	value: 'Unlimiteds'
				}, {
					id: '1',
					name: '航空公司',
					value: 'Unlimitedh'
				}, {
					id: '2',
					name: '机型',
					value: 'Unlimitede'
				}, {
					id: '3',
					name: '共享',
					value: 'Unlimitedg'
				}, {
					id: '4',
					name: '出发机场',
					value: 'Unlimitedk'
				}, {
					id: '5',
					name: '到达机场',
					value: 'Unlimitedj'
				}], //筛选
				userindex: {
					name: 0,
					id: 'Unlimiteda'
				},
				userchoice: [{
						id: 'Transit',
						text: '起飞/经停',
						arr: [{
								id: 'Unlimiteda',
								text: '不限',
								img: '\ue620'
							},
							{
								id: 'true',
								text: '经停',
								img: '\ue620'
							},
							{
								id: false,
								text: '仅直飞',
								img: '\ue620'
							}
						]
					},
					// {
					// 	id: 'Location',
					// 	text: '舱位',
					// 	arr: [{
					// 			id: 'Unlimiteds',
					// 			text: '不限',
					// 			img: '\ue620'
					// 		},
					// 		{
					// 			id: 'Y',
					// 			text: '经济舱',
					// 			img: '\ue620'
					// 		},
					// 		{
					// 			id: 'F',
					// 			text: '头等舱/商务舱',
					// 			img: '\ue620'
					// 		}
					// 	]
					// },
					{
						id: 'Airline',
						text: '航空公司',
						arr: [{
							id: 'Unlimitedh',
							text: '不限',
							img: '\ue620'
						}]
					},
					{
						id: 'model',
						text: '机型',
						arr: [{
							id: 'Unlimitede',
							text: '不限',
							img: '\ue620'
						}]
					},
					{
						id: 'shared',
						text: '共享',
						arr: [{
							id: 'Unlimitedg',
							text: '不限',
							img: '\ue620'
						}]
					},
					
					{
						id: 'departure',
						text: '出发机场',
						arr: [{
							id: 'Unlimitedk',
							text: '不限',
							img: '\ue620'
						}]
					},
					
					{
						id: 'arrive',
						text: '到达机场',
						arr: [{
							id: 'Unlimitedj',
							text: '不限',
							img: '\ue620'
						}]
					}
				],
				tabBar: [{
						ul: 'Time',
						text: '时间',
						imgnor: '\ue8a5',
						imgNormal: '\ue648'
					},
					{
						ul: 'Topbottom',
						text: '价格',
						imgnor: '\ue8a6',
						imgNormal: '\ue615'
					},
					{
						ul: 'Screen',
						text: '筛选',
						imgnor: '\ue61d',
						imgNormal: '\ue61d'
					}
				],
				tickarray: [], //航班集合复制
				arrivalAirport: '', //经停
				ting: false, //共享
				flightinfoid: '',
				priceSource: 0,
				cont: 0,
				timelists:{},//时间信息
				isto:1,//往返  1是去 2是回
			}
		},
		onPageScroll(res){//距离页面顶部距离
			if(res.scrollTop == 0){
				this.scrolltops = false;
			} else {
				this.scrolltops = true;
			}
		},
		mounted() {
			if (this.isblcks == 1) {
				this.isretun = true
			}
			this.usertake = this.userchoice[0].arr;
		},
		onLoad(item) {
			let data = JSON.parse(uni.getStorageSync("ticketinquiry_data"));
			this.dats = data;//上个页面的值
			
			this.isto = data.isto;
			this.time = data.timedate; //时间
			this.civilServiceTicket = data.civilServiceTicket;//是否公务员票
			this.none = data.none;//1为单程 2为往返
			this.butalist = data.butalist;//出差人信息
			this.isblcks = data.isblcks; //1事前2事中
			this.isbtd = data.isbtd; //1因公2因私
			this.city = data.city; //去的城市
			this.citys = data.citys; //来的城市
			if (data.none == 'single') { //单程
				this.startDate = data.timedate //时间控件的值
			} else if (data.none == 'returns') { //往返
				this.times = data.timedates; //来的时间
				if(this.isto == 2){//回程 颠倒下城市
					this.city = data.citys;
					this.citys = data.city;
					this.startDate = data.timedates //时间控件的值
				} else {
					this.startDate = data.timedate //时间控件的值
				}
				//需要判断  回程时间不能小于出发时间
			}
			
			this.pltitles = this.city.name + ' - ' + this.citys.name;
		},
		onShow() {
			this.save()
		},
		methods: {
			//时间
			lischang(item) {
				if(item.choiceDate.re == this.startDate){
					this.timelists = item.choiceDate;//时间信息
				} else {
					this.startDate = item.choiceDate.re; //当前的日期
					this.timelists = item.choiceDate;//时间信息
					this.save()
				}
			},
			editTime(i) {
				if (i < 10) {
					i = "0" + i;
				}
				return i;
			},
			//共享
			tings(item, index) {
				event.stopPropagation();
				if (this.ting == false) {
					this.ting = true;
				} else {
					this.ting = false;
				}
			},
			rblcok() {
				this.toBlock();
			},
			reset() {
				this.cong = true;
				this.take();
			},
			cheack() {
			},
			confirm() {
				let datw = this.dataList;//数据
				let dat = this.userindex;//当前下标
				let arris = [];
				for (var i = 0; i < datw.length; i++) {
					if (this.filter[0].value != 'Unlimiteda') {
						let sits = false;
						if (datw[i].nonstop == true && this.filter[0].value == 'true') {
							sits = true;
						} else if (datw[i].nonstop == false && this.filter[0].value == false) {
							sits = true;
						}
						if (sits == false) {
							datw[i].isshow = false;
							continue
						}
					}
					// if (this.filter[1].value != 'Unlimiteds') {
					// 	let sits = false;
					// 	if (datw[i].economyclass == true && this.filter[1].value == 'Y') {
					// 		sits = true;
					// 	} else if (datw[i].businessclass == true && (this.filter[1].value == 'C' || this.filter[1].value == 'F')) {
					// 		sits = true;
					// 	}
					// 	if (sits == false) {
					// 		datw[i].isshow = false;
					// 		continue
					// 	}
					// }
					if (this.filter[1].value != 'Unlimitedh') {
						let sits = false;
						if (this.filter[1].value.includes(datw[i].airline)) {
							sits = true;
						}
						if (sits == false) {
							datw[i].isshow = false;
							continue
						}
					}
					if (this.filter[2].value != 'Unlimitede') {
						let sits = false;
						if (datw[i].planeSize == this.filter[2].value) {
							sits = true;
						}
						if (sits == false) {
							datw[i].isshow = false;
							continue
						}
					}
					if (this.filter[3].value != 'Unlimitedg') {
						let sits = false;
						if (datw[i].shared != true && this.filter[3].value == true) {
							sits = true;
						}
						if (sits == false) {
							datw[i].isshow = false;
							continue
						}
					}
					if (this.filter[4].value != 'Unlimitedk') {
						let sits = false;
						if (this.filter[4].value.includes(datw[i].depart)) {
							sits = true;
						}
						if (sits == false) {
							datw[i].isshow = false;
							continue
						}
					}
					if (this.filter[5].value != 'Unlimitedj') {
						let sits = false;
						if (this.filter[5].value.includes(datw[i].arrive)) {
							sits = true;
						}
						if (sits == false) {
							datw[i].isshow = false;
							continue
						}
					}
					datw[i].isshow = true;
				}
				// this.dataList = arris;
				this.dataList = datw;
				this.companyi_click = false;
				this.companyd_click = false;
			},
			companym_click() {
				this.companyi_click = false;
				this.companys_click = false;
				this.companyd_click = false;
				// this.dimiss = false;
			},
			company_click() {
				this.companyi_click = true;
				this.companys_click = true;
			},
			comp_click() {
				this.companyi_click = true;
			},
			compare(property, desc) {
				return function(a, b) {
					var value1 = a[property];
					var value2 = b[property];
					if (desc == true) {
						// 升序排列
						return value1 - value2;
					} else {
						// 降序排列
						return value2 - value1;
					}
				}
			},
			insertStr(soure, start, newStr) {
				return soure.slice(0, start) + newStr + soure.slice(start)
			},
			sort() {
				let _this = this;
				let pattern = ':';
				for (let k in _this.dataList) {
					_this.dataList[k]['nusm'] = _this.dataList[k].departTime.replace(new RegExp(pattern), "");
				}
				this.dataList.sort(this.compare('nusm', true))
			},
			inverted() {
				let _this = this;
				let pattern = ':';
				for (let k in _this.dataList) {
					_this.dataList[k]['nusm'] = _this.dataList[k].departTime.replace(new RegExp(pattern), "");
				}
				this.dataList.sort(this.compare('nusm', false))
			},
			sorts() {
				let _this = this;
				for (let j in _this.dataList) {
					_this.dataList[j]['nums'] = _this.dataList[j].minPrice;
					this.dataList.sort(this.compare('nums', true))
				}
			},
			inverteds() {
				let _this = this;
				for (let j in _this.dataList) {
					_this.dataList[j]['nums'] = _this.dataList[j].minPrice;
					this.dataList.sort(this.compare('nums', false))
				}
			},
			cut(it, index) {
				let _this = this;
				this.isid = it.ul;
				let han = [];
				let shu = '';
				if (it.ul == "Time") {
					this.tabBar[1].text = '价格'
					if (this.tabBar[index].text == '时间') {
						this.tabBar[index].text = '早-晚'
						this.sort();
					} else if (this.tabBar[index].text == '早-晚') {
						this.tabBar[index].text = '晚-早'
						this.inverted();
					} else {
						this.tabBar[index].text = '早-晚'
						this.sort();
					}
				}
				if (it.ul == "Topbottom") {
					this.tabBar[0].text = '时间'
					if (this.tabBar[index].text == '从高到低') {
						this.tabBar[index].text = '从低到高'
						this.sorts();
					} else {
						this.tabBar[index].text = '从高到低'
						this.inverteds();
					}
				}
				if (it.ul == "Screen") {
					this.tabBar[0].text = '时间'
					this.tabBar[1].text = '价格'
					this.companyi_click = true;
					this.companyd_click = true;
				}
			},
			cancels() {
				this.companyi_click = false;
				this.companyd_click = false;
			},
			choice(io, index) {
				this.itid = io.id;
				this.usertake = io.arr;
				this.userindex.name = index;
			},
			 rblcok(){
				this.toBlock();
			},
			//查询
			async save() {
				let _this = this;
				_this.dataList = [];
				let cityName = _this.city; //出发地
				let citysName = _this.citys; //到达地
				let name = ''; //旅客
				let lei = '';
				let share = '';
				let aircom = "";
				let transCity = "";
				let grade = "";
				let passengeType = "";
				if (_this.none == 'single') {
					lei = '1';
					share = 1;
					passengeType = "ADT";
				} else if (_this.none == 'returns') {
					lei = '2';
					share = 1;
					passengeType = "ADT";
				}
				let user = {
					"fromCity": cityName.id,//出发城市三字码
					"passengerType": passengeType,//乘客类型 默认成人
					"hcType": lei,//1为单程 2位往返
					"toCity": citysName.id,//到达城市三字码
					"ishareFlight": share,//是否包含共享航班 1为包含
					"fromDate": this.startDate,//出发时间
					"transCity": transCity,//中转站
					'grade': grade,//舱位等级
				};
				if (this.civilServiceTicket != undefined) {//是否公务票
					user['aircom'] = aircom;//航司编号  改签才需要 只能改同航司或者支持的航司
					user['civilServiceTicket'] =  this.civilServiceTicket;
				} else {
					//改签查询 限制航司
					user['aircom'] = this.isblcks == 4 ? this.dats.odllegList[0].flightNo.substring(0, 2) : aircom;
					// user['aircom'] = aircom;
				}
				
				try {
					let res = await certifi.searchAirline(user);
					let ret = await certifi.queryAirlineList();//航司名称
									
					if (res.code == 200) {
						if (res.data.flights == null) {
							_this.showToasts("没有合适的航班信息")
							this.imgFlag = false
							return
						}
						_this.hang = ret.data.airlineDds;
						_this.dataList = res.data.flights;
						_this.address = airports.addressAirportAll; //航空名字
						
						
						let si = [{ //航空公司
							img: '\ue620',
							id: 'Unlimitedh',
							text: '不限'
						}];
						
						
						
						let model = [{//机型
							img: '\ue620',
							id: 'Unlimitede',
							text: '不限'
						}];
						
						let shareds = [{ //经停
							img: '\ue620',
							id: 'Unlimitedg',
							text: '不限'
						}];
						
						let deptsi = [{//出发点
							img: '\ue620',
							id: 'Unlimitedk',
							text: '所有机场'
						}];
						
						let arrti = [{//到达点
							img: '\ue620',
							id: 'Unlimitedj',
							text: '所有机场'
						}];
						for (let k = 0; k < _this.dataList.length; k++) {
							_this.dataList[k]['ims'] = 'http://file.feiren.com/00/02/' + _this.dataList[k].airline + '.png'
							if (k, _this.dataList[k].planeSize == 'L') {
								_this.dataList[k].planeSize = '(大)'
							} else if (k, _this.dataList[k].planeSize == 'M') {
								_this.dataList[k].planeSize = '(中)'
							} else if (k, _this.dataList[k].planeSize == 'S') {
								_this.dataList[k].planeSize = '(小)'
							}
							if (k, _this.dataList[k].shared == true) {
								_this.dataList[k].shareds = '隐藏共享'
							}
							if(_this.dataList[k].arriveTime.length > 5){
								_this.dataList[k].arriveTime = _this.dataList[k].arriveTime.substring(0,5);
								_this.dataList[k]['isarriveTime'] = true;
							} else {
								_this.dataList[k]['isarriveTime'] = false;
							}
							_this.dataList[k]['searchNo'] =  res.data.searchNo;//查询编号，用来查询舱位
							for (let j = 0; j < _this.address.length; j++) {
								if (k, _this.dataList[k].depart == _this.address[j].airportCode) {
									// k,
									_this.dataList[k]['departs'] = _this.address[j].airportCName;
								} else if (k, _this.dataList[k].arrive == _this.address[j].airportCode) {
									// k,
									_this.dataList[k]['arrives'] = _this.address[j].airportCName;
								}
								if (this.arrivalAirport == this.address[j].airportCode) {
									this.arrivalAirport = this.address[j].airportCName;
								}
							}
							si.push({
								img: '\ue620',
								id: _this.dataList[k].airline,
								text: this.company(_this.dataList[k].airline)
							})
							model.push({
								img: '\ue620',
								id: _this.dataList[k].planeSize,
								text: _this.dataList[k].planeSize
							})
							shareds.push({
								img: '\ue620',
								id: _this.dataList[k].shared,
								text: _this.dataList[k].shareds
							})
							deptsi.push({
								img: '\ue620',
								id: _this.dataList[k].depart,//出发机场
								text: _this.dataList[k].departs
							})
							arrti.push({
								img: '\ue620',
								id: _this.dataList[k].arrive,//到达机场
								text: _this.dataList[k].arrives
							})
						}
						
						//去重
						let obj = {};
						let peon = si.reduce((cur, next) => {//航空公司
							obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
							return cur;
						}, []) //设置cur默认类型为数组，并且初始值为空的数组
						
						
						let models = this.reducelist(model);//机型
						let sharedsli = this.reducelist(shareds);//共享
						let deptsilist = this.reducelist(deptsi);//出发机场
						let deptarrlist = this.reducelist(arrti);//出发机场
						
						for (let i = 0; i < this.userchoice.length; i++) {
							if (this.userchoice[i].id == 'model') {//机型
								for (let k = 0; k < models.length; k++) {
									if (models[k].text == null) {
										models.splice(k, 1);
									}
								}
								this.userchoice[i].arr = models;
							}
							if (this.userchoice[i].id == 'shared') { //共享
								for (let k = 0; k < sharedsli.length; k++) {
									if (sharedsli[k].text == undefined) {
										sharedsli.splice(k, 1);
									}
								}
								this.userchoice[i].arr = sharedsli;
							}
							if (this.userchoice[i].id == 'Airline') {//插入航空公司
								this.userchoice[i].arr = peon;
							}
							if(this.userchoice[i].id == 'departure'){//出发机场
								this.userchoice[i].arr = deptsilist;
							}	
							if(this.userchoice[i].id == 'arrive'){//到达机场
								this.userchoice[i].arr = deptarrlist;
							}
						}
						let istls = {ul:'Time'};
						this.cut(istls, 0);
						this.confirm();
					} else {
						_this.showToasts(res.message);
						_this.showToasts("暂无航班");
					}
				} catch (e) {
					console.log(e)
					
				}
			},
			reducelist(model){//去重
				let objs = {};
				let models = model.reduce((cur, next) => {  //机型
					objs[next.id] ? "" : objs[next.id] = true && cur.push(next);
					return cur;
				}, []) //设置cur默认类型为数组，并且初始值为空的数组
				return models
			},
			mealss(i) {
				let meal = [];
				let meale = [];
				if (i != null) {
					meal = i.split('|');
				} else {
					return '无餐'
				}
				for (let k in meal) {
					let op = "";
					if (meal[k] == 'FS') {
						op = ' 头等舱有快餐 ';
						meale.push(op);
					} else if (meal[k] == 'JS') {
						op = ' 公务舱有快餐 ';
						meale.push(op);
					} else if (meal[k] == 'YR') {
						op = ' 经济舱有茶点 ';
						meale.push(op);
					} else if (meal[k] == 'B') {
						op = '早餐';
						meale.push(op);
					} else if (meal[k] == 'C') {
						op = '免费酒精饮料 ';
						meale.push(op);
					} else if (meal[k] == 'D') {
						op = '正餐';
						meale.push(op);
					} else if (meal[k] == 'F') {
						op = ' 供采购的食物 ';
						meale.push(op);
					} else if (meal[k] == 'G') {
						op = '供采购的食物和饮料';
						meale.push(op);
					} else if (meal[k] == 'H') {
						op = '热的膳食';
						meale.push(op);
					} else if (meal[k] == 'K') {
						op = '轻快早餐';
						meale.push(op);
					} else if (meal[k] == 'L') {
						op = '午餐';
						meale.push(op);
					} else if (meal[k] == 'M') {
						op = '膳食';
						meale.push(op);
					} else if (meal[k] == 'N') {
						op = '没有饭食供应';
						meale.push(op);
					} else if (meal[k] == 'O') {
						op = '冷的膳食';
						meale.push(op);
					} else if (meal[k] == 'P') {
						op = '供采购的酒精饮料';
						meale.push(op);
					} else if (meal[k] == 'R') {
						op = '茶点';
						meale.push(op);
					} else if (meal[k] == 'S') {
						op = '快餐';
						meale.push(op);
					} else if (meal[k] == 'V') {
						op = '供采购的茶点';
						meale.push(op);
					}
				}
				return meale.join(',');
			},
			company(ie) {
				for (let s in this.hang) {
					if (ie == s) {
						ie = this.hang[s];
						return ie;
					}
				}
			},
			model(ie) {
				if (ie.substring(0, 1) == 3) {
					ie = '空客'
				} else {
					ie = '波音'
				}
				return ie;
			},
			particulars(item, index) {//选择当前航班信息 跳转舱位选择页面
				if(this.isto == 2){//回程 颠倒下城市
					let items = this.dats.dataOne.flightsts;//第一段时间
					
					let Twodata = new Date(item.departDate.substring(0,10) + ' ' + item.departTime + ':00').getTime();//第二段的出发时间
					
					let olddata  = new Date(items.departDate.substring(0,10) + ' ' + items.arriveTime + ':00').getTime();//第一段时间;
					
					if(items.isarriveTime == true){//过了12点
						olddata = olddata + 86400000;//增加一天的毫秒数
					}
					if(Twodata < olddata){
						this.showToasts('出发时间不能小于去程到达时间！')
						return
					}
				}
				let cit = {//航空名称
					airlinename: this.company(item.airline)
				};
				let data = item;//当前选中的信息
				data['timelists'] = this.timelists;//当前日期信息
				data['airlinename'] = this.company(item.airline);//航空公司
				let dat = {};
				// if(this.none == 'single'){
					dat = {
						dataOne:data,//当前段的信息
						searchData:this.dats,//查询页面参数
					}
				// }
				uni.setStorageSync("particularst_data", JSON.stringify(dat));
				uni.navigateTo({
					url: './particulars/particularst'
				})
			},
			take(item, index) {
				if (this.cong == true) {//重置
					this.ir = 'Unlimiteda';
					this.filter[0].value = 'Unlimiteda';
					this.iw = 'Unlimiteds';
					// this.filter[1].value = 'Unlimiteds';
					// this.ie = 'Unlimitedh';
					this.filter[1].value = 'Unlimitedh';
					this.iq = 'Unlimitede';
					this.filter[2].value = 'Unlimitede';
					this.ih = 'Unlimitedg';
					this.filter[3].value = 'Unlimitedg';
					this.iy = 'Unlimitedk';
					this.filter[4].value = 'Unlimitedk';
					this.iu = 'Unlimitedj';
					this.filter[5].value = 'Unlimitedj';
					this.cong = false;
				} else {
					this.userindex.id = item.id;
					let dat = this.userindex;
					if (dat.name == 0) { //起飞经停
						this.ir = item.id
						this.filter[0].value = item.id;
					// } else if (dat.name == 1) { //舱位
					// 	this.iw = item.id
					// 	this.filter[1].value = item.id;
					} else if (dat.name == 1) { //航空公司
						if(item.id != 'Unlimitedh'){
							let ies = [];
							if(this.ie == 'Unlimitedh'){
								this.ie ='';
							} else {
								ies = this.ie.split(',');
							}
							if(ies.includes(item.id)){//判断是否被选中
								for(let k = ies.length;k>=0;k--){//删除选中
									if(ies[k] == item.id){
										ies.splice(k,1);
									}
								}
								
							} else {
								ies.push(item.id);
							}
							if(ies.length == 0){//当航司被删完后，赋值成不限
								this.ie = 'Unlimitedh';
								this.filter[1].value = 'Unlimitedh';
							} else {
								this.ie = ies.join(',')
								this.filter[1].value = ies.join(',');
							}
						} else {
							this.ie = item.id;
							this.filter[1].value = item.id;
						}
					} else if (dat.name == 2) { //机型
						this.iq = item.id
						this.filter[2].value = item.id;
					} else if (dat.name == 3) { //共享
						this.ih = item.id
						this.filter[3].value = item.id;
					} else if (dat.name == 4) { //出发地
						if(item.id != 'Unlimitedk'){
							let ies = [];
							if(this.iy == 'Unlimitedk'){
								this.iy ='';
							} else {
								ies = this.iy.split(',');
							}
							if(ies.includes(item.id)){//判断是否被选中
								for(let k = ies.length;k>=0;k--){//删除选中
									if(ies[k] == item.id){
										ies.splice(k,1);
									}
								}
								
							} else {
								ies.push(item.id);
							}
							if(ies.length == 0){//当航司被删完后，赋值成不限
								this.iy = 'Unlimitedk';
								this.filter[4].value = 'Unlimitedk';
							} else {
								this.iy = ies.join(',')
								this.filter[4].value = ies.join(',');
							}
						} else {
							this.iy = item.id;
							this.filter[4].value = item.id;
						}
					} else if (dat.name == 5) { //到达地
						if(item.id != 'Unlimitedj'){
							let ies = [];
							if(this.iu == 'Unlimitedj'){
								this.iu ='';
							} else {
								ies = this.iu.split(',');
							}
							if(ies.includes(item.id)){//判断是否被选中
								for(let k = ies.length;k>=0;k--){//删除选中
									if(ies[k] == item.id){
										ies.splice(k,1);
									}
								}
								if(ies.length == 0){//当航司被删完后，赋值成不限
									this.iu = 'Unlimitedj';
									this.filter[5].value = 'Unlimitedj';
								}
							} else {
								ies.push(item.id);
							}
							
							this.iu = ies.join(',')
							this.filter[5].value = ies.join(',');
						} else {
							this.iu = item.id;
							this.filter[5].value = item.id;
						}
					}
				}
			},
			Airports(item, index) {
				this.iy = item.id;
			},
			Arrive(item, index) {
				this.iu = item.id;
			}
		}
	}
</script>

<style lang="scss" scoped>

	.pop_up {
		width: 600upx;
		height: 300upx;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-top: -150upx;
		/* 高度的一半 */
		margin-left: -300upx;
		/* 宽度的一半 */
		z-index: 999;
		background: #FFFFFF;

		.business {
			width: 100%;
			font-size: 30upx;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			margin-bottom: 20upx;
			color: #73828f;
			border-bottom: 1upx solid #C0C0C0;
		}

		.discounts {
			font-size: 30upx;
			padding-top: 10upx;
			text-indent: 40upx;
			color: #78879d;

			span {
				color: red;
			}
		}
	}

	.mian {
		width: 100vw;
		min-height: 100vh;

		.White {
			width: 20upx;
			height: 100%;
			position: absolute;
			top: 0;
			right: 0;
			background: #FFFFFF;
		}

		.top {
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1000;
			// display:flex;
			// justify-content: space-around;
			background: #ffffff;

			.heaven {
				width: 100%;
			}

			.outward_voyage {
				width: 100%;
				margin-top: 50upx;
				display: flex;
				justify-content: flex-start;

				.outward_voyage_name {
					color:$uni-color-primary;
					font-size: 20upx;
					margin-left: 20upx;
					text-align: center;
					border:$uni-color-primary solid 1upx;
				}

				.please_choose {
					text-indent: 100upx;
					color: #abb7c2;
				}
			}
		}

		.air_ticket {
			width: 100%;
			.wei {
				margin-top: 200upx;
				/*  #ifdef  APP-PLUS || MP-WEIXIN */
				margin-top: 260upx;
				/*  #endif  */
				width: 100%;
				padding-bottom: 100upx;
				.tiaklistImg{
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					.gjImg{
						width: 100%;
						height: 100vh;
					}
					.noData{
						width: 346upx;
						height: 386upx;
						margin-top: 200upx;
					}
					.rblcok{
						width:160upx;
						height: 60upx;
						border: 1px solid #007aff;
						color: #666;
						text-align: center;
						line-height: 60upx;
						border-radius: 8upx;
						font-size: 20upx;
						margin-top: 20upx;
					}
				}
				.kong {
					text-align: center;
					margin-top: 50%;
				}
				.share-box {
					width: 100%;
					height: 100%;
					position: fixed;
					top: 0upx;
					left: 0upx;
					bottom: 0upx;
					right:0upx;
					background-color: rgba(0, 0, 0, 0.4);
					transition: .3s;
					z-index: 777;
				}
				
				// 进入分享动画
				.share-show {
					transition: all 0.3s ease;
					transform: translateY(0%) !important;
				}
				
				// 离开分享动画
				.share-item {
					position: fixed;
					left: 0;
					bottom: 0;
					width: 100%;
					height: auto;
					background-color: #FFFFFF;
					transition: all 0.3s ease;
					transform: translateY(100%);
					z-index: 888;
					border-top-left-radius: 20upx;
					border-top-right-radius: 20upx;
					.choice {
						display: flex;

						// background: #FFFFFF;
						.left_choice {
							width: 200upx;
							height: 610upx;
							font-size: 26upx;
							color: #afb4c1;
							background: #eeeeee;

							._choice {
								height: 100upx;
								line-height: 100upx;
								text-indent: 20upx;
							}

							.icheds {
								height: 100upx;
								line-height: 100upx;
								text-indent: 20upx;
								color: $uni-color-primary;
								background: #FFFFFF;
							}
						}

						.right_choice {
							margin-left: 20upx;
							width: 500upx;
							height: 610upx;
							font-size: 26upx;

							.take {
								width: 100%;
								height: 100upx;
								line-height: 100upx;
								display: flex;
								justify-content: space-between;
								text-indent: 20upx;
								color: #9aa3ae;
								border-bottom: 2upx solid #C0C0C0;
							}
							.takes{
								color: $uni-color-primary;
							}
							.tackss {
								width: 100%;
								text-indent: 20upx;

								.airportsty {
									margin-top: 30upx;
									line-height: 100upx;
									border-bottom: 2upx solid #C0C0C0;
									color: #b9c3cc;

								}
							}
						}
					}

					.share {
						width: 100%;
						display: flex;
						border-top-left-radius: 15px;
						border-top-right-radius: 15px;
						height: 90upx;
						line-height: 90upx;
						justify-content: space-around;
						background: #eeeeee;
						font-size: 28upx;
						color: #333333;
						.cancel{
							color: $uni-color-primary;
						}
					}

				}

				.ticket {
					width: calc(100% - 40upx);
					padding: 30upx 10upx;
					text-indent: 10upx;
					background: #FFFFFF;
					margin: 0 10upx;
					margin-bottom: 20upx;
					border-radius: 15upx;
					box-shadow: 0 4upx 8upx rgba(221, 221, 221, 0.5);
					.above {
						// width: 100%;
						display: flex;
						padding:  0 20upx;
						.airticket {
							width: 78%;
							.airtts{
								display: flex;
								justify-content: space-between;
								.airfons{
									font-size: 40upx;
									color: #333333;
									font-weight: 600;
									span{
										font-size: 22upx;
										color: #007AFF;
									}
								}
								.airticketimg{
									width: 140upx;
									position: relative;
									image{
										width: 100upx;
										height: 15upx;
										margin: 0 20upx;
									}
									view{
										color: #007aff;
										font-size: 20upx;
										position: absolute;
										left:65upx;
										top:15upx;
										background: white;
										width: 70upx;
									}
								}
								.travel_time {
									width: 50%;
									.travfomts{
										font-size: 24upx;
										color: #333333;
										line-height: 50upx;
									}
									.arrclass{
										position: relative;
										span{
											position: absolute;
											right: -30upx;
											top: 2upx;
											color:#007AFF;
											font-size: 20upx;
										}
									}
									
								}
							}
							
						}

						.price {
							color: #FFA63E;
							font-size: 40upx;
							width: 22%;
							text-indent: 0;
							// padding-right: 30upx;
							text-align: right;

							// background: $uni-color-primary;
							.discountjia {
								color: #666666;
								overflow: hidden;
								font-size: 22upx;
								// padding-right: 10upx;
								// text-align: right;
								// background: red;
							}
						}

						.lowpro {
							width: 71upx;
							height: 40upx;
							margin-top: 10upx;
							color:$uni-color-primary;
							font-size: 26upx;
							margin-left: 50upx;
						}

						.low {
							width: 70upx;
							height: 40upx;
							margin-top: 10upx;
							color:$uni-color-primary;
							font-size: 26upx;
							margin-left: 50upx;
							border:$uni-color-primary solid 1upx;
						}
					}

					.airport {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding:0 20upx;
						width: calc(100% - 40upx);
						margin-left: 10upx;
						color: #666666;
						.stsbt {
							display: flex;
							position: relative;
							font-size: 22upx;
							.stasb {
								color: red;
								width: 40upx;
								height: 40upx;
								line-height: 40upx;
								border-radius: 50%;
								// border: 1upx solid red;
								// width: 35upx;
								// height: 35upx;
								display: flex;
								justify-content: center;
								align-items: center;
								font-size: 20upx;
							}

							.stass {
								color: #0BC071;
								border-radius: 50%;
								font-size: 20upx;
								display: flex;
								justify-content: center;
								align-items: center;
							}
						}

						image {
							width: 30upx;
							height: 30upx;
						}
					}

					.ting {
						// width: 250upx;
						font-size: 22upx;
						margin-right: 10upx;
						text-align: right;
						color: #0BC071;
						background: #FFFFFF;
					}
				}
			}
		}
		
		.tail {
			width: 100%;
			height: 100upx;
			display: flex;
			justify-content: space-around;
			position: fixed;
			bottom: 0;
			left: 0;
			border-top: 1upx solid #edf0f5;
			background: #FFFFFF;

			.tabbar_item {
				width: 30%;
				height: 80upx;
				margin-top: 10upx;
				color: #bfc3cd;
				text-align: center;
				font-size: 20upx;
			}

			.iched {
				color: #007aff;
			}

		}
	}
</style>
