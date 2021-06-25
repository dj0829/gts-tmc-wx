<template>
	<view class="applyforchange">
		<view class="black_mu" @click="isshow" v-if="blac_show"></view>
		<loading></loading>
		
		<headnavigation titles="申请退票"></headnavigation>
		<view class="istaf">
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
				<constCenter  @costcCks="costcCk" toisblcks="5"></constCenter>
			</view>
			
			
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">退票原因:</view>
					<view class="ravright">
						<view class="bos">
							<input type="text" v-model="remarks" value="" />
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
		</view>
		<view class="check_btn">
			<view class="chck_left" @click="rblcok">返回</view>
			<view class="chck_right" @click="updapp">申请退票</view>
		</view>
	</view>
</template>

<script>
	import constCenter from '@/components/view/book/cost-center/costCenter.vue'
	import order from '@/api/order.js'
	import tork from '@/api/torowk.js'
	export default{
		components:{
			constCenter
		},
		data(){
			return{
				isGetStaffList:false,//是否无审批流程
				CostCenter: [],
				Deparapp: [],
				remarks: '',//退票原因
				blac_show: false,
				
				
				CostCi: false,
				CostCis: false,//是否有部门审批人
				TravelDepartlist: [],//部门审批人
				TravelCostCenlist: [],//成本中心
				ullist:[{
					name:'成本中心',
					id: 1
				}],
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
				oprefs:[{'oprefs_1': ''},{'oprefs_2':''},{'oprefs_3': ''},{'oprefs_4': ''},{'oprefs_5': ''}],
				attdepartment:'',//归属部门
				islist:0
			}
		},
		onLoad(item) {
			this.datalist = JSON.parse(item.data);
			this.islist = this.datalist.islist;//判断从哪个页面来
		},
		mounted() {
			const data = uni.getStorageSync('user_list'+ uni.getStorageSync('appWxId'));//获取归属部门
			if (data.deptName) {
				this.attdepartment = data.deptName; 
			}
			this.selts();
		},
		methods:{
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
				let remarks = that.remarks;//原因
				if(NameCenter.id == ''){
					that.showToasts("请选择成本中心！")
					return
				} else if(TravelCostCenlist.length == 0 && this.CostCi == true){
					that.showToasts("请选择成本审批人！")
					return
				} else if(TravelDepartlist.length == 0 && this.CostCis == true){
					that.showToasts("请选择部门审批人！")
					return
				} else if (that.CostCis == false && that.CostCi == false && that.isGetStaffList ==
					true) { //除了免审 其他必须有审批流程
					that.showToasts("未配置审批流程，请联系管理员设置！");
					return
				} else if(remarks == ''){
					that.showToasts("请输入退票原因！")
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
				
				let dat = {}
				if(this.islist == 1){
					dat = {
						saleOrderNo:this.datalist.saleOrderNo,
						passengerNo: this.datalist.passengerNo.join(','),
						apprvTaskEntity:{
							agree:false,
							apprvTaskStaffs:apprvTaskStaffts,
							taskType: 5,//1为事前2为事中，4为改签 5为退票
							beforeMiddle: 2,//1为事前2为事中 
							costId:NameCenter.id, //成本中心id
							costName: NameCenter.name ,//成本中心名称
							reason: remarks,
							examinePattern: this.datalist.ruleMas
						}
					}
				} else if(this.islist == 2){
					dat = {
						saleChangeNo:this.datalist.saleChangeNo,
						passengerNo: this.datalist.passengerNo.join(','),
						apprvTaskEntity:{
							agree:false,
							apprvTaskStaffs:apprvTaskStaffts,
							taskType: 5,//1为事前2为事中，4为改签 5为退票
							beforeMiddle: 2,//1为事前2为事中
							costId:NameCenter.id, //成本中心id
							costName: NameCenter.name ,//成本中心名称
							reason: remarks,
							examinePattern: this.datalist.ruleMas
						}
					}
				}
				
				try{
					let res = '';
					if(this.islist == 1){
						res = await order.applyRefundTrain(dat)
					} else if(this.islist == 2){
						res = await order.applyChangeRefundTrain(dat);
					}
					
					if(res.code == 200){
						this.showToasts('提交退票申请成功...');
						if(this.islist == 1){
							setTimeout(()=>{
								uni.navigateBack({
								})
							},1000)
						} else if(this.islist == 2){
							setTimeout(()=>{
								uni.navigateBack({
								})
							},1000)
						}
						
					} else {
						this.showToasts(res.message);
					}
				}catch(e){
					console.log(e);
					
				}
				
			},
			rblcok(){//返回
				this.toBlock();
			},
			isshow(){//黑色弹出层
				this.ops_list = false
				this.blac_show = false;
				this.switfal = false;
				this.costs = false;
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
				width: calc(100% - 40upx);
				padding: 0 20upx;
				height: 90upx;
				background: #FFFFFF;
				margin-bottom: 20upx;
				.ts{
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
							.swname{
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
