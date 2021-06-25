<template>
	<view class="hotselet">
		<loading>
		</loading>
		<view class="hot_topst" :class="scrollTops ? 'hot_topstscllol':''">
			<view class="Navigations">
				<view class="smtis">
					<view @click="rblcok" class="iconfont" style="color: #000000;margin-left: 20upx;">&#xe61e;</view>
				</view>
				<view class="ongbutns">
					<view class="onleft">
						<calendar @change="lischang" currentlist="Hotel" :isretun="isretun" :ishtoel="ishtoel"
							:singleDate="singleDate" :startDate="startDate" :endDate="endDate"></calendar>
					</view>
					<view class="onright">
						<input class="orvlues" disabled v-model="sevalie" @click="selist">
						</input>
						<view class="iconfont" style="color: #C8C7CC;" v-if="sevalie != '关键词/位置/酒店名'" @click="delets">
							&#xe641;
						</view>
					</view>
				</view>
				<view class="smtis">
				</view>
			</view>
			<view class="sel_coi" :class="isindex == -1  ? 'sel_cois':''" >
				<view class="se_list" @click="seclick(item,index)" v-for="(item,index) in screen" :key="index">
					<view class="se_nlis" :class="index == isindex || screenks(index) ? 'se_okli':''">
						<view class="se_lname">{{item.name}}</view>
						<image v-if="index == isindex" src="@/static/img/home/hottop.png" mode=""></image>
						<image v-else-if="screenks(index)" src="@/static/img/home/hottops.png" mode=""></image>
						<image v-else src="@/static/img/home/hotbott.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view :class="{'share-box': isre_one}" @touchmove.stop.prevent="moveStop" @click="isreclik">
		</view>
		<view class="share-items" :class="{'share-shows': isre_one}">
			<view class="recommended">
				<view v-if="isindex == 0">
					<view class="recommendedlist" v-for="(item,index) in  recommended" @click="reclokc(item)" :class="reconaid == item.id ? 'posits':''" :key="index" :style="index ==recommended.length -1 ? {border:0}:''">
						<view>
							{{item.name}}
						</view>
						<view class="iconfont" v-if="reconaid == item.id">&#xe620;</view>
					</view>
				</view>
				<view v-if="isindex == 1">
					<view class="restst">
						<view class="restitle">
							价格区间
						</view>
						<view class="htolevel">
							<view class="htlist" @click="ckprice(item,index)" v-for="(item,index) in hotprice"
								:class="hotpriceid == item.id ? 'ischekc':''" :key="index">
								{{item.name}}
							</view>
						</view>
					</view>
					<view class="restst">
						<view class="restitle">
							星级
						</view>
						<view class="htolevel">
							<view class="htlist" @click="ckleve(item,index)" v-for="(item,index) in hotlevel"
								:class="isckleve(item,index) ? 'ischekc':''" :key="index">
								<view class="iconfont" style="font-size: 30upx;">&#xe629;</view>
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
				<view v-if="isindex == 2" >
					<view class="position_ops">
						<view class="position-op-le">
							<view class="posi-lists" :class="index == isposit ? 'posi-lists-ok':''" @click="ispositCk(index)" v-for="(item,index) in stlist" v-if="index != stlist.length - 1" :key="index">
								<view v-if="index == positionInx" class="posi_o"></view><view :class="index == positionInx ? 'posi_os':''">{{item.name}}</view>
							</view>
						</view>
						<view class="position-op-ri">
							<view class="position-op-ri-li" v-for="(item,indexs) in stlist[isposit].list" @click="positionCk(item)" :class="positionVal == item && positionInx == isposit ? 'position-op-ri-lis':''" :key="indexs">
								<view>{{item}}</view>
								<view v-if="positionVal == item && positionInx == isposit" class="iconfont">&#xe620;</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="isindex == 3" class="brandlist">
					<view class="barndlist">
						<view class="barndlist-li" v-for="(item,index) in stlist[stlist.length -1].list" @click="brandCks(item)" :key="index" :class="brandlists.includes(item) ? 'actives':''">
							{{item}}
						</view>
					</view>
				</view>
				<view class="btnleve" v-if="isindex != 0 && isindex != -1">
					<view class="btnlev_left" @click="btclone(isindex)">
						恢复默认
					</view>
					<view class="btnlev_right" @click="btnselec(isindex)">
						确认
					</view>
				</view>
			</view>
		</view>
		<view class="hotclicks" @click="hotisMaps()" v-if="hotellist.length > 0">
			<image v-if="hotmaps" src="@/static/img/home/hot_ord.png" mode=""></image>
			<image v-if="!hotmaps" src="@/static/img/home/hot_map.png" mode=""></image>
		</view>
		<view class="hotBox" id='hotlists' :class="!hotmaps? 'hotBox-show':''" :style=" {height:screenHeightsMaps + 'px'}"  >
			<view class="hotelist"  v-if="hotellist!=undefined && hotellist.length > 0" >
				<view class="hotels" v-for="(item,index) in hotellist" @click.stop="selectlist(item,index)" :key=index>
					<view class="hotleft">
						<image v-if="item.titleImg == ''" src="@/static/img/hotel-small-img2.jpg" mode=""></image>
						<image v-else :src="item.titleImg" mode=""></image>
					</view>
					<view class="hotright">
						<view class="titles">
							{{item.resName}}
						</view>
						<view class="address" v-if="item.distanceTxt != null">
							{{item.distanceTxt}}
						</view>
						<view class="address" v-else>
							地址：{{item.address}}
						</view>
						<!-- <view class="address">
							距离：{{item.resPosition}}
						</view> -->
						<view class="intros">
							简介：{{item.intro}}
						</view>
						<view class="money">
							<view class="resGrades">
								<view v-for="(items,index) in item.resGr" :key="index">
									<view class="iconfont" style="font-size: 30upx;">
										&#xe63e;
									</view>
								</view>
							</view>
							<view class="resGradest">
								<view class="monsle">
									￥
								</view>
								{{item.minPrice}}
								<view class="mosrig">
									起
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="hotelist" v-else>
				<image class="gjImg" v-if="imgFlag" src="@/static/img/m_ticketList.png" mode=""></image>
				<image class="noData" v-else src="@/static/img/noData.png" mode="widthFix"></image>
				<div class="rblcok" v-if="!imgFlag" @click="rblcok">重新搜索</div>
			</view>
			<view @click="addlistsearch" v-if="totalPatge > 1" class="addlist">
				加载更多
			</view>
		</view>
		<view class="hotmaps" v-if="ismapshow">
			<map id="midMap" :include-points="include_points" class="carmap" :latitude="latitude" :longitude="longitude"
				:scale="scale" :style=" {width: '100%',height: screenHeights + 'px'}" :markers="markers"
				:show-location="true"
				@regionchange="regionchange" @callouttap="markertaps">
			</map>
			<view class="maphotel">
				<Tabs :TabList="maplistdata" :currentTab="currents" @tabs="tabsChange">
					<TabPane v-for="(item,index) in maplistdata" :key="index">
						<view class="hotels" style="border: 0;" @click="selectlist(item)">
							<view class="hotleft">
								<image v-if="item.titleImg == ''" src="@/static/img/hotel-small-img2.jpg" mode="">
								</image>
								<image v-else :src="item.titleImg" mode=""></image>
							</view>
							<view class="hotright">
								<view class="titles" style="line-height: 60upx;">
									{{item.resName}}
								</view>
								<view class="address" v-if="item.distanceTxt != null">
									{{item.distanceTxt}}
								</view>
								<view class="address" v-else>
									地址：{{item.address}}
								</view>
								<view class="intros">
									简介：{{item.intro}}
								</view>
								<view class="money">
									<view class="resGrades">
										<view v-for="(items,index) in item.resGr" :key="index">
											<view class="iconfont" style="font-size: 30upx;">
												&#xe63e;
											</view>
										</view>
									</view>
									<view class="resGradest" style="font-size: 45upx;">
										<view class="monsle">
											￥
										</view>
										{{item.minPrice}}
										<view class="mosrig">
											起
										</view>
									</view>
								</view>
							</view>
						</view>
		
					</TabPane>
				</Tabs>
			</view>
		</view>
	</view>
