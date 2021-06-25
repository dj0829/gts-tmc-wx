<template>
	<view class="muappli">
		<loading>
		</loading>
		<view class="pli_top">
			<view class="Navigation">
				<view class="smtis">
					<view @click="rblcok" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
				</view>
				<view class="ongbutn" v-if="!isfl">
					我的出差单
				</view>
				<view class="ongbutn" v-if="isfl">
					我的审批单
				</view>
				<view class="smtis">
				</view>
			</view>
			<view class="bok_pli">
				<view class="box_left" @click="opclk">
					{{optios}}
					<view class="iconfont" style="color: #C0C0C0;font-size: 24upx;margin-left: 8upx;margin-top:4upx;">&#xe621;</view>
				</view>	
				<view class="box_right">
					<view class="iconfont">&#xe6a2;</view>
					<input type="text" value="" @input="search($event)" placeholder="申请人/关键字/单号" />
				</view>
			</view>
		</view>
		<view class="pli_btn" @click="addcation" v-if="rotes('tms:myi:apply') && !isfl && (tccrBeforeMiddle == 1 || tccrBeforeMiddle == 0  )">
			发起申请
		</view>
		<view class="tos_vr">
			<view class="ts_top">
				<view class="ts_left" v-if="!isfl">
					我的申请
				</view>
				<view class="ts_left" v-if="isfl">
					<view>
						我的审批
					</view>
					<view class="ts_st" @click="bts_ks">
						<view class="iconfont" :style="bt_bols? 'color:#6E46FE':'color: #C0C0C0'">{{ btnst }}</view>
						仅显示待审批
					</view>
				</view>
			</view>
			<view v-if="tsarlist">
				<view v-if="tsarlist!=undefined&&tsarlist.length> 0">
					<view class="ts_list" @click="searh(item.id)" v-for="(item,index) in tsarlist" :key="index">
						<view class="custome">
							<view class="customerNos">
								<image src="@/static/img/mydi/myordesq.png" mode=""></image>
								<view>
									出差单号：{{item.travelNo}}
								</view>
							</view>
							<view class="tsk_o" :class="item.status == 0 || item.status == 1 || item.status == 5 ? 'tsk_pending' : item.status == 2 || item.status == 7 ? 'tsk_ok': item.status == 3 ? 'tsk_no' : item.status == 4 ||item.status == 6 || item.status == 9 ? 'tsk_not' : 'tsk_not'">
								{{tyname(item.status)}}
							</view>
						</view>
						
						<view class="tsk_top">
							<view class="sts">
								<view class="tsk_top_ops">
									{{taskty(item.taskType,item)}}
								</view>
								<view class="tsk_top_bottom">
									{{reusername(item.tmsGssLink.applyStaffs)}}
								</view>
							</view>
							<view class="tsk_ops" v-if="item.apprvTaskLogPersons[0] != null ">
								<view class="tsk_ops_left" v-if="item.apprvTaskLogPersons[0].status == 0">
									{{item.apprvTaskLogPersons[0].staffName}}
								</view>
								<view class="tsk_ops_right">
									审批中
								</view>
								<!-- <view class="timeslist" v-if="item.status == 0 && item.isname == 2 && (item.taskType == 2 || item.taskType == 4)">
									火车占座剩余时间:{{tiemsout(item.createTime)}}
								</view>
								<view class="timeslist" v-if="item.status == 0 && item.isname == 3 && (item.taskType == 2 || item.taskType == 4)">
									火车改签占座剩余时间:{{tiemsout(item.createTime)}}
								</view> -->
							</view>
						</view>
						<view class="tlists" v-if="item.tmsGssLinklist.length > 0" v-for="(its,ints) in item.tmsGssLinklist" :key="ints">
							<view class="tl_right">
								<view class="tl_tops">
									<view class="tltop_lefts">
										<view>
											{{newicname(its)}}
										</view>
										<view class="tlcitys">
											{{newstaname(its)}}
										</view>
									</view>
									<view v-if="its.vehicle == 1 && its.deptDates">
										[往返]
									</view>
									<view v-else-if="its.vehicle == 1">
										[单程]
									</view>
								</view>
								<view class="tl_bots" v-if="newdata(its)">
									{{newdata(its)}}
								</view>
							</view>
						</view>
						<view class="cubottoms">
							<view class="craetime">
								{{item.createTime}}
							</view>
							<view class="cubtns">
								<view class="add_lis" @click.stop="add_new(item)" v-if="item.taskType == 1 && !isfl">
									再次申请
								</view>
								<view class="add_lis okshow" v-if="isfl && item.agree">
									审批
								</view>
							</view>
						</view>
						
					</view>
				</view>
				<no-data v-else></no-data>
			</view>		
		</view>
		<view class="tads" @click="isshow" v-if="blac_show">
		</view>
		<view class="fxd_list" :class="shos ? 'show' : ''">
			<view class="fx_u">
				选择申请单类型
			</view>
			<view class="fxd_lists">
				<view class="fd_li" v-for="(item,index) in opt" :key="index" @click="seachopt(item)">
					<view class="fa_lef">{{item.name}}</view>
					<view class="ok_ioc" v-if="opsid == item.id"><text class="iconfont" style="color:#007aff;">&#xe60b;</text></view>
				</view>
			</view>
		</view>
		<uni-load-more :loadingType="loadingType" v-if="tsarlist!=undefined&&tsarlist.length > 3" :contentText="contentText"></uni-load-more>
		<tabBar :currentPage="currentPages"></tabBar>
		<onPageScrolls :scrolltops="scrolltops"></onPageScrolls>
	</view>
