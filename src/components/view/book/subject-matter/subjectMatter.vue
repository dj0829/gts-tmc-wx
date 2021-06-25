<template>
	<view class="sublist">
		<picker v-if="resonList.length > 0" :disabled="ishow" :range="resonList" :range-key="'name'" @change="resonChange($event)">
			{{ resonList[this.resonIndex].name}}
		</picker>
	</view>
</template>

<script>
	import tork from '@/api/torowk.js'
	export default{
		data(){
			return{
				ishow:false,
				resonList:[],//出行事由
				resonIndex:0,//当前选中的事由id
			}
		},
		props:{
			type:{//类型 1为事前 不能修改
				default:0
			},
			oldResonIds:{//默认事由
				default:0
			}
		},
		mounted() {
			this.searchRelist();
			if(this.type == 1){
				this.ishow = true;
			}	
		},
		methods:{
			resonChange(e) {//选择当前事由
				this.resonIndex = e.detail.value;
				this.$emit('change',{id:this.resonList[this.resonIndex].id,name:this.resonList[this.resonIndex].name});
			},
			async searchRelist(){
				try{
					if(this.resonList.length > 0){
						
					} else {
						let res = await tork.reasonList(); //获取出差事由
						if(res.code == 200){
							let dt = [];
							let das = res.data;
							let moid = 0;//默认选中id
							if(das.length > 0){
								for(let k in das){
									if(das[k].apprvType == 1 && das[k].isDisplay == 1){//类型为出差事由 
										if(das[k].isDefault == 1){//1为默认选中
											moid = das[k].id
										}
										dt.push({
											id:das[k].id,
											name:das[k].reason,
											isDefault:das[k].isDefault//是否默认选中 1为默认选中
										})
									}
								}
								this.resonList = dt;
								if(dt.length == 0){
									this.showToasts('请配置出差事由');
									return
								}
								if(this.oldResonIds !=0){//事前下单这种带出默认事由
									for(let k = 0;k<this.resonList.length;k++){
										if(this.resonList[k].id == this.oldResonIds){
											this.resonIndex = k;
											break;
										}
									}
									this.$emit('change',{id:this.resonList[this.resonIndex].id,name:this.resonList[this.resonIndex].name});
								} else {
									if(moid != 0){//没有默认 但是后台设置了默认出差事由
										for(let k = 0;k<this.resonList.length;k++){
											if(this.resonList[k].id == moid){
												this.resonIndex = k;
												break;
											}
										}
										this.$emit('change',{id:this.resonList[this.resonIndex].id,name:this.resonList[this.resonIndex].name});
									} else {
										this.$emit('change',{id:this.resonList[0].id,name:this.resonList[0].name});//没有默认值 默认第一个
									}
								}
							} else {
								this.showToasts('请配置出差事由');
							}
						} else {
							this.showToasts(res.message);
						}
					}
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.sublist{
		width: 100%;
		margin-right: 10upx;
		line-height: 50upx;
		border-radius: 10upx;
		text-indent: 15upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