</template>

<script>
	let appMap = null;
	import Tabs from '@/components/tabmaps/tabs.vue'
	import TabPane from '@/components/tabmaps/tabPane.vue'
	import {
		mapState
	} from 'vuex';
	import tork from "@/api/torowk.js"
	import calendar from '@/components/view/book/date-picker/date-picker.vue'; //日期
	export default {
		components: {
			calendar,
			Tabs,
			TabPane
		},
		data() {
			return {
				scrollTops:false,//是否滚动了页面
				ismapshow:false,//是否展示地图
				maplistdata:[],//当前地图展示数据
				brandlists:[],//选中的品牌
				positionInx:-1,//当前选中位置筛选的下标
				positionVal:'',//位置值
				isposit:0,//位置筛选默认选中下标
				starts:0,//开始滑动的坐标
				mapshow:false,
				holistshow:false,//是否显示数据
				currents: 0,
				screenHeights: 1000, //地图高度
				scale: 11, //缩放大小
				longitude: '', //经度
				latitude: '', //纬都
				include_points: [], //根据坐标缩放地图大小
				markers: [], //标注
				hotmaps: false,//是否是地图
				ctyslit: '',
				seisno: false,
				isretun: false,
				selistval: [],
				imgFlag: true,
				hotpriceid:-1,//当前选中价格排序
				hotprice:[{
					id:0,
					name: '￥150以下',
					value: {
						priceFrom: 0,
						priceTo: 150
					}
				}, {
					id:1,
					name: '￥150-300',
					value: {
						priceFrom: 150,
						priceTo: 300
					}
				}, {
					id:2,
					name: '￥300-450',
					value: {
						priceFrom: 300,
						priceTo: 450
					}
				}, {
					id:3,
					name: '￥450-600',
					value: {
						priceFrom: 450,
						priceTo: 600
					}
				}, {
					id:4,
					name: '￥600-800',
					value: {
						priceFrom: 600,
						priceTo: 800
					}
				}, {
					id:5,
					name: '￥800以上',
					value: {
						priceFrom: 600,
						priceTo: 999999
					}
				}],
				hotlevel: [{
					id: '-1',
					name: '不限'
				}, {
					id: '27',
					name: '二星及以下'
				},{
					id: '26',
					name: '三星/舒适'
				}, {
					id: '24',
					name: '四星/高档'
				}, {
					id: '23',
					name: '五星/豪华'
				}],
				reconaid: '', //推荐排序
				isre_two: false,
				isre_one: false,
				recommended: [{ //排序类型
					id: 'bookTimes_asc',
					name: '推荐排序'
				}, {
					id: 'minPrice_asc',
					name: '价格从高到低'
				}, {
					id: 'minPrice_desc',
					name: '价格从低到高'
				}, {
					id: 'resGrade_asc',
					name: '酒店星级从高到低'
				}, {
					id: 'resGrade_desc',
					name: '酒店星级从低到高'
				}],
				screen: [{
					id: 1,
					name: '推荐排序'
				}, {
					id: 2,
					name: '价格/星级'
				}, {
					id: 3,
					name: '位置/距离'
				}, {
					id: 4,
					name: '酒店品牌'
				}],
				cityid: '',
				cityids: '',
				totalPatge: 0,
				loadingType: 0,
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				sevalie: '关键词/位置/酒店名',
				current: '',
				citys: [],
				ishtoel: 'hotel',
				singleDate: false,
				startDate: '',
				endDate: '',
				stlist: [],
				hotellist: [],
				page: 1,
				searchHotelType: "",
				butalist: '',
				itemdata: {},
				isindex: -1,
				levecllist: [],
				levst: [], //星级
				priceFromTo: [], //价格
				clickIn: 0, //当前点击的下标
				ifone_show: true, //是否第一次展示
				screenHeightsMaps:0,//列表高度
			}
		},
		onReady(options) {
			// #ifdef APP-PLUS || MP-WEIXIN
			this.screenHeights = uni.getSystemInfoSync().screenHeight; //减去上面部分高度
			this.screenHeightsMaps = uni.getSystemInfoSync().screenHeight - 105; //减去上面部分高度
			//#endif
			// #ifdef  H5
			this.screenHeights = uni.getSystemInfoSync().windowHeight; //windowHeight浏览器高度
			this.screenHeightsMaps = uni.getSystemInfoSync().windowHeight - 70; //windowHeight浏览器高度
			//#endif
			appMap = uni.createMapContext('midMap', this);
		},
		mounted() {
			if (this.itemdata.isblcks == 1) {
				this.isretun = true
			}
		},
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			this.search(1);
		},
		// onReachBottom: function() {
		// 	let that = this;
		// 	if (that.timer != null) {
		// 		clearTimeout(that.timer);
		// 	}
		// 	that.timer = setTimeout(function() {
		// 		that.search(2);
		// 	}, 300);
		// },
		computed: {
			...mapState([
				'mapad',//地图移动开始跟结束
				'se_doubletimel',
				'se_doubletimer', //往返时间
			])
		},
		onLoad(items) {
			this.itemdata = JSON.parse(items.data);
			let item = this.itemdata;
			this.hotmaps = item.map == 2 ? true:false;
			let cty = item.city.name.split(',')[0];//城市信息
			this.cityid = cty; //城市
			let ctyIds = item.city.id.split(',');
			if(item.citys.name != ''){//是否有关键字
				this.longitude = '';
				this.latitude = '';
				if(item.citys.type == 'position'){//位置
					this.positionInx = item.citys.id - 1;
					this.isposit = item.citys.id - 1;
					this.positionVal = item.citys.name;
					this.seposiVal(this.positionInx,this.positionVal,this.cityid);
				} else if(item.citys.type == 'keyword'){//关键词
					this.cityids = item.citys.name;
					let db = [];
					if(item.citys.id != 0){ //判断搜索的是地标 还是酒店
						db = item.citys.id.split(',');
					} else {
						this.longitude = '';
						this.latitude = '';
					}
					if(db.length > 1){//判断是不是地标
						this.longitude = db[0];
						this.latitude = db[1];
					}
					this.search(1);
				} else if(item.citys.type == 'brand'){//品牌
					this.brandlists = [item.citys.name];
					this.screen[3].name = item.citys.name;
					this.search(1);
				}
				this.sevalie = item.citys.name;//输入框值
			} else {
				if(ctyIds.length > 1){//判断是否有 使用定位
					this.longitude = ctyIds[0];
					this.latitude = ctyIds[1];
					this.cityids = item.city.name.split(',')[1];
					this.sevalie = item.city.name.split(',')[1];
				}
				this.search(1);
			}
			
			this.startDate = item.se_doubletimel; //开始时间
			this.endDate = item.se_doubletimer; //结束时间
			this.butalist = item.butalist; //人员
		},
		onShow() {
			uni.$on('wx_Hotel_Ais',(res)=>{
				if(res.ts == 1){
					if(res.type == 'position'){//位置
						this.positionInx = res.id - 1;
						this.isposit = res.id - 1;
						this.positionVal = res.data;
						this.cityids = '';
						this.screen[2].name = res.data;
						this.seposiVal(this.positionInx,this.positionVal,this.cityid)
					} else if(res.type == 'keyword'){//关键词
						this.cityids = res.data;
						let db = [];
						if(res.id != 0){ //判断是否是地标  酒店id没有逗号
							db = res.id.split(',');
						} else {
							this.longitude = '';
							this.latitude = '';
						}
						if(db.length > 1){//判断是不是地标
							this.longitude = db[0];
							this.latitude = db[1];
						}
						this.search(1);
					} else if(res.type == 'brand'){//品牌
						this.brandlists = [res.data];
						this.search(1);
					}
					this.sevalie = res.data;//输入框值
				}
				uni.$off('wx_Hotel_Ais')
			})
		},
		methods: {
			addlistsearch(){//加载更多
				this.search(2);
			},
			distances(log,lat){//计算两个点之间的距离
				if(this.longitude !='' && this.latitude !=''){
					let st = this.utils.distances(this.latitude,this.longitude,lat,log);
					if(st != 0){
						return '距离' + this.distanceName + (this.utils.distances(this.latitude,this.longitude,lat,log)).toFixed(1) + '公里';
					}
				}
			},
			async seposiVal(inx,name,city){//获取地铁，机场车站的经 == 1纬度
				if(inx == 1 ||inx == 3){//机场车站   地铁
					let tys = '';
					if (inx == 1) { //机场车站
						tys = '飞机场,火车站,公交车站'
					} else {
						tys = '地铁站'
					}
					try{
						let dats = {
							region:city,
							keyword: name,
							get_subpois:1,
							filter: 'category=' +tys
						}
						let res = await tork.placesuggestion(dats);
						let locst = res.data[0].location;
						this.longitude = locst.lng;
						this.latitude = locst.lat;
						this.search(1);
					}catch(err){
						console.log(err)
					}	
				} else {
					this.longitude = '';
					this.latitude = '';
					this.search(1);
				}
			},
			screenks(ind){//是否有选中的值 0排序  1价格星级 2位置 3品牌
				if(ind == 0){
					if(this.reconaid != ''){
						return true
					} else {
						return false
					}
				} else if(ind == 1){
					if(this.levecllist.length >0 || this.priceFromTo.length > 0){
						return true
					} else {
						return false
					}
				} else if(ind == 2){
					if(this.positionVal != ''){
						return true
					} else {
						return false
					}
				} else if(ind == 3){
					if(this.brandlists.length > 0){
						return true
					} else {
						return false
					}
				}
			},
			brandCks(its){//点击添加或者删除品牌
				if(this.brandlists.includes(its)){
					 this.brandlists.splice(this.brandlists.findIndex(item => item === its), 1)
				} else {
					this.brandlists.push(its);
				}
			},
			positionCk(its){//选中位置筛选右边值
				if(this.positionVal == its){
					this.positionVal = '';
					this.positionInx = -1;
				} else {
					this.positionVal = its;
					this.positionInx = this.isposit;//当前选中的位置 左边的下标
				}
			},
			ispositCk(ins){//选中位置筛选左边
				this.isposit = ins;
			},
			// touchstarts(e){
			//     this.starts = e.touches[0].clientY;
			// },
			// touchends(e){//向下滑动
			//     let end = e.changedTouches[0].clientY;
			//     if(end-this.starts>100){
			// 		this.hotisMaps();
			//     }
			// },
			moveStop(){//阻止遮罩滚动穿透
				return
			},
			hotisMaps(){//点击切换
				this.hotmaps = !this.hotmaps;
			},
			tabsChange(index) { //酒店左右滑动
				this.currents = index; //酒店下标
				this.clickIn = index; //地图选中下标
				this.maplistshow();
			},
			markertaps(su) { //获取当前点击的下标
				this.clickIn = su.detail.markerId; //id
				this.currents = this.clickIn;
				this.maplistshow(); //重新绘制地图
			},
			maplistshow() { //展示酒店数据地图
				let that = this;
				let su = this.maplistdata; //酒店数据
				let mark = [];
				let inclsu = []; //所有坐标
				that.markers = [];
				for (let k = 0; k < su.length; k++) {
					if(su[k].lat != null && k != that.clickIn){
						mark.push({
							id: k,
							latitude: su[k].lat,
							longitude: su[k].lon,
							iconPath: '/static/img/home/map_hotel.png',
							width: 1, //图标大小
							height: 1,
							callout: {
								content: '￥' + su[k].minPrice,
								color: k == that.clickIn ? "#ffffff":"#FA6803",
								fontSize: 14,
								bgColor: k == that.clickIn ? "#FA6803":"#ffffff",
								display: 'ALWAYS',
								padding: 12,
								borderRadius: 5
							},
							// anchor: { x: 0.05, y: 0.8 } //图标偏移位置
						})
						inclsu.push({
							latitude: su[k].lat,
							longitude: su[k].lon
						})
					}
				}
				mark.push({
					id: that.clickIn,
					latitude: su[that.clickIn].lat,
					longitude: su[that.clickIn].lon,
					iconPath: '/static/img/home/map_hotel.png',
					width: 1, //图标大小
					height: 1,
					callout: {
						content: '￥' + su[that.clickIn].minPrice,
						color: "#ffffff",
						fontSize: 14,
						bgColor: "#FA6803",
						display: 'ALWAYS',
						padding: 12,
						borderRadius: 5
					},
				})
				inclsu.push({
					latitude: su[that.clickIn].lat,
					longitude: su[that.clickIn].lon
				})
				// if (this.ifone_show == true) { //是否根据坐标缩放地图
					// that.scale = 18;
					that.include_points = inclsu;
				// 	this.ifone_show = false;
				// }
				that.markers = mark; //地图展示内容
				if(that.markers.length > 0){
					this.ismapshow = true;
				}	
			},
			regionchange() {//监听地图移动
				// let _that = this;
				// appMap.getCenterLocation({ //获取当前坐标
				// 	type: 'gcj02',
				// 	success: function(res) {
				// 		if(_that.holistshow){
				// 			if(_that.mapad == 1){
				// 				_that.$store.commit("mapad_add", 2)
				// 			} else {
				// 				_that.longitude = res.longitude.toString(); //经度
				// 				_that.latitude = res.latitude.toString(); //纬都
				// 				if(_that.holistshow){
				// 					_that.search(1);
				// 				}
				// 				_that.$store.commit("mapad_add", 1)
				// 			}
				// 		}
				// 		_that.holistshow = true;
				// 	}
				// });
			},
			async search_h(ev) { //监听酒店搜索的值
				let _this = this
				let va = _this.ctyslit.trim() //获取搜索框的值
				if (va.length > 0) {

					try {
						let res = await tork.getCityNames({
							cityName: _this.cityid,
							keyword: va
						})

						if (res.code == 200) {
							let dat = res.data;
							_this.selistval = [];
							let vist = true;
							for (let i in dat) { //赋值到页面
								if (dat[i].name.indexOf(va) != -1) {
									vist = false;
								}
								_this.selistval.push(dat[i]);
							}
							_this.seisno = vist;
							_this.sevest = true;
						}
					} catch (e) {
						console.log(e)

					}
				} else {
					_this.sevest = false;
				}
			},
			trim(ev) { //判断是否有值
				if (ev.trim().length > 0) {
					return true;
				} else {
					return false;
				}
			},
			selvlist(it) {
				if (it.length == 0) {
					return [this.hotlevel[0].id]
				} else {
					let strit = it.join(',');
					return [strit]
				}
			},
			btnselec(its) { //确认 1星级价格筛选 2位置  3品牌 
				this.isreclik();
				if(its == 1){
					let str = [];
					if (this.hotpriceid == -1) {
						this.priceFromTo = [];
					} else {
						this.priceFromTo = [{
							priceFrom: this.hotprice[this.hotpriceid].value.priceFrom,
							priceTo: this.hotprice[this.hotpriceid].value.priceTo
						}]
						str.push(this.hotprice[this.hotpriceid].name);//获取被选中的价格中文
					}
					
					for (let j in this.levecllist) {//获取被选中星级的中文
						for (let k in this.hotlevel) {
							if(this.hotlevel[k].id == this.levecllist[j]){
								str.push(this.hotlevel[k].name)
							}
						}
					}
					this.screen[1].name = str.join(',');//修改页面参数
					if(str == ''){
						this.screen[1].name = '价格/星级';
					}
					this.search(1);
				} else if(its == 2){//位置值
					if(this.positionVal == ''){
						this.screen[2].name = '位置/距离';
					} else {
						this.screen[2].name = this.positionVal;//修改页面参数
					}
					this.cityids = '';
					this.sevalie = '关键词/位置/酒店名';//清空搜索关键字
					this.seposiVal(this.positionInx,this.positionVal,this.cityid)
				} else if(its == 3){//选中的品牌
					if(this.brandlists.join(',') == ''){
						this.screen[3].name = '酒店品牌';
					} else {
						this.screen[3].name = this.brandlists.join(',');//修改页面参数
					}
					this.search(1);
				}
			},
			btclone(its) { //1星级价格筛选恢复默认 3品牌恢复默认
				let that = this;
				this.hotpriceid = -1;
				if(its == 1){
					this.screen[1].name = '价格/星级';
					this.levecllist = [];
					this.priceFromTo = [];
				} else if(its == 2){
					this.screen[2].name = '位置/距离';
					this.positionInx = -1;//当前选中位置筛选的下标
					this.isposit = 0;//位置筛选默认选中下标
					this.positionVal = '';
					this.longitude = '';
					this.latitude = '';
				}else if(its == 3){
					for (let k in this.brandlists) {
						if(this.brandlists[k] == this.sevalie){
							this.sevalie = '';
						}
					}
					this.screen[3].name = '酒店品牌';
					this.brandlists = [];
				}
				setTimeout(()=>{
					that.isreclik();
					that.search(1);
				},500)
			},
			isckleve(item, index) { //判断是否选中当前
				let it = this.levecllist;
				if (index == 0 && it.length == 0) {
					return true
				} else {
					for (var i = 0; i < it.length; i++) {
						if (it[i] == item.id) {
							return true
						}
					}
				}
			},
			ckprice(item,index){//选中价格
				if(item.id == this.hotpriceid){
					this.hotpriceid = -1;
				} else {
					this.hotpriceid = item.id;
				}
			},
			ckleve(item, index) { //点击酒店星级筛选
				let it = this.levecllist;
				if (index == 0) {
					this.levecllist = []
				} else {
					let leve = this.levecllist;
					let st = false
					for (var i = 0; i < leve.length; i++) {
						if (leve[i] == item.id) {
							st = true;
							this.levecllist.splice(i, 1)
						}
					}
					if (!st) {
						this.levecllist.push(item.id)
					}
				}
			},
			seclick(item, index) { //点击当前排序筛选.
				let that = this;
				if(that.stlist.length == 0){
					return
				}
				if(this.isindex == index){//点击当前打开的
					if (this.isre_one == true) {
						this.close_iser();
					} else {
						this.isreclik();
						this.isre_one = true;
						this.isindex = index;
					}
				} else {
					this.isre_one = false;
					setTimeout(()=>{
						this.isre_one = true;
						this.isindex = index;
					},300)
				}
			},
			close_iser(){//关闭排序筛选
				this.isre_one = false;
				this.isindex = -1;
			},
			reclokc(item) { //选择筛选排序
				this.reconaid = item.id;
				this.screen[0].name = item.name;
				this.isreclik();
				this.search(1);
			},
			isreclik() { //关闭所有筛选
				this.isindex = -1;
				this.isre_one = false;
			},
			selectlist(item,index) { //点击详情
				this.itemdata['hotelCode'] = item.id;
				this.itemdata['searchHotelType'] = this.searchHotelType;
				uni.navigateTo({
					url: './hotellist/hotrllist?data=' + JSON.stringify(this.itemdata)+'&xx='+this.hotellist[index].resGr
				})
			},
			async search(num) { //第一次加载
				let that = this;
				if(num == 1){
					that.hotellist = [];
					that.page = 1;
				} else {
					if (that.page > that.totalPatge) {
						return false;
					}
				}
				try {
					let lon_lat = that.utils.qqMapToBMap(this.longitude,this.latitude);//腾讯经纬度转百度
					let datw = {
						lon:lon_lat[0],
						lat:lon_lat[1],
						cityCode: that.cityid,
						keyword: that.cityids,
						begin: that.startDate,
						end: that.endDate,
						pageCount: that.page,
						rowCount: 20,
						orderBy: [this.reconaid],
						searchCondition: {
							brandList:this.brandlists,//品牌
							hotelLevelList: this.selvlist(this.levecllist), //星级
							priceFromToList: this.priceFromTo //价格
						}
					}
					if(this.cityids != ''){
						this.positionInx == -1;//恢复位置默认值
						this.screen[2].name = '位置/距离';
						this.isposit = 0;//位置筛选默认选中下标
						this.positionVal = '';
					}
					if(this.positionInx != -1){
						if(this.positionInx == 0){//行政区
							datw['sectionName'] = this.positionVal;
						} else if(this.positionInx == 1){//机场车站
							datw['airRailWay'] = this.positionVal;
						} else if(this.positionInx == 2){//商圈
							datw['businessSectionInfo'] = this.positionVal;
						} else if(this.positionInx == 3){//地铁
							datw['subWay'] = this.positionVal;
						}
					}
					const res = await tork.sortHotelList(datw); //获取酒店列表

					if (res.code == 200) {
						that.page++; //得到数据之后page+1
						that.searchHotelType = res.data.searchHotelType;
						that.totalPatge = res.data.totalPatge; //总共多少页
						let das = res.data.responseResult;
						
						for (let i in das) {
							if(das[i].lon !=null && das[i].lat != null){ //判断经纬度不能为空
								let lon_lats = that.utils.bMapToQQMap(das[i].lon,das[i].lat);//百度地图转腾讯经纬度
								das[i].lon = lon_lats[0];
								das[i].lat = lon_lats[1];
							}
							das[i]['resGr'] = that.resGrade(das[i].resGrade);
						}
						that.maplistdata = das;
						if(num == 1){
							that.hotellist = das;
						} else {
							that.hotellist = that.hotellist.concat(das);
						}
						if(that.maplistdata.length > 0){
							if(that.longitude == ''){
								that.longitude = that.hotellist[0].lon;
								that.latitude = that.hotellist[0].lat;
							}
							that.maplistshow();
						}
						if (that.hotellist.length < 1) {
							this.showToasts("没有合适的酒店信息")
							this.imgFlag = false
						} else {
							this.mapshow = true;
						}
						if(this.stlist.length == 0){
							that.st_right_list();
						}
					}
				} catch (e) {
					console.log(e)

				}

			},
			resGrade(item) {
				if (['37', '32', '34'].includes(item)) {
					return 2
				} else if (['26', '31'].includes(item)) {
					return 3
				} else if (['24', '30'].includes(item)) {
					return 4
				} else if (['23', '28'].includes(item)) {
					return 5
				} else {
					return 1
				}
			},
			callback() {

			},
			async st_right_list() { //回显酒店信息
				let that = this;
				if (that.stlist.length > 0) {
					that.isShow_H5 = true;
				} else {
					try {
						const res = await tork.getCityDetail({
							'cityCode': that.cityid
						});
						if (res.code == 200) {
							that.stlist = [];
							if(res.data.cityArea != null){
								that.stlist.push({
									name: '行政区',
									id: 1,
									isclk: false, //打开还是关闭
									oken: false, //是否超过6个
									list: res.data.cityArea //值
								})
							}
							if(res.data.cityArea != null){
								that.stlist.push({
									name: '行政区',
									id: 1,
									isclk: false, //打开还是关闭
									oken: false, //是否超过6个
									list: res.data.cityArea //值
								})
							}
							if(res.data.cityAirRailWay != null){
								that.stlist.push({
									name: '机场车站',
									id: 2,
									isclk: false, //打开还是关闭
									oken: false, //是否超过6个
									list: res.data.cityAirRailWay //值
								})
							}
							if(res.data.cityBusinessSectionInfo != null){
								that.stlist.push({
									name: '商圈',
									id: 3,
									isclk: false, //打开还是关闭
									oken: false, //是否超过6个
									list: res.data.cityBusinessSectionInfo //值
								})
							}	
							if(res.data.citySubWay != null){
								that.stlist.push({
									name: '地铁',
									id: 4,
									isclk: false, //打开还是关闭
									oken: false, //是否超过6个
									list: res.data.citySubWay //值
								})
							}	
							if(res.data.hotelBrands != null){
								that.stlist.push({
									name: '品牌',
									id: 5,
									isclk: false, //打开还是关闭
									oken: false, //是否超过6个
									list: that.hotelb(res.data.hotelBrands) //值
								})
							}
							
							
						} else {
							this.showToasts(res.message);
						}
					} catch (e) {
						console.log(e)
					}
				}
			},
			hotelb(item) { //返回商圈的值
				let su = []
				for (var i = 0; i < item.length; i++) {
					su.push(item[i].hotelBrandName)
				}
				return su
			},
			
			delets() { //删除当前城市
				if (this.itemdata.isblcks == 1) {
					return
				}
				this.sevalie = '关键词/位置/酒店名';
				this.cityids = '';
				this.btclone(2);//清空位置参数
				
				
			},
			rblcok() {
				this.toBlock();
			},
			selist(ev) {
				uni.navigateTo({
					url: '/pages/book/sselect-city/selectcity?sta=right&type=Hotel&list=' +
						this.cityid + '&sdata=1&wx_hotels=' + this.sevalie
				});
			},
			lischang(item) { //日期
				this.itemdata.se_doubletimel = item.choiceDate[0].re;
				this.itemdata.se_doubletimer = item.choiceDate[1].re;
				this.$store.commit('se_doubletimel_add', item.choiceDate[0])
				this.$store.commit('se_doubletimer_add', item.choiceDate[1])
			}
		}
	}