</template>

<script>
	import citys from '@/pages/book/sselect-city/airports.js'
	import tabBar from '@/components/view/Navigations.vue'
	import {
		mapState
	} from 'vuex';
	import tork from '@/api/torowk.js'
	import noData  from '@/components/noData.vue'; //日期
	export default {
		components: {
			tabBar,
			noData
		},
		data() {
			return {
				scrolltops:false,//是否显示
				bt_bols: false,
				btnst: '\ue80c',
				tccrBeforeMiddle: 9,
				currentPages: 'Mydi',
				istatus: '', //状态
				searval: '',
				ispages: 0,
				timer: null,
				cod: '',
				istrs: false,
				page: 1,
				loadingType: 0,
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				tsarlist: null, //审核列表
				shos: false,
				blac_show: false,
				optios: "全部",
				opsid: '',
				isfl: true,
				isture: 0,
				opt: [{
					name: "出差",
					id: 1
				}, {
					name: "预定",
					id: 2
				}, {
					name: "改签",
					id: 4
				}, {
					name: "退票",
					id: 5
				}, {
					name: "超规",
					id: 3
				}, {
					name: "报销",
					id: 6
				}]
			}
		},
		onShow() {

		},
		mounted() {
			const userinfo = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //关于token的用法
			if (userinfo) {
				this.tccrBeforeMiddle = userinfo.tccrBeforeMiddle;
			}
			this.getnewsList();
		},
		onLoad(it) {
			this.isture = it.is;
			if (it.code == 'left') {
				this.isfl = true;
				this.istatus = '';
			} else {
				this.isfl = false;
			}
			if (this.isture == 1 && it.code == 'left') {
				this.istatus = 0;
				this.bt_bols = true;
				this.btnst = "\ue618";
			}
		},
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			this.getnewsList();
		},
		onReachBottom: function() {
			let that = this;
			if (that.timer != null) {
				clearTimeout(that.timer);
			}
			that.timer = setTimeout(function() {
				that.getmorenews();
			}, 500);
		},
		methods: {
			add_new(item){
				uni.navigateTo({
					url: './cationchirder/initiatetravelapplications?no=' + item.id
				})
			},
			onPageScroll(res){//距离页面顶部距离
				if(res.scrollTop <600){
					this.scrolltops = false;
				} else {
					this.scrolltops = true;
				}
			},
			onShow() {
				uni.$on("add_user", res => {
					if (res.code == 200) {
						this.cod = 1;
						this.getnewsList();
					}
					uni.$off("add_user")
				})
			},
			tiemsout(tiems) {
				if (tiems == '') {
					return ''
				}
				if ((new Date().valueOf() / 1000) > (new Date(tiems.replace(/-/g, '/')).valueOf() / 1000) + 1800) {
					return '已超时'
				} else {
					let time = parseInt((new Date(tiems.replace(/-/g, '/')).valueOf() / 1000) + 1800 - (new Date().valueOf() / 1000));
					let min = Math.floor(time % 3600);
					let housers = Math.floor(time / 3600) == 0 ? '00' : Math.floor(time / 3600) < 10 ? '0' + Math.floor(time / 3600) :
						Math.floor(time / 3600);
					let mouser = Math.floor(min / 60) == 0 ? '00' : Math.floor(min / 60) < 10 ? '0' + Math.floor(min / 60) : Math.floor(
						min / 60);
					let mistime = time % 60 < 10 ? '0' + time % 60 : time % 60;
					let its = housers + ":" + mouser + ":" + mistime;
					return its
				}
			},
			bts_ks() {
				if (this.bt_bols) {
					this.bt_bols = false;
					this.btnst = "\ue80c"
					this.istatus = '';

				} else {
					this.bt_bols = true;
					this.btnst = "\ue618";
					this.istatus = 0;
				}
				this.getnewsList();
			},
			taskty(it, item) {
				if (it == 1) {
					return '[出差]'
				} else if (it == 2) {
					return '[预定]'
				} else if (it == 4) {
					return '[改签]'
				} else if (it == 3) {
					return '[超规]'
				} else if (it == 5) {
					if (item.tmsGssLink.applyHotels.length > 0) {
						return '[退房]'
					} else {
						return '[退票]'
					}
				}
			},
			rblcok() {
				this.toBlock();
			},
			reusername(item){//返回名字
				let su = '';
				for (let k = 0;k<item.length;k++) {
					if(k == 0){
						su+=item[k].userName
					} else {
						su+= ',' + item[k].userName
					}
				}
				return su
			},
			searh(id) { //查看详情
				let ti = "";
				if (this.isfl) {
					ti = 'left';
				} else {
					ti = 'right';
				}
				uni.navigateTo({
					url: './tradetails/travelsdetails?id=' + id + '&code=' + ti
				})
			},
			search(ev) {
				let _this = this
				let va = ev.mp.detail.value.trim() //获取搜索框的值
				_this.searval = va;
				if (va.length > 0) {
					_this.getnewsList()
				}
			},
			newdata(tm) { //回显时间
				if (tm.vehicle == 3) {
					return tm.inDate.substring(0, 10) + '   入住   ' + tm.outDate.substring(0, 10) + '   离店'
				} else {
					if(tm.deptDate == undefined || tm.deptDate == null){
						return ''
					} else {
						if (tm.vehicle == 1) {
							if (tm.deptDates) {
								return tm.deptDate.substring(0, 10) + '   往   ' + tm.deptDates.substring(0, 10) + '   返'
							} else {
								return tm.deptDate.substring(0, 10) + '   出发'
							}
						} else if (tm.vehicle == 2) {
							return tm.deptDate.substring(0, 10) + '   出发'
						} else if (tm.vehicle == 5) {
							return tm.deptDate.substring(0, 10) + '   出发'
						}
					}
				}
			},
			newstaname(tm) { //回显城市名称
				if (tm.vehicle == 3) {
					if (tm.remark == null || tm.remark === '') {
						return tm.cityName
					} else {
						return tm.cityName + "　" + tm.remark
					}
				} else {
					if (tm.deptCityName == null) {
						if (tm.vehicle == 1) {
							return this.citname(tm.deptCityCode) + '  -  ' + this.citname(tm.arrivCityCode)
						}
					} else {
						if (tm.deptCityName == null || tm.arrivCityName == null) {
							return this.citname(tm.deptCityCode) + '  -  ' + this.citname(tm.arrivCityCode)
						} else {
							return tm.deptCityName + '  -  ' + tm.arrivCityName
						}
					}

				}
			},
			citname(code) {
				return this.utils.airportCtName(code);
			},
			newicname(tm) { //回显类型
				if (tm.vehicle == 1) {
					return '[机票]'
				} else if (tm.vehicle == 2) {
					return '[火车]'
				} else if (tm.vehicle == 5) {
					return '[用车]'
				} else {
					return '[酒店]'
				}
			},
			async getmorenews() {
				if (this.loadingType !== 0) { //loadingType!=0;直接返回
					return false;
				}
				if (this.page > this.ispages) {
					return false;
				}
				this.loadingType = 1;
				uni.showNavigationBarLoading(); //显示加载动画
				let res = {};
				
				try {
					if (this.isfl) {
						res = await tork.getApprvList({
							current: this.page,
							size: 10,
							userName: this.searval,
							taskType: this.opsid,
							taskLogPersonStatu: this.istatus
						});
						
					} else {
						res = await tork.getApplyList({
							current: this.page,
							size: 10,
							userName: this.searval,
							taskType: this.opsid,
							status: this.istatus
						});
						
					}
					if (res.code == 200) {
						if (res.data.length == 0) { //没有数据
							this.loadingType = 2;
							uni.hideNavigationBarLoading(); //关闭加载动画
							return;
						}
						this.page++; //每触底一次 page +1
						let datw = res.data.records;
						for (let i in datw) {
							if (datw[i].taskType == 2) { //事中
								if (datw[i].tmsGssLink.applyVehicles.length > 0) {
									if (datw[i].tmsGssLink.applyVehicles[0].vehicle == 1) { //飞机下单
										datw[i]['isname'] = 1; //飞机下单
									} else if (datw[i].tmsGssLink.applyVehicles[0].vehicle == 2) { //火车下单
										datw[i]['isname'] = 2; //火车下单
									}
								}
							} else if (datw[i].taskType == 4) { //改签
								if (datw[i].tmsGssLink.applyVehicles[0].vehicle == 2) { //火车改签
									datw[i]['isname'] = 3; //火车下单
								}
							}
							let applivalist = [];
							let appflks = datw[i].tmsGssLink.applyVehicles;
							for (let k = 0; k < appflks.length; k++) {
								if (appflks[k].goBackGroup == null || appflks[k].goBackGroup == undefined) {
									applivalist.push(appflks[k])
								} else {
									let nums = 0;
									for (let p in applivalist) {
										if (applivalist[p].goBackGroup != null && appflks[k].goBackGroup != undefined) {
											if (applivalist[p].goBackGroup == appflks[k].goBackGroup) {
												nums = 1;
											}
										}
									}
									if (nums == 0) {
										appflks[k].deptDates = appflks[k + 1].deptDate;
										applivalist.push(appflks[k])
									}
								}
							}
							for (let m in datw[i].tmsGssLink.applyHotels) {
								datw[i].tmsGssLink.applyHotels[m].vehicle = 3
							}
							datw[i].tmsGssLinklist = datw[i].tmsGssLink.applyHotels.concat(applivalist);
						}
						this.tsarlist = this.tsarlist.concat(datw)
						this.loadingType = 0; //将loadingType归0重置
						uni.hideNavigationBarLoading(); //关闭加载动画
					}
				} catch (e) {
					console.log(e)
					
				}
			},
			async getnewsList() { //第一次回去数据
				let that = this;
				that.page = 1;
				that.loadingType = 0;
				if (this.cod != 1) {
					
				}
				let res = {};
				try {
					if (that.isfl) {
						res = await tork.getApprvList({
							current: that.page,
							size: 10,
							userName: that.searval,
							taskType: that.opsid,
							taskLogPersonStatu: that.istatus
						});
						if (this.cod != 1) {
							
						}
					} else {
						res = await tork.getApplyList({
							current: that.page,
							size: 10,
							userName: that.searval,
							taskType: that.opsid,
							status: that.istatus
						});
					}
					if (this.cod != 1) {
						
					}
					if (res.code == 200) {
						that.page++; //得到数据之后page+1
						that.ispages = res.data.pages; //总共多少页
						that.tsarlist = res.data.records || [];

						for (let i in that.tsarlist) {
							if (that.tsarlist[i].taskType == 2) { //事中
								if (that.tsarlist[i].tmsGssLink.applyVehicles.length > 0) {
									if (that.tsarlist[i].tmsGssLink.applyVehicles[0].vehicle == 1) { //飞机下单
										that.tsarlist[i]['isname'] = 1; //飞机下单
									} else if (that.tsarlist[i].tmsGssLink.applyVehicles[0].vehicle == 2) { //火车下单
										that.tsarlist[i]['isname'] = 2; //火车下单
									}
								}
							} else if (that.tsarlist[i].taskType == 4) { //改签
								if (that.tsarlist[i].tmsGssLink.applyVehicles[0].vehicle == 2) { //火车改签
									that.tsarlist[i]['isname'] = 3; //火车下单
								}
							}

							let applivalist = [];
							let appflks = that.tsarlist[i].tmsGssLink.applyVehicles;
							for (let k = 0; k < appflks.length; k++) {
								if (appflks[k].goBackGroup == null || appflks[k].goBackGroup == undefined) {
									applivalist.push(appflks[k])
								} else {
									let nums = 0;
									for (let p in applivalist) {
										if (applivalist[p].goBackGroup != null && appflks[k].goBackGroup != undefined) {
											if (applivalist[p].goBackGroup == appflks[k].goBackGroup) {
												nums = 1;
											}
										}
									}
									if (nums == 0) {
										appflks[k].deptDates = appflks[k + 1].deptDate;
										applivalist.push(appflks[k])
									}
								}
							}
							for (let m in this.tsarlist[i].tmsGssLink.applyHotels) {
								this.tsarlist[i].tmsGssLink.applyHotels[m].vehicle = 3
							}
							that.tsarlist[i].tmsGssLinklist = that.tsarlist[i].tmsGssLink.applyHotels.concat(applivalist);
						}

						uni.stopPullDownRefresh();
					} else {
						uni.stopPullDownRefresh();
					}
				} catch (e) {
					console.log(e)
					if (this.cod != 1) {
						
					}
				}
			},
			// modata(it){ //时间转换
			// 	let times = it.replace("-", "/").replace("-", "/");
			// 	let dat = new Date(times.replace(/-/g, '/'));
			// 	let month = this.bumodata(dat.getMonth() + 1);
			// 	let dats = this.bumodata(dat.getDate());
			// 	let hous = this.bumodata(dat.getHours());
			// 	let minu = this.bumodata(dat.getMinutes());
			// 	let secon = this.bumodata(dat.getSeconds());
			// 	return  month + "." + dats + " " + hous + ":" + minu + ":" + secon
			// },
			// bumodata(tiem){
			// 	if(tiem < 10){
			// 		return '0'+ tiem
			// 	} else {
			// 		return tiem
			// 	}
			// },
			tystatu(it) {
				if (it == 0 || it == 1 || it == 5 ) {
					return 'tsk_pending'
				} else if(it == 2){
					return 'tsk_ok'
				} else if(it == 3){
					return 'tsk_no'
				}else if(it == 4 || it == 9 ){
					return 'tsk_not'
				} else {
					return 'tsk_not'
				}
			},
			sfstatus(it) {
				if (it == 1) {
					return '通过'
				} else if (it == 3) {
					return '驳回'
				} else if (it == 2) {
					return '转交'
				} else {
					return it
				}
			},
			tyname(it) {
				if (it == 0) {
					return '待审批'
				} else if (it == 1) {
					return '审批中'
				} else if (it == 2) {
					return '已通过'
				} else if (it == 3) {
					return '已驳回'
				} else if (it == 4) {
					return '已撤回'
				} else if (it == 5) {
					return '免审'
				} else if (it == 9) {
					return '已过期'
				} else if (it == 6) {
					return '已取消'
				} else if (it == 7) {
					return '已使用'
				} else {
					return it
				}
			},
			addcation() {
				uni.navigateTo({
					url: './cationchirder/initiatetravelapplications?no=0'
				})
			},
			seachopt(item) { //选择类型
				this.opsid = item.id
				this.optios = item.name
				this.getnewsList();
				this.blac_show = false;
				this.shos = false;
			},
			isshow() {
				this.blac_show = false;
				this.shos = false;
			},
			opclk() {
				this.blac_show = true;
				this.shos = true;
			},
		}
	}
