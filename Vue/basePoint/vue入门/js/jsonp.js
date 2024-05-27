export default function jsonp(url,config={}){
	let fnName = null;
	return new Promise((resolve,reject)=>{
		// 判断是否存在回调函数, 默认无，有则把回调函数名称添加到 查询字符串中
		if(config.callback){
			// 定义fnName
			// let fnName = "parseData";
			fnName = "liu"+Math.random().toString(36).slice(2);
			// 把callback的名称 (与后端约定) 增加到config.params对象中作为key，fnName作为value
			config.params[config.callback] = fnName;
		}
		// 判断是否存在指定fnName，默认是随机生成，指定则按照指定
		if(config.fnName){
			fnName = config.fnName;
		}

		// 设置全局fnName的值为全局属性
		// window[fnName] = function(obj){
		// 	// 调用成功的回调函数
		// 	resolve(obj);
		// }
		// 可以简写
		window[fnName] = resolve;

        // 使用 浏览器 地址栏的形式发送 get请求
		// 创建script标签
		const script = document.createElement("script");
		// 增加script请求地址
        url+="?"+Object.keys(config.params).map(v=>v+"="+config.params[v]).join("&");// prod=pc&wd=三国
		script.src = url;
		// 将script放置在body尾部
		document.body.appendChild(script);
		
        // 加载完成后删除script标签
		script.onload = function(){
			// 移除script元素
			document.body.removeChild(script);
			// 移除fnName
			if(fnName){
				delete window[fnName];
			}
		}
	})
}