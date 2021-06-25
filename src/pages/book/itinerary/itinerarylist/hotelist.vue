<template>
	<view class="trandetails">
		<headnavigation titles="酒店住房详情"></headnavigation>
		<view class="navstop">
			<view style="font-size:42upx;font-weight:bold;margin-left:60upx;padding:15upx 0;">{{userstatus(cont.orderStatus)}}</view>
			<view style="margin-left:60upx;">
				订单号：{{cont.saleOrderNo}}
			</view>
			<view class="lisst">
				<view class="citst">
					<view class="cits_t">
						<view style="font-size:38upx;color:#333333;font-weight:bold;">
							{{cont.hotelName}}
						</view>
						<view style="color:#999999;">
							{{cont.hotelAddress}}
						</view>
						<view>
							酒店电话：{{cont.hotelPhone}}
						</view>
						<view>
							酒店床型：{{cont.bedTypeName}}
							
						</view>
						<view>
							房间类型：{{cont.proName}} {{cont.bookCount}}间
						</view>
						<view style="font-size:26upx;font-weight:bold;">
							<span>总额：</span>
							<span style="color:#FFA63E;">￥{{cont.totalPrice}}</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="lisst">
				<view class="citst">
					<view class="cits_b">
						<!-- <view class="cits_bt">
							<view class="cits_bts" style=" color: #007aff;">支付状态：{{pustatus(cont.saleOrder.payStatus)}}</view>
							<view class="cits_bts" style=" color: #007aff;">订单状态：{{userstatus(cont.orderStatus)}}</view>
						</view> -->
						 <view class="cits_bt">
							<view class="cits_bts" style=" color: #999999;font-size:24upx;">入住时间</view>
							<view class="cits_bts" style=" color: #999999;font-size:24upx;">离店时间</view>
						 </view>
						<view class="cits_bt" style="font-size:32upx;color:#333333;font-weight:bold;">
							<view>{{subtime(cont.arrivalDate,1)}}</view>
							<view style="margin: 0 40upx;color:#999999;font-size:24upx;">—</view>
							<view class="cits_bts">{{subtime(cont.departureDate,1)}}</view>
						</view>
						<view class="cits_bt" style="font-size:22upx;color:#333333;">
							<view class="cits_bts">入&nbsp;&nbsp;住&nbsp;&nbsp;人：{{cont.guestName}}</view>
						</view>
						<view class="cits_bt" style="font-size:22upx;color:#333333;">
							<view style="margin-right:20upx;">联系信息 ：{{cont.contactName}}</view>
							<view class="cits_bts">{{cont.contactNumber}}</view>
						</view>
						<!-- <view class="cits_bt">
							<view class="cits_btsy">总价：￥{{cont.totalPrice}}</view>
						</view> -->
						<view class="citsbottom">
							<view style="font-weight:bold;">取消规则</view>
							<view style="color:#B04D4D;margin:10upx 0;">是否取消：是 最晚取消时间：{{times(cont.dbCancelRule)}}</view>
						</view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				cont:{},
				lefts:0,
				rights:0,
				weeks:['一','二','三','四','五','六','日'],
			}
		},
		onLoad(item) {
			this.cont = JSON.parse(item.data);
			this.lefts = item.left;
			this.rights = item.right;
		},
		methods:{
			rblcok(){
				uni.navigateBack({
					url:'../itinerary?left=' + this.lefts + '&right=' + this.rights
				})
			},
			subtime(tiem,num){//返回日期前10位
				// return tiem.substring(0,10)
				if(num == 0){
					let week = new Date(tiem.replace(/-/g, '/')).getDay();
					if(week == 0){
						week = 7
					}
					let ts = tiem.substring(5,10).split('-');
					return ts[0] + '月' + ts[1] + ' 周' + this.weeks[week-1]
				} else if(num == 1){
					let week = new Date(tiem.replace(/-/g, '/')).getDay();
					if(week == 0){
						week = 7
					}
					let ts = tiem.substring(5,10).split('-');
					return ts[0] + '月' + ts[1] +'日'+ ' 周' + this.weeks[week-1]
				}
			},
			times(time){
				return time.substring(4,23) 
			},
			pustatus(ty){//支付状态
				if(ty == 1){
					return '待支付'
				} else if(ty == 2){
					return '支付中'
				} else if(ty == 3){
					return '已支付'
				} else if(ty == 4){
					return '为挂帐支付'
				}
			},
			userstatus(ite){//订单状态
				let arr = [{
					name: '待审核',
					id:650
				},{
					name: '处理中',
					id:100,
				},{
					name: '拒单',
					id:600,
				},{
					name: '审批拒绝',
					id:121,
				},{
					name: '占房成功',
					id:122,
				},{
					name: '申请',
					id:117,
				},{
					name: '待处理',
					id:115,
				},{
					name: '预定成功',
					id:101,
				},{
					name: '下单失败',
					id:102,
				},{
					name: '取消中',
					id:400
				},{
					name: '取消成功',
					id:401
				}]
				for(let i in arr){
					if(arr[i].id == ite){
						return arr[i].name
					}
				}
			},
			catype(it){//返回证件类型
				if(it == 1){
					return '身份证'//NI
				} else if(it == 2){
					return '护照'//PP
				} else if(it == 3){
					return '台胞证'//TB
				} else if(it == 4){
					return '港澳通行证'//GA
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.trandetails{
		position: absolute;
		width: 100%;
		height: 100%;
		padding-bottom: 300upx;
		background: #F5F5F5;
		.navstop{
			font-size: 28upx;
			color: #FFFFFF;
			background: linear-gradient(to right, #4e92fd 0%, #6e46fe 100%);
		}
		.lisst{
				width: calc(100% - 40upx);
				padding: 20upx 20upx 20upx 20upx;
				.citst{
					width: 100%;
					.cits_t{
						width: calc(100% - 40upx);
						padding: 20upx;
						background: #FFFFFF;
						border-radius: 15upx;
						color: #566666;
						line-height: 50upx;
						font-size: 26upx;
						view{
							margin-left: 20upx;
							margin-top: 15upx;
						}
					}
					.cits_b{
						width: calc(100% - 40upx);
						color: #333333;
						padding: 20upx 20upx;
						background: #FFFFFF;
						border-radius: 15upx;
						.cits_bt{
							display: flex;
							line-height: 60upx;
							align-items: center;
							justify-content: space-between;
							.cits_bts{
								flex: 1;
							}
							.cits_btsy{
								flex: 1;
								color: #F48F00;
							}
						}
						.citsbottom{
							background:#fef9f8;
							padding: 20upx;
							font-size: 22upx;
						}
					}
				}
				.btuserlist{
					width: 100%;
					margin-top: 20upx;
					border-radius: 15upx;
					background: #FFFFFF;
					.btuse{
						color: #C8C7CC;
						width: calc(100% - 40upx);
						padding: 20upx;
						.btul{
							margin-top: 10upx;
							color: #333333;
							.user_t{
								display: flex;
								width: 100%;
								height: 50upx;
								line-height: 50upx;
								font-size: 28upx;
								.user_l{
									flex: 3;
								}
								.user_os{
									flex: 7;
									text-align: left;
								}
								.user_o{
									flex: 6;
									display: flex;
									justify-content: flex-end;
									align-items: center;
									.uses_sp{
										margin-left:20upx;
										height: 40upx;
										line-height: 40upx;
										border-radius: 5upx;
										padding: 2upx 6upx;
										background: red;
										color: #FFFFFF;
									}
									.uses_st{
										margin-left:20upx;
										height: 40upx;
										line-height: 40upx;
										border-radius: 5upx;
										padding: 2upx 6upx;
										background: #FF9000;
										color: #FFFFFF;
									}
								}
								.user_r{
									flex: 2;
									justify-content: flex-end;
									display: flex;
									color: #FF9000;
								}
								.user_t{
									flex: 3;
								}
							}
						}
					}
					.liass{
						width: calc(100% - 40upx);
						padding: 0 20upx;
						display: flex;
						color: #C8C7CC;
						line-height: 80upx;
						.liass_l{
							font-size: 35upx;
							flex: 1;
						}
						.liass_r{
							color: #333333;
							text-align: right;
							flex: 2;
						}
						.liass_p{
							text-align: right;
							flex: 1;
							font-size: 35upx;
							color: #FF9000;
						}
					}
				}
			}
	}
</style>
