// 导入mz Axios实例
import mz from "@/request/index";
// 封装Aixos get方法
export const getFilms = function (pageNum, pageSize, type){
    return mz.get("/gateway", {
        params: {
            cityId: 310100,
            pageNum,
            pageSize,
            type,
            t: Date.now()
        },
    });
}

