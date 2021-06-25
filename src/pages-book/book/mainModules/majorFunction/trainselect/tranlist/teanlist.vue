<template>
	<view class="tranlist">
		<loading>
		</loading>
		
		<headnavigation titles="车次详情"></headnavigation>
		<view class="tan_top">
			<view class="tan_t_t">
				<view class="above">
					<!-- 时间地址 -->
					<view class="above_left">
						<view style="font-size:26upx;text-align: left;margin-bottom:10upx;margin-left:5upx;">{{times(taanlist.item.dats)}}</view>
						<view class="go_off">
							{{taanlist.item.fromTime}}
						</view>
						<view class="arrival_time">
							{{taanlist.item.fromStation}}
						</view>
					</view>
					<view class="above_centre">
						<view style="font-size: 20upx;color:#DBDBFF">
							{{taanlist.item.trainNo}}
						</view>
						<view>
							<image src="@/static/img/home/home_stopover.png"></image>
						</view>
						<view style="font-size: 20upx;color:#DBDBFF">
							{{timey(taanlist.item.runTimeSpan)}}
						</view>
						<view class="tan_bt" @click="gettrainWs">经停信息</view>
					</view>
					<view class="above_right" style="text-align: left;">
						<view style="font-size:26upx;text-align: left;margin-bottom:10upx;margin-left:30upx;">{{times(taanlist.item.dats)}}</view>
						<view class="go_off">
							{{taanlist.item.toTime}}
						</view>
						<view class="arrival_time">
							{{taanlist.item.toStation}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="trambtm">
			<view class="trlist" v-for="(item,index) in taanlist.item.seats" :key="index">
				<view class="trasli" style="font-weight: bold;">
					{{item.seatName}}
				</view>
				<view class="trasli" style="color: #FFA63E;text-align: center;font-ize:24upx;">
					￥{{item.price}}
				</view>
				<view class="trasli" style="text-align: center;font-ize:26upx;" v-if="item.seats >= 0">
					{{item.seats}}张
				</view>
				<view class="trasli" style="text-align: center;font-ize:26upx;" v-else>
					{{item.seats}}
				</view>
				<view class="trasli" style="display: flex;align-items: center;justify-content: center;">
					<view class="traybt trayes" v-if="item.seats > 0 || item.seats == '有'" @click="oktran(item,index)">
						预定
					</view>
					<view class="traybt trano" v-else @click="noticket">
						无票
					</view>
				</view>
			</view>
		</view>
		<view class="fixs_list" :class="fxli ? 'shows' : 'hides'">
			<view class="Navigation">
				<view @click="fxli = false" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
				<view class="ongbutn">
					经停站
				</view>
			</view>
			<view class="fix_los" v-for="(item,index) in trklist" :key="index">
				<view class="fitx_les stsb">
					<view class="scks">
						{{index + 1}}
					</view>
					{{item.fromStation}}
				</view>
				<view class="fitx_les" style="text-align: center;">
					{{item.departureTime}}
				</view>
				<view class="fitx_les" v-if="index != 0" style="text-align: center;">
					停{{item.stayTimeSpan}}分钟
				</view>
				<view class="fitx_les" v-if="index == 0" style="text-align: center;">
					--
				</view>
			</view>
		</view>
		<violation @emviolation="emviolation" :platformlist="platformlist" :notbooking="notbooking" :limitNativeRule="nativeTrainRules" :rulesReasons="rulesReasons"></violation>
	</view>
</template>

<script>
	import order from '@/api/order.js'
	import tork from '@/api/torowk.js'
	import violation from '@/components/view/book/violation/violation.vue'
	export default {
		components:{
			violation
		},
		data() {
			return {
				isblckt:false,//事前是否2次审批
				chines:{
					index:0
				},
				platformlist:[],//超规信息
				isarsrl: false,//改签因公是否需要审核
				astlis: [], //当前座位信息
				notbooking: false,
				idstarle: false,
				rulesReasons: [],
				nativeTrainl: [],
				pricdesc: '', //座位等级超规原因
				nativeTrainRules: {}, //座位等级超规信息
				staleve: false,
				fxli: false,
				
				
				taanlist: {},
				tasi: [{
					name: 'GDC-高铁/动车/城际',
					id: 'GDC'
				}, {
					name: 'Z-直达特快',
					id: 'Z'
				}, {
					name: 'KT-空调特快',
					id: 'KT'
				}, {
					name: ',KKS-空调快速',
					id: ',KKS-空调快速'
				}, {
					name: 'GDC-高铁/动车/城际',
					id: 'GDC'
				}],
				trklist: [], //经停站
			}
		},
		onLoad(tms) {
			let dat = uni.getStorageSync('teanlistData');
			this.taanlist = dat;
		},
		mounted() {
			
		},
		methods: {
			emviolation(wa){//继续预订
				this.nativeTrainRules = wa.davalue;//处理过的违规信息
				this.othotrlis(); //跳转订单页面
			},	
			noticket(){
				this.showToasts('没票了哦！');
			},
			chineseChange(e){//选择高等级超规原因
				this.chines.index = e.detail.value;
			},
			async oktran(item,index) { //点击预定判断是否超规
				this.isblckt = false;
				if(item.seatName == '无座'){//无座的时候 类型传人最低等座位类型
					if(('GDC'.indexOf(this.taanlist.item.trainClass) == -1)){//不是高铁
						item.seatType = '1';
					} else { //是高铁
						item.seatType = 'O';
					}
				}	
				this.astlis = item;
				if(this.taanlist.isbtd == 2){ //因私
					this.othotrlis(); //跳转订单页面
				} else if(this.taanlist.isbtd == 1) { //因公
					let ast = [];
					let arr = [];
					if(this.taanlist.isblcks == 4){//改签
						arr = this.taanlist.userlistnos;
						for (let i = 0; i < arr.length; i++) {
							ast.push({
								passengerNo: arr[i]
							})
						}
					} else {
						let sarr = this.taanlist.butalist;
						
						for (let i = 0; i < sarr.length; i++) {
							arr.push(sarr[i].passengerNo)
							ast.push({
								passengerNo: sarr[i].passengerNo
							})
						}
					}
					
					try{
						this.isarsrl = await this.apiutils.judgeApprv(arr);//用户是否免审  true为免审
					}catch(e){
						console.log(e)
						
					}
					let dat = {
						seatLimit: item.seatName,
						passengerList: ast
					}
					
					try{
						const res = await tork.checkTrainRule(dat);//获取是否超规
						
						if (res.code == 200) {
							//1=只记录不提示，2=提示超规不必选择原因，3=提示超规必选原因，4=不可预定 5超规
							this.nativeTrainRules = {};
							this.rulesReasons = res.data.rulesReason; //原因
							this.rulesReasons.unshift({chineseDesc:'　'})
							if (JSON.stringify(res.data.nativeTrainRules) == '{}') { //没有违反政策直接跳到预定页面
								this.othotrlis(); //跳转订单页面
							} else {
								let dal = {nativeTrainRules:res.data.nativeTrainRules}; //违规信息
								this.nativeTrainRules = dal;
								let sus = [];
								this.notbooking = false;
								this.isblckt = false;
								this.platformlist = [];
								for (let k in dal) { //插入所有的违规信息
									sus.push({
										index: 0,
										name: '座位等级超规',
										names: k,
										list: this.platname(dal[k]),
										ishow:false
									})
								}
								let sitshows = false;
								for (let p in sus) {
									for (let k in sus[p].list) {
										if(sus[p].list[k].va != 1){
											sitshows = true;
											sus[p].ishow = true;
											if (sus[p].list[k].va == 4) {
												this.notbooking = true;
											}
											if (sus[p].list[k].va == 5) {
												this.isblckt = true; //是否再次审批
											}
										}
									}
								}
								if(sitshows == true){
									this.platformlist = sus;
								} else {
									this.othotrlis();
								}
							}
						} else {
							this.showToasts(res.message)
						}
					}catch(e){
						console.log(e)
						
					}
				}
			},
			platname(list) {
				let su = [];
				for (let k in list) {
					if (k == 1) {
						su.push({
							va: k,
							name: '只记录不提示',
							list: list[k]
						})
					} else if (k == 2) {
						su.push({
							va: k,
							name: '超规不必选择原因',
							list: list[k]
						})
			
					} else if (k == 3) {
						su.push({
							va: k,
							name: '超规必须选择原因',
							list: list[k],
							reasons: ''
						})
			
					} else if (k == 4) {
						su.push({
							va: k,
							name: '不可预定',
							list: list[k]
						})
					} else if (k == 5) {
						su.push({
							va: k,
							name: '超规需重新审核',
							list: list[k]
						})
					}
				}
				return su;
			},
			othotrlis() {
				let data = {
					ranst: this.taanlist,
					nativeTrainRules: this.nativeTrainRules,
					astlis: this.astlis,
					isarsrl: this.isarsrl,//是否免审
					isblckt: this.isblckt,//事中改签走超标审批流 事前是否2次审批
				}
				uni.setStorageSync('reanadlistData',data)
				uni.navigateTo({
					url: './reanadlist'
				})
			},
			async gettrainWs() { //获取当前经停站
				
				let dat = this.taanlist.item.dats.split('-');
				let tis = dat[0] + dat[1] + dat[2];
				try{
					const res = await tork.trainWs({
						trainNo: this.taanlist.item.trainNo,
						trainDate: tis
					})
					
					if (res.code == 200) {
						
						this.trklist = res.data.stations;
						this.fxli = true;
					}
				}catch(e){
					console.log(e)
					
				}
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
			type(item) {
				for (let i = 0; i < this.tasi.length; i++) {
					if (this.tasi[i].id.indexOf(item) != -1) {
						return this.tasi[i].name
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.tranlist {
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
		.fixs_list {
			position: fixed;
			bottom: -100%;
			left: 0;
			width: 0;
			height: 100%;
			overflow: scroll;
			background: #edf0f5;
			z-index: 1000;

			.fix_los {
				display: flex;
				width: calc(100% - 40upx);
				padding: 0 20upx;
				height: 90upx;
				line-height: 90upx;
				background: #FFFFFF;
				margin-bottom: 2upx;

				.fitx_les {
					flex: 1;
					font-size: 30upx;
				}

				.stsb {
					display: flex;
					align-items: center;

					.scks {
						margin-right: 10upx;
						width: 50upx;
						text-align: center;
						color: #FFFFFF;
						height: 35upx;
						line-height: 35upx;
						border-radius: 35upx;
						background: #90B2E7;
					}
				}
			}
		}

		.shows {
			bottom: 0;
			width: 100%;
			transition: bottom 0.4s;
		}

		.hides {
			bottom: -100%;
			width: 100%;
			transition: bottom 0.4s;
		}

		.tan_top {
			width: 100%;
			.above {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin:0 46upx 40upx 46upx;
				.above_left {
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
						margin-left: 30upx;
						margin-top:10upx;
					}
				}
				.above_centre {
					width: 200upx;
					text-align: center;
					margin-bottom: 10upx;
					margin: 0 20upx;
					position: relative;
					view{
						margin-top:15upx;
						image{
							width: 200upx;
							height: 44upx;
						}
					}
					.tan_bt{
						position: absolute;
						top: 50upx;
						left: 50upx;
						font-size: 20upx;
						color: #FFFFFF;
					}
				}
			}


			.tan_t_t {
				width: calc(100% - 40upx);
				padding: 20upx;
				color: #FFFFFF;
				font-size: 35upx;
				background: linear-gradient(to right, #4E92FD 0%, #6E46FE 100%);

				.tants_t {
					line-height: 70upx;
					margin-bottom: 20upx;
				}

				.tans_o {
					display: flex;

					.tans_os {
						flex: 1;
						text-align: center;

						.tancks {
							display: flex;
							img{
								width: 270upx;
								height: 54upx;
							}
						}
					}

					.tanst {
						line-height: 70upx;
						font-size: 50upx;
						display: flex;
					}

					.tans_li {
						line-height: 35upx;
					}

					.tans_tl {
						flex: 1;
						text-align: left;
					}

					.tans_tr {
						flex: 1;
						text-align: right;
					}
				}
			}
		}

		.trambtm {
			width: 100%;
			margin-top: 40upx;

			.trlist {
				padding: 0 40upx;
				font-size: 30upx;
				width: calc(100% - 80upx);
				height: 90upx;
				line-height: 90upx;
				display: flex;
				flex-wrap: wrap;
				align-content: space-between;
				background: #FFFFFF;
				margin-bottom: 2upx;

				.trasli {
					flex: 1;
					font-size: 32upx;
					color: #000000;
					.traybt {
						width: 140upx;
						height: 60upx;
						text-align: center;
						line-height: 60upx;
						border-radius: 10upx;
						color: #FFFFFF;
					}

					.trayes {
						background: #FF9000;
					}

					.trano {
						background: #0066CB;
					}
				}
			}
		}
	}
</style>
