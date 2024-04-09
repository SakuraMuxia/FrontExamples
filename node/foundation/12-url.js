const url = require('url');

// 定义URL
const siteAddress = 'https://yuluochenxiao.top/web/';
console.log(siteAddress);

// 解析URL
const urlData = url.parse(siteAddress);
console.log(urlData);
console.log(urlData.query);

const urlInfo = new url.URL(siteAddress);
console.log(urlInfo);
console.log(urlInfo.searchParams);