</script>

<style>
	page{
		background-color: #F1F1F1;
	}
</style>
<style lang="scss" scoped>
	.muappli {
		padding: 180upx 0 60upx 0;
		/*  #ifdef  APP-PLUS || MP-WEIXIN */
		padding: 240upx 0 10upx 0;
		/*  #endif  */
		width: 100%;

		.tads {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: #333333;
			opacity: 0.3;
		}

		.fxd_list {
			position: fixed;
			z-index: 9999;
			bottom: 0;
			left: 0;
			width: 100%;
			transition: all 0.3s ease;
			-webkit-transform: translateY(100%);
			transform: translateY(100%);

			.fx_u {
				width: 100%;
				height: 90upx;
				background: #F6F6F6;
				line-height: 90upx;
				text-align: center;
				color: #C0C0C0;
			}

			.fxd_lists {
				width: 100%;
				max-height: 540upx;
				overflow: scroll;

				.fd_li {
					width: 100%;
					height: 90upx;
					background: #FFFFFF;
					border-bottom: 2upx solid #F1F1F1;
					display: flex;
					line-height: 90upx;

					.fa_lefs {
						text-align: center;
						width: 100%;
					}

					.fa_lef {
						width: 85%;
						text-indent: 70upx;
					}

					.ok_ioc {
						text-align: center;
						width: 15%;
					}
				}
			}
		}

		.show {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}

		.pli_top {
			width: 100%;
			height: 180upx;
			/*  #ifdef  APP-PLUS || MP-WEIXIN */
			height: 240upx;
			/*  #endif  */
			position: fixed;
			top: 0;
			left: 0;
			background: #FFFFFF;
			z-index: 99;
			.bok_pli {
				width: calc(100% - 40upx);
				height: 70upx;
				background: #F6F6F6;
				margin: 10upx 20upx;
				display: flex;

				.box_left {
					width: 18%;
					height: 70upx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 30upx;
				}

				.box_right {
					width: 82%;
					display: flex;
					align-items: center;
					justify-content: center;

					input {
						margin-left: 10upx;
						width: 100%;
						font-size:20upx;
					}
				}
			}
		}

		.pli_btn {
			width: calc(100% - 40upx);
			height: 90upx;
			background: linear-gradient(to right, #4E92FD 0%, #6E46FE 100%);
			border-radius: 10upx;
			text-align: center;
			line-height: 90upx;
			color: #FFFFFF;
			margin: 20upx 20upx;
		}

		.tos_vr {
			width: 100%;
			margin-bottom: 45upx;
			// background: #FFFFFF;

			.ts_top {
				width: calc(100% - 40upx);
				height: 90upx;
				border-bottom: 2upx solid #F1F1F1;
				padding: 0 20upx;
				display: flex;
				align-items: center;
				background: #FFFFFF;
				.ts_left {
					font-size: 36upx;
					width: 100%;
					color: #333333;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.ts_st {
						font-size: 26upx;
						display: flex;
						align-items: center;
					}
				}
			}

			.ts_listimg {
				width: 100%;
				height: 100%;
			}

			.ts_list {
				width: calc(100% - 80upx);
				padding: 25upx 20upx 0 20upx;
				margin:  25upx 20upx 0 20upx;
				border-radius: 20upx;
				background: #FFFFFF;
				.custome{
					display: flex;
					align-items: center;
					justify-content: space-between;
					.customerNos {
						display: flex;
						align-items: center;
						color: #000000;
						font-size: 25upx;
						text-indent: 10upx;
						image{
							width: 28upx;
							height: 29upx;
						}
					}
					.tsk_o{
						font-size: 20upx;
						padding:8upx 15upx;
						border-radius: 8upx;
					}
					.tsk_pending{
						background-color: #e0efff;
						color: #007AFF;
					}
					.tsk_ok{
						background-color: #e6f6f0;
						color: #4cb580;
					}
					.tsk_no{
						background-color: #ffe6d5;
						color: #fa6803;
					}
					.tsk_not{
						background-color: #F1F1F1;
						color: #999999;
					}
				}
				.tsk_top {
					width: 100%;
					font-size: 35upx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.sts {
						display: flex;
						height: 60upx;
						align-items: center;
						width: 50%;
						font-size: 30upx;
						.tsk_top_ops {
							width: 120upx;
							color: #fa6803;
						}

						.tsk_top_bottom {
							width: calc(100% - 120upx);
							overflow:hidden; //超出的文本隐藏
							text-overflow:ellipsis; //溢出用省略号显示
							white-space:nowrap; //溢出不换行
							font-weight: 600;
							color: #333333;
						}
					}
					.tsk_ops {
						width: 50%;
						font-size: 24upx;
						color: #333333;
						text-align: right;
						display: flex;
						.tsk_ops_left {
							width: 70%;
							overflow:hidden; //超出的文本隐藏
							text-overflow:ellipsis; //溢出用省略号显示
							white-space:nowrap; //溢出不换行
						}
						.tsk_ops_right{
							width: 30%;
							text-align: center;
						}
						.timeslist {
							font-size: 24upx;
							color: red;
						}
					}
				}
				.cubottoms{
					width: 100%;
					display: flex;
					margin-top: 20upx;
					height: 88upx;
					align-items: center;
					justify-content: space-between;
					border-top: 2upx solid #e7e7e7;
					.craetime {
						flex: 1;
						color: #999999;
						font-size: 22upx;
					}
					.add_lis{
						width: 150upx;
						height: 54upx;
						background-color: #007AFF;
						color: #FFFFFF;
						font-size: 30upx;
						line-height: 54upx;
						text-align: center;
						border-radius: 8upx;
					}
					.okshow{
						background-color: #fa6803;
					}
			}
				.tlists {
					width: 100%;
					display: flex;
					.tl_right {
						width: 100%;
						.tl_tops {
							display: flex;
							align-items: center;
							width: 100%;
							height: 40upx;
							font-size: 30upx;
							line-height: 60upx;
							color: #333333;
							.tltop_lefts{
								display: flex;
								max-width: 80%;
								overflow: hidden;/*超出部分隐藏*/
								text-overflow:ellipsis;/* 超出部分显示省略号 */
								white-space: nowrap;/*规定段落中的文本不进行换行 */
								.tlcitys{
									margin-left: 10upx;
								}
							}
						}

						.tl_bots {
							width: 100%;
							line-height: 40upx;
							font-size: 24upx;
							color: #999999;
						}
					}
				}

				
			}
		}
	}
</style>
