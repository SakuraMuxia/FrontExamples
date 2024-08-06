// 导入uuid模块
import { v4 as uuidV4 } from "uuid"

const getUserTempId = function () {
    // 定义一个临时用户ID，判断缓存中是否存在
    let userTempId = localStorage.getItem("userTempId");

    if (!userTempId) {
        // 创建一个UUID
        userTempId = uuidV4();
        // 存储到缓存中
        localStorage.setItem("userTempId", userTempId);
    }
    // 返回
    return userTempId;
}

// 暴漏数据
export {
    getUserTempId
}