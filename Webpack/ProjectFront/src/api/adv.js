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
// 根据id获取广告信息
export const getAdvById = id => {
    return advServer.get('/adv/'+id);
}

// 修改广告
export const putAdv = formdata => {
    return advServer.put('/adv', formdata);
}