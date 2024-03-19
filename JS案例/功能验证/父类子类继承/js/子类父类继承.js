 // 定义商品类 
 function Product(price, nums) {
    // 给实例设置属性
    this.price = price;;
    this.nums = nums;
}
Product.prototype.discount = function(num) {
    this.price *= num;
};
Product.prototype.buy = function() {
    this.nums -= 1;
}

// 汽车类商品
function CarProduct(price, nums, speed) {
    // this.price = price;
    // this.nums = nums;
    // 将父类规定的属性添加到了 CarProduct 的实例上
    Product.call(this, price, nums);
    this.speed = speed;
}   
// 设置  CarProduct 的实例的原型是 Product 的一个实例
CarProduct.prototype = new Product();
// 设置 CarProduct 的实例的的原型的 constructor 属性的值是  CarProduct
CarProduct.prototype.constructor = CarProduct;
// 设置方法
CarProduct.prototype.driver = function() {
    console.log('这辆车可以被驾驶！');
}