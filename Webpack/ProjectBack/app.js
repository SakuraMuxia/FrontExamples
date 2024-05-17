const path = require("path");

const express = require("express");

const configs = require('./configs');
const middleware = require('./middleware');

const adminRouter = require('./routes/admin');
const advRouter = require('./routes/adv');
const loginRouter = require('./routes/login');


const app = express();

app.use(express.static(path.resolve(__dirname,"upload")))
app.use(middleware.sendJson());
app.use(express.json());// 将请求体中的数据放置到req.body中

// 设置全局响应头
app.use((req, res, next) => {
	const val =  configs['Access-Control-Allow-Origin'];

	if (typeof val === 'string') {
		res.set('Access-Control-Allow-Origin', val);
	} else if (val instanceof Array) {
		const origin = req.headers.origin;
		if (val.includes(origin)) {
			res.set('Access-Control-Allow-Origin', origin);
		}
	}

	next();
});




// 挂载路由
app.use(adminRouter);
app.use(advRouter);
app.use(loginRouter);

app.use('*', (req, res) => {
	
	res.status(404).sendJson('资源不存在', -1);
});

app.listen(configs.port,configs.bindIp, () => {
	console.log(`http server is running on ${configs.bindIp}:${configs.port}`);
});