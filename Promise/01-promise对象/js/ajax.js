/*  
    选项：
    url： 请求地址
    method： 请求方式，默认值 GET
    headers: 请求头，默认值 {}
    body： 请求体
    dataType: 响应体类型
    success: 成功的回调
    error: 失败的回调
*/
function ajax(options) {
    // 从 options 取出相关的选项
    const { url, method = 'GET', headers = {}, body, dataType, success = () => { }, error = () => { } } = options;

    // 创建 xhr 对象
    const xhr = new XMLHttpRequest();

    // 如果指定了 dataType
    if (dataType) {
        xhr.responseType = dataType;
    }

    // 监听响应成功的事件
    xhr.onload = () => {
        if (xhr.status === 200) {
            success(xhr.response);
        } else {
            error();
        }
    }

    // 监听响应失败的事件
    xhr.onerror = error;

    // 请求初始化
    xhr.open(method, url);

    // 设置请求头
    for (let key in headers) {
        xhr.setRequestHeader(key, headers[key]);
    }

    // 发送
    xhr.send(body);
}