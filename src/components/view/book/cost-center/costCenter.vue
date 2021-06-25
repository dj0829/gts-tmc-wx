<template>
	<view>
		<view class="black_mu" @click="isshow" v-if="blac_show"></view>
		<view class="optslist" :class="ops_list ? 'show' : ''">
			<view class="btns">
				<view class="btns_z" @click="isshow">
					取消
				</view>
				<view class="btns_z"></view>
				<view class="btns_z" @click="okisd">
					确定
				</view>
			</view>
			<view class="stlist">
				<view class="sltleft">
					<view class="ulsk_list" @click="slcikd(item.id)" :class="slid == item.id? 'cked':''"
						v-for="(item,index) in ullist" :key="index">
						{{item.name}}
					</view>
				</view>
				<view class="sltright">
					<view class="sltrig_top">
						<view class="sltiig_top_left">当前选择:</view>
						<view class="sltiig_top_right" @click="reblocks(item)"
							:class="slit_id_checd == item.id ? 'stis':''" v-for="(item,index) in slitlist" :key="index">
							{{item.name}}
						</view>
					</view>
					<view class="sltrig_bot">
						<view class="striglist" @click="clslitk(item)" v-for="(item,index) in sli_namelist"
							:key="index">
							<view class="stlis_left">
								<view>
									{{item.name}}
								</view>
							</view>
							<view class="stlis_right" v-if="slit_id_checd == item.id">
								<view class="iconfont" style="color: #007aff;">
									<strong></strong>&#xe60b;
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="botmis">
				当前选择的成本中心是:{{botname}}
			</view>
		</view>
		<view class="ts">
			<view class="rav_left">成本中心</view>
			<view class="ravright" @click="approval()">
				<view class="bos">
					{{NameCenter.name}}
				</view>
				<view class="iconfont">&#xe8a3;</view>
			</view>
		</view>
		<view class="isswflist" :class="switfal ? 'show' : ''">
			<view class="btns">
				<view class="btns_z" @click="isshow">
					取消
				</view>
				<view class="btns_z" v-if="isswf">
					成本审核人选择
				</view>
				<view class="btns_z" v-if="!isswf">
					部门审核人选择
				</view>
				<view class="btns_z" @click="oksoption">
					确定
				</view>
			</view>
			<view class="isstops" v-if="isswf">
				<view class="isstop" v-for="(item,index) in CostCenterlist" :key="index">
					{{index+1}}级审批：
					<view class="wors">
						<picker :range="item.apprvCostFlowNodePersons" :range-key="'staffName'"
							@change="CostCenterChange($event,index)">
							{{ item.apprvCostFlowNodePersons[CostCenter[index].index].staffName }}
						</picker>
					</view>
				</view>
			</view>
			<view class="isstops" v-if="!isswf">
				<view class="isstop" v-for="(item,index) in Deparapprover" :key="index">
					{{index+1}}级审批：
					<view class="wors">
						<picker :range="item.apprvDeptFlowNodePersons" :range-key="'staffName'"
							@change="DeparappChange($event,index)">
							{{ item.apprvDeptFlowNodePersons[Deparapp[index].index].staffName }}
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="ts" v-if="CostCi">
			<view class="rav_left">成本审批人</view>
			<view class="ravright" @click="appswlists('CostCenterlist')">
				<view class="bos">
					<view class="swname" v-for="(item,index) in TravelCostCenlist" :key="index">
						{{item.staffName}}
					</view>
				</view>
				<view class="iconfont">&#xe8a3;</view>
			</view>
		</view>
		<view class="ts" v-if="CostCis">
			<view class="rav_left">部门审批人</view>
			<view class="ravright" @click="appswlists('Deparapprover')">
				<view class="bos">
					<view class="swname" v-for="(item,index) in TravelDepartlist" :key="index">
						{{item.staffName}}
					</view>
				</view>
				<view class="iconfont">&#xe8a3;</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tork from '@/api/torowk.js'
	export default{
		props:{
			isblckt:{
				type:Boolean,
				default:false
			},
			sttos:{
				type:Number,
				default:1
			},
			toisblcks:{
				type:Number
			},
			morconst:{
				type:Object
			}
		},
		data(){
			return{
				ops_list:false,
				
				NameCenter: {
					name: '',
					id: ''
				},
				ullist: [{
					name: '成本中心',
					id: 1
				}],
				blac_show:false,
				CostCenter: [],//成本审批流
				Deparapp: [],//部门审批流
				slid: 1,
				slitlist: [],
				sli_namelist: [],
				isswf: true, //true为成本中心 false为部门   审批人
				CostCenterlist: [], //成本中心审批人
				costlist: [], //当前选择的成本中心审批人集合
				
				Deparapprover: [], //部门审批人
				deparlist: [], //前选择的部门审批人集合
				botname: '', //当前选择的成本中心名称
				slit_id_checd: 0, //当前点击成本中心的id
				switfal: false,
				CostCi: false,
				CostCis: false, //是否有部门审批人
				TravelDepartlist: [], //部门审批人
				TravelCostCenlist: [], //成本中心
				isGetStaffList:false,//是否无审批流
			}
		},
		mounted() {
			if(this.toisblcks == 1){//事前
				if(JSON.stringify(this.morconst) != '{}'){//并且有成本中心
					this.NameCenter.name = this.morconst.name;
					this.NameCenter.id = this.morconst.id;
					this.appswlist();
				}	
			}
			this.selts();
		},
		methods:{
			CostCenterChange(e, index) { //选择当前成本中心审批人
				this.CostCenter[index].index = e.detail.value;
			},
			DeparappChange(e, index) { //选择当前部门审批人
				this.Deparapp[index].index = e.detail.value;
			},
			appswlists(itname) { //点击审批人
				if (this.NameCenter.id == '') {
					this.showToasts("请先选择成本中心")
					return
				}
				if (itname == 'CostCenterlist') {
					this.isswf = true
				} else {
					this.isswf = false
				}
				this.switfal = true;
				this.blac_show = true;
			},
			approval() {
				this.ops_list = true
				this.blac_show = true;
				this.sli_old(); //点击成本中心
			},
			isshow() {
				this.ops_list = false
				this.blac_show = false;
				this.switfal = false;
				this.costs = false;
			},
			okisd() { //选择当前成本中心
				this.ops_list = false
				this.blac_show = false;
				this.NameCenter.name = this.botname;
				this.NameCenter.id = this.slit_id_checd;
				this.TravelCostCenlist = [];
				this.TravelDepartlist = [];
				this.appswlist();
			},
			sli_old() { //点击成本中心默认值
				let ls = this.treeLists;
				this.sli_namelist = [];
				for (let i = 0; i < ls.length; i++) {
					if (ls[i].parentId.length == 0) {
						this.sli_namelist.push(ls[i])
					}
				}
				// this.slit_id_checd = 0;
				this.slitlist = [];
			},
			async appswlist() { //选择审批人
				let that = this;
				that.CostCis = false;
				that.CostCi = false;
				that.isGetStaffList = false; //重置值
				let res;
				try {
					if (that.isblckt == true) { //超标统一走超标流程 其他的按走正常流程走
						res = await tork.getStaffList({
							costId: that.NameCenter.id,
							applyType: that.sttos, //1为事前开启二审   3为超规审批  权限比最高
						});
					} else {
						res = await tork.getStaffList({
							costId: that.NameCenter.id,
							applyType: that.toisblcks //1事前审批流 2事中审批流 3超标审批流 4改签审批流
						});
					}
			
					if (res.code == 200) {
						if (res.data.deptStaffs.length == 0) {
							that.CostCis = false;
						} else {
							that.CostCis = true;
							that.Deparapprover = res.data.deptStaffs; //部门审批人
							for (let i = 0; i < that.Deparapprover.length; i++) {
								that.Deparapp.push({
									index: 0
								})
							}
						}
						if (res.data.costStaffs.length == 0) {
							that.CostCi = false;
						} else {
							that.CostCi = true;
							that.CostCenterlist = res.data.costStaffs; //成本审批人
							for (let i = 0; i < that.CostCenterlist.length; i++) {
								that.CostCenter.push({
									index: 0
								})
							}
						}
					} else if (res.code == '-100') { //是否无审批流
						that.isGetStaffList = true;
					} else {
						that.showToasts(res.message);
					}
					that.emits();//回调参数
					
				} catch (e) {
					console.log(e)
				}
			},
			emits(){//回调
				this.$emit('costcCks',{
					CostCis:this.CostCis,
					CostCi:this.CostCi,
					isGetStaffList:this.isGetStaffList,
					NameCenter:{
						name:this.NameCenter.name,
						id:this.NameCenter.id
					},
					TravelCostCenlist:this.TravelCostCenlist,
					TravelDepartlist:this.TravelDepartlist
				})
			},
			approval() {
				if(this.toisblcks == 1){
					return
				}
				this.ops_list = true
				this.blac_show = true;
				this.sli_old(); //点击成本中心
			},
			clslitk(item) { //点击成本中心部门
				// if(this.toisblcks == 1){
				// 	return
				// }
				// if(item.id == this.slit_id_checd){
				// 	return
				// }
				this.botname = item.name;
				let id = item.id
				let ls = this.treeLists;
				let ik = 0;
				for (var i = 0; i < ls.length; i++) { //判断是否有子集
					if (ls[i].parentId.length > 0 && ls[i].parentId.includes(id)) {
						ik++;
					}
				}
				if (ik > 0) { //有子集
					this.sli_namelist = []
					for (var i = 0; i < ls.length; i++) { //取出当前子集
						if (id == ls[i].id) {
							this.slit_id_checd = ls[i].id
							if (ls[i].parentId.length == 0) {
								this.slitlist = [];
							}
							if (this.slitlist.length > 0) {
								let ids = this.slitlist.length - 1;
								if (JSON.stringify(this.slitlist[ids].parentId) == JSON.stringify(ls[i].parentId)) {
									this.slitlist.splice(ids, 1);
								}
							}
							this.slitlist.push(ls[i])
						}
						if (ls[i].parentId.length > 0 && ls[i].parentId.includes(id)) { //判断当前点击的是否有子集
							if (ls[i].parentId.indexOf(id) == ls[i].parentId.length - 1) {
								this.sli_namelist.push(ls[i])
							}
						}
					}
				} else {
					for (var i = 0; i < ls.length; i++) { //没有子集
						if (ls[i].id == id) {
							this.slit_id_checd = ls[i].id
							if (ls[i].parentId.length == 0) {
								this.slitlist = [{
									name: ls[i].name,
									id: ls[i].id,
									parentId: []
								}]
							} else {
								let ids = this.slitlist.length - 1;
								if (JSON.stringify(this.slitlist[ids].parentId) == JSON.stringify(ls[i].parentId)) {
									this.slitlist.splice(ids, 1);
								}
								this.slitlist.push(ls[i])
							}
						}
					}
				}
			},
			reblocks(item) { //返回上级
				let ls = this.treeLists; //部门列表
				let id = item.id;
				this.slit_id_checd = id; //当前点击的部门id
				this.sli_namelist = []; //重新渲染部门信息
				let ins = this.slitlist.indexOf(item); //获取当前级别的下标
				for (var i = 0; i < this.slitlist.length; i++) { //删除右边级别
					if (i > ins) {
						this.slitlist.splice(i, 1);
					}
				}
				for (var i = 0; i < ls.length; i++) { //判断是否有子集
					if (JSON.stringify(item.parentId) == JSON.stringify(ls[i].parentId)) {
						this.sli_namelist.push(ls[i])
					}
				}
				this.botname = item.name;
			},
			// 重新生成数组
			renderTreeLists(list = [], rank = 0, parentId = []) { //成本中心
				list.forEach(item => {
					this.treeLists.push({
						id: item.id,
						name: item.text,
						userCount: item.a_attr.userCount,
						ischecds: 0,
						parentId, // 父级id数组
						rank, // 层级
						showChild: false, //子级是否显示
						show: rank === 0 // 自身是否显示
					});
					if (Array.isArray(item.children) && item.children.length > 0) {
						let parents = [...parentId];
						parents.push(item.id);
						this.renderTreeLists(item.children, rank + 1, parents);
					} else {
						this.treeLists[this.treeLists.length - 1].lastRank = true;
					}
				});
			},
			async selts() { //查询成本中心
				let _this = this;
			
				try {
					let res = await tork.getCostCenterList();
			
					if (res.code == 200) {
			
						_this.treeLists = [];
						_this.renderTreeLists(res.data);
					} else {
						_this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e)
			
				}
			},
			oksoption() { //部门和成本中心审批人确定
				let that = this;
				let st = that.isswf; //是成本中心还是部门 true为成本中心
				let itn = true;
				let uls = [];
				if (st) {
					uls = that.CostCenterlist; //成本中心
				} else {
					uls = that.Deparapprover; //成本中心
				}
				if (itn) {
					let sus = [];
					let suname = [];
					if (st) { //成本中心
						for (let i = 0; i < uls.length; i++) {
							for (var k = 0; k < uls[i].apprvCostFlowNodePersons.length; k++) {
								if (k == that.CostCenter[i].index) {
									sus.push({
										deptCost: 2,
										nodeId: uls[i].apprvCostFlowNodePersons[k].nodeId,
										personId: uls[i].apprvCostFlowNodePersons[k].id,
										staffId: uls[i].apprvCostFlowNodePersons[k].staffId,
										staffName: uls[i].apprvCostFlowNodePersons[k].staffName
									})
								}
							}
						}
						this.TravelCostCenlist = sus
					} else { //部门
						for (let i = 0; i < uls.length; i++) {
							for (var k = 0; k < uls[i].apprvDeptFlowNodePersons.length; k++) {
								if (k == that.Deparapp[i].index) {
									sus.push({
										deptCost: 1,
										nodeId: uls[i].apprvDeptFlowNodePersons[k].nodeId,
										personId: uls[i].apprvDeptFlowNodePersons[k].id,
										staffId: uls[i].apprvDeptFlowNodePersons[k].staffId,
										staffName: uls[i].apprvDeptFlowNodePersons[k].staffName
									})
								}
							}
						}
						this.TravelDepartlist = sus
					}
					that.switfal = false;
					that.blac_show = false;
				}
				that.emits();//回调参数
			},
		}
	}
