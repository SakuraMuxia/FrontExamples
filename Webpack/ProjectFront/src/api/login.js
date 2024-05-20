// 导入实例
import advServer from '../request/advserver';

export const postLogin = body => {
    return advServer.post('/login', body);
}