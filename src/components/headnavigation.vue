<template>
	<view class="Navigation">
		<view class="smtis">
			<view v-if="istoblock == 1" @click="rblcok" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
		</view>
		<view class="ongbutn" style="font-size: 35upx;">
			{{title}}
		</view>
		<view class="smtis">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: ''
			}
		},
		props: {
			istoblock:{
				type:Number,
				default:1
			},
			titles: {
				type: String,
				default: ''
			},
		},
		mounted() {
			this.title = this.titles;
		},
		methods: {
			rblcok() {
				this.toBlock();
			}
		}
	}
</script>

<style>
</style>
