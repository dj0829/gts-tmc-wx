<template>
	<view class="pass_list">
		
		<loading>
		</loading>
		<view :class="{'share-box': isuserlist}" @click="close">
		</view>
		<view class="share-item" :class="{'share-show': isuserlist}">
			<view class="pa-toplist" :style="{'height': boxheight + 'px'}">
				<view class="pa-top">
					<input v-model="ser_int" type="text" value="" @input="search($event)" class="input-css" placeholder="搜索" />
					<view v-if="trim(ser_int)" class="iconfont" @click="sea_null" style="color: #999999;">&#xe608;</view>
				</view>
				<view class="sev_bool" v-if="sev_bool" :style="{'height': sevheight + 'px'}">
					<view class="sev_bools" v-for="(item,index) in searchlists" @click="seoklist(item)" :key="index">
						{{item.userName}}
						<p style="color: #007aff;font-size: 28upx;">{{item.deptName}}</p>
					</view>
				</view>
				<view class="cklists" v-if="checkuserlist.length > 0">
					<view class="cklistsds">
						选择人员：
					</view>
					<view class="cklistsd" v-for="(item,index) in checkuserlist" :key="index" @click="deleck(item)">
						{{item.userName}}
					</view>
				</view>
				<view class="pa_bot">
					<view class="coll_lists">
						<view class="mix-tree-list">
							<block v-for="(item, index) in treeList" :key="index">
								<view
									class="mix-tree-item"
									:style="[
										{
											paddingLeft: item.rank * 15 + 'px',
											zIndex: item.rank * -1 + 50
										}
									]"
									:class="{
										border: treeParams.border === true,
										show: item.show,
										last: item.lastRank,
										showchild: item.showChild,
										colors: !item.lastRank && item.showChild,
										rtlock: item.id == shetid
									}"
									@click.stop="treeItemTap(item, index)"
								>
									<view v-if="!item.ischecds" class="tsd">
										<view class="iconfont" style="color: #007aff;" v-if="!item.lastRank && item.showChild">&#xe8a0;</view>
										<view class="iconfont" v-if="!item.lastRank && !item.showChild">&#xe636;</view>
										<view   style="width: 40upx;" v-if="item.lastRank"></view>
										{{ item.name }}
										<view   v-if="item.rank == 0 && item.userCount > 0">({{ item.userCount }})</view>
									</view>
									<view v-if="item.ischecds" class="tsd">
										<view class="iconfont" :style="{ color: item.checkd ? '#007aff' : '#f1f1f1' }">{{ item.checkd ? oktl : isoktl }}</view>
										<view style="margin-left: 20upx;">{{ item.name }}</view>
									</view>
								</view>
							</block>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="pass_page" v-if="blicks" @click="close">
		</view> -->
		<!-- <view class="pass_pagebox" :class="isuserlist ? 'shows' : ''" @click.stop :style="{'height': boxheight + 'px'}">
			
		</view> -->
		<view class="fixd_btn" v-if="isuserlist" @click="btn_click">选好了</view>
		<view class="pa_list1" v-if="types == 1">
			<view class="pa_div">
				<text v-if="butaluserlists.length == 0">旅客姓名</text>
				<view class="pa_lisc" v-else v-for="(item,index) in butaluserlists" :key='index'>
					<view>
						{{item.userName}}
					</view>
					<view class="iconfont" v-if="!isretun"  style="color: #C0C0C0;font-size: 40upx;" @click="del_pass(item.userId)">&#xe641;</view>
				</view>
			</view>
			<view class="iconfont  icon" v-if="!isretun" @click="pas_click" >&#xe89f;</view>
		</view>
		<view class="pa_list2" v-if="types ==2">
			<view class="pa_tops">
				<view class="patite">
					{{tynames}}
				</view>
				<view class="iconfont  icon" v-if="!isretun"  @click="pas_click">&#xe89f;</view>
			</view>
			<view class="pa_div">
				<text v-if="butaluserlists.length == 0">旅客姓名</text>
				<view class="pa_lisc" v-else v-for="(item,index) in butaluserlists" :key='index'>
					<view>
						{{item.userName}}
					</view>
					<view class="iconfont paNams" v-if="!isretun" style="color: #C0C0C0;font-size: 40upx;"  @click="del_pass(item.userId)">&#xe641;</view>
				</view>
			</view>
		</view>
		<view class="userlist" :class="shos ? 'show' : ''">
			<view class="userlist_top">
				<view class="btns" @click="shos = false">取消</view>
				<view class="oli">请选择人员</view>
				<view class="btns" @click="ic_ok">确定</view>
			</view>
			<view class="usarbotm">
				<view class="stname" v-for="(item,index) in usersnamelist" :key="index">
					<view :class="['stve',item.istrue ? 'stnames': 'stnamet']" @click="aduser(item,index)">
						{{item.userName}}
					</view>
				</view>
			</view>
		</view>
		<view class="black_mus" @click="shos = false" v-if="shos"></view>
	</view>
