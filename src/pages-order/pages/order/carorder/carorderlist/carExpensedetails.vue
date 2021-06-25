<template>
	<view class="caredetails">
		<headnavigation titles="费用明细"></headnavigation>
		<view class="caremain">
			<view class="cartops">
				<view class="catype">
					{{dalist.cartypename}}
				</view>
				<view class="catbox">
					<view class="carnames">
						现在用车
					</view>
				</view>
				<view class="cartime">
					{{cattime(dalist.modifyTime)}}
				</view>
			</view>
			<view class="cartop">
				<view class="carlist" v-for="(item,index) in dalist.carSaleOrderPrices" :key="index">
					<view class="carlistna">
						{{item.name}}
					</view>
					<view class="carlistna">
						{{item.amount}}元
					</view>
				</view>
			</view>
			<view class="cartop" style="margin:0;padding-top:30upx;border-top:1px solid #f1f1f1;">
				<view class="prcielis">
					支付金额<span style="color: #FFA63E;font-size: 38upx;margin: 0 5upx;">{{dalist.premium}}</span>元
				</view>
				<view class="prcielis" style="margin: 0;font-size:24upx;">
					{{settlename(dalist.tmsOsTransationorderExtend.settlement)}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				dalist:{}
			}
		},
		onLoad(va) {
			let da = JSON.parse(va.data);
			this.dalist = da;
		},
		mounted() {
			
		},
		methods:{
			cattime(time){
				return time.substring(0,10)
			},
			sercname(id){
				if(id == 4){
					return '现在约车'
				}else if(id== 3){
					return '预约约车'
				} else if(id ==  1){
					return '接机'
				} else if(id == 2){
					return '送机'
				}
			},
			settlename(id){
				if(id == 1){
					return '微信支付'
				} else if(id == 2){
					return '额度支付'
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.caredetails{
		width: 100%;
		.caremain{
			width: calc(100% - 60upx);
			// padding: 20upx 0;
			margin: 30upx;
			border-radius: 15upx;
			background: white;
			.cartops{
				border-bottom: 1px solid #e3e3e3;
				padding: 20upx 0;
				.catype{
					width: 100%;
					line-height: 60upx;
					text-align: center;
				}
				.catbox{
					width: 100%;
					display: flex;
					height: 50upx;
					align-items: center;
					justify-content: center;
					margin-bottom: 10upx;
					font-size: 32upx;
					font-weight: bold;
					color: #333333;
					.carnames{
						font-size: 30upx;
						width: 20%;
						text-align: center;
					}
				}
				.cartime{
					width: 100%;
					line-height: 40upx;
					text-align: center;
					font-size: 28upx;
					color: #666666;
				}
			}
			.cartop{
				width: calc(100% - 80upx);
				padding: 0 40upx 20upx 40upx;
				margin-top: 40upx;

				.carlist{
					width: 100%;
					line-height: 55upx;
					font-size: 30upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 28upx;
					color: #666666;
				}
				.prcielis{
					width: 100%;
					text-align: right;
					line-height: 50upx;
					font-size: 26upx;
					color: #666666;
				}
			}
		}
	}
</style>
