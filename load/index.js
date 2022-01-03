var requestURL = 'https://jsonplaceholder.typicode.com/users';
function sendRequest(url, method = 'GET', body, responseType = 'json') {
    if (body === void 0) { body = null; }
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = responseType;
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status >= 400) {
                reject(xhr.response);
            }
            else {
                resolve(xhr.response);
            }
        };
        xhr.onerror = function () {
            reject(xhr.response);
        };
        if(method === 'DELETE') {
            xhr.send()
        } else {
            xhr.send(JSON.stringify(body))
        }
    });
}
var body = {
    name: 'Vladilen',
    age: 26
}
sendRequest(requestURL, 'GET', body, 'text')
    .then((/* custom response */ { status /* HTTP Sttatus */, body /* response of the given type */, statusText }) => console.log(body))

/*sendRequest('DELETE', 'https://jsonplaceholder.typicode.com/posts/1')
    .then(function (data) { return console.log(data); })["catch"](function (err) { return console.log(err); });

      sendRequest('POST', requestURL, body)
        .then(data => console.log(data))
        .catch(err => console.log(err))

        sendRequest('PUT', 'https://jsonplaceholder.typicode.com/posts/5', body)
        .then(function (data) { return console.log(data); })["catch"](function (err) { return console.log(err); });*/
      