</template>

<script>
	import Mydi from '@/api/mydi.js'
	import login from '@/api/login.js'
	export default{
		props: {
			tynames:{
				type:String,
				default: '乘客'
			},	
			types:{
				type:String,
				default: '1'
			},
			isretun: {
				type:Boolean,
				default: false
			},
			butaluserlist:{
				type:Array,
				default: ()=>{ return [] }
			}
		},
		data(){
			return{
				blicks:false,
				boxheight:600,//盒子高度
				sevheight:600,//查询列表高度
				usersnamelist:[],//操作的人员
				shos:false,
				checkuserlist:[],
				searchlists:[],
				sev_bool:false,
				id_list: [],
				oktl: '\ue611',
				isoktl: '\ue75d',
				shetid: 0,
				treeParams: {
					border: true
				},
				ser_int: '',
				isuserlist: false, //是否显示用户列表
				treeList: [],
				butaluserlists:[]
			}
		},
		watch:{
			butaluserlist(item){
				for (let i in item) {
					item[i]['istrue'] = true;
				}
				this.butaluserlists = item;
			}
		},
		mounted() {
			this.screenHeights = uni.getSystemInfoSync().screenHeight; //屏幕高度
			this.boxheight = this.screenHeights-170;//盒子高度 =  屏幕高度 - 上边距
			this.sevheight = this.screenHeights-240;
		},
		methods:{
			close(){
				this.$emit('ishow',true);
				this.isuserlist = false;
				this.blicks = false;
			},
			ic_ok(){//确定当前人员
				this.butaluserlists = this.usersnamelist;
				this.shos = false;
			},
			aduser(it,index){//选择人员
				this.usersnamelist[index].istrue = !this.usersnamelist[index].istrue;
			},
			sea_null(){//清空搜索框的值
				this.ser_int = "";
				this.sev_bool = false;
			},
			deleck(item){//重复点击删除
				for (let s in this.checkuserlist) {
					if(this.checkuserlist[s].passengerNo == item.passengerNo){
						this.checkuserlist.splice(s,1);    
						break;
					}
				}
				for (let k in this.treeList) {
					if(this.treeList[k].passengerNo == item.passengerNo){
						this.treeList[k].checkd = false;  
						break;
					}
				}
			},
			seoklist(item){//选择搜索框的值
				let that = this;
				let st = true;
				if(item.cardNo == null || item.cardNo == ''){
					that.showToasts("该用户没有证件信息!")
					return
				}
				for (let k in that.checkuserlist) {
					if(item.passengerNo == that.checkuserlist[k].passengerNo){
						st = false;
						that.showToasts("请不重复选择!")
						return
					}
				}
				if(st){
					this.checkuserlist.push(item);
					for (let k in this.treeList) {
						if(this.treeList[k].passengerNo == item.passengerNo){
							this.treeList[k].checkd = true;  
							break;
						}
					}
					this.sev_bool = false;
				}
			},
			async search(ev) {
				//监听搜索的值
				let _this = this;
				let va = ev.mp.detail.value.trim(); //获取搜索框的值
				if(va.length > 0){
					_this.searchlists = [];
					_this.sev_bool = true
					try{
						let res = await Mydi.searchpartments({ name: va });
						if (res.code == 200) {
							let su = res.data;
							for (let k in su) {
								_this.searchlists.push({
									istrue: 0,
									passengerNo: su[k].passengerNo,
									userName: su[k].name,
									userId: su[k].id,
									deptName: su[k].deptName,
									costcenterName:su[k].costcenterName,
									cardType:su[k].certificateList == '' || su[k].certificateList == null ? '': su[k].certificateList[0].cardType,
									cardNo:su[k].certificateList == '' || su[k].certificateList == null ? '': su[k].certificateList[0].cardNo,
									deptId: su[k].deptId,
									phone: su[k].phone
								})
							}
							
						} else {
							_this.showToasts(res.message);
						}
					}catch(e){
						console.log(e);
					}
				} else{
					_this.sev_bool = false
				}
			},
			trim(ev) {
				//判断是否有值
				if (ev.trim().length > 0) {
					return true;
				} else {
					return false;
				}
			},
			btn_click() {
				//选择当前的人
				let that = this;
				that.userid_list = that.checkuserlist;
				// for (let i = 0; i < that.treeList.length; i++) {
				// 	if (that.treeList[i].checkd) {
				// 		that.userid_list.push({
				// 			phone: that.treeList[i].phone,
				// 			istrue: that.treeList[i].istrue,//是否是临时出行人
				// 			passengerNo: that.treeList[i].passengerNo,
				// 			userName: (that.treeList[i].name).toString(),
				// 			userId: that.treeList[i].id
				// 		});
				// 	}
				// }
				this.butaluserlists = that.userid_list;
				this.isuserlist = false;
				this.blicks = false;
				this.$emit('ishow',true);
				that.$emit('butaluser',this.butaluserlists);
			},
			findElem(arrayToSearch, attr, val) {
				//debugger
				for (var i = 0; i < arrayToSearch.length; i++) {
					if (arrayToSearch[i][attr] == val) {
						return i; //返回当前索引值
					}
				}
				return -1;
			},
			async colllist() {
				//查询所有部门
				let _this = this;
				try{
					_this.treeList = [];
					_this.id_list = [];
					let res = await Mydi.alldepartments();
					if (res.code == 200) {
						_this.renderTreeList(res.data);
						let rest = await Mydi.getPassengerListNoCertificate();
						if(rest.code == 200){
							let dat = rest.data.passList;
							if(dat.length > 0){
								let ds = [{
									id: "9999",
									name: '常用旅客',
									parentId: [], // 父级id数组
									rank: 0, // 层级
									ischecds: false, //是否是人
									checkd: false, //是否选中
									show: true // 自身是否显示
								}]
								for (let i = 0; i < dat.length; i++) {
									ds.push({
										id: dat[i].id,
										iscd: true,//是否有证件号
										passengerNo: dat[i].passengerNo,
										name: dat[i].name,
										phone: dat[i].phone,
										istrue: 0,//是否是临时出行人
										parentId: ["9999"], // 父级id数组
										rank: 1, // 层级
										ischecds: true, //是否是人
										checkd: false, //是否选中
										show: false // 自身是否显示
									})
								}
								_this.treeList  = ds.concat(_this.treeList);
							}
							_this.$emit('ishow',false)
							_this.isuserlist = true;
							_this.blicks = true;
						}
					} else {
						_this.showToasts(res.message);
					}
				}catch(e){
					console.log(e)
				}
				
			},
			async searchlist(id) { 
				//查询当前点击部门下的人
				let _this = this;
				_this.lis_id = id;
				let a = _this.id_list.find((value, index, arr) => {
					return value == id;
				});
				if (a == undefined || a == null) {
					_this.id_list.push(id);
					
					try{
						let res = await Mydi.searchpartments({ deptId: id });
						
						if (res.code == 200) {
							
							_this.userlist = res.data;
							if (res.data.length > 0) {
								_this.rmdlist(res.data);
							}
						} else {
							_this.showToasts(res.message);
						}
					}catch(e){
						console.log(e)
						
					}
				}
			},
			rmdlist(list) {
				//插入当前部门人员
				let _this = this;
				for (let i = 0; i < _this.treeList.length; i++) {
					if (_this.treeList[i].id == _this.lis_id) {
						for (let k = 0; k < list.length; k++) {
							let parents = [..._this.treeList[i].parentId];
							parents.push(_this.treeList[i].id);
							let si = true;
							if(list[k].certificateList == null || list[k].certificateList == ''){//判断有没有证件
								si = false
							}
							let t = false;
							for (let s in _this.checkuserlist) {
								if(_this.checkuserlist[s].passengerNo == list[k].passengerNo){
									t = true;
									break;
								}
							}
							_this.treeList.splice(i + k + 1, 0, {
								id: list[k].id,
								iscd: si,
								cardType:list[k].certificateList == '' || list[k].certificateList == null ? '': list[k].certificateList[0].cardType,
								cardNo:list[k].certificateList == '' || list[k].certificateList == null ? '': list[k].certificateList[0].cardNo,
								deptId:list[k].deptId,
								deptName:list[k].deptName,
								costcenterName:list[k].costcenterName,
								passengerNo: list[k].passengerNo,
								phone: list[k].phone,
								istrue: 1,//是否是临时出行人
								name: list[k].name,
								parentId: parents, // 父级id数组
								rank: _this.treeList[i].rank + 1, // 层级
								ischecds: true, //是否是人
								checkd: t, //是否选中
								show: true // 自身是否显示
							});
						}
					}
				}
			},
			// 重新生成数组
			renderTreeList(list = [], rank = 0, parentId = []) { //出差旅客
				list.forEach(item => {
					this.treeList.push({
						id: item.id,
						name: item.text,
						userCount: item.a_attr.userCount,
						ischecds: false,
						parentId, // 父级id数组
						rank, // 层级
						showChild: false, //子级是否显示
						show: rank === 0 // 自身是否显示
					});
					if (Array.isArray(item.children) && item.children.length > 0) {
						let parents = [...parentId];
						parents.push(item.id);
						this.renderTreeList(item.children, rank + 1, parents);
					}
				});
			},
			treeItemTap(item, index) {
				//点击展示
				let id = item.id;
				if (!item.ischecds) {
					this.shetid = id;
					if(id != 9999){
						this.searchlist(id);
					}
					let list = this.treeList;
					item.showChild = !item.showChild;
					list.forEach(childItem => {
						if (item.showChild === false) {
							//隐藏所有子级
							if (!childItem.parentId.includes(id)) {
								//检测是否包含
								return;
							}
							if (childItem.lastRank !== true) {
								childItem.showChild = false;
							}
							childItem.show = false;
						} else {
							if (childItem.parentId[childItem.parentId.length - 1] === id) {
								childItem.show = true;
							}
						}
					});
				} else {
					if(item.iscd == false){
						uni.showToast({
						    title: '该用户暂无证件信息！',
						    duration: 1000,
							icon:'none'
						});
					} else {
						if (this.treeList[index].checkd) {
							this.treeList[index].checkd = false;
							for (let s in this.checkuserlist) {
								if(this.checkuserlist[s].passengerNo == this.treeList[index].passengerNo){
									this.checkuserlist.splice(s,1);    
									break;
								}
							}
						} else {
							this.treeList[index].checkd = true;
							this.checkuserlist.push({
								istrue: this.treeList[index].istrue,
								passengerNo: this.treeList[index].passengerNo,
								userName: this.treeList[index].name,
								userId: this.treeList[index].id,
								cardType:this.treeList[index].cardType,
								cardNo:this.treeList[index].cardNo,
								costcenterName:this.treeList[index].costcenterName,
								deptName: this.treeList[index].deptName,
								deptId: this.treeList[index].deptId,
								phone: this.treeList[index].phone,
							})    
						}
					}
				}
			},
			pas_click(){//点击增加
				if(this.isretun){
					this.userupdata();
				} else {
					this.colllist();
				}
			},
			del_pass(id){//点加删除
				if(this.isretun){
					this.userupdata();
				} else {
					let ur = this.butaluserlists;
					for(let i = 0; i < ur.length; i++){
						if(ur[i].userId == id){
						  ur.splice(i,1)
						  i--;
						} 
					}
					for (var i = 0; i < this.treeList.length; i++) {
						if(this.treeList[i].id == id){
							this.treeList[i].checkd = false
						}
					}
					this.butaluserlists = ur;
					this.$emit('butaluser',this.butaluserlists);
				}
			},
			userupdata(){//操作当前人员
				return
				this.usersnamelist = this.butaluserlists;
				this.shos = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pass_list{
		width: 100%;
		font-size: 30upx;
		height: 100%;
		display: flex;
		align-items: center;
		.pass_page {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: black;
			opacity: 0.5;
			z-index: 860;
			
		}
		.pa-toplist{
			width: 100%;
			background: #F1F1F1;
			font-size: 30upx;
			border-top-left-radius: 20upx;
			border-top-right-radius: 20upx;
			overflow: scroll;
			.pa-top {
				width: calc(100% - 60upx);
				height: 120upx;
				padding: 0 30upx;
				background: #ffffff;
				display: flex;
				align-items: center;
				border-top-left-radius: 20upx;
				border-top-right-radius: 20upx;
				input {
					width: 100%;
					height: 80upx;
				}
				.pa_bok {
					margin-right: 20upx;
					display: flex;
					align-items: center;
					.pa_tou {
						.pa_tou_img {
							margin: 0 5upx;
							width: 60upx;
							height: 60upx;
							border-radius: 50%;
						}
					}
				}
			}
			.sev_bool{
				position: fixed;
				left: 0;
				bottom: 0;
				width: 100%;
				background: #FFFFFF;
				z-index: 1000;
				overflow: scroll;
				.sev_bools{
					width: calc(100% - 40upx);
					font-size: 30upx;
					height: 80upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 20upx;
					border-bottom: 1upx solid #C8C7CC;
				}
			}
			.cklists{
				margin-top: 10upx;
				padding:  0 30upx;
				// width: 100%;
				display: flex;
				flex-wrap: wrap;
				.cklistsds{
					font-size: 30upx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.cklistsd{
					font-size: 30upx;
					padding: 8upx 8upx;
					background: #FFFFFF;
					border-radius: 8upx;
					margin: 10upx;
				}
			}
			
			.pa_bot {
				margin-top: 20upx;
				width: 100%;
				background: #ffffff;
				.coll_lists {
					width: 100%;
					height: 100%;
					overflow: hidden;
					background: #ffffff;
					.mix-tree-list {
						display: flex;
						flex-direction: column;
						padding-left: 30upx;
						.mix-tree-item {
							display: flex;
							align-items: center;
							font-size: 30upx;
							color: #333;
							height: 0;
							opacity: 0;
							transition: 0.2s;
							position: relative;
							.tsd {
								display: flex;
								align-items: center;
								.iconfont{
									font-size: 30upx;
								}
							}
						}
						.mix-tree-icon {
							width: 26upx;
							height: 26upx;
							margin-right: 8upx;
							opacity: 0.9;
						}
						.mix-tree-item.border {
						}
						.mix-tree-item.show {
							border-bottom: 2upx solid #eee;
							height: 80upx;
							opacity: 1;
						}
						.mix-tree-item.colors {
							color: $uni-color-primary;
						}
						.mix-tree-item.rtlock {
							color: $uni-color-primary;
						}
						.mix-tree-item.showchild:before {
							transform: rotate(90deg);
						}
						.mix-tree-item.last:before {
							opacity: 0;
						}
					}
				}
			}
			
		}
		// .shows {
		// 	// transition: all 0.3s ease;
		// 	-webkit-transform: translateY(0);
		// 	transform: translateY(0);
		// }
		.fixd_btn {
			position: fixed;
			z-index: 910;
			bottom: 150upx;
			right: 30upx;
			font-size: 35upx;
			color: #ffffff;
			text-align: center;
			line-height: 70upx;
			width: 160upx;
			height: 70upx;
			border-radius: 70upx;
			background: $uni-color-primary;
		}
		.pa_list1{
			width: 100%;
			display: flex;
			height: 90upx;
			align-items: center;
			.pa_div{
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				overflow-x: auto;
				white-space: nowrap;
				width: 95%;
				text{
					color: #C0C0C0;
				}
				.pa_lisc{
					padding: 0 2upx;
					display: flex;
					line-height: 90upx;
					height: 90upx;
				}
			}
			.icon{
				color: #567EFE;
				font-size: 45upx;
				line-height: 1;
			}
		}
		.pa_list2{
			width: 100%;
			.pa_tops{
				display:flex;
				width: calc(100% - 40upx);
				padding: 0 20upx;
				height: 80upx;
				align-items: center;
				justify-content: space-between;
				.patite{
					font-size: 34upx;
					color: #333333;
					font-weight: 600;
				}
			}
			.pa_div{
				width: 100%;
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				overflow-x: auto;
				white-space: nowrap;
				text{
					color: #C0C0C0;
				}
				.pa_lisc{
					padding: 0 25upx 0 30upx;
					margin: 0 10upx 0 0;
					display: flex;
					line-height: 70upx;
					height: 70upx;
					border-radius: 70upx;
					background-color: #f5f6f7;
					color: #C0C0C0;
				}
			}
			.icon{
				color: #567EFE;
				font-size: 45upx;
				line-height: 1;
			}
		}
		.black_mus {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.5);
			z-index: 888;
		}
		.userlist {
			position: fixed;
			bottom: 0;
			left: 0;
			transition: all 0.3s ease;
			-webkit-transform: translateY(100%);
			transform: translateY(100%);
			min-height: 200upx;
			width: 100%;
			z-index: 9999;
			background: #ffffff;
			.userlist_top {
				display: flex;
				font-size: 30upx;
				height: 90upx;
				width: 100%;
				background: #f1f1f1;
				align-items: center;
				text-align: center;
				.btns {
					width: 20%;
					color: $uni-color-primary;
				}
				.oli {
					width: 60%;
					color: #c8c7cc;
				}
			}
			.usarbotm{
				width: 100%;
				padding: 40upx 0;
				display: flex;
				align-items: center;
				font-size: 30upx;
				.stname{
					flex: 1; 
					display: flex;
					justify-content: center;
					align-items: center;
					.stve{
						padding: 0 15upx;
						height: 40upx;
						line-height: 40upx;
						border-radius: 8upx;
					}
					.stnamet{
						border: 2upx solid #999999;
						color:#999999;
					}
					.stnames{
						background: $uni-color-primary;
						border: 2upx solid $uni-color-primary;
						color:#FFFFFF;
					}
				}
			}
		}
		.show {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}
	}
</style>
