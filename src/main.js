import Vue from 'vue'
import App from './App'
import store from './store'

Vue.prototype.$store = store
// #ifdef  H5
//h5公众号 支付js封装
import wechat from './common/wechat'
if (wechat.isWechat()) {
	Vue.prototype.$wechat = wechat;
}
// #endif 


Vue.prototype.showToasts = function(er){
	uni.showToast({
		title:er,//提示文字
		mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false
		icon:'none',
		duration:1000
	})
}

function showLoading(show) {
  store.commit("showLoading", show);
}

Vue.prototype.$showLoading = showLoading;

Vue.prototype.rotes = function(er){//用户权限
	let list = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')).permissionList;
	for (let item of list) {
		if (item == er) {
			return true;
		}
	}
	return false;
}

Vue.prototype.copyCommand = function(er){//复制
	var _input = document.createElement("input"); // 直接构建input
	_input.value = er; // 设置内容
	document.body.appendChild(_input); // 添加临时实例
	_input.select(); // 选择实例内容
	document.execCommand("Copy"); // 执行复制
	uni.showToast({
		title:'复制成功!',//提示文字
		mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false
		icon:'none',
		duration:1000
	})
	document.body.removeChild(_input); // 删除临时实例
}

Vue.prototype.toBlock = function(er){//返回
	// #ifdef H5
	history.back();
	// #endif
	// #ifdef APP-PLUS || MP-WEIXIN
	uni.navigateBack()
	// #endif
}
			
import utils from '@/untils/util.js'//公众方法封装
Vue.prototype.utils = utils

import apiutils from '@/untils/apiUtil.js'//公众方法封装
Vue.prototype.apiutils = apiutils

import uniLoadMore from './components/uni-load-more/uni-load-more.vue'
import loading from './components/loadings.vue'//加载中组件
import onPageScrolls from 'components/onPageScroll.vue'//返回顶部组件
Vue.component('onPageScrolls', onPageScrolls)
Vue.component('uniLoadMore', uniLoadMore)
Vue.component('loading', loading)

import headnavigation from './components/headnavigation.vue'//顶部导航栏组件
Vue.component('headnavigation', headnavigation)
import paybtns from './components/paybtns.vue'
Vue.component('paybtns', paybtns)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
	...store
})
app.$mount()
