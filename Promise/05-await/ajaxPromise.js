/*  
    选项：
    url： 请求地址
    method： 请求方式，默认值 GET
    headers: 请求头，默认值 {}
    body： 请求体
    dataType: 响应体类型
    返回 promise 对象
*/
function ajaxPromise(options) {
    // 从 options 取出相关的选项
    const { url, method = 'GET', headers = {}, body, dataType} = options;

    // 返回 promise 对象
    return new Promise((resolve, reject) => {
            // 创建 xhr 对象
        const xhr = new XMLHttpRequest();

        // 如果指定了 dataType
        if (dataType) {
            xhr.responseType = dataType;
        }

        // 监听响应成功的事件
        xhr.onload = () => {
            if (xhr.status === 200) {
                // 设置成成功状态，将响应内容作为 PromiseResult
                resolve(xhr.response);
            } else {
                // 设置成失败状态
                reject({error:1001, msg: '未能获取到正确的内容！'});
            }
        }

        // 监听响应失败的事件
        xhr.onerror = () =>{
            // 设置成失败状态
            reject({error:1002, msg: '未能成功发送请求！'});
        };

        // 请求初始化
        xhr.open(method, url);

        // 设置请求头
        for (let key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }

        // 发送
        xhr.send(body);
    });
}