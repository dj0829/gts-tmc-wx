<template>
	<view class="container999">
		<headnavigation titles="订单填写"></headnavigation>
		<loading>
		</loading>
		<view class="bjmian">
			<view class="bj"></view>
			<view class="mian" v-if="userlist">
				<view :class="{'share-box': switfals}" @click="isshows">
				</view>
				<view class="share-item" :class="{'share-show': switfals}">
					<view class="isstop">
						<view   v-if="sittext != null && sittext != undefined">
							{{sittext}}
						</view>
						<view @click="isshows" class="iconfont" style="color: #C0C0C0;font-size: 50upx;">
							&#xe641;
						</view>
					</view>
					<view class="isstops">
						<p v-if="stlistad.remark != null"> 1.{{stlistad.remark}}</p>
						<p v-if="stlistad.refundTicketDes != null">2.改签规定：{{stlistad.refundTicketDes}}</p>
						<p v-if="stlistad.signTicketDes != null"> 3.签转规定：{{stlistad.signTicketDes}}</p>
					</view>
				</view>
				<view class="black_mu" @click="isshow" v-if="blac_show"></view>
				<view class="min_mian">
					<view class="message">
						<view class="message_top">
							<view style="display: flex;width: 96%;margin-left: 2%;">
								<view style="width: 95%;display: flex;">
									<!-- <view class="iconfont">&#xe61e;</view> -->
									<view class="dates">
										{{dataOne.flightsts.timelists.re}}
									</view>
									<view class="week">
										周{{dataOne.flightsts.timelists.week}}
									</view>
								</view>
								<view class="imgs" @click="boolase">
									<image v-if="mao" src="@/static/img/home/home_x.png"></image>
									<image v-if="yi" src="@/static/img/home/home_s.png"></image>
								</view>
							</view>
						</view>

						<view class="top" v-if="bool">
							<!-- 机票详情 -->
							<view class="above">
								<!-- 时间地址 -->
								<view class="above_left">
									<view class="go_off">
										{{dataOne.flightsts.departTime}}
									</view>
									<view class="arrival_time" v-if="dataOne.flightsts.departTerminal != null">
										{{dataOne.flightsts.departs}}{{dataOne.flightsts.departTerminal}}
									</view>
									<view class="arrival_time" v-else>
										{{dataOne.flightsts.departs}}
									</view>
								</view>
								<view class="above_centre">
									<view style="color:#007AFF">
										<view style="text-align: center;font-size: 22upx;"
											v-if="dataOne.flightsts.nonstop == true">经停 {{arrivalAirport}}</view>
									</view>
									<view>
										<image src="@/static/img/home/home_fly.png"></image>
									</view>
									<view style="font-size: 20upx;color:#999999">
										{{dataOne.flightsts.flightTime}}
									</view>
								</view>
								<view class="above_right" style="text-align: left;">
									<view class="go_off">
										{{dataOne.flightsts.arriveTime}}
										<span class="tspan" v-if="dataOne.flightsts.isarriveTime == true">+1</span>
									</view>
									<view class="arrival_time" v-if="dataOne.flightsts.arriveTerminal != null">
										{{dataOne.flightsts.arrives}}{{dataOne.flightsts.arriveTerminal}}
									</view>
									<view class="arrival_time" v-else>
										{{dataOne.flightsts.arrives}}
									</view>
								</view>
							</view>
							<view class="stsbt">
								<view class="below" v-if="dataOne.flightsts.planeSize != null">
									<!-- 日期航班 -->
									<image :src="dataOne.flightsts.ims" mode=""></image>
									{{dataOne.flightsts.airlinename}}{{dataOne.flightsts.no}} / {{model(dataOne.flightsts.plane)}}{{dataOne.flightsts.plane}}
									{{dataOne.flightsts.planeSize}}
								</view>
								<view class="below" v-else>
									<!-- 日期航班 -->
									<image :src="dataOne.flightsts.ims" mode=""></image>
									{{dataOne.flightsts.airlinename}}{{dataOne.flightsts.no}}
								</view>
							</view>
						</view>
						<view class="message_bottom">
							<view class="jiage">
								<view class="par" style="display: flex;">
									机票价：￥
									<view v-if="prices != 0">{{prices}}</view>
									<view v-else>{{dataOne.shippingSpace.price}}</view>
								</view>+
								<view class="fuel" style="display: flex;">
									机建/燃油：￥{{dataOne.flightsts.taxFee}}/￥{{dataOne.flightsts.fuelFee}}
								</view>
								<view class="changing" @click="ctlist">
									查看退改签
								</view>
							</view>
						</view>
						<view class="message_top" style="margin-top: 20upx;" v-if="bool && !isone">
							<view style="display: flex;width: 96%;margin-left: 2%;">
								<view style="width: 95%;display: flex;">
									<view class="dates">
										{{dataTwo.flightsts.timelists.re}}
									</view>
									<view class="week">
										周{{dataTwo.flightsts.timelists.week}}
									</view>
								</view>
							</view>
						</view>
						<view class="top" v-if="bool && !isone">
							<!-- 机票详情 -->
							<view class="above">
								<!-- 时间地址 -->
								<view class="above_left">
									<view class="go_off">
										{{dataTwo.flightsts.departTime}}
									</view>
									<view class="arrival_time">
										{{dataTwo.flightsts.departs}}{{dataTwo.flightsts.departTerminal}}
									</view>
								</view>
								<view class="above_centre">
									<view style="color:#007AFF">
										<view style="text-align: center;font-size: 22upx;"
											v-if="dataTwo.flightsts.nonstop == true">经停 {{arrivalAirport}}</view>
									</view>
									<view>
										<image src="@/static/img/home/home_fly.png"></image>
									</view>
									<view style="font-size: 20upx;color:#999999">
										{{dataTwo.flightsts.flightTime}}
									</view>
								</view>
								<view class="above_right">
									<view class="go_off">
										{{dataTwo.flightsts.arriveTime}}
										<span class="tspan" v-if="dataTwo.flightsts.isarriveTime == true">+1</span>
									</view>
									<view class="arrival_time">
										{{dataTwo.flightsts.arrives}}{{dataTwo.flightsts.arriveTerminal}}
									</view>
								</view>
							</view>
							<view class="stsbt">
								<view class="below" v-if="dataTwo.flightsts.planeSize != null">
								<!-- 日期航班 -->
									<image :src="dataTwo.flightsts.ims" mode=""></image>
									{{dataTwo.flightsts.airlinename}}{{dataTwo.flightsts.no}} / {{model(dataTwo.flightsts.plane)}}{{dataTwo.flightsts.plane}}
									{{dataTwo.flightsts.planeSize}}
								</view>
								<view class="below" v-else>
									<!-- 日期航班 -->
									<image :src="dataTwo.flightsts.ims" mode=""></image>
									{{dataTwo.flightsts.airlinename}}{{dataTwo.flightsts.no}}
								</view>
							</view>
							
						</view>

						<view class="message_bottom" v-if="!isone">
							<view class="jiage">
								<view class="par" style="display: flex;">
									机票价：￥
									<view v-if="priceas != 0">{{priceas}}</view>
									<view v-else>{{dataOne.shippingSpace.price}}</view>
								</view>+
								<view class="fuel" style="display: flex;">
									机建/燃油：￥{{dataTwo.flightsts.taxFee}}/￥{{dataTwo.flightsts.fuelFee}}
								</view>
								<view class="changing" @click="ctlist">
									查看退改签
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="sname" style="margin-top: 20upx;" v-if="civilServiceTicket==1">
					<view style="padding-left: 20upx;">验证类型：</view>
					<view class="pons" v-for="(item,index) in ziyuanlsit" :key="index" @click="willing(item.id)">
						<view class="iconfont" v-if="item.id !=maoyid" style="">&#xe7bf;</view>
						<view class="iconfont" v-if="item.id ==maoyid" style="color: #1296db;">&#xe60a;</view>
						{{item.name}}
					</view>
				</view>
				<view class="istaf" v-if="Involuntary">
					<view class="ravelv">
						<view class="ts">
							<view class="rav_left">单位名称:</view>
							<view class="ravright">
								<view class="bos">
									<input type="text" v-model="Units" placeholder="请输入单位名称" value="" />
								</view>
								<view class="iconfont">&#xe8a3;</view>
							</view>
						</view>
					</view>
				</view>




				<view class="userlist">
					<view class="cu_time" v-if="isblcks != 4">
						<passenger :isretun="isretun" ref="passengers" @butaluser="bustlist" :butaluserlist="butalist"  types="2"></passenger>
					</view>
					<view class="userls" v-for="(item, idnex) in deptlists" :key="idnex" v-if="isblcks != 4">
						<view class="use-tles">
							{{ item.name }}
						</view>
						<view class="use_list" v-for="(its,indexs) in item.list" :key="indexs">
							<view class="us_tps">
								<view>{{its.name}}</view>
								<view class="us_rights">
									<picker :range="its.certificateList" :range-key="'cardTypename'" @change="CostCencdChange($event,idnex,indexs,its)">
										{{TuoMin(its.certificateList[item.indx[indexs].index].cardNo,its.certificateList[item.indx[indexs].index].cardType)}}
									</picker>
									
									<view class="iconfont" style="">&#xe8a3;</view>
								</view>
							</view>
							<view class="kaihu" v-if="civilServiceTicket == 1">
								<view>开户银行</view>
								<view>
									<input type="text" v-model="its.carval" @input="onInput($event,idnex,indexs)" placeholder="银行名称" value="" />
									<view class="absts" v-if="abstid == indexs && abstids == idnex">
										<view   v-for="(item_bk,index_bk) in banklists" :key="index_bk" @click="bankss(item_bk)">
											{{item_bk}}
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="userls" v-if="isblcks == 4">
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
				<!-- 改签并且购买了保险就提示 -->
				<!-- <view class="ipablos" v-if="isblcks == 4 && serch.insOrders == true">
					温馨提示：改签时需重新购买保险，原票购买的保险需在我的订单详情中手动去退保，退保成功后保费会原路退回
				</view> -->
				<!-- 保险 -->
				<view class="insurance" v-if="kingList.length > 1 || kinsList.length > 1">
					<view class="Shipping_insurance" v-if="kingList.length>1">
						<view class="insurancemoney">
							<span style="margin:0 40upx;font-size:30upx;">航意险</span>(票面价：<span style="color: #F48F00;">{{profitPrices}}</span>元)
						</view>
						<view class="navigas" :class="Default == 0 ? 'navimd':''">
							<picker  :range="kingList" :range-key="'name'" @change="chineseChange($event)" style="width:100%;">
								{{ kingList[parseInt(Default)].name }}
							</picker>
							<view class="iconfont" style="">&#xe8a3;</view>
						</view>
						<view class="tswos" v-if="Default != 0">
							<view class="tswo_le">
								旅程安心 | 保额 {{tans(kingList[parseInt(Default)].amount)}}
							</view>
							<view class="tswo_ri">
								请阅读<span @click="clikst(2,1)">投保须知</span>
							</view>
						</view>
					</view>
					<view class="Shipping_insurance" v-if="kinsList.length > 1">
						<view class="insurancemoney">
							<span style="margin:0 40upx;">航延险</span>(票面价：<span style="color: #F48F00;">{{profitPrice}}</span>元)
						</view>
						<view class="navigas" :class="Defaults == 0 ? 'navimd':''">
							<picker v-if="kinsList.length>0" :range="kinsList" :range-key="'name'" @change="chineseChangea($event)" style="width:100%">
								{{ kinsList[Defaults].name }}
							</picker>
							<view class="iconfont" style="">&#xe8a3;</view>
						</view>
						<view class="tswos" v-if="Defaults != 0">
							<view class="tswo_le">
								旅程安心 | 保额 {{tans(kinsList[parseInt(Defaults)].amount)}}
							</view>
							<view class="tswo_ri">
								请阅读<span @click="clikst(2,2)">投保须知</span>
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
						<constCenter :morconst="morconsts" @costcCks="costcCk" :toisblcks="isblcks" :isblckt="isblckt" :sttos="sttos"></constCenter>
					</view>
				</view>
				<view class="istaf">
					<view class="ravelv">
						<view class="ts" v-if="isbtd == 1 && resonIds != -1 ">
							<view class="rav_left">出行事由</view>
							<view class="ravright">
								<view class="bos">
									<!-- <input type="text" v-model="reson" placeholder="请输入出行事由" value="" /> -->
									<subjects @change="subclcks"  :type="isblcks"  :oldResonIds="old_resonIds"></subjects>
								</view>
							</view>
							<view class="iconfont" style="">&#xe8a3;</view>
						</view>
						<view class="ts">
							<view class="rav_left">联系人</view>
							<view class="ravright">
								<view class="bos">
									<input type="text" v-model="user_name" placeholder="请输入联系人" value="" />
								</view>
							</view>
						</view>
						<view class="ts">
							<view class="rav_left">联系电话</view>
							<view class="ravright">
								<view class="bos">
									<input v-if="user_ipones != ''" type="text" v-model="user_ipones" maxlength="11" @focus="focusfns(1)" value="" />
									<input v-else type="number" v-model="user_ipone" maxlength="11"  placeholder="请输入联系电话" value="" />
								</view>
							</view>
						</view>
					</view>
					<view class="ravelv" v-if="isblcks == 4">
						<view class="ts">
							<view class="rav_left">改签原因</view>
							<view class="ravright">
								<view class="bos">
									<input type="text" v-model="user_remark" placeholder="请输入改签原因" value="" />
								</view>
								<view class="iconfont">&#xe8a3;</view>
							</view>
						</view>
					</view>
					<view class="ravelvs" v-if="isblcks == 4">
						<view class="ts">
							<view class="rav_left">改签证明</view>
							<view class="ravright">
								<view class="bost" @click="ft_click">
									<image style="width: 100%;height: 100%;" :src="to_src" mode="" v-if="to_src != ''"></image>
									<view v-if="to_src == ''" class="pfls">
										<view class="iconfont" style="color: #007aff;font-size: 50upx;">&#xe632;</view>
									</view>
								</view>
							</view>
							<view class="iconfont">&#xe8a3;</view>
						</view>
					</view>
				</view>

				<view class="staleve" v-if="staleve" @click="staleve = false">
					<view class="stalist" @click.stop>
						<view class="quan">
							<view class="statop" v-if="respeatBook.length > 0">
								<view class="reds">
									<view class="ts_text">
										订单已重复
									</view>
								</view>
								<view class="setlist" v-for="(item,index) in respeatBook" :key="index">
									<view class="setbod" v-if="item.name == 9 && !notbooking">
										<view class="styul">
											<view class="styli_top">
												超规且不可预订
											</view>
											<view class="stulis">
												<view class="styli_left">
													超规人员:
												</view>
												<view class="styli_right">
													{{item.list}}
												</view>
											</view>
										</view>
									</view>
									<view class="setbod" v-if="item.name == 8 && !notbooking">
										<view class="styul">
											<view class="stulis">
												<view class="styli_left">
													超规人员:
												</view>
												<view class="styli_right">
													{{item.list}}
												</view>
											</view>
										</view>
										<view class="styul">
											<view class="stulis">
												<view class="styli_left">
													超规原因:
												</view>
												<view class="styli_right">
													<view class="wors">
														<picker v-model="pricdesc" :range="rulesReasons" :range-key="'chineseDesc'" @change="chineseChanges($event)">
															{{ rulesReasons[chiness.index].chineseDesc }}
														</picker>
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="btnsti" v-if="bools">
							<view class="roblck" @click="staleve = false">
								取消
							</view>
							<view class="btnok" @click="cits_btn">
								继续预定
							</view>
						</view>
					</view>
				</view>

				<view class="mask" v-if="companyi_click" @click="companym_click">
				</view>
				<view class="pop_up" :class="fxli ? 'shows' : 'hides' ">
					<view class="pop_op">
						{{zhi}}
					</view>
					<view class="pop_ip">
						公司账户<br />
						使用公司账户支付，预订可管控，报销更合规
					</view>
				</view>
				<view class="costlists" :class="costs ? 'shows' : ''">
					<view class="costlist_s" v-if="tkShowId == 1">
						<view class="cost_li">
							<view class="scse_l">
								<view>票价</view>
								<view class="scbord"></view>
							</view>
							<view class="scse_r" v-if="isone">
								<view class="corssize">
									￥{{prices}}
								</view>
								<view >
									x{{butalist.length}}人
								</view>
							</view>
							<view class="scse_r" v-if="!isone">
								<view class="corssize">
									<view class="">
										去程￥{{prices}}
									</view>
									<view class="">
										返程￥{{priceas}}
									</view>
								</view>
							</view>
						</view>
						<view class="cost_li costs">
							<view class="scse_l">
								<view>机建/燃油</view>
								<view class="scbord"></view>
							</view>
							<view class="scse_r" v-if="isone">
								<view class="corssize">
									￥{{dataOne.flightsts.taxFee}}/<span   style="color: #F48F00;">
									￥{{dataOne.flightsts.fuelFee}}
								</span>
								</view>
								
							</view>
							<view class="scse_r" v-if="!isone">
								<view class="corssize">
									￥{{dataOne.flightsts.taxFee + dataTwo.flightsts.taxFee}}/<span   style="color: #F48F00;">
									￥{{dataOne.flightsts.fuelFee + dataTwo.flightsts.fuelFee}}
								</span>
								</view>
								
							</view>
						</view>
						<view class="cost_li costs" v-if="isblcks != 4">
							<view class="scse_l">
								<view>保险</view>
								<view class="scbord"></view>
							</view>
							<view class="scse_r">
								<view class="corssize" v-if="isone">
									￥{{(profitPrice + profitPrices)}}
								</view>
								<view class="corssize" v-if="!isone">
									￥{{(profitPrice + profitPrices) * 2 }}
								</view>
							</view>
						</view>
						<view class="cost_li costs">
							<view class="scse_l">
								<view>服务费</view>
								<view class="scbord"></view>
							</view>
							<view class="scse_r">
								<view class="corssize" v-if="isone">
									￥{{tips}}
								</view>
								<view class="corssize" v-if="!isone">
									￥{{tips * 2 }}
								</view>
							</view>
						</view>
						<view class="cost_li costs">
							<view class="scse_l">
								<view>人数</view>
								<view class="scbord"></view>
							</view>
							<view class="scse_r">
								<view class="corssize">
									{{butalist.length}}人
								</view>
							</view>
						</view>
					</view>
					<view class="tansList" v-if="tkShowId == 2" v-html="tansLists">
					</view>
				</view>
				<view class="bottoms">
					<view class="btnsp">
						<view class="bottoms_lift" >
							
							<view style="color: #FFA63E;" >
								<span style="font-size:14upx;">￥</span> {{num}}
							</view>
							<view class="botmrigt">
								<view  style="color:#666666;font-size:26upx;" @click="clikst(1)">
									明细
								</view>
								<view class="imgs">
									<image v-if="homes" src="@/static/img/home/home_x.png"></image>
									<image v-if="homex" src="@/static/img/home/home_s.png"></image>
								</view>
								<view class="bottoms_right" :class="isbtns ? 'btoks':''" @click="panduan(1)" v-if="isblcks != 4 && rotes('tms:dps:reserve')">
									提交
								</view>
								<view class="bottoms_right" :class="isbtns ? 'btoks':''"@click="panduan(2)" v-if="isblcks == 4 && rotes('tms:dps:change')">
									申请改签
								</view>
							</view>
							
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="test"></view>
	</view>