</script>
<style>
	page{
		background-color: #FFFFFF;
	}
</style>
<style scoped lang="scss">
	$brgk_blue: linear-gradient(to right, #4E92FD 0%, #6E46FE 100%);

	.hotselet {
		position: relative;

		.hotmaps {
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0;
			top:0;
			.maphotel {
				position: fixed;
				width: 100%;
				height: 240upx;
				z-index: 470;
				bottom: 100upx;
			}
		}
		.hotclicks{
			position: fixed;
			z-index: 700;
			right: 20upx;
			bottom: 500upx;
			text-align: center;
			width: 120upx;
			height: 120upx;
			border-radius: 50%;
			image{
				width: 100%;
				height: 100%;
			}
			// box-shadow: 0 2upx 4upx 0 rgba(0, 0, 0, 0.2), 0 3upx 10upx 0 rgba(0, 0, 0, 0.19);
		}
		.hot_topst {
			position: fixed;
			left: 0;
			top: 0;
			/*  #ifdef  APP-PLUS || MP-WEIXIN */
			top: 70upx;
			/*  #endif  */
			width: calc(100% - 40upx);
			margin: 20upx;
			z-index: 999;
			border-radius: 18upx;
			background: #FFFFFF;
			// padding-bottom: 200upx;
			// overflow: hidden;
			.Navigations {
				width: 100%;
				
				height: 90upx;
				display: flex;
				align-items: center;
				.ongbutns {
					width: 75%;
					height: 65upx;
					background: #f1f1f1;
					border-radius: 65upx;
					margin-left: 5%;
					display: flex;

					.onleft {
						width: 35%;
						height: 65upx;
					}

					.onright {
						border-left: 2upx solid #FFFFFF;
						width: 65%;
						height: 65upx;
						display: flex;
						line-height: 65upx;

						.orvlues {
							margin-left: 5%;
							font-size: 30upx;
							width: 80%;
							height: 65upx;
							color: #E5E5E5;
						}
					}
				}
			}

			.sel_coi {
				width: 100%;
				height: 70upx;
				display: flex;
				align-items: center;
				.se_list {
					width: 25%;
					height: 70upx;
					font-size: 26upx;
					color: #333333;
					.se_nlis{
						display: flex;
						height: 70upx;
						align-items: center;
						// justify-content: space-between;
						.se_lname{
							width: 70%;
							text-align: right;
							overflow:hidden; //超出的文本隐藏
							text-overflow:ellipsis; //溢出用省略号显示
							white-space:nowrap; //溢出不换行
						}
						image{
							margin-left: 5upx;
							width: 14upx;
							height: 7upx;
						}
					}
					.se_okli{
						color: #007aff;
					}
				}

			}
			// .sel_cois{
			// 	box-shadow: 4upx 6upx 6upx rgba(165, 194, 231, 0.4);
			// }
		}
		.hot_topstscllol{
			width: 100%;
			margin: 0;
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
		
		// 进入动画
		.share-shows {
			height: 0;
			transition: all 0.3s ease;
			transform: translateY(0%) !important;
		}
		
		// 离开动画
		.share-items {
			position: fixed;
			left: 20upx;
			top: 168upx;
			/*  #ifdef  APP-PLUS || MP-WEIXIN */
			top:238upx;
			/*  #endif  */
			width: calc(100% - 40upx);
			height: auto;
			background-color: #FFFFFF;
			transition: all 0.3s ease;
			transform: translateY(-340%);
			z-index: 888;
			border-radius: 12upx;
			.recommended {
				width: 100%;
				overflow: scroll;
				.restst {
					width: 96%;
					padding: 2%;
					font-size: 35upx;
					.restitle{
						font-size: 30upx;
						line-height: 40upx;
						text-indent: 10upx;
						color: #333333;
						font-weight: 600;
					}
					.htolevel {
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						align-content: space-between;
			
						.htlist {
							font-size: 26upx;
							width: 28.5%;
							margin: 2%;
							height: 70upx;
							display: flex;
							justify-content: center;
							align-items: center;
							color: #333333;
							background-color: #f1f1f1;
							border-radius: 10upx;
						}
			
						.ischekc {
							background-color: #cadbff;
							color: $uni-color-primary;
						}
					}
				}
			
				.btnleve {
					width:calc(100% - 80upx);
					padding:20upx 40upx;
					height: 70upx;
					display: flex;
					text-align: center;
					justify-content: space-between;
					line-height: 70upx;
					font-size: 35upx;
					font-size: 28upx;
					box-shadow: 0upx -2upx 10upx rgba(89,125,172,.4);
					.btnlev_left {
						width: 48%;
						height: 70upx;
						border: 2upx solid #C0C0C0;
						color: #333333;
						border-radius: 10upx;
					}
			
					.btnlev_right {
						width: 48%;
						height: 70upx;
						background: $uni-color-primary;
						color: #FFFFFF;
						border-radius: 10upx;
					}
				}
			
				.recommendedlist {
					width: calc(100% - 80upx);
					font-size: 30upx;
					padding:  0 40upx;
					line-height: 100upx;
					text-align: center;
					border-bottom: 2upx solid #F1F1F1;
					text-align: center;
					position: relative;
					color: #333333;
					font-size: 30upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.posits{
					color: $uni-color-primary;
					.iconfont{
						color: $uni-color-primary;
					}
				}
				.position_ops{
					display: flex;
					.position-op-le{
						width: 30%;
						background-color: #F1F1F1;
						.posi-lists{
							font-size: 30upx;
							line-height: 110upx;
							text-indent: 45upx;
							color: #333333;
							display: flex;
							align-items: center;
							.posi_o{
								width: 15upx;
								height: 15upx;
								border-radius: 50%;
								background-color: #FA6803;
								margin: 0 15upx;
							}
							.posi_os{
								text-indent: 0;
							}
						}
						.posi-lists-ok{
							background-color: #FFFFFF;
							color: #007AFF;
							font-weight: 700;
						}
					}
					.position-op-ri{
						width: 70%;
						height: 1000upx;
						overflow-y: scroll;
						background-color: #FFFFFF;
						.position-op-ri-li{
							font-size: 30upx;
							padding-right: 20upx;
							margin-left: 40upx;
							line-height: 100upx;
							border-bottom: 2upx solid #F1F1F1;
							display: flex;
							align-items: center;
							justify-content: space-between;
							.iconfont{
								font-size: 26upx;
								color: #007AFF;
							}
						}
						.position-op-ri-lis{
							color: #007AFF;
						}
					}
				}
				.brandlist{
					.barndlist{
						display: flex;
						flex-wrap: wrap;
						height: 1000upx;
						overflow-y: scroll;
						padding: 30upx 0 0 25upx;
						.barndlist-li{
							width: calc(33% - 45upx);
							padding: 0 10upx;
							height: 80upx;
							margin-right: 25upx;
							margin-bottom: 25upx;
							line-height: 80upx;
							text-align: center;
							border-radius: 6upx;
							background-color: #F1F1F1;
							color: #1e2c39;
							font-size: 30upx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							border-radius: 10upx;
						}
						.actives {
							background-color: $uni-color-primary;
							color: #ffffff;
						}
					}
				}
			}
		}
		
		.hotBox{
			position: fixed;
			left: 0;
			top: 140upx;
			/*  #ifdef  APP-PLUS || MP-WEIXIN */
			top: 210upx;
			/*  #endif  */
			width: 100%;
			overflow: scroll;
			// height: 100%;
			background: #F1F1F1;
			transition: all 0.3s ease;
			transform: translateY(100%);
			z-index: 555;
		}
		// 进入分享动画
		.hotBox-show {
			position: relative;
			transition: all 0.3s ease;
			transform: translateY(0%) !important;
		}
		.hotelist {
			width: 100%;
			// height: 100vh;
			padding-top: 50upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.gjImg {
				width: 100%;
				height: 100vh;
			}

			.noData {
				width: 346upx;
				height: 386upx;
				margin-top: 200upx;
			}

			.rblcok {
				width: 160upx;
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
		.addlist{
			width: calc(100% - 40upx);
			margin: 20upx;
			height: 80upx;
			line-height: 80upx;
			text-align: center;
			background-color: #e1efff;
			border: 2upx solid #6f9ce6;
			color: #007AFF;
			font-size: 32upx;
			border-radius: 10upx;
		}
		.hotels{
			width:calc(100% - 40upx);
			margin-bottom: 20upx;
			display: flex;
			border-radius: 18upx;
			background-color: #FFFFFF;
			.hotleft{
				width: 30%;
				padding: 20upx 0 20upx 20upx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 8upx;
				}
			}
			.hotright{
				width: calc(70% - 40upx);
				padding: 15upx 10upx 10upx 30upx;
				.titles{
					width: 100%;
					font-size: 33upx;
					line-height: 50upx;
					font-weight: 700;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				.address{
					width: 100%;
					font-size: 26upx;
					line-height: 40upx;
					color: #666666;
				}
				.intros{
					width: 100%;
					font-size: 24upx;
					line-height: 40upx;
					color: #666666;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					line-clamp:1;
					-webkit-box-orient: vertical;
				}
				.money{
					margin-top: 10upx;
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					color: #FA6803;
					.resGrades{
						display: flex;
						margin-bottom: 10upx;
					}
					.resGradest{
						display: flex;
						align-items: center;
						font-size: 42upx;
						color: #FFA63E;
						.monsle{
							font-size: 24upx;
						}
						.mosrig{
							margin-left: 10upx;
							font-size: 24upx;
						}
					}
				}
			}
		}
	}
</style>
