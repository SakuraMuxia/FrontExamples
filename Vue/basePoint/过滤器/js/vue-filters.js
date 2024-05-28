export default {
    // 修改日期的方法
    modifyDate(date){
        // 实例化日期对象
        const d = new Date(date);
        // 返回
        return  d.getFullYear() + "-" + 
                (d.getMonth()+1).toString().padStart(2,0) + "-" +
                d.getDate().toString().padStart(2,0)+" "+
                d.getHours().toString().padStart(2,0)+":"+
                d.getMinutes().toString().padStart(2,0)+":"+
                d.getSeconds().toString().padStart(2,0);
    },
    // 加货币符号方法
    currency(data,num=2,type="$"){
		return type + data.toFixed(num);
	}
}