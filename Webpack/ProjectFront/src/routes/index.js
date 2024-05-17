// 导入控制器
import indexC from '@/controllers/index';
import adminC from '@/controllers/admin';
import advC from '@/controllers/adv';
import loginC from '@/controllers/login';

export default [
    {
        path: '/index',
        element: indexC
    },
    {
        path: '/index/admin',
        element: adminC,
        isNav: true,
        title: '管理员列表',
        icon: 'fa-user',
    },
    {
        path: '/index/adv',
        element: advC,
        isNav: true,
        title: '广告列表',
        icon: 'fa-audio-description'
    },
    {
        path: '/login',
        element: loginC,
    },
    {
        path: '*',
        element: (req, res) => {
            res.redirect('/index/admin')
        }
    }
]