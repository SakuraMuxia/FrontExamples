// config.data中的属性通过defineProperty作为实例的属性。
function Yuluo(config){
    // 设置实例的属性 $data
	this.$data = config.data;
	for(let key in config.methods){
        // 给方法中的函数绑定this,并设置实例的属性 fun
		this[key] = config.methods[key].bind(this);
	}

	for(let key in config.data){
		Object.defineProperty(this,key,{
			get(){
				return this.$data[key]
			},
			set(v){
				this.$data[key] = v;
			}
		})
	}
}

