import store from "../store";
const PHONE = /^[1][3456789][0-9]{9}$/;//手机号码正则
const MAILBOX = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$///邮箱正则 
const URLREG = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;//网站正则
const IDCARREG = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;//身份证正则
const PASSPORT = /^[a-zA-Z0-9]{5,17}$/; //护照
const TAIWAN = /^([0-9]{8}|[0-9]{10})$/;  //台胞证
const HONGKONGCARD = /^[a-zA-Z0-9]{6,10}$/; //港澳通行
const HOMETOWN = /^[a-zA-Z]\d{8}$|^\d{15}$|^\d{17}(\d|x|X)$/;//回乡证
const NAMEZH = /^[\u4E00-\u9FA5]{1,5}$/;//中文正则
const NAMEENG = /^[a-zA-Z\/ ]{2,20}$/;//英文格式判断
let POSPATTERN = /^[a-zA-Z]+$/;//纯字母
import citys  from '@/pages/book/sselect-city/airports.js'
export default {
	/**
	*  回显机场名称
	*/
	airportCName(code){
		let datcy = citys.addressAirportAll;
		for (let i = 0; i < datcy.length; i++) {
			if (datcy[i].airportCode == code) {
				return datcy[i].airportCName
			}
		}
	},
	/**
	*  回显机场城市名称
	*/
	airportCtName(code){
		let datcy = citys.addressAirportAll;
		for (let i = 0; i < datcy.length; i++) {
			if (datcy[i].airportCode == code) {
				return datcy[i].cityCName
			}
		}
	},
	/*根据出生日期算出年龄*/
	jsGetAge(strBirthday){       
	    var returnAge;
	    var strBirthdayArr=strBirthday.split("-");
	    var birthYear = strBirthdayArr[0];
	    var birthMonth = strBirthdayArr[1];
	    var birthDay = strBirthdayArr[2];
	    
	    var d = new Date();
	    var nowYear = d.getFullYear();
	    var nowMonth = d.getMonth() + 1;
	    var nowDay = d.getDate();
	    
	    if(nowYear == birthYear){
	        returnAge = 0;//同年 则为0岁
	    }
	    else{
	        var ageDiff = nowYear - birthYear ; //年之差
	        if(ageDiff > 0){
	            if(nowMonth == birthMonth) {
	                var dayDiff = nowDay - birthDay;//日之差
	                if(dayDiff < 0)
	                {
	                    returnAge = ageDiff - 1;
	                }
	                else
	                {
	                    returnAge = ageDiff ;
	                }
	            }
	            else
	            {
	                var monthDiff = nowMonth - birthMonth;//月之差
	                if(monthDiff < 0)
	                {
	                    returnAge = ageDiff - 1;
	                }
	                else
	                {
	                    returnAge = ageDiff ;
	                }
	            }
	        }
	        else
	        {
	            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
	        }
	    }
	    
	    return returnAge;//返回周岁年龄
	},
	/**
	*  回显舱位名称
	*/
	cabinNames(va){
		if(va == 'F'){
			return '头等舱'
		} else if(va == 'C'){
			return '商务舱'
		} else if(va == 'Y'){
			return '经济舱'
		} else {
			return '经济舱'
		}
	},
	Xings(num){
		let ns ="";
		for (let i = 0; i < num; i++) {
			ns += '*'
		}
		return ns
	},
	/**
	*  号码脱敏
	*/
	TuoMin(no,type){
		if(type == 1){//手机号
			var pat=/(\d{3})\d*(\d{4})/
			var b = no.replace(pat,'$1****$2');
			return b
		} else if(type == 'NI'){//身份证证件信息
			var pat=/(\S{4})\S*(\S{4})/
			var b = no.replace(pat,'$1' + this.Xings(no.length - 8) + '$2');
			return b
		} else if(type == 'PP'){//护照证件信息
			var pat=/(\S{2})\S*(\S{2})/
			var b = no.replace(pat,'$1' + this.Xings(no.length - 4) + '$2');
			return b
		} else if(type == 'HX'){//回乡证证件信息
			var pat=/(\S{2})\S*(\S{2})/
			var b = no.replace(pat,'$1' + this.Xings(no.length - 4) + '$2');
			return b
		} else if(type == 'GA'){//港澳通行证
			var pat=/(\S{2})\S*(\S{2})/
			var b = no.replace(pat,'$1' + this.Xings(no.length - 4) + '$2');
			return b
		} else if(type == 'TB'){//台胞证
			var pat=/(\S{2})\S*(\S{2})/
			var b = no.replace(pat,'$1' + this.Xings(no.length - 4) + '$2');
			return b
		} else if(type == 'OS'){//其他证件
			var pat=/(\S{2})\S*(\S{2})/
			var b = no.replace(pat,'$1' + this.Xings(no.length - 4) + '$2');
			return b
		} else { //处理证件类型 为数字的时候
			var pat=/(\S{2})\S*(\S{2})/
			var b = no.replace(pat,'$1' + this.Xings(no.length - 4) + '$2');
			return b
		}
	},	
	/**
	* 将金额缩写 加万
	*/
	upPrcies(prc) {
		if(prc == null){
			return 0
		}
		if(prc.length > 8){
			let str = prc.substring(0,prc.length - 8);
			return str + '亿'
		} else if(prc.length > 4){
			let str = prc.substring(0,prc.length - 4);
			return str + '万'
		} else {
			return prc
		}
	},
	/**
	* 算出多经纬度的中心点
	*/
	getCenter(pointArray) {
	    var sortedLongitudeArray = pointArray.map(item => item.longitude).sort();//首先对经度进行排序，红色部分是array中经度的名称
	    var sortedLatitudeArray = pointArray.map(item => item.latitude).sort();//对纬度进行排序，红色部分是array中纬度的名称
	    var centerLongitude = ((parseFloat(sortedLongitudeArray[0]) + parseFloat(sortedLongitudeArray[sortedLongitudeArray.length - 1])) / 2).toFixed(4);
	    const centerLatitude = ((parseFloat(sortedLatitudeArray[0]) + parseFloat(sortedLatitudeArray[sortedLatitudeArray.length - 1])) / 2).toFixed(4);
		//如果经纬度在array中不是数字类型，需要转化为数字类型进行计算，如果是可以去掉parseFloat处理
	    return [centerLongitude, centerLatitude];
	},
	/**
	* 计算两个经纬度的距离(千米)
	*/
	distances(lat1, lng1, lat2, lng2){
		var radLat1 = lat1*Math.PI / 180.0;
		var radLat2 = lat2*Math.PI / 180.0;
		var a = radLat1 - radLat2;
		var b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
		var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
		Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
		s = s *6378.137 ;// EARTH_RADIUS;
		s = Math.round(s * 10000) / 10000;
		return s;
	},
	/**
	* 坐标转换，百度地图坐标转换成腾讯地图坐标
	* lng 腾讯经度（pointy）
	* lat 腾讯纬度（pointx）
	* 经度>纬度
	*/
	bMapToQQMap(lng, lat) {
	
	   var pi = 3.14159265358979324 * 3000.0 / 180.0;
	   var x = lng - 0.0065;
	   var y = lat - 0.006;
	   var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * pi);
	   var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * pi);
	   lng = z * Math.cos(theta);
	   lat = z * Math.sin(theta);
	
	    return [lng, lat];
	
	},
	/**
	* 坐标转换，腾讯地图转换成百度地图坐标
	* lng 腾讯经度（pointy）
	* lat 腾讯纬度（pointx）
	* 经度>纬度
	*/
	qqMapToBMap(lng, lat) {
	
	    if (lng == null || lng == '' || lat == null || lat == '')
	        return [lng, lat];
	
	    var x_pi = 3.14159265358979324;
	    var x = parseFloat(lng);
	    var y = parseFloat(lat);
	    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
	    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
	    var lng = (z * Math.cos(theta) + 0.0065).toFixed(5);
	    var lat = (z * Math.sin(theta) + 0.006).toFixed(5);
	    return [lng, lat];
	
	},
	zzPhone(val){//手机号正则判断
		if(!PHONE.test(val)){
			return true
		} else {
			return false
		}
	},
	zzMailbox(val){//邮箱正则判断
		if(!MAILBOX.test(val)){
			return true
		} else {
			return false
		}
	},
	zzUrlrge(val){//网站正则判断
		if(!URLREG.test(val)){
			return true
		} else {
			return false
		}
	},
	zzIdcarreg(val){//身份证正则判断
		if(!IDCARREG.test(val)){
			return true
		} else {
			return false
		}
	},
	zzPassport(val){//护照正则判断
		if(!PASSPORT.test(val)){
			return true
		} else {
			return false
		}
	},
	zzTaiwan(val){//台胞证正则判断
		if(!TAIWAN.test(val)){
			return true
		} else {
			return false
		}
	},
	zzTaiwan(val){//中文正则判断
		if(!TAIWAN.test(val)){
			return true
		} else {
			return false
		}
	},
	zzHongkongcard(val){//港澳通行证正则判断
		if(!HONGKONGCARD.test(val)){
			return true
		} else {
			return false
		}
	},
	zzNamezh(val){//中文正则判断
		if(!NAMEZH.test(val)){
			return true
		} else {
			return false
		}
	},
	zzNameeng(val){//英文正则判断
		if(!NAMEENG.test(val)){
			return true
		} else {
			return false
		}
	},
	zzPospattern(val){
		if(!POSPATTERN.test(val)){
			return true
		} else {
			return false
		}
	},
	
	getRequest: function() {//截取浏览器参数
		let str = window.location.hash.split("?")[1];
		let app_id = '';
		let appslit = {};
		if (str != undefined) {
			if (str.indexOf('&') >= 0) {
				let scv = str.split('&')
				for (var i = 0; i < scv.length; i++) {
					var scvs = scv[i].split("=");
					appslit[scvs[0]] = scvs[1]
				}
				let rs = {};
				if (appslit.sessionId != null && appslit.sessionId != undefined) {
					rs['sessionId'] = appslit.sessionId
				}
				if (appslit.appId != null && appslit.appId != undefined) {
					rs['appId'] = appslit.appId
				}
				if (appslit.corpid != null && appslit.corpid != undefined) {
					rs['corpid'] = appslit.corpid
				}
				if (appslit.customerNo != null && appslit.customerNo != undefined) {
					rs['customerNo'] = appslit.customerNo
				}
				return rs
			} else {
				if (str.substring(0, 5) == 'appId') {
					return {
						'appId': str.substr(6)
					}
				}
				if (str.substring(0, 9) == 'sessionId') {
					store.commit('logout');
					return {
						'sessionId': str.substr(10)
					}
				}
			}
		} else {
			return {
				'appId': uni.getStorageSync('wxAppids')
			}
		}
	}
}
