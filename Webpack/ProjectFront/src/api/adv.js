// 导入实例
import advServer from '../request/advserver';

// 添加广告
export const postAdv = formdata => {
    return advServer.post('/adv', formdata)
}

// 获取广告列表
export const getAdv = (pageNo, pageSize, keyword) => {
    return advServer.get('/adv', {
        params: {
            pageNo,
            pageSize,
            keyword
        }
    })
}
