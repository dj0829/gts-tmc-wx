<template>
	<!-- 城市选择 -->
	<view class="select-city-wrap">
		<loading>
		</loading>
		<headnavigation titles="选择目的地"></headnavigation>
		<view class="input-op">
			<view class="input-lis" v-if="isShowCommentPanel">
				<view class="iconfont" style="color: #9a9a9c;">&#xe6a2;</view>
				<input v-model="ser_int"  :focus="firstFocus"   type="text" value="" @input="searcht($event)" class="input-css" :placeholder="placeh" />
				<view v-if="trim(ser_int)" class="iconfont" @click="sea_null" style="color: #C0C0C0;">&#xe641;</view>
			</view>
		</view>
		<view class="sear_list" v-if="sev_boolt">
			<view v-if="trim(ser_int)" class="okis" @click="oksibl">确定</view>
			<view class="se_mai" v-for="(item,index) in sec_lists" :key="index" @click="onSelect(item,0)">
				<view class="se_lists" v-if="succ_type == 'Hotel'">
					<view class="se_lists_l">
						<view class="se_img">
							<image :src="item.imgUrl" mode=""></image>
						</view>
						<view class="se_label">
							<view class="se_liname" v-if="item.label !=null && item.label != ''" v-html="item.label">
							</view>
							<view class="se_liname" v-else>
								{{item.name}}
							</view>
							<view class="se_titis">
								{{item.address}}
							</view>
						</view>
					</view>
					<view class="se_lists_r">
						{{hoty(item.type)}}
					</view>
				</view>
				<view class="citylist" style="text-indent: 30upx;" v-else>{{item.name}}</view>
			</view>
		</view>
		<view class="select-city">
			<view class="index" v-if="succ_type != 'Hotel' || (succ_type == 'Hotel' && sta == 'left')">
				<view class="index-items" @click="scrollTo('#')">定位热门</view>
				<view class="index-item" v-for="item in citys" :key="item.letter" @click="scrollTo(item.letter)">{{item.letter}}</view>
			</view>
			<view class="index-iocs" v-if="id_ic">
				{{id_ti}}
			</view>
			
			<scroll-view v-if="succ_type != 'Hotel' || (succ_type == 'Hotel' && sta == 'left')" :scroll-into-view="scrollIntoId" :scroll-y="true" :scroll-with-animation="true" :style="{height:windowHeight}">
				<view class="content">
					<view class="section" id="hot" v-if="hotCitys.length">
						<view class="city-title">热门城市</view>
						<view class="city-list">
							<view class="city-item" :class="{active: city.ts}" v-for="(city, i) in hotCitys" :key="i" @click="onSelect(city, 0)">{{city.name}}</view>
						</view>
					</view>
					<view class="section" :id="item.letter" v-for="(item) in citys" :key="item.letter">
						<view class="letter">{{item.letter}}</view>
						<view class="city-list">
							<view class="city-item" :class="{active: city.ts}" v-for="(city,index) in item.list" :key="index"
							 @click="onSelect(city,0)">{{city.name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="select-city" v-if="succ_type == 'Hotel' && sta == 'right'">
			<!-- 历史搜索 -->
			<view class="hitlist" v-if="hitorylist.length > 0">
				<view class="hitlinames">
					<view class="hitnaleft">
						历史搜索
					</view>
					<view class="hitnaright" @click="clearhistoy">
						清空
					</view>
				</view>
				<view class="hitlists">
					<view class="hitlistad" v-for="(item,index) in hitorylist" @click="histytobk(item)" :key="index">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="section" v-for="(item,index) in stlist" :key="index">
				<view class="city-title">{{item.name}}</view>
				<view class="city-list" :class="{'ovf-clss': item.isclk}">
					<view class="city-item" :class="{active: lisWxHotels === city}" v-for="(city, i) in item.list" :key="i" @click="onSelect(city, 0 ,item,[item.isclk,index,i])">
						<text v-if="item.list.length < 7">{{city}}</text>
						<text v-else-if="item.isclk == false && item.list.length > 6 && i != item.list.length -1">{{city}}</text>
						<text v-else-if="item.isclk && item.list.length > 6 && i != 5">{{city}}</text>
						<text class="iconfont"  v-else-if="i == 5  && item.isclk && item.list.length > 6">{{city}}</text>
						<text class="iconfont"  v-else-if="i == item.list.length -1 && item.isclk == false && item.list.length > 6">{{city}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tork from "@/api/torowk.js"
	import train from './train.js'
	import hotel from './hotel.js'
	import py from "@/static/js/vue-py.js"
	import {mapState} from 'vuex';
	import airports from './airports.js'
	export default {
		data() {
			return {
				isShowCommentPanel:false,
				sdata:0,
				wx_Hotel:'',//酒店城市
				lisWxHotels:'',//酒店地址
				deptCity:{name:'',id:''},//出发城市
				arrivCity:{name:'',id:''},//到达城市
				placeh:'',
				htocity: '',
				sec_list:[],
				sec_lists:[],
				stlist:[],
				hotCitys: [],
				citys: [],
				windowHeight: '',
				scrollIntoId: 'F',
				id_ic: false,
				id_ti: '',
				ser_int: '',
				sta: '',
				sev_boolt: false,
				succ_type: "Planeticket",
				copuas: [],
				typeys:'',
				lslt: false,
				hitorylist:[],//历史记录
				firstFocus:false,
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			this.sta = option.sta;//左右边
			this.succ_type = option.type
			let types = this.succ_type;//类型：机场、城市
			let list = []
			this.typeys = option.types;
			this.sdata = option.sdata;//页面id
			this.cits();
			if(types == "Hotel"){//酒店
				this.placeh = '城市名/位置/地点';
				if(option.sta == 'left'){
					if (option.list != ''){
						list = option.list;
						for (let i = 0; i < this.citys.length; i++) {
							for (let k = 0; k < this.citys[i].list.length; k++) {
								if(this.citys[i].list[k].name == list){
									this.citys[i].list[k].ts = true
								}
							}
						}
						for (let i = 0; i < this.hotCitys.length; i++) {
							if(this.hotCitys[i].name == list){
								this.hotCitys[i].ts = true
							}
						}
					}
				} else {
					this.wx_Hotel = option.list;
					this.lisWxHotels = option.wx_hotels;//酒店地址
					this.lslt = true;
				}
			} else if(types == "Planeticket"){ //飞机
				this.placeh = '深圳 / shenzhen / sz';
				if(option.list.length > 3){
					list = JSON.parse(option.list);
					if(list[0].name.length > 1){
						this.deptCity = list[0];
						this.arrivCity = list[1];
						
						for (let i = 0; i < this.citys.length; i++) {
							for (let k = 0; k < this.citys[i].list.length; k++) {
								if(option.sta == 'left' && this.citys[i].list[k].name == list[0].name || option.sta == 'right' &&this.citys[i].list[k].name == list[1].name){
									this.citys[i].list[k].ts = true
								}
							}
						}
						for (let i = 0; i < this.hotCitys.length; i++) {
							if(option.sta == 'left' && this.hotCitys[i].name == list[0].name ||option.sta == 'right'&& this.hotCitys[i].name == list[1].name){
								this.hotCitys[i].ts = true
							}
						}
					}
				} 
			} else if(types == "Train"){ //火车
				this.placeh = '输入城市名称';
				if(option.list.length>0){
					list = JSON.parse(option.list);
					this.deptCity = list[0];
					this.arrivCity = list[1];
					for (let i = 0; i < this.citys.length; i++) {
						for (let k = 0; k < this.citys[i].list.length; k++) {
							if(option.sta == 'left' && this.citys[i].list[k].name == list[0].name || option.sta == 'right' && this.citys[i].list[k].name == list[1].name){
								this.citys[i].list[k].ts = true
							}
						}
					}
					for (let i = 0; i < this.hotCitys.length; i++) {
						if(option.sta == 'left' && this.hotCitys[i].name == list[0].name || option.sta == 'right' && this.hotCitys[i].name == list[1].name){
							this.hotCitys[i].ts = true
						}
					}
				}
			}
		},
		mounted() {
			this.getSystemInfo();
			if(this.lslt){
				this.st_right_list();//获取酒店详情
			}
			let sut = uni.getStorageSync("majorhitorylist" + uni.getStorageSync('appWxId'));//历史记录
			this.hitorylist = [];
			if (sut) {
				if(this.succ_type == 'Hotel' && this.sta == 'right'){//酒店的搜索历史记录 根据选择的城市过滤出来
					let dat = sut.planethitorylist;//酒店详情搜索历史数据
					let hitory = [];
					for(let k in dat){
						if(dat[k].city == this.wx_Hotel){//去当前城市下的历史记录
							hitory.push(dat[k])
						}
					}
					this.hitorylist = hitory;
				}
			} else {
				this.hitorylist = [];
			}
		},
		methods: {
			clearhistoy(){//清除历史记录
				this.hitorylist = [];
				uni.removeStorageSync("majorhitorylist"+ uni.getStorageSync('appWxId'));//清空缓存
			},
			 /**
			 * 1:酒店
			 * 2：行政区
			 * 3：地铁站
			 * 4：商圈
			 * 5：机场/火车站
			 * 6：地标
			 */
			hoty(ty){
				if(ty == 1){
					return '酒店'
				} else if(ty == 2){
					return '行政区'
				} else if(ty == 3){
					return '地铁站'
				} else if(ty == 4){
					return '商圈'
				} else if(ty == 5){
					return '机场/火车站'
				} else if(ty == 6){
					return '地标'
				} else if(ty == 0){
					return '市县级'
				}
			},
			oksibl(){//确定搜索框的值
				this.listshitoy('keyword',0,this.ser_int);//选择输入框的值默认当前关键字
				uni.$emit('wx_Hotel_Ais',{type:'keyword',id:0,data:this.ser_int,ts:this.sdata});
				this.toBlock();
			},
			gleklist(num){
				if(num >= 0){
					this.stlist[num].isclk = true;
					this.stlist[num].list.splice(5,0, '\ue8a4');
				} else {
					let ulist = this.stlist
					for (let i = 0; i < ulist.length; i++) {
						if(ulist[i].list.length > 6){
							for (let k = 0; k < ulist[i].list.length; k++) {
								if(k == 5){
									ulist[i].isclk = true
									ulist[i].list.splice(5,0, '\ue8a4');
								}
							}
						}
					}
					this.stlist = ulist
				}
			},
			async st_right_list(){//回显酒店信息
				let that = this;
				try{
					const res = await tork.getCityDetail({'cityCode': that.wx_Hotel});
					if(res.code == 200){
						if(res.data.cityArea != null){
							that.stlist.push({
								name: '行政区',
								type:'position',
								id: 1,
								isclk: false,//打开还是关闭
								oken: false,//是否超过6个
								list:res.data.cityArea//值
							})
						}
						if(res.data.cityAirRailWay != null){
							that.stlist.push({
								type:'position',
								name: '机场车站',
								id: 2,
								isclk: false,//打开还是关闭
								oken: false,//是否超过6个
								list:res.data.cityAirRailWay//值
							})
						}
						if(res.data.cityBusinessSectionInfo != null){
							that.stlist.push({
								name: '商圈',
								type:'position',
								id: 3,
								isclk: false,//打开还是关闭
								oken: false,//是否超过6个
								list:res.data.cityBusinessSectionInfo//值
							})
						}
						if(res.data.citySubWay != null){
							that.stlist.push({
								name: '地铁',
								type:'position',
								id: 4,
								isclk: false,//打开还是关闭
								oken: false,//是否超过6个
								list:res.data.citySubWay//值
							})
						}
						if(res.data.hotelBrands != null){
							that.stlist.push({
								type:'brand',
								name: '品牌',
								id: 5,
								isclk: false,//打开还是关闭
								oken: false,//是否超过6个
								list:that.hotelb(res.data.hotelBrands)//值
							})
						}
						
						// 
						that.gleklist(-1);
					}
				}catch(e){
					console.log(e)
					
				}
				
			},
			hotelb(item){//返回商圈的值
				let su = []
				for (var i = 0; i < item.length; i++) {
					su.push(item[i].hotelBrandName)
				}
				return su
			},
			cits(){//回显城市列表
				let cts = this.succ_type
				let address = [];
				let hotaddress = [];
				if(cts == "Planeticket"){
					address = airports.addressAirportAll;//所有城市
					hotaddress = airports.addressAirportHot;//热门城市
				} else if(cts == "Train"){
					address = train.addressTrainAll;//所有城市
					hotaddress = train.addressTrainHot;//热门城市
				} else if(cts == "Hotel"){
					address = hotel.addressTrainAll;//所有城市
					hotaddress = hotel.addressTrainHot;//热门城市
				}
				let count1 = 0
				let ct = []
				for (let i = 65; i < 91; i++) {
					ct[count1] = {
						letter: String.fromCharCode(i),
						list: []
					}
					count1++
				}
				if(cts == "Planeticket"){
					for (let i = 0; i < address.length; i++) {
						let sts = address[i].cityCName; //获取城市名称
						let pys = address[i].cityEName.substring(0,1);//获取改城市的首字母
						for (var k = 0; k < ct.length; k++) {
							if(pys == ct[k].letter){
								ct[k].list.push({
									name: sts,
									ts: false,
									id: address[i].airportCode
								})
							}
						}
					}
					for (let i = 0; i < hotaddress.length; i++) {
						this.hotCitys.push({
							name: hotaddress[i].cityCName,
							ts: false,
							id: hotaddress[i].airportCode
						})
					}
				} else if(cts == "Train" || cts == "Hotel"){
					for (let i = 0; i < address.length; i++) {
						let sts = address[i].name; //获取城市名称
						let pys = py.chineseToPinYin(address[i].name).substring(0,1);//获取改城市的首字母
						for (var k = 0; k < ct.length; k++) {
							if(pys == ct[k].letter){
								ct[k].list.push({
									name: sts,
									ts: false,
									id: address[i].code
								})
							}
						}
					}
					for (let i = 0; i < hotaddress.length; i++) {
						this.hotCitys.push({
							name: hotaddress[i].name,
							ts: false,
							id: hotaddress[i].code
						})
					}
				}
				this.citys = ct
			},
			shou_clik(va, num , ns){ //关闭打开 、上面还是下面 、 下标
				let _this = this;
				if(_this.stlist[num].list.length < 7){
					return false
				} else {
					if(va == true){
						if(ns != 5){
							return false
						} else {
							_this.stlist[num].isclk = false;
							_this.stlist[num].list.splice(5,1);
							_this.stlist[num].list.push('\ue609');
							return true
						}
					} else {
						if(ns != _this.stlist[num].list.length-1){
							return false
						} else {
							_this.stlist[num].list.splice(_this.stlist[num].list.length-1,1);
							_this.gleklist(num);
							return true
						}
					}
				}
			},
			getSystemInfo() {
				let that = this;
				that.firstFocus = false; // 每次都要初始化 focus 属性
				that.isShowCommentPanel = true;
				setTimeout(() => {
					that.firstFocus = true; // this.secondFocus 是第二个文本框的 focus 属性。
				}, 100)
				uni.getSystemInfo().then(res => {
					let [error, data] = res
					that.windowHeight = `${data.windowHeight}px`
				})
			},
			scrollTo(letter) {
				let _this = this
				_this.scrollIntoId = letter === '#' ? 'hot' : letter
				_this.id_ti = letter === '#' ? '热门' : letter
				_this.id_ic = true
				setTimeout(function(){
					_this.id_ic = false;
				},1000)
			},
			onSelect(city,opname,item,arr) { //选中城市后页面返回
				let _this = this
				_this.sev_boolt = false;
				if(_this.succ_type == 'Hotel'){
					if(_this.sta == 'left'){
						_this.on_bloks(city,item,opname);//酒店城市选择
					} else if(_this.sta == 'right'){
						if(arr == '' || arr == undefined){ //判断是否点击的酒店地址隐藏
							_this.on_blok(city,item,opname)
						} else {
							if(!_this.shou_clik(arr[0],arr[1],arr[2])){
								_this.on_blok(city,item,opname);
							}
						}
					}
				} else {
					if(_this.sta == 'left'){//判断是出发还是到达
						_this.deptCity = {
							name:city.name,
							id:city.id
						}
					} else {
						_this.arrivCity = {
							name:city.name,
							id:city.id
						}
					}
					if(_this.succ_type == "Planeticket"){//修改值
						uni.$emit('Busirticket_add',{name:'Planeticket',data:[_this.deptCity,_this.arrivCity]});
					} else if(_this.succ_type == "Train"){
						uni.$emit('Busirticket_add',{name:'Train',data:[_this.deptCity,_this.arrivCity]});
					}
					this.toBlock();
				} 
			},
			histytobk(item){//酒店历史搜索选择
				uni.$emit('wx_Hotel_Ais',{type:item.type,id:item.id,data:item.name,ts:this.sdata});
				this.toBlock();
			},
			on_blok(city,item,opname){//酒店选择
				if(this.ser_int != '' && this.sta == 'right' && this.succ_type == 'Hotel'){//选择的搜索内容
					if(city.type == 1){//酒店
						this.listshitoy('keyword',0,city.name);
						uni.$emit('wx_Hotel_Ais',{type:'keyword',id:0,data:city.name,ts:this.sdata});
					} else if(city.type== 2){//行政区
						this.listshitoy('position',1,city.name);
						uni.$emit('wx_Hotel_Ais',{type:'position',id:1,data:city.name,ts:this.sdata});
					} else if(city.type== 3){//地铁站
						this.listshitoy('position',4,city.name);
						uni.$emit('wx_Hotel_Ais',{type:'position',id:4,data:city.name,ts:this.sdata});
					} else if(city.type== 4){//商圈
						this.listshitoy('position',3,city.name);
						uni.$emit('wx_Hotel_Ais',{type:'position',id:3,data:city.name,ts:this.sdata});
					} else if(city.type== 5){//机场/火车站
						this.listshitoy('position',2,city.name);
						uni.$emit('wx_Hotel_Ais',{type:'position',id:2,data:city.name,ts:this.sdata});
					} else if(city.type== 6){//地标
						this.listshitoy('keyword',city.location.lng +',' +city.location.lat,city.name);
						uni.$emit('wx_Hotel_Ais',{type:'keyword',id:city.location.lng +',' +city.location.lat,data:city.name,ts:this.sdata});
					}
				} else {//选择下面
					this.listshitoy(item.type,item.id,city);
					uni.$emit('wx_Hotel_Ais',{type:item.type,id:item.id,data:city,ts:this.sdata});
				}
				this.toBlock();
			},
			on_bloks(city){//酒店城市选择
				if(this.ser_int != '' && this.sta == 'left' && this.succ_type == 'Hotel'){//选择的搜索内容
					if(city.type == 0){//市县级
						uni.$emit('Busirticket_add',{name:'Hotel',data:{
							type:'city',
							city:{
								id:city.id,
								name:city.name
							}
						}})
					} else if(city.type== 2){//行政区
						uni.$emit('Busirticket_add',{name:'Hotel',data:{
							type:'position',
							city:{
								id:city.id,
								name:city.city
							},
							id:1,
							data:city.name//行政区名称
						}})
					}
				} else {//选择下面
					uni.$emit('Busirticket_add',{name:'Hotel',data:{
						type:'city',
						city:{
							id:city.id,
							name:city.name
						}
					}})
					
				}
				this.toBlock();
			},
			listshitoy(type,id,value) { //插入历史城市
				let list;
				if (this.sta == 'right' && this.succ_type == 'Hotel') {
					list = uni.getStorageSync("majorhitorylist" + uni.getStorageSync('appWxId'));
					if (list.planethitorylist && list.planethitorylist.length > 0) {//判断酒店搜索是否有历史记录
						for (let k in list.planethitorylist) {
							if (list.planethitorylist[k].name == value && this.wx_Hotel == list.planethitorylist[k].city) {//相同城市 相同地址 则删除
								list.planethitorylist.splice(k, 1);
							}
						}
						if (list.planethitorylist.length > 9) {
							list.planethitorylist.splice(9, 1);
						}
						list.planethitorylist.unshift({
							city:this.wx_Hotel,//城市
							type: type,//值类型
							id: id,//值id   地标为经纬度
							name: value,//名称
						})
					} else {
						list = {};
						list['planethitorylist'] = [{
							city:this.wx_Hotel,//城市
							type: type,//值类型
							id: id,//值id   地标为经纬度
							name: value,//名称
						}]
					}
					uni.setStorageSync("majorhitorylist" + uni.getStorageSync('appWxId'), list);
				}
				
			},
			trim(ev){//判断是否有值
				if(ev.trim().length>0){
					return true; 
				} else {
					return false;
				}
			},
			async searcht(ev){ //监听搜索的值
				let _this = this
				let va = ev.mp.detail.value.trim() //获取搜索框的值
				if(va.length > 0){
					let dat = [];
					this.sec_lists = [];
					_this.sev_boolt = true
					if(this.succ_type == 'Hotel' || this.succ_type == 'Train'){
						if(this.succ_type == 'Hotel'){
							if(this.sta == 'right' && this.succ_type == 'Hotel'){//搜索酒店关键字
								try{
									let res = await tork.getCityNames({
										cityName: _this.wx_Hotel,
										keyword: va
									})
									if(res.code == 200){
										let dat = res.data;
										_this.sec_lists = [];
										for (let i in dat) {//赋值到页面
											_this.sec_lists.push(dat[i])
										}
									}
								}catch(e){
									console.log(e)
									
								}
							} else {
								try{
									let res = await tork.getCityName({
										cityName: va,
									})
									if(res.code == 200){
										let dat = res.data;
										_this.sec_lists = [];
										for (let i in dat) {//赋值到页面
											_this.sec_lists.push(dat[i])
										}
									}
								}catch(e){
									console.log(e)
									
								}
							}
						} else {
							dat = train.addressTrainAll;
							for (let i in dat) {
								if(dat[i].name.indexOf(va) != -1 || dat[i].abbreviation.indexOf(va) != -1 || dat[i].code.indexOf(va) != -1 ){
									this.sec_lists.push({
										id:dat[i].code,
										name:dat[i].name,
										ts:false
									})
								}
							}
						}
						
					} else {
						dat = airports.addressAirportAll;
						for (let i in dat) {
							if(dat[i].airportCName.indexOf(va) != -1 || dat[i].airportCode.indexOf(va) != -1 || dat[i].cityCName.indexOf(va) != -1 || dat[i].cityFirstSpell.indexOf(va) != -1 || dat[i].citySpell.indexOf(va) != -1 ){
								this.sec_lists.push({
									id:dat[i].airportCode,
									name:dat[i].airportCName,
									ts:false
								})
							}
						}		
					}
				} else{
					_this.sev_boolt = false
				}
			},
			sea_null(){//清空搜索的值
				this.ser_int = '';
				this.sev_boolt = false;
			},
		}
	}
</script>

<style>
	page{
		background-color: #edf0f5;
	}
</style>
<style lang="scss" scoped>
	
	.select-city-wrap {
		position: relative;
		width: 100%;
		padding-bottom: 150upx;
		.input-op {
			width: calc(100% - 40upx);
			height: 80upx;
			padding: 15upx 20upx;
			background: #FFFFFF;
			.input-lis {
				display: flex;
				align-items: center;
				// justify-content: space-between;
				position: relative;
				padding: 0 15upx;
				width: calc(100% - 40upx);
				height: 80upx;
				background: #edf0f5;
				border-radius: 5upx;
				.input-css {
					width: 70%;
					font-size: 30upx;
					height: 60upx;
					margin-left: 20upx;
				}
				
			}
		}
		
		.sear_list{
			position: absolute;
			left: 0;
			top: 185upx;
			/*  #ifdef  APP-PLUS || MP-WEIXIN */ 
			top: 235upx;
			/*  #endif  */
			background: #FFFFFF;
			z-index: 999;
			width: 100%;
			height: 100%;
			text-indent: 15upx;
			.okis{
				position: fixed;
				width: 80%;
				left: 10%;
				bottom: 5%;
				line-height: 80upx;
				text-align: center;
				background:$uni-color-primary;
				color: #FFFFFF;
				font-size: 34upx;
				border-radius: 80upx;
			}
			.se_mai{
				font-size: 35upx;
				border-bottom: 2upx solid #e1e1e1;
				.se_li{
					display: flex;
					border-top: 1upx solid #eef0ef;
				}
				.se_fath{
					display: flex;
				}
				.se_lu{
					font-size: 25upx;
					color: #C8C7CC;
				}
				.se_lists{
					width:calc(100% - 80upx);
					padding:  0 40upx;
					display: flex;
					align-content: center;
					justify-content: space-between;
					font-size: 30upx;
					color: #333333;
					.se_lists_l{
						display: flex;
						align-items: center;
						width: 80%;
						.se_img{
							width: 40upx;
							display: flex;
							align-items: center;
							justify-content: center;
							image{
								width: 40upx;
								height: 40upx;
							}
						}
						.se_label{
							display: flex;
							 flex-direction: column;
							 justify-content: center;
							 line-height: 50upx;
							 text-indent: 20upx;
							.se_liname{
								width: calc(100%- 40upx);
								overflow: hidden;
								text-overflow: ellipsis; //文本溢出显示省略号
								white-space: nowrap; //文本不会换行
							}
							.se_titis{
								line-height: 40upx;
								font-size: 22upx;
								color: #999999;
								width: calc(100%- 40upx);
								overflow: hidden;
								text-overflow: ellipsis; //文本溢出显示省略号
								white-space: nowrap; //文本不会换行
							}
						}
						
						
					}
					.se_lists_r{
						display: flex;
						align-items: center;
						font-size: 28upx;
						color: #C0C0C0;
					}
				}
				.citylist{
					color: #333333;
					line-height: 80upx;
				}
			}
		}
		.btok{
			position: fixed;
			bottom: 40upx;
			left: 50upx;
			text-align: center;
			width: calc(100% - 100upx);
			height: 90upx;
			font-size: 36upx;
			line-height: 90upx;
			color: #FFFFFF;
			background: $uni-color-primary;
			border-radius: 90upx;
		}
		.select-city {
			.hitlist{
				padding: 30upx 30upx;
				.hitlinames{
					width: 100%;
					line-height: 40upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #949494;
					font-size: 28upx;
					.hitnaleft{
						
					}
					.hitnaright{
						color: #007AFF;
					}
				}
				.hitlists{
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					.hitlistad{
						color: #333333;
						font-size: 26upx;
						padding: 0 20upx;
						line-height: 50upx;
						background-color: #FFFFFF;
						border-radius: 50upx;
						margin-right: 10upx;
						margin-top: 20upx;
					}
				}
				
			}
			.citsarry{
				position: relative;
				width: 100%;
				min-height: 90upx;
				background: #FFFFFF;
				.no_city{
					text-indent: 50upx;
					color: red;
					font-size: 25upx;
					line-height: 90upx;
				}
				.cits_ok{
					width: 80%;
					margin:  0 10%;
					height: 90upx;
					display: flex;
					.cits_hds{
						flex: 1;
						display: flex;
						justify-content: center;
						align-items: center;
					}
					.cits_hd{
						flex: 2;
						display: flex;
						justify-content: center;
						align-items: center;
						position: relative;
						.close_hd{
							position: absolute;
							right: 10upx;
							top: 20upx;
						}
						.boxs{
							width: 100%;
							height: 60upx;
							font-size: 30upx;
							text-align: center;
							overflow: hidden;
							text-overflow: ellipsis; //文本溢出显示省略号
							white-space: nowrap; //文本不会换行
							line-height: 60upx;
							color: #FFFFFF;
							background: $uni-color-primary;
							border-radius: 10upx;
						}
						.ts_bod{
							color: #999999;
							font-size: 25upx;
						}
					}
				}
				.citydel{
					width: 90%;
					margin-left: 5%;
					font-size: 28upx;
					color: red;
				}
			}
			.index {
				position: fixed;
				right: 0;
				top: 180upx;
				z-index: 998;
				color: #949494;
				font-size: 26upx;
				.index-items {
					width: 70upx;
					height: 65upx;
					text-align: center;
				}
		
				.index-item {
					width: 70upx;
					height: 42upx;
					line-height: 42upx;
					text-align: center;
				}
			}
		
			.index-iocs {
				position: fixed;
				z-index: 999;
				color: #FFFFFF;
				font-size: 80upx;
				margin-top: -100upx;
				top: 50%;
				margin-left: -100upx;
				left: 50%;
				opacity: 0.7;
				text-align: center;
				line-height: 200upx;
				width: 200upx;
				height: 200upx;
				border-radius: 50%;
				background: #999999;
			}
			.section {
				margin-top: 20upx;
				.city-title {
					line-height: 60upx;
					color: #949494;
					font-size: 28upx;
					text-indent: 30upx;
				}
		
				.letter {
					width: 100%;
					height: 44upx;
					text-indent: 30upx;
					color: #434c51;
					background-color: #ffffff;
					font-size: 28upx;
					line-height: 44upx;
				}
		
				.city-list {
					display: flex;
					flex-wrap: wrap;
					padding: 30upx 0 0 28upx;
		
					.city-item {
						width: 215upx;
						height: 80upx;
						margin-right: 25upx;
						margin-bottom: 25upx;
						line-height: 80upx;
						text-align: center;
						border-radius: 6upx;
						background: #FFFFFF;
						color: #1e2c39;
						font-size: 30upx;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						&.active {
							background-color: $uni-color-primary;
							color: #ffffff;
						}
					}
				}
				.ovf-clss{
					height: 205upx;
					overflow: hidden;
				}
			}
		}
	}
</style>
