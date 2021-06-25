<template>
	<view class="applyforchange">
		<loading></loading>
		<headnavigation titles="提交订单"></headnavigation>
		
		<view class="istaf">
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">违规原因:</view>
					<view class="ravright">
						<view class="bos">
							<subjects @change="subclcks" :oldResonIds="old_resonIds"></subjects>
							<!-- <input type="text" v-model="user_reson" placeholder="请输入违规原因" value="" /> -->
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">归属部门:</view>
					<view class="ravright">
						<view class="bos">
							{{attdepartment}}
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
			<view class="ravelv">
				<constCenter  @costcCks="costcCk" :toisblcks="isbliack"></constCenter>
			</view>
		</view>
		<view class="check_btn">
			<view class="chck_left" @click="rblcok">返回</view>
			<view class="chck_right" @click="updapp">确定</view>
		</view>
	</view>
</template>

<script>
	import constCenter from '@/components/view/book/cost-center/costCenter.vue'
	import order from '@/api/order.js'
	import tork from '@/api/torowk.js'
	import subjects from '@/components/view/book/subject-matter/subjectMatter.vue'
	export default{
		components:{
			constCenter,
			subjects
		},
		data(){
			return{
				old_resonIds:0,//默认事由id  (事前)
				user_reson:'',//出差事由
				user_resonName:'',
				CostCenter: [],
				Deparapp: [],
				blac_show: false,
				
				
				CostCi: false,
				CostCis: false,//是否有部门审批人
				TravelDepartlist: [],//部门审批人
				TravelCostCenlist: [],//成本中心
				ullist:[{
					name:'成本中心',
					id: 1
				}],
				dtlist:{},
				switfal:false,
				slitlist:[],
				sli_namelist: [],
				cbname:'',//成本中心名称
				cbid: '',//成本中心id
				botname: '',//当前选择的成本中心名称
				slit_id_checd:0, //当前点击成本中心的id
				slid: 1,
				datalist: {},
				NameCenter:{name: '',id: ''},
				treeLists: [],//归属部门列表
				ops_list:false,//归属部门
				CostCenterlist: [],//成本中心审批人
				costlist: [],//当前选择的成本中心审批人集合
				isswf: true,//true为成本中心 false为部门   审批人
				Deparapprover: [],//部门审批人
				deparlist: [],//前选择的部门审批人集合
				attdepartment:'',//归属部门
				dataslist:{},
				isGetStaffList:false,
				pookis:false,
				isbliack:2,
			}
		},
		onLoad() {
			let item = JSON.parse(uni.getStorageSync('carforck_data'));
			this.dtlist = JSON.parse(item.data);//上个页面接受的参数
			this.dataslist = JSON.parse(item.dats);//提交所需要的参数
			this.pookis = this.dtlist.pookis;//是否超规再次审批
			if(this.pookis == true){
				this.isbliack = 3;
			} else {
				this.isbliack = 2;
			}
		},
		mounted() {
			const data = uni.getStorageSync('user_list'+ uni.getStorageSync('appWxId'));//获取归属部门
			if (data.deptName) {
				this.attdepartment = data.deptName; 
			}
			this.selts();
		},
		methods:{
			subclcks(id){//返回当前选中的事由id
				this.user_reson = data.id;
				this.user_resonName = data.name;
			},
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
			async updapp(){ //确定
				let that = this;
				let TravelCostCenlist = that.TravelCostCenlist;//成本审批人
				let TravelDepartlist = that.TravelDepartlist;//部门审批人
				let NameCenter = that.NameCenter;//成本中心
				if(NameCenter.id == ''){
					that.showToasts("请选择成本中心！")
					return
				} else if(TravelCostCenlist.length == 0 && this.CostCi == true){
					that.showToasts("请选择成本审批人！")
					return
				} else if(TravelDepartlist.length == 0 && this.CostCis == true){
					that.showToasts("请选择部门审批人！")
					return
				} else if(that.user_reson == ''){
					that.showToasts("请输入违规原因！")
					return
				} else if(that.isGetStaffList == true){//除了免审 其他必须有审批流程
					that.showToasts("未配置审批流程，请联系管理员设置！");
					return
				}
				let apprvTaskStaffts = [];//审核人员
				for (var i = 0; i < TravelCostCenlist.length; i++) { //成本中心审批人
					apprvTaskStaffts.push({
						deptCost: 2,
						nodeId: TravelCostCenlist[i].nodeId,
						personId: TravelCostCenlist[i].personId,
						staffId: TravelCostCenlist[i].staffId,
						staffName: TravelCostCenlist[i].staffName
					})
				
				}
				for (var i = 0; i < TravelDepartlist.length; i++) {//部门审批人
					apprvTaskStaffts.push({
						deptCost: 1,
						nodeId: TravelDepartlist[i].nodeId,
						personId: TravelDepartlist[i].personId,
						staffId: TravelDepartlist[i].staffId,
						staffName: TravelDepartlist[i].staffName
					})
				}
				let dat = {
					apprvTask:{
						apprvTaskStaffs:apprvTaskStaffts,
						taskType:this.pookis ? 3:2,//1为事前2为事中，4为改签 5为退票
						beforeMiddle: 2,//1为事前2为事中 4为改签 5为退票
						costId:NameCenter.id, //成本中心id
						costName: NameCenter.name ,//成本中心名称
					}
				}
				this.dataslist.wbp.apprvTaskEntity['reason'] = this.user_resonName;
				this.dataslist.wbp.apprvTaskEntity['reasonId'] = this.user_reson;
				this.dataslist.wbp.apprvTaskEntity['apprvTaskStaffs'] = apprvTaskStaffts;
				this.dataslist.wbp.isviolation = 1;
				this.dataslist.wbp.apprvTaskEntity.costId = NameCenter.id;
				this.dataslist.wbp.apprvTaskEntity.costName = NameCenter.name;
				
				try{
					let res = await tork.createUseCarOrder(this.dataslist);
					
					if(res.code == 200){
						this.showToasts('下单成功！');
						setTimeout(() => {
							uni.setStorageSync("sworders_od",{
								type:'carodd',
								data:res.data
							});
							uni.switchTab({
								url: '/pages/order/order',
								success:function(){
								}
							})
						}, 1000);
					} else {
						uni.showToast({
							title:res.message,
							duration:2000,
							icon:'none'
						})
					}
				}catch(e){
					console.log(e);
					
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.applyforchange{
		width: 100%;
		.black_mu {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: black;
			opacity: 0.5;
			z-index: 860;
		}
		
		.istaf{
			width: 100%;
			margin-top: 20upx;
			font-size: 30upx;
			.ravelv {
				width: calc(100% - 80upx);
				padding: 0 20upx;
				background: #FFFFFF;
				margin-left: 20upx;
				border-radius: 15upx;
				margin-bottom: 20upx;
				.tswos{
					padding: 0 20upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 22upx;
					color: #333333;
					height:70upx;
					.tswo_le{
						color: #FF9000;
					}
					.tswo_ri{
						span{
							color: #007AFF;
						}
					}
				}
				.ts {
					line-height: 90upx;
					display: flex;
			
					.rav_left {
						width: 25%;
						text-align: center;
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
		.check_btn {
			position: fixed;
			width: 100%;
			bottom: 0;
			left: 0;
			height: 110upx;
			display: flex;
			text-align: center;
			line-height: 110upx;
			font-size: 30upx;
			z-index: 800;
			.chck_left {
				flex: 1;
				height: 110upx;
				background: #ffffff;
				color: $uni-color-primary;
			}
			.chck_right {
				flex: 1;
				color: #ffffff;
				height: 110upx;
				background: $uni-color-primary;
			}
		}
	}
</style>