</template>

<script>
	import constCenter from '@/components/view/book/cost-center/costCenter.vue'
	import passenger from "@/components/view/book/passenger/passenger";
	import certifi from '@/api/certificate.js'
	import airports from 'pages/book/sselect-city/airports.js'
	import order from '@/api/order.js'
	import tork from '@/api/torowk.js'
	import mydi from '@/api/mydi.js';
	import subjects from '@/components/view/book/subject-matter/subjectMatter.vue'
	export default {
		data() {
			return {
				one_buyPrices:0,//航班管家参数
				phoneid:false,//第一次进页面
				serch:{},//内含改签原单信息
				tansLists:'',//投保须知
				tkShowId:1,//1显示费用详情 2显示投保须知  
				old_resonIds:0,//默认事由id  (事前)
				resonIds:-1,
				isbtns:false,//是否点击了提交
				isGetStaffList:false,//是否没有审批流
				isretun: false,
				abstid: -1, //当前银行搜索下标
				abstids:-1,//当前部门下标
				zhis: '',
				reson: '', //出行事由
				resonName:'',
				Units: '', //单位名称
				to_src: '', //改签证明
				CostCencd: [],
				CostCi: false, //是否有成本中心审批人
				CostCis: false, //是否有部门审批人
				CostCenter: [],
				Deparapp: [],
				usermap: [{
						name: '尊享航意险',
						money: '40',
						text: '80%商旅人士选择，420万高额保障'
					},
					{
						name: '航意航延组合险',
						money: '40',
						text: '意外险+延误险，双重保障'
					},
					{
						name: '航空意外险',
						money: '30',
						text: '享320万保障'
					}
				],
				chines: {
					index: 0
				},
				chiness: {
					index: 0
				},
				chineas: {
					index: 0
				},
				kingList: [],
				kinsList: [],
				banklist: [], //银行集合
				banklists: [], //当前搜索银行
				userlist:null,
				isarsrl: false, //是否免审
				maoyid: '0',
				volunteer: true,
				Involuntary: false,
				willings: true,
				num: '',
				leng: '',
				Opening: '', //开户
				iss: false,
				zhi: '个人支付',
				profitPrice: 0,
				insuranceNo: '',
				insuranceNos: '',
				profitPrices: 0,
				isGift: 0,
				isGifts: 0,
				allIsGift: false, //是否赠送保险
				companyi_click: false, //弹出层
				companys_click: false, //保险
				idstarle: false, //是否高价超规要选择原因
				pricdesc: '', //高价超规原因
				bools: false,
				mao: true,
				yi: false,
				homex:false,
				homes:true,
				fxli: false,
				fxlli: false,
				hing: true,
				diss: true,
				Default: 0,
				Defaults: 0,
				MentionChange: 0,
				isblcks: '',
				isbtd: '',
				tips: 0, //服务费
				user_name: '', //联系人
				user_ipone: '', //联系电话
				user_ipones:'',
				dataOne: {},//单程信息
				dataTwo: {}, //往返第二条行程
				packlist: {}, //上个页面的值
				backrule: {}, //退改签规则
				repeatBookingLimit: {}, //重复预定规则政策
				rulesReasons: [], //超规类型
				staleve: false,
				isblckt: false, //超标审批
				sttos:1,//事前是否违规再次审批  1为开启二次审批 3为违规再次审批
				respeatBook: [],
				bool: true,
				notbooking: false,
				
				costs: false,
				onprice: '999', //总价
				prices: 0, //票价
				priceas: 0, //回来的票价
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
				ziyuanlsit: [{
					name: "公务卡验证",
					id: '0'
				}, {
					name: "预算单位验证",
					id: '1'
				}],
				noticerefund: [ //退票说明
					"1、退票规定：起飞前2小时(含)以前收取5%的退票手续费;起飞前2小时(不含)以后收取10%的退票手续费;(具体以航司审核为准)",
					"2、改签规定：起飞前2天(含)允许免费改期1次;起飞前2小时(含)以前收取0%的改期手续费;起飞前2小时(不含)以后收取5%的改期手续费;(具体以航司审核为准)",
					"3、签转规定：不得签转"
				],
				cbname: '', //成本中心名称
				cbid: '', //成本中心id
				botname: '', //当前选择的成本中心名称
				slit_id_checd: 0, //当前点击成本中心的id
				treeLists: [], //归属部门列表
				ops_list: false, //归属部门
				
				CostCenterlist: [], //成本中心审批人
				costlist: [], //当前选择的成本中心审批人集合
				isswf: true, //true为成本中心 false为部门   审批人
				Deparapprover: [], //部门审批人
				
				datalist: {},
				cardlist: [],
				NameCenter: {
					name: '',
					id: ''
				},
				blac_show: false,
				switfals: false,
				stlistad: {},
				limitNativeRule: [],//第一段违规信息
				limitNativeRules:[],//第二段违规信息
				attdepartment: '', //归属部门
				carld: [], //证件列表
				scardnno: [], //证件值

				butalist: [], //人员

				isone: true,
				user_remark: "", //改签原因
				passengerNoslist: [], //改签人passno
				getTravelPolicys: {}, //保险规则判断
				vehicleId: '', //事前id
				vehicleIdBack: '', //事前id
				civilServiceTicket: '',
				context: '', //用于官方票传递参数
				code: '',
				sittext: '退票通知',
				fasp: 0,
				outboundTicketPrice: 0,
				returnTicketPrice: 0,
				toReturn: 0,
				isshowcenter:false,//是否显示审批信息
				ticketChanges:false,//改签是否需要审批
				arrivalAirport: '', //经停

				deptlists:[],//重组后的出差人员
				isdatalist:{},//改签需要的信息
				
				morconsts:{},//事前默认成本中心
				apprvReasonId:0,//改签才出差事由id
			}

		},
		components: {
			passenger,
			subjects,
			constCenter
		},
		onLoad(item) {
			let st = JSON.parse(uni.getStorageSync("predetermine_data"));

			this.civilServiceTicket = st.searchData.civilServiceTicket;
			this.dataOne = st.searchData.dataOne;//单程信息
			this.limitNativeRule = st.searchData.dataOne.limitNativeRule;//第一段违规信息
			if (st.searchData.none == 'single') { //是否单程
				this.isone = true;
				this.isblckt = st.searchData.dataOne.isblckt; //超标需要审批 事前是否需要二次审批
			} else { //往返
				this.isone = false;
				this.dataTwo =  st.searchData.dataTwo;
				if(st.searchData.dataTwo.isblckt == true || st.searchData.dataOne.isblckt == true){//往返只要有一段是超规 就走超规流程
					this.isblckt = true;
				}	
				this.limitNativeRules = st.searchData.dataTwo.limitNativeRule;//第二段违规信息
			}
			let da = st.searchData;//行程信息及查询信息
			this.serch = da;
			this.userlist = da.butalist || [];//出行人
			this.isarsrl = st.isarsrl; //是否免审
			
			this.isblcks = da.isblcks; //1事前2事中
			this.isbtd = da.isbtd; //1应公2应私
			if(this.isbtd == 2){ //除了因私 别的都不能修改用户
				this.isretun = false;
			} else {
				this.isretun = true;
			}
			
		},
		mounted() {
			this.butalist = this.userlist;
			// this.transit();//经停
			let nuarry = [];
			if (this.isblcks == 4) {//改签
				this.passengerNoslist = this.serch.userlistnos; //改签出行人no
			} else {
				
			}
			//改签或者事前  不是免审
			if(this.isblckt){//是否 超标审批
				this.sttos = 3;//1为事前审批 3为超标审批
				this.isshowcentermt();//是否显示审批信息
			} else {
				if ((this.isblcks == 4 || this.isblcks == 1) && this.isarsrl == false) {//改签事前  不是免审
					this.getRuleMainSetting(); //获取公司是否 改签 事前是否 需要审核
				} else {
					this.isshowcentermt();//是否显示审批信息
				}
			}
			
			if (this.isblcks == 1) { //判断是否事前
				this.isdatalist =this.serch.mokksli;//事前的信息
				this.attdepartment = this.isdatalist.deptName;
				this.NameCenter = {
					name: this.isdatalist.costName,
					id: this.isdatalist.costId
				}
				this.morconsts = {//默认部门信息
					name: this.isdatalist.costName,
					id: this.isdatalist.costId
				};
			} else {
				const data = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //获取归属部门
				if (data.deptName) {
					this.attdepartment = data.deptName;
				}
			}
			this.usernams();//获取联系人
			this.backrules();//获取退改签规则
			this.userlis(); //出行人信息
			this.baoxian(); //保险
			this.getstu(); //获取飞机p价
			this.getTravelPolicyst(); //保险规则判断
			
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
				this.resonName = data.name;
			},
			bustlist(item){
				this.butalist = item;
				if(this.butalist.length != 0){
					this.leng = this.butalist.length;
					this.userlis();
					this.totalAmount(this.toReturn);
				} else {
					this.leng = 0;
					this.deptlists = [];
					this.totalAmount(this.toReturn);
				}
			},



			model(ie) {//判断飞机类型
				if (ie.substring(0, 1) == 3) {
					ie = '空客'
				} else {
					ie = '波音'
				}
				return ie;
			},
			// async transit() { //经停
			// 	let red = await certifi.getPlaneStop({
			// 		'flightNo': this.dataOne.flightsts.no,
			// 		'depDate': this.dataOne.flightsts.departDate
			// 	}); //查询经停航班
			// 	if (red.code == 200) {
			// 		this.address = airports.addressAirportAll; //航空名字
			// 		if (red.data.flightLegBriefs != null) {
			// 			this.arrivalAirport = red.data.flightLegBriefs[0].arrivalAirport;
			// 		}
			// 		for (let j = 0; j < this.address.length; j++) {
			// 			if (this.arrivalAirport == this.address[j].airportCode) {
			// 				this.arrivalAirport = this.address[j].airportCName;
			// 			}
			// 		}
			// 	} else {
			// 		this.showToasts(red.message);
			// 		return
			// 	}
			// },
			isshowcentermt(){
				if(this.isbtd == 1 && !this.isarsrl){ //因公 非免审
					if(this.isblcks == 2||
					(this.isblcks == 4 && (this.ticketChanges == true || this.isblckt == true))||
					(this.isblcks == 1 && this.isblckt == true)){ //事中 改签需要审批 或者 事前需要二审       或者 超规需要审批
						this.isshowcenter = true;//显示审批信息
					}
				}
			},
			async getRuleMainSetting() { //查询当前用户改签是否需要审核 和 事前是否二次过审
			
				try {
					let res = await order.RuleMainSetting();
					if(this.isblcks == 1){//判断事前是否需要审批
						let stw = res.data.examineSwitch.split(',');
						for (let i in stw) {
							/**
							 * 3代表事前二次过审
							 */
							if (stw[i] == 3) {//公司是否开启二次审批
								//如果用户不是免审 就要事前二次过审
								if(!this.isblckt){
									this.sttos = 1;//走出差审批流程
									this.isblckt = true;
								}
							}
						}
					}
					if(this.isblcks == 4){//改签
						let stw = res.data.examinePattern.split(',');
						for (let i in stw) {
							/**
							 * 9代表改签需要审批
							 */
							if (stw[i] == 9) {//公司是否开启机票改签审批
								this.ticketChanges = true;
							}
						}
					}
					this.isshowcentermt();
				} catch (e) {
					console.log(e);
			
				}
			},
			onInput(itm, id , ids) {
				this.abstid = ids;
				this.abstids =id;
				var va = itm.mp.detail.value.trim();
				if (va.length > 0) {
					var banks = this.banklist; //当前所有银行
					this.banklists = [];
					for (let i in banks) {
						if (banks[i].indexOf(va) >= 0) {
							this.banklists.push(banks[i])
						}
					}
					va = this.zhis;
				}
			},
			bankss(carval, item_bk) {
				this.deptlists[this.abstids].list[this.abstid].carval = item_bk;
				this.abstid = -1;
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
			async backrules() { //获取退改签规则
				try {
					let data = {
						airlineCode: this.dataOne.flightsts.airline, //航司编码
						cabin: this.dataOne.shippingSpace.cabin, //舱位
						depDate: this.dataOne.flightsts.departDate, //起飞时间
						airRoute: this.dataOne.flightsts.depart + this.dataOne.flightsts.arrive, //航线：CANPVG（出发地到达地）
					}
					const ret = await tork.getRefundChangeRule(data);
					if (ret.code == 200) {
						this.backrule = ret.data;
					} else {
						this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e);
				}
			},
			willing(ie) {
				this.maoyid = ie;
				if (ie == 0) {
					this.volunteer = true;
					this.Involuntary = false;
				} else {
					this.Involuntary = true;
					this.volunteer = false;
				}
			},
			async getTravelPolicyst() {
				try {
					let res = await certifi.getTravelPolicy();
					if (res.code == 200) {
						this.getTravelPolicys = res.data;
						this.commit();
					} else {
						this.showToasts(res.message);
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			timaout(times, out) {
				if (out.substring(out.length - 2) != '+1') {
					return times + ' ' + out + ':00'
				} else {
					let timet = out.substring(0, 5);
					let dats = new Date(new Date(times).getTime() + 24 * 60 * 60 * 1000);
					let year = dats.getFullYear(); //当前年
					let month = dats.getMonth() + 1 < 10 ? '0' + (dats.getMonth() + 1) : dats.getMonth() + 1;
					let day = dats.getDate() < 10 ? '0' + dats.getDate() : dats.getDate();
					return year + '-' + month + '-' + day + ' ' + timet + ':00'
				}
			},
			async updata() { //申请改签
				let that = this;
				let userlists = that.deptlists;
				let citysy = that.dataOne.flightsts; //当前航班信息 往
				let citysys = {}; //返
				if (!this.isone) { //往返
					citysys = that.dataTwo.flightsts;
				}
				let NameCenter = that.NameCenter; //成本中心
				let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
				let TravelDepartlist = that.TravelDepartlist; //部门审批人
				let apprvTaskStaffts = []; //审核人员
				let user_name = that.user_name; //联系人
				let user_ipone = that.user_ipone; //联系电话
				let user_remark = that.user_remark; //改签原因
				let isbtd = that.isbtd; //1因公2因私
				let isblcks = that.isblcks; //1事前 2事中 3违规再次审批 4改签
				let limitNativeRule = that.limitNativeRule;
				let limitNativeRules = that.limitNativeRule;
				let legList = [];
				let prods = [];
				if (that.allIsGift == true) {
					that.profitPrices = 0;
					that.profitPrice = 0;
				}
				if (that.insuranceNo != '') {//保险id 航意
					prods.push(that.insuranceNo + ',' + that.profitPrices)
				}
				if (that.insuranceNos != '') {//航延
					prods.push(that.insuranceNos + ',' + that.profitPrice)
				}
				legList.push({
					flightNo: citysy.no,
					cabin: that.dataOne.shippingSpace.cabin,
					depAirport: citysy.depart,
					arrAirport: citysy.arrive,
					depTime: citysy.departDate.substring(0, 10) + ' ' + citysy.departTime + ':00',
					arrTime: that.timaout(citysy.departDate.substring(0, 10), citysy.isarriveTime == true ? citysy.arriveTime + '+1' : citysy.arriveTime),
					depTerminal: citysy.departs,
					arrTerminal: citysy.arrives,
				})
				if (!this.isone) { //往返
					legList.push({
						flightNo: citysys.no,
						cabin: that.dataTwo.shippingSpace.cabin,
						depAirport: citysys.depart,
						arrAirport: citysys.arrive,
						depTime: citysys.departDate.substring(0, 10) + ' ' + citysys.departTime + ':00',
						arrTime: that.timaout(citysys.departDate.substring(0, 10), citysys.isarriveTime == true ? citysys.arriveTime + '+1' : citysys.arriveTimee),
						depTerminal: citysys.departs,
						arrTerminal: citysys.arrives,
					})
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
				let usasrlist = []; //改签用户列表信息
				for (let i = 0; i < userlists.length; i++) {
					let birthdate = "";
					if (userlists[i].passengerBirth != null) {
						birthdate = userlists[i].passengerBirth.substring(0, 10);
					} else {
						birthdate = null
					}
					usasrlist.push({
						birthdate:birthdate,
						name: userlists[i].name,
						newName: userlists[i].name,
						cardNo: userlists[i].certNo,
						newCardNo: userlists[i].certNo,
						newCardType: that.cardtype(userlists[i].certType),
						newPhone: userlists[i].phone,
						productKeys: prods,
					})
				}
				let ists = 0;
				let invs = "";
				if (limitNativeRule.length == 0 && this.isone) {
					ists = 0;
					invs = ""
				} else {
					invs = JSON.stringify({
						information: [limitNativeRule]
					});
					ists = 1;
				}
				if (!this.isone) {
					let limitNativeRules = that.limitNativeRules;
					if (limitNativeRules.length == 0) {
						ists = 0;
						invs = ""
					} else {
						invs = JSON.stringify({
							information: [limitNativeRule, limitNativeRules]
						});
						ists = 1;
					}
				}
				let dat = {};
				let inst = 0;
				if(this.isblckt == true){//是否超规审批 或者事前需要审批
					inst = this.sttos;
				} else {
					inst = isblcks;
				}
				dat = {
					saleNo: that.serch.saleOrderNo, //原销售单号
					tradeNo: that.serch.tradeNo, //原交易单号
					voluntarily: '1',
					apprvTaskEntity: {
						agree: false, //是否当前人审批
						taskType: inst, //1为事前2为事中，
						beforeMiddle: 2, //1为事前2为事中
						reason: this.resonName, //理由
						reasonId:this.reson,
						apprvTaskStaffs: apprvTaskStaffts, //审批人信息
						costId: NameCenter.id, //成本中心id
						costName: NameCenter.name, //成本中心名称
						remark: invs, //超规信息
					},
					legList: legList, //改签航班信息
					odllegList: that.serch.odllegList, //旧航班信息
					oldPassger: usasrlist, //出行人
					contacts: user_name, //联系人
					contactPhone: user_ipone, //联系电话
					reason: user_remark, //改签原因
					cardFile: that.to_src, //改签文件证明
				}
				try {
					let res = await tork.applySaleChange(dat);
					
					if (res.code == 200) {
						that.showToasts("申请改签成功！")
						setTimeout(() => {
							uni.setStorageSync("sworders_od",{
								type:'airTicketChanges',
								data:res.data
							});
							uni.switchTab({
								url: '/pages/order/order',
								success:function(){
								}
							})
						}, 1000)
					} else {
						this.isbtns = false;
						that.showToasts(res.message)
					}
				} catch (e) {
					this.isbtns = false;
					console.log(e)
					
				}

			},
			ft_click() { //上传图片
				let _this = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						let Max_Size = res.tempFiles[0].size;
						if (Max_Size / 1024 > 2048) {
							_this.showToasts("照片大小不能高于2MB")
							return
						}
						console.log("!上传")
						_this.headImg = res.tempFilePaths;
						const data = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //关于token的用法
						let baseURL = uni.getStorageSync('baseURL');
						console.log("!上传中")
						
						uni.uploadFile({
							url: baseURL + "/tms/api/user/uploadPassengerImage", // 后端api接口
							methods: "POST",
							filePath: _this.headImg[0], // uni.chooseImage函数调用后获取的本地文件路径
							name: 'file', //后端通过'file'获取上传的文件对象
							header: {
								'AuthToken': data.token
							},
							formData: {
								'file': 'test'
							},
							success: (res) => {
								let data = JSON.parse(res.data)
								if (data.code == 200) {
									
									_this.to_src = data.data;

								} else {
									this.showToasts(data.message)
								}
							},
							error: (res) => {
								this.showToasts("上传失败！", res)
							}
						});
					},
					error: function(e) {
						console.log(e);
					}
				})
			},
			search(ev) { //监听input里面的手机号的值
				let _this = this;
				let va = ev.mp.detail.value; //获取搜索框的值
				if (va.length == 11) {
					if (this.utils.zzPhone(va)) {
						_this.showToasts("请输入正确的手机号!");
					}
				}
			},
			cardtype(it) {
				if (it == '身份证') {
					return 'NI'
				} else if (it == '护照') {
					return 'PP'
				} else if (it == '台胞证') {
					return 'TB'
				} else if (it == '港澳通行证') {
					return 'GA'
				} else if (it == '回乡证') {
					return 'HX'
				} else if (it == '其他证件') {
					return 'OS'
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
			CostCenterChange(e, index) { //选择当前成本中心审批人
				this.CostCenter[index].index = e.detail.value;
			},
			DeparappChange(e, index) { //选择当前部门审批人
				this.Deparapp[index].index = e.detail.value;
			},
			async getstu() { //获取飞机p价
				let shared = '';
				let isSame = 1;//1真往返 2 假往返
				if (this.dataOne.flightsts.shared == true) {
					shared = "0"
				} else {
					shared = "1"
				}
				let usera = {};
				usera = {
					airline: {
						airlineType: 1,
						passengerType: "ADT",
						one_depart: this.dataOne.flightsts.depart, //第一段，出发城市
						one_departDate: (this.dataOne.flightsts.departDate).substring(0, 10), //第一段，出发日期
						one_departTime: this.dataOne.flightsts.departTime, //第一段，出发时间
						one_arrival: this.dataOne.flightsts.arrive, //第一段，到达城市
						one_no: this.dataOne.flightsts.no, //第一段，航班号
						one_sharedBZ: shared, //是否共享航班
						one_operatingNo: this.dataOne.flightsts.operatingNo, //第一段，实际承运航班号
						one_cabin: this.dataOne.shippingSpace.cabin, //第一段，舱位
						isSame: "1", //是否为往返组合标识，1：是；2：不是
						one_taxFee: this.dataOne.flightsts.taxFee, //第一段，机建
						one_fuelFee: this.dataOne.flightsts.fuelFee, //第一段，燃油
						one_fdprice: this.outboundTicketPrice, //第一段公布运价
						one_arrivalTime:this.dataOne.flightsts.isarriveTime == true ?  this.dataOne.flightsts.arriveTime + '+1': this.dataOne.flightsts.arriveTime //第一段，到达时间arriveTime
					},
				}
				if(this.dataOne.shippingSpace.priceSource == 1){//官方
					usera.airline['flightInfoId'] = this.dataOne.flightsts.flightinfoid;
					usera.airline['priceInfoId'] = this.dataOne.shippingSpace.priceInfoId;
					usera['special'] = 4;
				}else if(this.dataOne.shippingSpace.priceSource == 2 && this.civilServiceTicket != 1){//美赢
					usera = {
						special: 5,
						airline: {
							airlineType: 1,
							passengerType: "ADT",
							one_operatingNo: this.dataOne.flightsts.operatingNo,
							one_cabin: this.dataOne.shippingSpace.cabin,
							isSame: "1",
							one_taxFee: this.dataOne.flightsts.taxFee,
							one_fuelFee: this.dataOne.flightsts.fuelFee,
							one_fdprice: this.outboundTicketPrice,
						},
					}
				} else {//其他
					usera['special'] = this.dataOne.shippingSpace.specialType;
				}
				if(this.civilServiceTicket == 1){ //1为公务员票
					usera.airline['civilServiceTicket'] = this.civilServiceTicket; //展示公务机票 标识。1：展示；0：不展示
				}
				if(!this.isone){//往返
					
					if(this.dataTwo.flightsts.airline == this.dataOne.flightsts.airline){
						isSame = 1;
					} else{
						isSame = 2;
					}
					if (this.dataTwo.flightsts.shared == true) {
						shared = "0"
					} else {
						shared = "1"
					}
					if(!this.isone){//往返
						let dast = {
							two_depart: this.dataTwo.flightsts.depart, //第二段，出发城市
							two_departDate: (this.dataTwo.flightsts.departDate).substring(0, 10), //第二段，出发日期
							two_departTime: this.dataTwo.flightsts.departTime, //第二段，出发时间
							two_arrival: this.dataTwo.flightsts.arrive, //第二段，到达城市
							two_no: this.dataTwo.flightsts.no, //第二段，航班号
							two_sharedBZ: shared, //是否共享航班
							two_operatingNo: this.dataTwo.flightsts.operatingNo, //第二段，实际承运航班号
							two_cabin: this.dataTwo.shippingSpace.cabin, //第二段，舱位
							two_taxFee: this.dataTwo.flightsts.taxFee, //第二段，机建
							two_fuelFee: this.dataTwo.flightsts.fuelFee, //第二段，燃油
							two_fdprice: this.returnTicketPrice, //第二段公布运价
							two_arrivalTime: this.dataTwo.flightsts.isarriveTime == true ?  this.dataTwo.flightsts.arriveTime + '+1': this.dataTwo.flightsts.arriveTime //第二段，到达时间
						}
						let stdata = usera.airline;
						usera.airline = {...dast,...stdata};//合并
						usera.airline.airlineType = 2;
						usera.airline.isSame = isSame;
					}
				}
				try {
					uni.showLoading({title: '机票验价中',mask:true});
					const res = await tork.getPnrPriceInfor(usera);
					
					this.code = res.code;
					if (res.code == 200) {
						if (this.isone) {
							let datw = this.dataOne.shippingSpace.salePrices[0];//舱位信息
							if (res.data != null && res.data.length > 0) {
								if (datw.parPrice == res.data[0].baseFare) { //官网票读值
									if(res.data[0].salePrice == 0){
										this.prices = datw.price; //票价
									} else {
										this.prices = res.data[0].salePrice;
									}
								} else {
									this.prices = datw.price; //票价
								}
								this.context = res.data[0].context;
								this.totalAmount(1);
								if (this.dataOne.shippingSpace.priceSource == 1) {
									this.one_buyPrices = res.data[0].settlePrice;
									if (res.data[0].baseFare != null && res.data[0].baseFare != 0) {
										this.outboundTicketPrice = res.data[0].baseFare;
									} else {
										this.outboundTicketPrice = datw.parPrice;
									}
								} else {
									if (res.data[0].segFareInfos[0].baseFare != null && res.data[0].segFareInfos[0].baseFare != 0) {
										this.outboundTicketPrice = res.data[0].segFareInfos[0].baseFare;
									} else {
										this.outboundTicketPrice = datw.parPrice;
									}
								}
							} else {
								this.prices = datw.price; //票价
								this.outboundTicketPrice = datw.parPrice;
								this.totalAmount(1);
							}
							

						} else {
							let nums = this.dataTwo.shippingSpace.salePrices[0];
							let datw = this.dataOne.shippingSpace.salePrices[0];
							if (res.data != null && res.data.length > 0) {
								if(isSame == 1){ //真往返
									if(res.data[0].segFareInfos.length == 2){
										this.prices = res.data[0].segFareInfos[0].baseFare; //销售价
										this.priceas = res.data[0].segFareInfos[1].baseFare;
									} else {
										this.prices = datw.price; //销售价
										this.priceas = nums.price;
									}
									if (res.data[0].segFareInfos[0].baseFare != null && res.data[0].segFareInfos[0].baseFare != 0) {
										this.outboundTicketPrice = res.data[0].segFareInfos[0].baseFare;
									} else {
										this.outboundTicketPrice = datw.parPrice;
									}
									if (res.data[0].segFareInfos[1].baseFare != null && res.data[0].segFareInfos[1].baseFare != 0) {
										this.returnTicketPrice = res.data[0].segFareInfos[1].baseFare;
									} else {
										this.returnTicketPrice = nums.parPrice;
									}
								} else {//假往返
									if(res.data.length > 1){
										this.prices = res.data[0].segFareInfos[0].baseFare; //销售价
										this.priceas = res.data[1].segFareInfos[0].baseFare;
									} else {
										this.prices = datw.price; //销售价
										this.priceas = nums.price;
									}
									if (res.data[0].segFareInfos[0].baseFare != null && res.data[0].segFareInfos[0].baseFare != 0) {
										this.outboundTicketPrice = res.data[0].segFareInfos[0].baseFare;
									} else {
										this.outboundTicketPrice = datw.parPrice;
									}
									if (res.data[1].segFareInfos[0].baseFare != null && res.data[1].segFareInfos[0].baseFare != 0) {
										this.returnTicketPrice = res.data[1].segFareInfos[0].baseFare;
									} else {
										this.returnTicketPrice = nums.parPrice;
									}
								}
								
								this.totalAmount(2);
								this.context = res.data[0].context; //用于官方票传递参数
								
							} else {
								this.prices = datw.price; //销售价
								this.priceas = nums.price;
								this.outboundTicketPrice = datw.parPrice;//票面价
								this.returnTicketPrice = nums.parPrice;
								this.totalAmount(2);
							}
						}
						uni.hideLoading();
					} else { //获取p价失败  直接返回到上一个页面
						let that = this;
						uni.hideLoading();
						this.showToasts(res.message)
						setTimeout(()=>{
							that.toBlock();
						},1000)
					}
				} catch (e) {
					uni.hideLoading();
					console.log(e)
					
				}

			},
			async baoxian() { //保险
				let uses = [];
				uses = {
					"civilServiceTicket": ''
				}
				
				try {
					let rea = await certifi.toBook(uses); //保险
					
					let kings = [];//航意险
					let kinga = []; //航延险
					let bank = [];
					this.bank = [];
					this.kingList = [];
					this.kinsList = [];
					if (rea.code == 200) {
						for (let i in rea.data.bankList) {//银行列表
							bank.push(rea.data.bankList[i].name);
						}
						this.banklist = bank;
						let insurDomesticLists = rea.data.product.insurDomesticList ;//保险
						if (insurDomesticLists != null && this.isblcks != 4) { //判断是否有保险  改签现在没有保险 需要后端开发
							for (var i = 0; i < insurDomesticLists.length; i++) {
								if(insurDomesticLists[i].internatOrcivil == 1 || insurDomesticLists[i].internatOrcivil == 3){//1国内机票   3国内/国际
									if (insurDomesticLists[i].insureType == 3) {//1航意险 2航延险 3航意/航延
										kings.push(insurDomesticLists[i]);
										kinga.push(insurDomesticLists[i]);
									} else if(insurDomesticLists[i].insureType == 1){
										kings.push(insurDomesticLists[i]);
									} else if(insurDomesticLists[i].insureType == 2){
										kinga.push(insurDomesticLists[i]);
									}
								}
								
							}
							kings.unshift({
								name: '请选择'
							}); //航意险
							this.kingList = kings;
							kinga.unshift({
								name: '请选择'
							}); //航延险
							this.kinsList = kinga;

							if (this.kingList.length > 1) { //判断是否有保险  航意
								for (let i in this.kingList) { //默认选择保险
									if (this.kingList[i].isDefault == true) {
										this.Default = i;//默认保险
										this.profitPrices = this.kingList[i].profitPrice;
										this.insuranceNo = this.kingList[i].insuranceNo; //保险id
									}
								}
							}
							
							if (this.kinsList.length > 1) { //默认选择保险 航延
								for (let i in this.kinsList) {
									if (this.kinsList[i].isDefault == true) {
										this.Defaults = i;
										this.profitPrice = this.kinsList[i].profitPrice;
										this.insuranceNos = this.kinsList[i].insuranceNo;
									}
								}
							}
							this.commit();
						}
					} else {
						this.showToasts(rea.message);
					}
				} catch (e) {
					console.log(e)
					
				}

			},
			async userlis() { //出乘人信息
				let st = [];
				this.deptlists = [];
				if (this.isblcks == 4) { //改签状态下不能修改乘客证件
					for (let i = 0; i < this.butalist.length; i++) {
						this.deptlists.push({
							phone: this.butalist[i].phone,
							name: this.butalist[i].name,
							certType: this.butalist[i].certType,
							certNo: this.butalist[i].certNo,
							passengerBirth:this.butalist[i].passengerBirth
						})
					}
					this.resonIds = 0;
					this.old_resonIds = this.serch.apprvReasonId;
				} else {
					if (this.butalist.length != 0) {
						this.resonIds = 0;
						if (this.butalist[0].vehicleId != undefined) {
							this.vehicleId = this.butalist[0].vehicleId; //事前id
							this.reson = this.butalist[0].reson;
							this.old_resonIds = this.butalist[0].reson;
						}
						if (this.butalist[0].vehicleIdBack != undefined) {
							this.vehicleIdBack = this.butalist[0].vehicleIdBack; //事前id
						}
						for (let i = 0; i < this.butalist.length; i++) {
							st.push(this.butalist[i].passengerNo);
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
				}
			},
			
			clikst(id,its) { //费用详情
				let that = this;
				if(id == 2){
					if(its == 1){
						this.tansLists = this.kingList[parseInt(this.Default)].brief//航意险保险须知
					} else {
						this.tansLists = this.kinsList[parseInt(this.Defaults)].brief//航延险保险须知
					}
				}	
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
				console.log(this.costs,this.tkShowId)
			},
			isshows() {
				this.costs = false;
				this.switfals = false;
			},
			isshow() {
				this.ops_list = false
				this.blac_show = false;
				this.switfal = false;
				this.costs = false;
			},
			async submit() { //下单
				if (this.code == 200) {
					let that = this;
					let userlists = that.deptlists;
					let NameCenter = that.NameCenter; //成本中心
					let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
					let TravelDepartlist = that.TravelDepartlist; //部门审批人
					let apprvTaskStaffts = []; //审核人员
					let user_name = that.user_name; //联系人
					let user_ipone = that.user_ipone; //联系电话
					let isbtd = that.isbtd; //1因公2因私
					let isblcks = that.isblcks; //1事前 2事中 3违规再次审批 4改签
					let limitNativeRule = that.limitNativeRule;
					let usersalist = [];
					let passengerList = [];
					let ists = 0;
					let prods = [];
					if (that.allIsGift == true) {
						that.profitPrices = 0;
						that.profitPrice = 0;
					}
					if (that.insuranceNo != '') {//保险id 航意
						prods.push(that.insuranceNo + ',' + that.profitPrices)
					}
					if (that.insuranceNos != '') {//航延
						prods.push(that.insuranceNos + ',' + that.profitPrice)
					}
					let deptlists = this.deptlists;
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
							if (this.civilServiceTicket == 1) {
								usersalist.push({
									passengerType: "ADT",
									certNo: deptlists[i].list[k].okcardNo,
									certType: deptlists[i].list[k].okcardType,
									gender: deptlists[i].list[k].gender,
									name: deptlists[i].list[k].name,
									birthdate: birthdate,
									passengerPhone: Select_phone,
									historyPassenger: "1",
									productKeys: prods,
									depositBank: deptlists[i].list[k].carval, //开户银行
								});
							} else {
								usersalist.push({
									passengerType: "ADT",
									certNo: deptlists[i].list[k].okcardNo,
									certType: deptlists[i].list[k].okcardType,
									gender: deptlists[i].list[k].gender,
									name: deptlists[i].list[k].name,
									birthdate: birthdate,
									passengerPhone: Select_phone,
									historyPassenger: "1",
									productKeys: prods
								});
							}
							
							passengerList.push({
								"certificate": [{
									"certNo": deptlists[i].list[k].okcardNo,
									"certType": deptlists[i].list[k].okcardType
								}],
								"deptId": deptlists[i].list[k].deptId,
								"deptName": deptlists[i].list[k].deptName,
								"costcenterName": deptlists[i].list[k].costcenterName,
								"userId": deptlists[i].list[k].userId,
								"name": deptlists[i].list[k].name,
								"phone": Select_phone,
								"employeeType":deptlists[i].list[k].employeeType,
								"id": deptlists[i].list[k].passengerNo
							
							})
						}
					}

					let dat = {};
					let invs = "";
					if (limitNativeRule.length == 0 && this.isone) {
						ists = 0;
						invs = ""
					} else {
						invs = JSON.stringify({
							information: [limitNativeRule]
						});
						ists = 1;
					}
					if (!this.isone) {
						let limitNativeRules = that.limitNativeRules;
						if (limitNativeRules.length == 0) {
							ists = 0;
							invs = ""
						} else {
							invs = JSON.stringify({
								information: [limitNativeRule, limitNativeRules]
							});
							ists = 1;
						}
					}
					let shared = '';
					if (that.dataOne.flightsts.shared == true) {
						shared = "0"
					} else {
						shared = "1"
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
					dat = {
						totalSalePrice:this.num,//总价
						tips: this.tips,
						one_isviolation: ists, //第一段,是否超规
						one_violation: invs, //超规信息
						airlineType: 1, //航程类型
						needChdCabin: false, //是否需要获取儿童舱位价格，true是，false否。
						one_no: that.dataOne.flightsts.no, //第一段，航班号
						one_cabin: that.dataOne.shippingSpace.cabin, //第一段，舱位
						one_serviceLevel: that.dataOne.shippingSpace.level, //第一段舱位服务等级
						one_depart: that.dataOne.flightsts.depart, //第一段，出发城市
						one_departTerminal: that.dataOne.flightsts.departTerminal == null ? "" : that.dataOne.flightsts
							.departTerminal, //第一段，出发机场航站楼
						one_arrival: that.dataOne.flightsts.arrive, //第一段，到达城市
						one_arrivalTerminal: that.dataOne.flightsts.arriveTerminal == null ? "" : that.dataOne.flightsts
							.arriveTerminal, //第一段，到达机场航站楼
						one_plane: that.dataOne.flightsts.plane, //第一段，机型
						one_meals: that.dataOne.flightsts.meals, //第一段，餐食
						one_departDate: (that.dataOne.flightsts.departDate).substring(0, 10) + ' ' + (that.dataOne.flightsts.departTime), //第一段，出发日期that.dataOne.flightsts.departDate
						one_departTime: that.dataOne.flightsts.departTime, //第一段，出发时间
						one_arrivalTime:that.dataOne.flightsts.isarriveTime == true ?  that.dataOne.flightsts.arriveTime + '+1': that.dataOne.flightsts.arriveTime, //第一段，到达时间
						one_taxFee: that.dataOne.flightsts.taxFee, //第一段，机建
						one_fuelFee: that.dataOne.flightsts.fuelFee, //第一段，燃油
						one_discount: that.dataOne.shippingSpace.discount, //第一段公布折扣
						one_sharedBZ: shared, //是否共享航班
						one_mileage: that.dataOne.flightsts.mileage,
						one_fdprice: that.outboundTicketPrice,
						one_office: that.dataOne.flightsts.officeNo, //第一段office号
						yPrice: that.dataOne.flightsts.yprice, //第一段，Y舱价格
						cPrice: that.dataOne.flightsts.cprice, //第一段，C舱价格
						fPrice: that.dataOne.flightsts.fprice, //第一段，F舱价格
						ticketPrice: that.outboundTicketPrice, //票面价
						one_policyPrice: that.prices, //第二段，票面价
						one_policyId: that.dataOne.shippingSpace.salePrices[0].policyId,
						one_lastRebateId: that.dataOne.shippingSpace.lastRebateId,
						one_lastRebateProfitId: that.dataOne.shippingSpace.lastRebateProfitId,
						one_profitConfigId: that.dataOne.shippingSpace.profitConfigId, //第一段，控润配置ID
						one_nMinSalePrice: that.dataOne.flightsts.nMinSalePrice,
						one_nMinSalePriceFlight: that.dataOne.flightsts.nMinSalePriceFlight,
						one_nMinSalePriceCabin: that.dataOne.flightsts.nMinSalePriceCabin,
						one_nMinSalePriceTime: that.dataOne.flightsts.nMinSalePriceTime,
						passengerList: usersalist, //个人信息
						tripPassengerList: passengerList,
						travelBusinessType: isbtd, //因公因私
						contactsName: user_name, //联系人
						contactsPhone: user_ipone, //联系电话
					}
					if (this.civilServiceTicket == 1) {//是否公务员票 1为是
						dat['verifyWay'] = this.maoyid;////验证方式  0：公务员卡 1：预算单位
						dat['unitName'] = this.Units;  //预算单位名称
					}
					if (this.dataOne.shippingSpace.priceSource == 1) {//1是官方 2是美赢 官方需要追加参数
						if(this.context == null || this.context == 0){
							this.showToasts('官网验价失败，请联系管理员！')
							return
						}
						dat['one_isWebsite'] = 4;//4代表官方票
						dat['one_isOutCode'] = 9;  //9-官网
						dat["one_buyPrice"] = that.one_buyPrices;
						dat['one_context'] = that.context; //代表官方票
					}
					if (this.dataOne.shippingSpace.priceSource == 2) {//外采
						dat["one_buyPrice"] = that.dataOne.shippingSpace.salePrices[0].buyPrice;
			            dat["one_priceId"] = that.dataOne.shippingSpace.priceId;
			            dat["one_flightId"] = that.dataOne.flightsts.flightId;
					}
					if(this.civilServiceTicket != 1 && this.dataOne.shippingSpace.priceSource != 1){
						let isOutCode = that.dataOne.shippingSpace.priceSource == 2 ? 10 : 0;// 10-美赢  0-自己家
						dat['one_isOutCode'] = isOutCode;
					}
					if (!this.isone) {//往返
						if (that.dataTwo.flightsts.shared == true) {
							shared = "0"
						} else {
							shared = "1"
						}
						let relists = {
							two_serviceLevel: that.dataTwo.shippingSpace.level, //第二段舱位服务等级
							two_mileage: that.dataTwo.flightsts.mileage,
							two_fdprice: that.returnTicketPrice,
							two_no: that.dataTwo.flightsts.no, //第二段，航班号
							two_cabin: that.dataTwo.shippingSpace.cabin, //第二段，舱位
							two_depart: that.dataTwo.flightsts.depart, //第二段，出发城市
							two_departTerminal: that.dataTwo.flightsts.departTerminal == null ? "" : that.dataTwo.flightsts
							.departTerminal, //第二段，出发机场航站楼
							two_arrival: that.dataTwo.flightsts.arrive, //第二段，到达城市
							two_arrivalTerminal: that.dataTwo.flightsts.arriveTerminal == null ? "" : that.dataTwo.flightsts
							.arriveTerminal, //第二段，到达机场航站楼
							two_plane: that.dataTwo.flightsts.plane, //第二段，机型
							two_meals: that.dataTwo.flightsts.meals, //第二段，餐食
							two_departDate: (that.dataTwo.flightsts.departDate).substring(0, 10) + ' ' + (that.dataTwo.flightsts.departTime), //第二段，出发日期
							two_departTime: that.dataTwo.flightsts.departTime, //第二段，出发时间 that.dataTwo.flightsts.departTime
							two_arrivalTime: that.dataTwo.flightsts.isarriveTime == true ?  that.dataTwo.flightsts.arriveTime + '+1': that.dataTwo.flightsts.arriveTime, //第二段，到达时间
							two_taxFee: that.dataTwo.flightsts.taxFee, //第二段，机建
							two_fuelFee: that.dataTwo.flightsts.fuelFee, //第二段，燃油
							two_discount: that.dataTwo.shippingSpace.discount, //第二段公布折扣
							two_sharedBZ: shared, //是否共享航班
							two_office: that.dataTwo.flightsts.officeNo, //第二段office号
							yPrice2: that.dataTwo.flightsts.yprice, //第二段，Y舱价格
							cPrice2: that.dataTwo.flightsts.cprice, //第二段，C舱价格
							fPrice2: that.dataTwo.flightsts.fprice, //第二段，F舱价格
							ticketPrice2: that.returnTicketPrice, //第二段，票面价
							two_policyPrice: that.priceas, //第2段，小数点价
							two_policyId: that.dataTwo.shippingSpace.salePrices[0].policyId,
							two_lastRebateId: that.dataTwo.shippingSpace.lastRebateId,
							two_lastRebateProfitId: that.dataTwo.shippingSpace.lastRebateProfitId,
							two_profitConfigId: that.dataTwo.shippingSpace.profitConfigId, //第二段，控润配置ID
							two_nMinSalePrice: that.dataTwo.flightsts.nMinSalePrice,
							two_nMinSalePriceFlight: that.dataTwo.flightsts.nMinSalePriceFlight,
							two_nMinSalePriceCabin: that.dataTwo.flightsts.nMinSalePriceCabin,
							two_nMinSalePriceTime: that.dataTwo.flightsts.nMinSalePriceTime,
						}
						dat = {...dat,...relists};//将返回的值插入对象
						dat.airlineType = 2;//2为往返
					}
					console.log(this.resonName);
					if (that.isshowcenter == true && isbtd == 1) { //因公事中需要审核   因公事前需要二审
						
						let inst = 0; //1事前审批 2事中审批  3超标审批 4改签审批
						if(this.isblckt == true){//是否超规审批 或者事前需要审批
							inst = this.sttos;
						} else {
							inst = isblcks;
						}
						
						dat['apprvTask'] = {
							agree: false, //是否当前人审批
							taskType: inst, //1为事前2为事中，
							totalMoney: this.num,
							beforeMiddle: isblcks, //1为事前2为事中
							reason: this.resonName, //理由
							reasonId:this.reson,
							apprvTaskStaffs: apprvTaskStaffts, //审批人信息
							costId: NameCenter.id, //成本中心id
							costName: NameCenter.name, //成本中心名称
							remark: invs, //超规信息
						}
					} else if (isblcks == 1 && isbtd == 1 && that.isshowcenter == false) {//事前因公 免审或者 不需要二审
						dat['apprvTask'] = {
							taskType: isblcks, //1为事前2为事中，
							totalMoney: this.num,
							beforeMiddle: 1, //1为事前2为事中
							reason: this.resonName, //理由
							reasonId:this.reson,
							costId: NameCenter.id, //成本中心id
							costName: NameCenter.name, //成本中心名称
						}
					} else if (isbtd == 2 || (isbtd == 1 && that.isshowcenter == false)) {//因私 或者因公免审
						dat['apprvTask'] = {
							taskType: isblcks, //1为事前2为事中，
							totalMoney: this.num,
							beforeMiddle: 2, //1为事前2为事中
							reason: this.resonName, //理由
							reasonId:this.reson,
						}
					}
					if(isblcks == 1){//事前
						dat.apprvTask['vehicleId'] = this.vehicleId;//事前id
						dat.apprvTask['travelNo'] = this.serch.mokksli.travelNo;//事前id
						if(!this.isone){
							dat.apprvTask['vehicleIdBack'] = this.vehicleIdBack;
						}
					}
					try {
						const res = await tork.bookTicket(dat);
						that.iss = true;
						if(res.code == 200){
							if (res.data.message[0].code == 1) {
								that.showToasts("创建订单成功");
								setTimeout(()=>{
									uni.setStorageSync("sworders_od",{
										type:'aircraft',
										data:res.data.message[0].tradeNo
									});
									uni.switchTab({
										url: '/pages/order/order',
										success:function(){
										}
									})
								},1000)
							} else {
								that.showToasts(res.data.message[0].message)
							}
						} else {
							this.isbtns = false;
							that.showToasts(res.message)
						}
						
					} catch (e) {
						this.isbtns = false;
						console.log(e)
						
					}
				} else if (this.code == 'unknown') {
					this.isbtns = false;
					uni.showModal({
						title: '提示',
						content: '验舱验价失败，请重新预订',
					})
				} else {
					this.isbtns = false;
					uni.showModal({
						titel: '提示',
						content: '验舱验价中，请等待！如若长时间未响应请联系客服！'
					})
				}
			},
			async panduan(i) {
				//重复预订判断
				if(this.isbtns){
					return
				}
				this.MentionChange = i; //1是提交2是改签
				let uses = {};
				let usest = {};
				let usert = [];
				let that = this;
				let userlists = that.deptlists;
				let NameCenter = that.NameCenter; //成本中心
				let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
				let TravelDepartlist = that.TravelDepartlist; //部门审批人
				let apprvTaskStaffts = []; //审核人员
				let user_name = that.user_name; //联系人
				let user_ipone = that.user_ipone; //联系电话
				let user_remark = that.user_remark; //改签原因
				let isbtd = that.isbtd; //1因公2因私
				let isblcks = that.isblcks; //1事前 2事中
				let limitNativeRule = that.limitNativeRule;
				let getTravelPolicys = that.getTravelPolicys;
				if (getTravelPolicys != null && isbtd == 1 && isblcks != 4 &&(this.kingList.length>0 || this.kinsList.length > 0)) {
					if (getTravelPolicys.domesticInsuranceProduct == 0) {
						if (this.Default == 0 && this.Defaults == 0) {
							that.showToasts("请选择一个保险")
							return
						}
					}
				}
				if(userlists.length == 0){
					that.showToasts("请选择出行人!")
					return
				}
				if (that.Units == '' && this.Involuntary == true) {
					that.showToasts("请填写单位名称")
					return
				}
				for (let i = 0; i < userlists.length; i++) { //出行人信息
					if (userlists[i].carval == '' && this.volunteer == true && this.civilServiceTicket == 1) {
						that.showToasts("请填写开户银行")
						return
					}
				}
				if(this.isshowcenter == true){//有审批信息
					if (NameCenter.id == '') {
						that.showToasts("请选择成本中心！")
						return
					} else if (TravelCostCenlist.length == 0 && this.CostCi == true) {
						that.showToasts("请选择成本审批人！");
						return
					} else if (TravelDepartlist.length == 0 && this.CostCis == true) {
						that.showToasts("请选择部门审批人！");
						return
					} else if(that.isGetStaffList == true){//除了免审 其他必须有审批流程
						that.showToasts("未配置审批流程，请联系管理员设置！");
						return
					} else if (this.reson == '') {
						that.showToasts("请输入出差事由!");
						return
					}
				}
				if(isbtd == 1 && isblcks != 4 && that.reson == ''){
					that.showToasts("请输入出行事由！")
					return
				}
				if (user_name == '') {
					that.showToasts("请输入联系人！")
					return
				} else if (user_ipone == '') {
					that.showToasts("请输入联系电话！")
					return
				} else if (this.utils.zzPhone(user_ipone)) {
					that.showToasts("请输入正确的电话号码!")
					return
				} else if (isblcks == 4 && user_remark == '') {
					that.showToasts("请输入改签原因!")
					return
				}

				if (isblcks != 4) {
					let deptlists = this.deptlists;
					for (let i = 0; i < deptlists.length; i++) { //出行人信息
						for (let k in deptlists[i].list) {
							usert.push({
								cardNo: deptlists[i].list[k].okcardNo,
								cardType: deptlists[i].list[k].okcardType,
								name: deptlists[i].list[k].name,
								phone: deptlists[i].list[k].phone,
								passengerNo: deptlists[i].list[k].passengerNo
							});
						}
					}
				} else {
					for (let i = 0; i < userlists.length; i++) { //出行人信息
						usert.push({
							cardNo: userlists[i].certNo,
							cardType: that.cardtype(userlists[i].certType),
							name: userlists[i].name,
							phone: userlists[i].phone,
							passengerNo: that.passengerNoslist[i]
						});
					}
				}

				if (that.isone == true && isbtd == 1) {
					uses = {
						depart: that.dataOne.flightsts.depart, //第一段，出发城市
						arrive: that.dataOne.flightsts.arrive, //第一段，到达城市
						flightNo: that.dataOne.flightsts.no, //航班号
						departDate: that.dataOne.flightsts.departDate.substring(0, 10) + " " + that.dataOne.flightsts.departTime +
							':00', //第一段，出发日期
						staffIds: usert //出行人信息
					}
				} else if (that.isone == false && isbtd == 1) {
					uses = {
						depart: that.dataOne.flightsts.depart, //第一段，出发城市
						arrive: that.dataOne.flightsts.arrive, //第一段，到达城市
						flightNo: that.dataOne.flightsts.no, //航班号
						departDate: that.dataOne.flightsts.departDate.substring(0, 10) + " " + that.dataOne.flightsts.departTime +
							':00', //第一段，出发日期
						staffIds: usert //出行人信息
					}
					usest = {
						depart: that.dataTwo.flightsts.depart, //第二段，出发城市
						arrive: that.dataTwo.flightsts.arrive, //第二段，到达城市
						flightNo: that.dataTwo.flightsts.no, //航班号
						departDate: that.dataTwo.flightsts.departDate.substring(0, 10) + " " + that.dataOne.flightsts.departTime +
							':00', //第二段，出发日期
						staffIds: usert //出行人信息
					}
				}
				if (isbtd == 1) {
					try {
						this.isbtns = true;
						const ret = await certifi.ruleCheckRepeatBook(uses); //重复预定规则校验
						that.rulesReasons = ret.data.rulesReason;
						if (ret.code == 200) {
							let datas = ret.data.limitNativeRule;
							// let datas = {repeatBookingLimit: {7: "longzong,noayi,zyi",8:"oawdjk,awdaw,wad"}}
							if (JSON.stringify(datas) != "{}") {
								that.limitNativeRule = datas;
								that.repeatBookingLimit = datas.repeatBookingLimit; //重复预定规则政策
								if (JSON.stringify(that.repeatBookingLimit) == "{}") { //没有违反政策直接跳到预定页面
									if (that.MentionChange == 1) {
										that.submit(); //跳转提交
									} else {
										that.updata(); //跳转改签
									}
								} else {
									that.respeatBook = [];
									that.bools = true;
									that.notbooking = false;
									for (let i in that.repeatBookingLimit) {
										if (i == 7) { //不管控
											that.notbooking = false;
										}
										if (i == 8) { //提示重复但不限定
											that.idstarle = true
											that.bools = true;
											that.respeatBook.push({
												name: i,
												list: that.repeatBookingLimit[i]
											})
										}
										if (i == 9) { //提示且不可预订
											that.bools = false;
											that.respeatBook.push({
												name: i,
												list: that.repeatBookingLimit[i]
											})
										}
									}
									if (that.respeatBook.length > 0) {
										that.staleve = true;
									} else {
										if (that.MentionChange == 1) {
											that.submit(); //跳转提交
										} else {
											that.updata(); //跳转改签
										}
									}
								}
							} else {
								if (this.MentionChange == 1) {
									this.submit(); //跳转提交
								} else {
									this.updata(); //跳转改签
								}
							}

							if (JSON.stringify(ret.data.limitNativeRule) != "{}") {
								
								// that.showToasts("不能重复预订！");
								return
							}
						} else {
							
							that.showToasts(res.message)
						}
						if (that.isone == false) {
							try {
								const ret = await certifi.ruleCheckRepeatBook(usest); //重复预定规则校验
								if (ret.code == 200) {
									if (JSON.stringify(ret.data.limitNativeRule) != "{}") {
										
										that.showToasts("不能重复预订！");
										return
									}
								} else {
									
									that.showToasts(res.message)
								}
							} catch (e) {
								console.log(e)
								
							}
						}
					} catch (e) {
						this.isbtns = false;
						console.log(e)
						
					}
				} else {
					
					if (that.MentionChange == 1) {
						that.submit(); //跳转提交
					} else {
						that.updata(); //跳转改签
					}
				}
			},
			cits_btn() { //继续预定
				if (this.idstarle && this.rulesReasons[this.chines.index].chineseDesc == '') {
					this.showToasts('请选择高价超规原因')
				} else {
					let datlist = {}
					if (this.idstarle) {
						for (let k in this.repeatBookingLimit) { //高价政策
							if (k == 8) {
								this.repeatBookingLimit[k] = {
									usernames: this.repeatBookingLimit[k],
									reasons: this.rulesReasons[this.chines.index].chineseDesc
								}
							}
						}
					}
					Object.assign(this.limitNativeRule, {
						repeatBookingLimit: this.repeatBookingLimit
					})
					
					if (this.MentionChange == 1) {
						this.submit(); //跳转提交
					} else {
						this.updata(); //跳转改签
					}
				}
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
			rblcok() {
				uni.navigateTo({
					url: '../particularst?data=' + JSON.stringify(this.packlist.data)
				});
			},
			chineseChange(e) { //航意险
				this.Default = e.detail.value;
				if (this.Default == 0) {
					this.profitPrices = 0;
				} else {
					for (let k in this.kingList) {
						if (k == this.Default) {
							this.insuranceNo = this.kingList[k].insuranceNo;
							this.isGift = this.kingList[k].isGift;
							if (this.isGift == 1) { //1是赠送
								this.profitPrices = 0;
							} else {
								this.profitPrices = this.kingList[k].profitPrice;
							}
						}
						if (this.kingList[k].profitPrice == null) {
							this.profitPrices = 0;
						}
					}
				}
				this.commit();
			},
			chineseChanges(e) { //低价政策
				this.chiness.index = e.detail.value;
			},
			chineseChangea(e) { //航延险
				this.Defaults = e.detail.value;
				if (this.Defaults == 0) {
					this.profitPrice = 0;
				} else {
					for (let k in this.kinsList) {
						if (k == this.Defaults) {
							this.insuranceNos = this.kinsList[k].insuranceNo;
							this.isGifts = this.kinsList[k].isGift;
							if (this.isGifts == 1) {//1是赠送
								this.profitPrice = 0;
							} else {
								this.profitPrice = this.kinsList[k].profitPrice;
							}
						}
						if (this.kinsList[k].profitPrice == null) {
							this.profitPrice = 0;
						}
					}
				}
				this.commit();
			},
			commit() {
				let fas = this.profitPrices + this.profitPrice; //保险价格
				this.fasp = fas;
				let tempIsGift = false;
				if (this.Default == 0 && fas == 0) {//航意险
					tempIsGift = true;
				} else {
					if (this.isGift == 1) {//是否赠送票 
						tempIsGift = true;
					} else {
						tempIsGift = false;
					}
				}
				let tempIsGifts = false;
				if (this.Defaults == 0 && fas == 0) {//航延险
					tempIsGifts = true;
				} else {
					if (this.isGifts == 1) {//是否赠送票 
						tempIsGifts = true;
					} else {
						tempIsGifts = false;
					}
				}
				// domesticInsuranceTips 1为选了保险 收服务费 2为不收
				// domesticFlightChange 改签服务费
				this.allIsGift = false;
				if (tempIsGift == true && tempIsGifts == true) {
					this.allIsGift = true;
				}
				
				if(this.isblcks == 4){//改签服务费
					this.tips = this.getTravelPolicys.domesticFlightChange;//改签服务费
				} else { 
					if (this.isbtd == 1) {//因公
						let OnlinePublicCabinServiceFee = this.getTravelPolicys.dpsOnlinePublicCabinServiceFee; //因私服务费
						if ('F' == this.dataOne.shippingSpace.level) {
							this.tips = OnlinePublicCabinServiceFee.f;
						} else if ('C' == this.dataOne.shippingSpace.level) {
							this.tips = OnlinePublicCabinServiceFee.c;
						} else {
							this.tips = OnlinePublicCabinServiceFee.y;
						}
					} else {
						let OnlinePrivateCabinServiceFee = this.getTravelPolicys.dpsOnlinePrivateCabinServiceFee; //因公服务费
						if ('F' == this.dataOne.shippingSpace.level) {
							this.tips = OnlinePrivateCabinServiceFee.f;
						} else if ('C' == this.dataOne.shippingSpace.level) {
							this.tips = OnlinePrivateCabinServiceFee.c;
						} else {
							this.tips = OnlinePrivateCabinServiceFee.y;
						}
					}
				}
				//因公判断选取保险是否收服务费 或者 因私选择保险不收服务费
				if(((this.isbtd == 1 && this.getTravelPolicys.domesticInsuranceTips == 2) || this.isbtd == 2 ) && (this.Default !=0 ||this.Defaults !=0)){//
					this.tips = 0
				}
				
				let nus = 0;
				let nut = 0;
				this.leng = this.butalist.length;
				if (this.isone) { //单程
					this.toReturn = 1;
					this.totalAmount(1)
				} else {
					this.toReturn = 2;
					this.totalAmount(2);
				}
			},
			//明细
			totalAmount(bo) { //总金额
				let fas = this.fasp;
				let prices = this.prices;
				let priceas = this.priceas;
				let _this = this;
				let nus = 0;
				let nut = 0;
				if (bo === 1) {
					if (prices != 0 && prices != null && prices != '') {
						nus = prices + this.dataOne.flightsts.fuelFee + this.dataOne.flightsts.taxFee; //去
					} else {
						nus = this.dataOne.shippingSpace.price + this.dataOne.flightsts.fuelFee + this.dataOne.flightsts.taxFee; //去
					}
					this.num = parseFloat(nus) + parseFloat(fas) + this.tips;
					this.num =  (this.num * 1000 * this.leng)/1000;
				} else {
					if (prices != 0 && prices != null && prices != '') {
						nus = prices + _this.dataOne.flightsts.fuelFee + _this.dataOne.flightsts.taxFee; //去
					} else {
						nus = _this.dataOne.shippingSpace.price + _this.dataOne.flightsts.fuelFee + _this.dataOne.flightsts.taxFee; //去
					}
					if (priceas != null && priceas !== 0) {
						nut = nut = priceas + _this.dataTwo.flightsts.fuelFee + _this.dataTwo.flightsts.taxFee;
					} else {
						nut = _this.dataTwo.shippingSpace.price + _this.dataTwo.flightsts.fuelFee + _this.dataTwo.flightsts.taxFee;
					}
					_this.num = parseFloat(nus) + parseFloat(nut) + parseFloat(fas * 2) + parseFloat(_this.tips * 2);
					_this.num = (this.num * 1000 * this.leng)/1000;
				}

			},
			boolase() {
				if (this.bool == true) {
					this.bool = false;
					this.mao = false;
					this.yi = true;
				} else {
					this.bool = true;
					this.mao = true;
					this.yi = false;
				}
			},
			ctlist(item) { //点击查看说明
				this.stlistad = this.backrule
				this.sittext = '退票通知'
				this.switfals = true;
			},
			companym_click() {
				this.fxli = false;
				setTimeout(() => {
					this.companyi_click = false;
				}, 300)
				// this.dimiss = false;
			},
			company_click() {
				this.fxli = true;
				this.companyi_click = true;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container999 {
		font-size: 32upx;
		width: 100%;

		.Navigation {
			width: 100%;
			height: 90upx;
			display: flex;
			align-items: center;
			background: linear-gradient(to right, #4E92FD 0%, #6E46FE 100%);

			.ongbutn {
				width: 86%;
				color: #FFFFFF;
				text-align: center;
			}
		}
		.bjmian{
			background:linear-gradient(to right, #4E92FD 0%, #6E46FE 100%);
			width: 100%;
			height: 200upx;
			position: relative;
			.mian {
				position: absolute;
				width: 100%;
				padding-bottom: 120upx;
				top:30upx;
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
					width: calc(100% - 80upx);
					padding: 20upx 40upx;
					height: auto;
					background-color: #FFFFFF;
					transition: all 0.3s ease;
					transform: translateY(100%);
					z-index: 9999;
					border-top-left-radius: 20upx;
					border-top-right-radius: 20upx;
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

				.black_mu {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: black;
					opacity: 0.5;
					z-index: 700;
				}

				.min_mian {
					padding: 20upx;
					.message {
						width: 100%;
						// height: 100upx;
						margin-right: 20upx;
						border-radius: 15upx;
						.message_top {
							line-height: 70upx;
							font-size: 25upx;
							color: #666666;
							background-color: #FFFFFF;
							border-top-right-radius: 15upx;
							border-top-left-radius: 15upx;
							.dates {
								text-indent: 20upx;
							}

							.week {
								text-indent: 30upx;
							}

							.imgs {
								image{
									width: 25upx;
									height: 15upx;
								}
							}
						}
						.silt{
							text-indent: 30upx;
							line-height: 40upx;
						}
						.top {
							width: 100%;
							background: #ffffff;

							.above {
								padding: 10upx 0;
								display: flex;
								align-items: center;
								justify-content: space-between;
								margin:0 60upx 10upx 60upx;
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
										.tspan{
											font-size: 22upx;
											color: #007AFF;
										}
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
									view{
										margin-top:15upx;
										image{
											width: 150upx;
											height: 20upx;
										}
									}
								}
							}
							.stsbt {
								display: flex;
								position: relative;
								font-size: 22upx;
								margin-left: 60upx;
								.below {
									display: flex;
									font-size: 22upx;
									text-align: center;
									color: #666666;
									padding-bottom: 20upx;
									image{
										width: 30upx;
										height: 30upx;
										margin-right: 10upx;
									}
								}
							}
						}
						.message_bottom {
							line-height: 88upx;
							justify-content: space-between;
							border-top: 2px solid rgba(233, 233, 233, 0.5);
							background-color: #FFFFFF;
							border-bottom-left-radius: 15upx;
							border-bottom-right-radius: 15upx;
							.jiage {
								display: flex;
								margin: auto 0;
								font-size: 24upx;
								color:#666666;
								margin-left: 40upx;
								.changing {
									margin: auto 0;
									color: #007AFF;
									margin-left: 40upx;
								}
							}
						}
					}
				}
				.ipablos{
					margin-top: 20upx;
					color: #FF9000;
					line-height: 30upx;
					padding: 0 40upx;
					font-size: 22upx;
				}
				.insurance {
					width: 100%;
					color: #000000;
					.Shipping_insurance {
						width: calc(100% - 40upx);
						background: #FFFFFF;
						border-radius: 15upx;
						margin: 20upx 20upx;
						align-items: center;
						.tswos{
							padding: 0 20upx;
							display: flex;
							justify-content: space-between;
							align-items: center;
							font-size: 22upx;
							color: #333333;
							height:70upx;
							border-top: 1px solid rgba(212, 212, 212, 0.5);
							.tswo_le{
								color: #FF9000;
							}
							.tswo_ri{
								span{
									color: #007AFF;
								}
							}
						}
						.insurancemoney{
							font-size: 26upx;
							line-height: 100upx;
							border-bottom:1px solid rgba(212, 212, 212, 0.5);
						}
						.navigas {
							width: 90%;
							line-height: 100upx;
							margin-left: 10px;
							border-radius: 10upx;
							text-indent: 15upx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							text-overflow: ellipsis;
							display: flex;
							font-size: 30upx;
						}
						.navimd {
							width: 90%;
							color: #000000;
						}
					}

					.insurance_first {
						display: flex;
						border-bottom: 1upx solid #f8f8f8;
						padding: 20upx 20upx;

						.insurance-left {
							width: 98%;

							.insurance-top {
								display: flex;
							}
						}

						.insurance-right {

							checkbox {}
						}
					}
				}

				.hint {
					width: 100%;
					height: 80upx;
					font-size: 25upx;
					padding: 20upx 0;
					color: #ed8471;
					background: #fff2d7;
				}

				.payment {
					width: 100%;
					line-height: 80upx;
					background: #FFFFFF;
					display: flex;
					justify-content: space-between;
					margin-bottom: 120upx;
				}

				.istaf {
					width: 100%;
					margin-top: 20upx;
					font-size: 30upx;

					.ravelv {
						width: calc(100% - 40upx);
						padding: 0 20upx;
						background: #FFFFFF;
						margin-bottom: 20upx;
						border-radius: 15upx;
						.ts {
							line-height: 90upx;
							display: flex;
							margin-left: 20upx;
							border-bottom:1px solid #f7f8f9;
							.rav_left {
								width: 25%;
								text-align: left;
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
							margin-left: 20upx;
							border-bottom:1px solid #f7f8f9;
							.rav_left {
								width: 25%;
								text-align: left;
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

				.bottoms {
					width: 100%;
					line-height: 88upx;
					display: flex;
					position: fixed;
					bottom: 0upx;
					left: 0;
					z-index: 800;
					border-top:1px solid #eeeeee;
					.btnsp {
						// position: absolute;
						// left: 0;
						// top: 0;
						width: 100%;
						height: 110upx;
						display: flex;

						.bottoms_lift {
							width: 100%;
							padding-left: 30upx;
							background: #FFFFFF;
							display: flex;
							line-height: 110upx;
							justify-content: space-between;
							font-size: 46upx;
							.botmrigt{
								display: flex;
								.imgs {
									image{
										width: 25upx;
										height: 15upx;
										margin-bottom:10upx;
										margin-left:10upx;
									}
								}
								.bottoms_right {
									width: 218upx;
									border-radius: 50upx;
									color: #FFFFFF;
									font-size: 30upx;
									text-align: center;
									vertical-align: inherit;
									height: 74upx;
									
									line-height: 74upx;
									background: #ffa63e;
									margin: 20upx;
								}
								.btoks{
									background-color: #b3b3b3;
									color: #FFFFFF;
								}
							}
							
						}

						
					}
				}

				.staleve {
					position: fixed;
					left: 0;
					top: 0;
					width: calc(100% - 100upx);
					height: 100%;
					padding: 0 50upx;
					background: rgba(0, 0, 0, .3);
					z-index: 810;
					display: flex;
					align-items: center;
					justify-content: center;

					.stalist {
						width: 100%;
						// height: 50%;
						// overflow: auto;
						border-radius: 20upx;
						font-size: 35upx;
						line-height: 90upx;
						background: #F1F1F1;

						.quan {
							max-height: 600upx;
							overflow: scroll;

							.statop {
								padding: 20upx;

								.reds {
									width: 100%;
									height: 70upx;
									text-align: center;
									display: flex;
									align-items: center;
									justify-content: center;
									color: red;

									.ts_text {
										padding: 0 20upx;
										line-height: 50upx;
										border-radius: 50upx;
										border: 2upx solid red;
									}
								}

								.setlist {
									line-height: 50upx;
									font-size: 30upx;
									margin: 10upx 0;

									.setbod {
										border: 2upx solid #FFFFFF;
										border-radius: 15upx;

										.styul {
											width: 100%;
											margin: 10upx 0;

											.styli_top {
												width: 100%;
												color: red;
												text-align: center;
												font-size: 30upx;
												line-height: 45upx;
											}

											.stulis {
												display: flex;

												.styli_left {
													width: 25%;
													display: flex;
													align-items: center;
													justify-content: flex-end;
												}

												.styli_right {
													width: 75%;
													margin-left: 5%;

													.wors {
														width: 80%;
														font-size: 30upx;
														height: 50upx;

														picker {
															border: $uni-color-primary solid 1upx;
														}
													}
												}
											}
										}
									}
								}
							}
						}

						.btnsti {
							width: 100%;
							height: 90upx;
							line-height: 90upx;
							text-align: center;
							display: flex;
							// position: fixed;
							// bottom: 300upx;
							// left: 0;

							.roblck {
								flex: 1;
								height: 90upx;
								background: #FFFFFF;
								border-bottom-left-radius: 15upx;
							}

							.btnok {
								flex: 1;
								height: 90upx;
								border-bottom-right-radius: 15upx;
								color: #FFFFFF;
								background: linear-gradient(to right, #4E92FD 0%, #6E46FE 100%);
							}
						}
					}
				}

				.mask {
					position: fixed;
					top: 0;
					left: 0;
					z-index: 700;
					width: 100%;
					height: 100%;
					background: rgba(0, 0, 0, 0.4);
					// display: none;
				}

				.pop_up {
					position: fixed;
					bottom: -100%;
					left: 0;
					width: 100%;
					// height: 100%;
					overflow: scroll;
					background: #edf0f5;
					z-index: 1000;
					text-align: center;
					align-items: center;
					background: #eceff3;

					.pop_op {
						width: 100%;
						padding: 20upx 0;
						background: #FFFFFF;
					}

					.pop_ip {
						padding: 20upx 0;
						color: #b0b1b2;
					}
				}

				.sname {
					width: 100%;
					margin: 20upx 0;
					padding: 20upx 0;
					// height: 100upx;
					background: #FFFFFF;
					display: flex;

					input {
						width: 100%;
						font-size: 26upx;
						height: 70upx;
					}

					.pons {
						// width: 100%;
						// height: 130upx;
						font-size: 26upx;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.navigas {
						padding: 0 15upx;
						line-height: 50upx;
						margin-bottom: 5px;
						border: #C8C7CC solid 1upx;
					}
				}

				.userlist {
					width: calc(100% - 40upx);
					color: #333333;
					font-size: 30upx;
					margin: 0 20upx;

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

				

				.costlists {
					position: fixed;
					bottom: 0;
					left: 0;
					padding-bottom: 90upx;
					transition: all 0.3s ease;
					-webkit-transform: translateY(100%);
					transform: translateY(100%);
					width: 100%;
					z-index: 780;
					line-height: 90upx;
					background: #ffffff;
					border-top-left-radius: 20upx;
					border-top-right-radius: 20upx;
					font-size: 30upx;
					overflow: auto;
					.tansList{
						height: 800upx;
						padding: 0 40upx;
						text-indent: 40upx;
						font-size: 24upx;
						color: #333333;
					}
					.costlist_s {
						padding: 10upx 40upx;
						.cost_li {
							width: 100%;
							line-height: 90upx;
							display: flex;
							justify-content: space-between;
							.scse_l {
								display: flex;
								align-items: center;
								// .scbord{
								// 	margin-left: 20upx;
								// 	border-top:1px dashed #c0c0c0;
								// }
							}
							.scse_r {
								display: flex;
								justify-content: space-between;
								.corssize {
									text-align: right;
									color: #FF9000;
								}
							}
						}
					}
				}
				.shows {
					-webkit-transform: translateY(0);
					transform: translateY(0);
				}
				.istaf {
					width: 100%;
					margin-top: 20upx;
					font-size: 30upx;
					.ravelv {
						width: calc(100% - 80upx);
						margin: 0 20upx;
						background: #FFFFFF;
						margin-bottom: 20upx;
						
						.ts {
							line-height: 90upx;
							display: flex;
							border-bottom:1px solid #f7f8f9;
							.rav_left {
								width: 25%;
								text-align: left;
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
									}
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
					height: 90upx;
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

						.scslist {
							padding-right: 10upx;
							font-size: 28upx;
							color: #FF9000;
						}
					}

					.oksl_r {
						width: 30%;
						font-size: 35upx;
						height: 90upx;
						text-align: center;
						background: #FF9000;
					}
				}

				
				.hides {
					bottom: -100%;
					width: 100%;
					transition: bottom 0.4s;
				}
			}
		}
	}
</style>
