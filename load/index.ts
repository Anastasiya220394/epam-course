interface ICustomResponse extends XMLHttpRequest {
    readonly response: Response;
  }
  
  interface IObject {
    method?: string;
    body?: BodyInit | object | null;
    responseType?: XMLHttpRequestResponseType;
    signal?: AbortSignal;
  }
  
  function load(url:string, obj:IObject = {method:'', body: '', responseType:''}) {
    return new Promise(function (resolve, reject) {
      const method = obj.method || "GET";
      const body = obj.body || '';
      const responseType = obj.responseType || 'json';
  
      const xhr:ICustomResponse = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.responseType = responseType;
      xhr.setRequestHeader('Content-Type', 'application/json');
  
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            status: xhr.status,
            body: xhr.response as Response,
            statusText: xhr.statusText     
          });
        } else {
          reject({
            status: xhr.status,
            body: xhr.response as Response,
            statusText: xhr.statusText     
          });
        }
      };
  
      xhr.onerror = function () {
        reject(xhr.response);
      };
        
      if(obj.signal) {
        obj.signal.addEventListener('abort', () => {
          xhr.abort();
        });
      }
  
      if(method === 'DELETE') {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(body));
      }    
    });
  }
  