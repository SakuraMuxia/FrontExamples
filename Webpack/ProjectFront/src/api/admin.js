// 导入实例
import advServer from '../request/advserver';

// 添加管理员
export const postAdmin = body => {
    return advServer.post('/admin', body);
}

// 获取管理员
export const getAdmin = () => {
    return advServer.get('/admin');
}

// 删除指定id的管理员
export const deleteAdmin = id => {
    return advServer.delete('/admin/'+id);
}

// 修改密码
export const changePassword = body => {
    return advServer.patch('/changpwd', body)
}