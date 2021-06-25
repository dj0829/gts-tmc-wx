<template>
	<view class="">
		<view class="staleve" v-if="staleve" @click="staleve = false">
			<view class="stalist" @click.stop>
				<view class="statop" v-for="(item,ind) in platformlist" :key="ind"
					v-if="( notbooking && item.list[0].va == 4) || (!notbooking && item.list[0].va != 4 && item.ishow == true)">
					<!---->
					<view class="reds">
						<!-- <view>{{item.list.va}}</view>
						<view class="ts_text"> -->
							{{item.name}}
						<!-- </view> -->
					</view>
					<view class="setlist" v-for="(items,indexs) in item.list" :key="indexs" v-if="items.va != 1">
						<view class="setbod">
							<view class="styul">
								<view class="styli_top" v-if="items.va == 4 || items.va == 5">
									<image src="@/static/img/mydi/zw.png"></image>
									<span>{{items.name}}</span>
								</view>
								<view class="stulis">
									<view class="styli_left">
										超规人员:
									</view>
									<view class="styli_right">
										{{items.list}}
									</view>
								</view>
							</view>
							<view class="styul" v-if="items.va == 3">
								<view class="stulis">
									<view class="styli_left">
										超规原因:
									</view>
									<view class="styli_right">
										<view class="wors">
											<picker :range="rulesReasons" :range-key="'chineseDesc'"
												@change="chineseChange($event,ind)">
												{{ rulesReasons[item.index].chineseDesc }}
											</picker>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="btnsti" v-if="!notbooking">
					<view class="roblck" @click="staleve = false">
						取消
					</view>
					<view class="btnok" @click="cits_btn">
						继续预定
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
				staleve:false,//是否弹窗
			}
		},
		props:{
			limitNativeRule:{//违规信息
				type:Object,
			},
			platformlist:{//违规数组
				type:Array,
				default:[]
			},
			notbooking:{//是否不可预订
				type:Boolean,
				default:false
			},
			rulesReasons:{//违规原因
				type:Array,
				default:[]
			}	
		},
		watch:{
			platformlist(wa){//判断是否有违规信息
				if(wa.length>0){
					this.staleve = true
				}
			}
		},
		methods:{
			chineseChange(e, index) { //选择高等级超规原因
				let int = index;
				this.platformlist[int].index = e.detail.value;
			},
			cits_btn() { //继续预定
				try{
					let plallist = this.platformlist;
					for (let p in this.limitNativeRule) {
						for (let i in this.limitNativeRule[p]) {
							if (i == 3) {
								let ks = 0;
								for (let k in plallist) {
									for (let j in plallist[k].list) {
										if (plallist[k].list[j].va == 3 && plallist[k].index == 0) {
											uni.showToast({
												title: '请选择违规原因',
												duration: 1000,
												icon: 'none'
											})
											return
										}
										if (plallist[k].names = p && plallist[k].list[j].va == 3) {
											ks = plallist[k].index;
										}
									}
								}
								this.limitNativeRule[p][i] = {
									usernames: this.limitNativeRule[p][i],
									reasons: this.rulesReasons[ks].chineseDesc
								}
							}
						}
					}
					this.staleve = false;
					this.$emit('emviolation',{davalue:this.limitNativeRule})
				}catch(e){
					console.log(e)
					//TODO handle the exception
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.staleve {
		position: fixed;
		left: 0;
		top: 0;
		width: calc(100% - 100upx);
		height: 100%;
		padding: 0 50upx;
		background: rgba(0, 0, 0, .3);
		z-index: 500;
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
			overflow: scroll;
	
			.statop {
				padding: 0 20upx;
	
				.reds {
					width: 100%;
					height: 70upx;
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #007aff;
					font-size: 34upx;
					font-weight: bold;
				}
	
				.setlist {
					line-height: 50upx;
					font-size: 30upx;
					margin: 10upx 0;
					.setbod {
						
						.styul {
							width: 100%;
							margin: 10upx 0;
							.styli_top {
								width: 100%;
								color: #333333;
								font-size: 32upx;
								font-weight: bold;
								line-height: 45upx;
								image{
									width: 6upx;
									height: 22upx;
									margin-left: 20upx;
								}
								span{
									margin-left: 20upx;
								}
								
							}
				
							.stulis {
								display: flex;
								font-size: 28upx;
								color: #666666;
								.styli_left {
									width: 30%;
									display: flex;
									align-items: center;
									justify-content: flex-end;
								}
				
								.styli_right {
									width: 70%;
									.wors {
										width: 80%;
										font-size: 30upx;
										height: 60upx;
										margin-left: 10upx;
										// overflow: hidden;
										
										picker {
											width: 70%;
											height: 50upx;
											text-indent: 20upx;
											border: $uni-color-primary solid 1upx;
											border-radius: 15upx;
											overflow: hidden;
										}
									}
								}
							}
						}
					}
				}
				.setlist:last-child{
					border-bottom:1px dashed #e4e4e4;
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
	
</style>
