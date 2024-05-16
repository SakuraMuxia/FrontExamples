// 导入
import SMERouter from 'sme-router';
// 导入一个模板
import indexV from  './views/index.ejs';
import adminV from  './views/admin.ejs';
import loginV from  './views/login.ejs';
import advV from  './views/adv.ejs';


// indexV 是一个函数，调用indexV的返回值 是模版中的内容

// 创建实例
// 默认是 hash 模式，特点  http://adv.manage.fuming.site/#/index/advlist
// 可以改为 history 模式，特点  http://adv.manage.fuming.site/index/advlist
const router = new SMERouter('app',"html5");

router.route('/index', (req, res) => {
    // res.render(indexV({title:'Shirly', message:'锄禾日当午'}));
    res.render(indexV());
});

router.route('/admin', (req, res) => {
    res.render(adminV());
});

router.route('/adv', (req, res) => {
    res.render(advV());
});

router.route('/login', (req, res) => {
    res.render(loginV());
});

router.route('*', (req, res) => {
    res.redirect(indexV());
});
