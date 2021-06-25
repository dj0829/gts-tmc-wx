import order from '@/api/order.js';

export default {
	async judgeApprv(pass){//判断用户是否免审
		let res = await order.judgeApprv({
			passengerNos:pass
		});
		if(res.code == 200){
			console.log(res.data)
			if(res.data == true){
				return true
			} else {
				return false
			}
		} else {
			return false
		}
	}
}