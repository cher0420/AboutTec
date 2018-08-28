/**
 *
 * @param options
 * @constructor
 */
export function Ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = formatParams(options.data);
    var xhr;
    //第一步
    if (window.ActiveXObject) {//返回true为ie浏览器内核,否则不是ie内核
        //为ie内核创建传输对象的方式
        xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
    } else {
        //为非ie 内核浏览器创建传输对象的方式
        xhr = new XMLHttpRequest();
    }

    //接收 - 第三步
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML);
            } else {
                options.error && options.error(status);
            }
        }
    }

    //连接 和 发送 - 第二步
    if (options.type == "GET") {
        xhr.open("GET", options.url + "?" + params, true);
        xhr.send(null);
    } else if (options.type == "POST") {
        xhr.open("POST", options.url, true);
        //设置表单提交时的内容类型
        const header = {
            "Content-Type":"application/x-www-form-urlencoded",
            ...options.headers,
        }
        console.log(options)
        for (let v in header){
            xhr.setRequestHeader(v, header[v]);
        }
        xhr.send(options.data);
    }
}
//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".", ""));
    return arr.join("&");
}
