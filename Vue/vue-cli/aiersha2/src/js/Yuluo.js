export const mapState = function(Options){
    // 定义一个对象
    const obj = {};
    // 当mapState() 传入的是一个数组 mapState([])
    if(Options instanceof Array){
        // 将数组元素作为 obj的属性名,属性值是一个函数的返回值: 实例vm中的store中的state的值。
        Options.forEach(arr => {
            obj[arr] = function(){
                return this.$store.state[arr];
            }
        })
        console.log("Welcome to yuluo!!!");
    // 当mapState() 传入的是一个对象 mapState({})
        // {
        //     SecondGeneration: (state) => state.SecondGeneration,
        // }
    }else{
        // 遍历对象,把key作为属性名，属性值。
        for(let key in Options){
            obj[key] = function(){
                // 把这个对象的属性值(函数)调用执行，并把函数的返回值返回
                return Options[key](this.$store.state);
            }
        }
    }
    
    // 把对象返回
    return obj;
}