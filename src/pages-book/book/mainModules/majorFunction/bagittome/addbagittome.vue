<template>
	<view class="addbagittome">
		<loading></loading>
		<!-- #ifdef APP-PLUS -->
		<view class="Navigations">
		<!-- #endif -->
		<!-- #ifdef H5 || MP-WEIXIN -->
		<view class="Navigations" :style="{paddingTop:navPaddingTops + 'rpx'}">
		<!-- #endif -->
			<view class="smtisl">
				<view @click="rblcok" class="iconfont" style="color: #FFFFFF;">&#xe61e;</view>
			</view>
			<view class="btn_top">
				<view class="btn_top_bl" :class="btnchend? 'clik':''" @click="itck('left')">
					因公
				</view>
				<view class="btn_top_bl" :class="!btnchend? 'clik':''" @click="itck('right')">
					因私
				</view>
			</view>
			<view class="smtisr" @click="toZC">
				计价规则
			</view>
		</view>
		<view class="boxbgd">
			<view class="bgrd">
				<image src="https://file.feiren.com/gss/public_tms_02.png" mode="">
				</image>
			</view>
			<view class="boxlist" ref="boxlist">
				<view class="box_top">
					<view class="box_top_box" :class="istype == 'pick' ? 'isboxs':''" @click="boxclick('pick')">
						接机
					</view>
					<view class="box_top_box" :class="istype == 'delivery' ? 'isboxs':''" @click="boxclick('delivery')">
						送机
					</view>
					<view class="box_top_box" :class="istype == 'other' ? 'isboxs':''" @click="boxclick('other')">
						其他
					</view>
					<view v-if="istype == 'pick' || istype == 'delivery' " :class="istype == 'pick' ? 'box_pick':'box_delivery'">
					</view>
					<view v-if="istype == 'other' || istype == 'delivery' " :class="istype == 'other' ? 'box_other':'box_deliverys'">
					</view>
				</view>
			</view>
			<view class="box_bottom">
				<view class="bo-citys">
					<view class="bo-lis">
						<view class="navigas" :class="provinceIndex == 0 ? 'navimd':''">
							<picker :range="provinceList" :range-key="'name'" @change="provinceChange($event)">
								<view class="navlist">
									<view class="nav-valus">
										{{ provinceList[this.provinceIndex].name }}
									</view>
									<view class="iconfont">
										&#xe656;
									</view>
								</view>
							</picker>
						</view>
					</view>
					<view class="bo-lis">
						<view class="navigas" :class="cityIndex == 0 ? 'navimd':''">
							<picker :range="cityList" :range-key="'name'" @change="cityChange($event)">
								<view class="navlist">
									<view class="nav-valus">
										{{ cityList[this.cityIndex].name }}
									</view>
									<view class="iconfont">
										&#xe656;
									</view>
								</view>
							</picker>
							
						</view>
					</view>
					<view class="bo-lis">
						<view class="navigas" :class="terminalIndex == 0 ? 'navimd':''">
							<picker :range="terminalList" :range-key="'name'" @change="terminalChange($event)">
								<view class="navlist">
									<view class="nav-valus">
										{{ terminalList[this.terminalIndex].name }}
									</view>
									<view class="iconfont">
										&#xe656;
									</view>
								</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="ravelv">
					<view class="ts">
						<view class="rav_left">航班号</view>
						<view class="ravright">
							<view class="bos">
								<input type="text" placeholder-style="color:#cfcfcf;" v-model="tk_no" placeholder="请输入航班号" value="" />
							</view>
						</view>
					</view>
					<view class="ts">
						<view class="rav_left">目的地址</view>
						<view class="ravright">
							<view class="bos">
								<input type="text" placeholder-style="color:#cfcfcf;" v-model="address" placeholder="请输入目的地" value="" />
							</view>
						</view>
					</view>
					<view class="ts">
						<view class="rav_left">备注</view>
						<view class="ravright">
							<view class="bos">
								<input type="text" placeholder-style="color:#cfcfcf;" v-model="remarks" placeholder="请填写备注信息" value="" />
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="box_bottom box-bts">
				<view class="ravelv">
					<view class="ts">
						<view class="rav_left">收货人</view>
						<view class="ravright">
							<view class="bos">
								<input type="text" placeholder-style="color:#cfcfcf;" v-model="consignee" placeholder="请输入收货人姓名" value="" />
							</view>
						</view>
					</view>
					<view class="ts">
						<view class="rav_left">收货人电话</view>
						<view class="ravright">
							<view class="bos">
								<input type="number" placeholder-style="color:#cfcfcf;" v-model="consignee_phone" placeholder="请输入收货人电话" value="" />
							</view>
						</view>
					</view>
					<view class="ts">
						<view class="rav_left">寄件人</view>
						<view class="ravright">
							<view class="bos">
								<input type="text" placeholder-style="color:#cfcfcf;" v-model="sender" placeholder="请输入寄件人姓名" value="" />
							</view>
						</view>
					</view>
					<view class="ts">
						<view class="rav_left">寄件人电话</view>
						<view class="ravright">
							<view class="bos">
								<input type="number" placeholder-style="color:#cfcfcf;" v-model="sender_phone" placeholder="请输入寄件人电话" value="" />
							</view>
						</view>
					</view>
					<view class="ts">
						<view class="rav_left">预订时间</view>
						<view class="ravright">
							<view class="bos">
								<htimepicker sTime="0" cTime="23" interval="1" @changeTime="changeTime">
									<cover-view slot="pCon" class="changeTime">
										<cover-view class="ctiemns" style="color: #cfcfcf;" v-if="booking_time == ''">
											请选择预订时间
										</cover-view>
										<cover-view class="ctiemns" v-else>
											{{booking_time}}
										</cover-view>
									</cover-view>
								</htimepicker>
							</view>
							<view class="iconfont">&#xe8a3;</view>
						</view>
					</view>
					<view class="ts">
						<view class="rav_left">取件时间</view>
						<view class="ravright">
							<view class="bos">
								<htimepicker sTime="0" cTime="23" interval="1" @changeTime="change_pick_up_time">
									<cover-view slot="pCon" class="changeTime">
										<cover-view style="color: #cfcfcf;" v-if="pick_up_time == ''">
											请选择取件时间
										</cover-view>
										<cover-view v-else>
											{{pick_up_time}}
										</cover-view>
									</cover-view>
								</htimepicker>
							</view>
							<view class="iconfont">&#xe8a3;</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<tabBar v-if="tabisshow" :currentPage="currentPages"></tabBar>
	</view>
