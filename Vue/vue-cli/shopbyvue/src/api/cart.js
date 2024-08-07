// 导入axios请求
import { sphRequest } from "@/request";

// 获取购物车数据请求
const getCartList = () => {
    return sphRequest.get("/cart/cartList");
}

// 提交添加购物车数据
const postAddToCart = (skuId, skuNum) => {
    return sphRequest.post(`/cart/addToCart/${skuId}/${skuNum}`);
}

// 获取购物车选中状态数据 /api/cart/checkCart/{skuID}/{isChecked}  get
const getCartIsCheckedById = (skuID, isChecked) => {
    return sphRequest.get(`/cart/checkCart/${skuID}/${isChecked}`)
}

// 删除购物车的数据 /api/cart/deleteCart/{skuId} delete
const deleteCartListById = (skuId) => {
    return sphRequest.delete(`/cart/deleteCart/${skuId}`)
}

// 批量删除购物车中的商品 /api/cart/batchDeleteCart  post
const deleteCartListBatch = (data) => {
    return sphRequest.post(`/cart/batchDeleteCart`, data)
}

// 批量勾选购物车的商品 /api/cart/batchCheckCart/{isChecked}  post
// 参数：isChecked:是否选中，skuIdList，商品的列表信息
const postBatchCheckCart = (isChecked, skuIdList) => {
    return sphRequest.post(`/cart/batchCheckCart/${isChecked}`, skuIdList)
}

// 暴漏数据
export {
    postAddToCart,
    getCartList,
    getCartIsCheckedById,
    deleteCartListById,
    deleteCartListBatch,
    postBatchCheckCart
}