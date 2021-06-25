<template>
  <view class="introduce">
    <loading>

    </loading>
    <headnavigation titles="酒店介绍"></headnavigation>
    <view class="introducemain">
        <view class="name">{{datalist.resName}}</view>
        <view class="time">
            <span>开业：{{datalist.establishmentDate}}</span>
            <span style="margin-left:40upx;">联系方式：{{datalist.resPhone}}</span>
        </view>
        <image :src="datalist.imgUrl"></image>
        <view class="shortIntro">{{datalist.shortIntro}}</view>
    </view>
  </view>
</template>
<script>
export default {
    data(){
        return{
			datalist:{}
        }
    },
	onLoad(item) {
		this.datalist = JSON.parse(item.datalist)
	}
}
</script>
<style scoped lang="scss">
.introduce{
    height: 100%;
    background: white;
    .introducemain{
       width: calc(100%-60upx);
       margin: 30upx;
       .name{
           font-size: 35upx;
           font-weight: bold;
           color: #333333;
       }
       .time{
           margin: 20upx 0; 
           font-size: 28upx;
           color: #666666;
       }
       .shortIntro{
           margin-top: 20upx;
           font-size: 28upx;
           color: #666666;
           padding-bottom: 100upx;
       }
    }
    image{
        width: 100%;
    }
}
</style>