</template>

<script>
	import htimepicker from '@/components/h-timePicker/h-timePicker.vue'
	import tabBar from '@/components/view/Navigations.vue'
	export default{
		components:{
			tabBar,
			htimepicker
		},
		data(){
			return{
				pick_up_time:'',//取件时间
				booking_time:'',//预订时间
				sender_phone:'',//寄件人电话
				sender:'',//寄件人
				consignee_phone:'',//收货人电话
				consignee:'',//收货人
				remarks:'',//备注
				address:'',//目的地
				tk_no:'',//航班号
				terminalIndex:0,//当前航站楼下标
				terminalList:[{
					id:0,
					name:'列表项'
				}],//当前城市下的航站楼及其他信息
				cityIndex:0,//当前城市下标
				cityList:[{
					id:0,
					name:'城市'
				}],//当前省份下的城市
				provinceIndex:0,//省份下标
				provinceList:[{
					name:'省份',
					id:0
				}],//省份数据
				istype:'pick',//类型
				navPaddingTops: 0,
				btnchend: true,
				tabisshow:true,
				currentPages: 'Book',
				isbtd:'1',//1因公因私
			}
		},
		mounted() {
			// this.Busirticket = [{
			// 		name: '深圳1',
			// 		id: 'SZX'
			// 	}, {
			// 		name: '北京2',
			// 		id: 'PKX'
			// 	}]; //出差飞机城市
			// #ifdef MP-WEIXIN
			let res = wx.getMenuButtonBoundingClientRect();
			this.navPaddingTops = res.top + res.height - 5;
			// #endif
		
			// 返回值
			// width 	number 	宽度，单位：px
			// height 	number 	高度，单位：px
			// top 	number 	上边界坐标，单位：px
			// right 	number 	右边界坐标，单位：px
			// bottom 	number 	下边界坐标，单位：px
			// left 	number 	左边界坐标，单位：px
			this.serCitys();//查询当前包给我支持的城市信息
		},
		methods:{
			changeTime(time) { //选择预订时间
				this.booking_time = time;
			},
			change_pick_up_time(time){//选择取件时间
				this.pick_up_time = time;
			},
			serCitys(){
				try{
					this.terminalIndex = 0;//当前航站楼下标
					this.terminalList= [{
						id:0,
						name:'列表项'
					}];//当前城市下的航站楼及其他信息
					this.cityIndex = 0;//当前城市下标
					this.cityList = [{
						id:0,
						name:'城市'
					}];//当前省份下的城市
					this.provinceIndex = 0;//省份下标
					this.provinceList = [{//初始化数据
						name:'省份',
						id:0
					}];
					let su = [{//所有省份城市航站楼数据
						id:1,
						name:'湖南省',
						chirld:[{
							id:11,
							name:'长沙',
							chirld:[{
								id:111,
								name:'黄花机场航站楼T1'
							},{
								id:112,
								name:'黄花机场航站楼T2'
							}]
						},{
							id:12,
							name:'岳阳',
							chirld:[{
								id:121,
								name:'三荷机场航站楼T1'
							},{
								id:122,
								name:'三荷机场航站楼T2'
							}]
						}]
						},{
							id:2,
							name:'湖北省',
							chirld:[{
								id:21,
								name:'武汉',
								chirld:[{
									id:211,
									name:'天河国际机场航站楼T1'
								},{
									id:212,
									name:'天河国际机场航站楼T2'
								}]
							},{
								id:22,
								name:'宜昌',
								chirld:[{
									id:221,
									name:'三峡机场航站楼T1'
								},{
									id:222,
									name:'三峡机场航站楼T2'
								}]
							}]
						}]
					this.provinceList = [...this.provinceList,...su];
				}catch(e){
					//TODO handle the exception
				}
			},	
			provinceChange(e) {//选择当前省份
				this.provinceIndex = e.detail.value;
				this.cityIndex = 0;//当前城市下标
				this.cityList = [{
					id:0,
					name:'城市'
				}];
				if(this.provinceIndex != 0){
					this.cityList = [...this.cityList,...this.provinceList[this.provinceIndex].chirld];//当前省份下的城市信息
				}
			},
			cityChange(e) {//选择当前城市
				this.cityIndex = e.detail.value;
				this.terminalIndex = 0;//当前航站楼下标
				this.terminalList= [{
					id:0,
					name:'列表项'
				}];
				if(this.cityIndex != 0){
					this.terminalList =[...this.terminalList,...this.cityList[this.cityIndex].chirld] ;//当前城市下的信息
				}
			},
			terminalChange(e) {//选择当前航站楼及其他信息
				this.terminalIndex = e.detail.value;
				if(this.terminalIndex != 0){
				}
			},
			boxclick(type){//包给我类型
				this.istype = type;
			},
			rblcok() { //返回
				this.toBlock();
			},
			itck(item) {
				if (item == 'left') { //因公因私
					this.btnchend = true;
					this.isbtd = 1;
				} else {
					this.btnchend = false
					this.isbtd = 2
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	$brgk_blue: linear-gradient(to right, #4E92FD 0%, #6E46FE 100%);
	.addbagittome{
		padding-bottom: 110upx;
		.Navigations {
			width: 100%;
			height: 90upx;
			width: 100%;
			/*  #ifdef  APP-PLUS */
			padding-top: 70upx;
			/*  #endif  */
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: $brgk_blue;
		
			.btn_top {
				width: 280upx;
				height: 55upx;
				border-radius: 55upx;
				border: 2upx solid #FFFFFF;
				display: flex;
		
				.btn_top_bl {
					width: 140upx;
					height: 55upx;
					color: #FFFFFF;
					font-size: 35upx;
					line-height: 55upx;
					text-align: center;
					border-radius: 55upx;
					border: 0;
				}
		
				.clik {
					background: #FFFFFF;
					color: #6E46FE;
				}
			}
			.smtisl{
				text-indent: 20upx;
				width: 150upx;
			}
			.smtisr{
				color: #FFFFFF;
				font-size: 28upx;
				width: 150upx;
				text-align: center;
			}
		}
		.boxbgd {
			width: 100%;
			position: relative;
		
			.bgrd {
				width: 100%;
				height: 400upx;
		
				image {
					width: 100%;
					height: 100%;
				}
			}
		
			.boxlist {
				position: absolute;
				top: 311upx;
				left: 30upx;
				width: calc(100% - 60upx);
				padding: 0;
		
				.box_top {
					position: relative;
					font-size: 32upx;
					width: 100%;
					height: 90upx;
					background: rgba(0, 0, 0, 0.5);
					border-top-left-radius: 15upx;
					border-top-right-radius: 15upx;
					display: flex;
					justify-content: space-between;
		
					.box_pick {
						position: absolute;
						width: 3%;
						height: 110upx;
						border-radius: 15upx;
						background: #FFFFFF;
						top: 0;
						left: calc(33% - 13upx);
						transform: rotate(-10deg);
					}
					.box_delivery{
						position: absolute;
						width: 3%;
						height: 110upx;
						border-radius: 15upx;
						background: #FFFFFF;
						top: 0;
						left: calc(66% - 13upx);
						transform: rotate(-10deg);
					}
					.box_deliverys{
						position: absolute;
						width: 3%;
						height: 110upx;
						border-radius: 15upx;
						background: #FFFFFF;
						top: 0;
						left: calc(33% - 5upx);
						transform: rotate(8deg);
					}
					.box_other {
						position: absolute;
						width: 3%;
						height: 110upx;
						border-radius: 15upx;
						background: #FFFFFF;
						top: 0;
						right: calc(33% - 13upx);
						transform: rotate(8deg);
					}
		
					.box_top_box {
						width: 33%;
						height: 90upx;
						line-height: 90upx;
						text-align: center;
						color: #FFFFFF;
						border-top-left-radius: 15upx;
						border-top-right-radius: 15upx;
					}
		
					.isboxs {
						background: #FFFFFF;
						color: #333333;
					}
				}
			}
			.box_bottom {
				width: calc(100% - 60upx);
				margin-left: 30upx;
				background: #FFFFFF;
				padding: 20upx 0 30upx 0;
				border-bottom-left-radius: 15upx;
				border-bottom-right-radius: 15upx;
				color: #333333;
				.bo-citys{
					width: calc(100% - 40upx);
					padding: 0 20upx;
					margin-bottom: 30upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.bo-lis{
						font-size: 30upx;
						width: 28%;
						.navigas{
							.navlist{
								display: flex;
								align-items: center;
								justify-content: space-between;
								.nav-valus{
									width: 80%;
									overflow: hidden;
									text-overflow:ellipsis;
									white-space: nowrap;
								}
								.iconfont{
									font-size: 50upx;
								}
							}
						}
						.navimd{
							color: #C0C0C0;
						}
					}
				}
				.ravelv {
					width: calc(100% - 40upx);
					padding:  0 20upx;
					font-size: 30upx;
					.ts {
						line-height: 90upx;
						display: flex;
				
						.rav_left {
							width: 25%;
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
			.box-bts{
				border-radius: 15upx;
				margin-top: 20upx;
			}
		}
	}
</style>