</script>

<style scoped lang="scss">
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
	.isswflist {
		position: fixed;
		bottom: 0;
		left: 0;
		transition: all 0.3s ease;
		-webkit-transform: translateY(100%);
		transform: translateY(100%);
		min-height: 150upx;
		width: 100%;
		z-index: 889;
		background: #ffffff;
	
		.btns {
			width: 100%;
			height: 90upx;
			display: flex;
			text-align: center;
			line-height: 90upx;
			font-size: 35upx;
			background: #E5E5E5;
	
			.btns_z {
				flex: 1;
				height: 90upx;
				color: $uni-color-primary;
			}
		}
	
		.isstops {
			padding: 40upx 10%;
			width: calc(100% - 20%);
	
			.isstop {
				height: 90upx;
				line-height: 90upx;
				width: 100%;
				display: flex;
				align-items: center;
	
				.wors {
					font-size: 35upx;
					width: 60%;
					height: 50upx;
					line-height: 50upx;
					padding-left: 20upx;
					border: 2upx solid #C8C7CC;
				}
			}
		}
	}
	
	.optslist {
		position: fixed;
		bottom: 0;
		left: 0;
		transition: all 0.3s ease;
		-webkit-transform: translateY(100%);
		transform: translateY(100%);
		min-height: 200upx;
		width: 100%;
		z-index: 889;
		background: #ffffff;
	
		.btns {
			width: 100%;
			height: 90upx;
			display: flex;
			text-align: center;
			line-height: 90upx;
			font-size: 35upx;
			background: #E5E5E5;
	
			.btns_z {
				flex: 1;
				height: 90upx;
				color: $uni-color-primary;
			}
		}
	
		.stlist {
			width: 100%;
			height: 400upx;
			background: #E5E5E5;
			display: flex;
	
			.sltleft {
				height: 400upx;
				width: 30%;
	
				.ulsk_list {
					width: 100%;
					height: 90upx;
					text-align: center;
					font-size: 35upx;
					line-height: 90upx;
				}
	
				.cked {
					background: #FFFFFF;
				}
			}
	
			.sltright {
				width: 70%;
				height: 400upx;
				background: #FFFFFF;
	
				.sltrig_top {
					width: 100%;
					height: 90upx;
					overflow: scroll;
					line-height: 90upx;
					font-size: 25upx;
					display: flex;
					border-bottom: 2upx solid #F1F1F1;
	
					.sltiig_top_left {
						width: 140upx;
						text-indent: 20upx;
						color: #F1F1F1;
					}
	
					.sltiig_top_right {
						padding: 0 5px;
						min-width: 100upx;
						text-indent: 10upx;
						color: #333333;
					}
	
					.stis {
						color: $uni-color-primary !important;
					}
				}
	
				.sltrig_bot {
					width: calc(100% -20upx);
					height: 310upx;
					padding-left: 20upx;
					overflow: scroll;
	
					.striglist {
						width: 100%;
						height: 90upx;
						border-bottom: 2upx solid #F1F1F1;
						line-height: 90upx;
						display: flex;
	
						.stlis_left {
							width: 90%;
						}
	
						.stlis_right {
							width: 10%;
							text-align: center;
						}
					}
				}
			}
		}
	
		.botmis {
			width: 100%;
			height: 60upx;
			font-size: 30upx;
			color: $uni-color-primary;
			text-align: center;
			line-height: 60upx;
		}
	}
	
	.show {
		-webkit-transform: translateY(0);
		transform: translateY(0);
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
</style>
