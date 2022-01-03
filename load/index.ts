const requestURL:string = 'https://jsonplaceholder.typicode.com/users';
function sendRequest(method:string, url:string, body: object | null = null) {
  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response)
      } else {
        resolve(xhr.response)
      }
    }

    xhr.onerror = () => {
      reject(xhr.response)
    }

    if(method === 'DELETE') {
      xhr.send()
    } else {
      xhr.send(JSON.stringify(body))
    }
  })
}

/*sendRequest('GET', requestURL)
  .then(data => console.log(data))
  .catch(err => console.log(err))

const body = {
  name: 'Vladilen',
  age: 26
}

sendRequest('DELETE', 'https://jsonplaceholder.typicode.com/posts/1')
  .then(data => console.log(data))
  .catch(err => console.log(err))*/