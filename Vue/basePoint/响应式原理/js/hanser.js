// 定义构造函数
function Hanser(config){
	// 设置数据的订阅者集合
	this.binds = {};
    // 设置实例的$data属性 
	this.$data = config.data;
	// 设置实例的方法属性
	this.initMethods(config);
	// 设置实例的$el属性
	this.$el = document.querySelector(config.el);
	// 调用发布者
	this.observe();
	// 调用解析器
	this.compile(this.$el);

}
// 添加Hanser实例的方法
Object.assign(Hanser.prototype,{
	// observe方法 用于侦听数据发生变化 通知订阅者 进行视图更新
	observe(){
		for(let key in this.$data){
			// 为实例的每个data中属性名设置一个数组,为了存储 Watcher实例 
			this.binds[key] = [];
			// 设置 hs对象的每个key属性(每个属性名)的getter和setter方法，
			Object.defineProperty(this,key,{
				get(){
					// 返回对应的属性值
					return this.$data[key]
				},
				set(v){
					// 设置对应的属性值
					this.$data[key] = v;
					// 同时调用binds对象中的某个属性名的值对应数组中的Watcher对象的update方法
					// 实现数据改变监听功能，并且通知Watcher实例调用方法实现视图DOM更新
					this.binds[key].forEach(item=>{
						// item 是 Watcher的实例 wc
						// console.log(item);
						item.update();
					})
				}
			})
		}
	},
	// 解析器
	compile(el){
		// 获取挂载元素的子元素
		const nodes = el.children;
		// 遍历子元素
		Array.from(nodes).forEach(item =>{
			
			// 判断元素是否拥有@click属性并增加 @click属性
			if(item.hasAttribute('@click')){
				// 获取@click的表达式 @click = "attrValue"
				const attrValue = item.getAttribute("@click");
				
				// 为元素增加click事件 this[attrValue]回调函数 => methods中的函数
				item.addEventListener('click',this[attrValue]);
			}
			// 判断元素是否拥有z-model属性并增加 z-model属性
			if(item.hasAttribute("h-model")){
				// 获取到z-model的属性值 h-model = "info"
				const attrValue = item.getAttribute("h-model"); // info
				// data数据中的info属性值 设置为 input的value属性值
				item.value = this[attrValue];
				// 为元素增加input事件 input的value属性值 设置为 data数据中的info属性值
				item.addEventListener("input",(e)=>{
					// input的value属性值 设置为 data数据中的info属性值
					this[attrValue] = e.target.value;
				})
			};
			// 判断元素是否拥有z-text属性并增加 z-text属性
			if(item.hasAttribute("h-text")){
				const attrValue = item.getAttribute("h-text");
				// data数据中的info属性值 设置为 元素的内容
				item.innerText = this[attrValue];
				// 修改item元素 innerText 属性值
				this.binds[attrValue].push(new Watcher(item,"innerText",this,attrValue))
			}
			// 判断元素是否拥有h-html属性并增加 h-html 属性
			if(item.hasAttribute("h-html")){
				const attrValue = item.getAttribute("h-html");
				item.innerHTML = this[attrValue];
				// 提供一个修改node元素的innerHTML属性值的方法
				// this.binds[attrValue].push(()=>{
				// 	node.innerHTML = this[attrValue];
				// });
				this.binds[attrValue].push(new Watcher(item,"innerHTML",this,attrValue))
			}
		})
	}
})


// 设置 Hanser的实例的属性 初始化
// 给实例添加methods方法
Hanser.prototype.initMethods = function(config){
	for(let key in config.methods){
        // 给方法中的函数绑定this,并设置实例的属性 fun
		this[key] = config.methods[key].bind(this);
	}
}



// 设置订阅者构造函数
/**
 * node:元素
 * attr:元素属性名
 * hs:实例
 * prop:实例属性名
 */
function Watcher(node,attr,hs,prop){
	this.node = node;
	this.attr = attr;
	this.hs = hs;
	this.prop = prop;
}
// 设置Watcher原型update方法 将 实例中属性值 设置为 元素的属性值
// node.innerHTML = this[attrValue]
Watcher.prototype.update = function(){
	// 将 实例中属性值 设置为 元素的属性值
	this.node[this.attr] = this.hs[this.prop];
}