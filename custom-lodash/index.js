const isNumber = a => typeof a === 'number';
const isObject = o => o instanceof Object && o.constructor === Object;

const customPush = function (...arg) {
    const args = [...arg];
    for (let i = 0; i < args.length; i +=1 ) {
      this[this.length] = args[i];
    }
};

const customSlice = function (begin, end) {
  if(!Array.isArray(this)) throw new Error('Please, enter the array');
  let i, cloned = [],
        size, len = this.length;

    let start = begin || 0;
    start = (start >= 0) ? start: len + start;
    let upTo = (end) ? end : len;
    if (end < 0) {
      upTo = len + end;
    }
    size = upTo - start;
    if (size > 0) {
      cloned = new Array(size);
      if (this.charAt) {
        for (i = 0; i < size; i++) {
          cloned[i] = this.charAt(start + i);
        }
      } else {
        for (i = 0; i < size; i++) {
          cloned[i] = this[start + i];
        }
      }
    }
  return cloned;
};

const customForEach = (array, callback) => {
  if(!Array.isArray(array)) throw new Error('Please, enter the array');
  if(typeof callback !== 'function') throw new Error('Please, enter the function as the second argument.');
  for (let i = 0; i < array.length; i++) { 
    callback(array[i]);
  }
};

const customIncludes = (array, value, n = 0) => {
  if(!Array.isArray(array)) throw new Error('Please, enter the array');
  if(!isNumber(n)) throw new Error('Please, enter the number as the second argument');
  const length = array.length;
  for (let i = n; i < length; i++) {
      if (array[i] === value) {
          return true;
      }
  }
  return false;
};

const customMap = (array, callback) => {
  if(!Array.isArray(array)) throw new Error('Please, enter the array');
  if(typeof callback !== 'function') throw new Error('Please, enter the function as the second argument.');
  const resultArray = [];
  for (let index = 0; index < array.length; index++) {
      customPush.call(resultArray, callback(array[index], index, array));
  }
  return resultArray;
};

const chunk = (arr, size = 1) => {
  if(!Array.isArray(arr)) throw new Error('Please, enter the array');
  if(!isNumber(size)) throw new Error('Please, enter the number as the second argument');
  const newArray = [];
  for (let i = 0; i < arr.length; i += size) {
    let chunks;
    if (i + size < arr.length) {
      chunks = customSlice.call(arr, i, i + size);
    } else {
      chunks = customSlice.call(arr, i, arr.length);
    }
    customPush.call(newArray, chunks);
  }
    return newArray;
};

const compact = (arr) => {
  if(!Array.isArray(arr)) throw new Error('Please, enter the array');
  const newArray = new Array();
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      customPush.call(newArray,arr[i]);
    }
  }
  return newArray;
};

const drop = (arr, n=1) => {
  if(!Array.isArray(arr)) throw new Error('Please, enter the array');
  let dropArr = [];
  dropArr = customSlice.call(arr, n, 0);
  return dropArr;
};

const dropWhile = (array, predicate) => {
  if(!Array.isArray(array)) throw new Error('Please, enter the array');
  if(typeof predicate !== 'function') throw new Error('Please, enter the function as the second argument.');
  let dropNumber = {};
  let dropArray = {};
  for (let i = 0; i < array.length; i++) {
    let element = array[i];
    if (!predicate(element, i)) {
      dropNumber = i;
    }
    dropArray = drop(array, dropNumber);
  }
  return dropArray;
};

const take = (arr, n=1) => {
  if(!Array.isArray(arr)) throw new Error('Please, enter the array');
  if(!isNumber(n)) throw new Error('Please, enter the number as the second argument');
  let takeArr = [];
  if(n > arr.length) n = arr.length;
  takeArr = customSlice.call(arr, 0, n);
  if(n===0) return takeArr = [];
  return takeArr;
};

const customFilter = (array, fn) => {
  if(!Array.isArray(array)) throw new Error('Please, enter the array');
  if(typeof fn !== 'function') throw new Error('Please, enter the function as the second argument.');
  const filtered = [];
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i])) {
      customPush.call(filtered, array[i])
    }
  }
  return filtered;
};

const filterAll = (array, arg) => {
  if(!Array.isArray(array)) throw new Error('Please, enter the array');

  if(typeof arg == 'function') {
    return customFilter(array, arg);
  }

  if(isObject(arg)) {
    const obj = {};
    const result = customFilter(array, item => {
      if (obj[item[arg]]) {
        return false;
      } else {
        obj[item[arg]] = true;
        return true;
      }
    });
    return result;
  }

  if(Array.isArray(arg)) {
    const result = [];
    for(let i=0; array.length > i; i++) {
      let obj = array[i];
      if(customIncludes(Object.keys(obj),arg[0]) && customIncludes(Object.values(obj), arg[1]) ) {
      	customPush.call(result, obj);
  		}
    }
    return result;
  }

  if(typeof arg == 'string') {
    const result = [];
    for(let i=0; array.length > i; i++) {
      let obj = array[i];
      if(customIncludes(Object.keys(obj),arg) && customIncludes(Object.values(obj), true)) {
        customPush.call(result, obj);
      }
    }
    return result;
  }
};

const find = (array, fn, n = 0) => {
  if(!Array.isArray(array)) throw new Error('Please, enter the array');
  if(!isNumber(n)) throw new Error('Please, enter the number as the second argument');
  if(typeof fn !== 'function') throw new Error('Please, enter the function as the second argument.');
  const list = Object(array);
  const length = list.length >>> 0;
  const thisArg = fn;
  let value;
  for (let i = n; i < length; i++) {
    value = list[i];

    if (fn.call(thisArg, value, i, list)) {
      return value;
    }
  }
  return undefined;
};

const zip = function() {
  const zipped = [];

  if(!arguments) return [];
  
  let array = arguments[0];
  for (let a = 1; a < arguments.length; a++) {
    if(arguments[a].length > array.length) {
      array = arguments[a];
    }
  }

  for (let j = 0; j < array.length; j++) {
    const toBeZipped = [];
    for (let k = 0; k < arguments.length; k++) {
      if(!Array.isArray(arguments[k])) return 'Please, enter the array';
      customPush.call(toBeZipped, arguments[k][j]);
    }
    customPush.call(zipped, toBeZipped);
  }
  return zipped;
};

const merge = function (object, ...sources) {
  for(let i=0; sources.length > i; i++) {
    let source = sources[i];
    for (n in source) {
      if (typeof object[n] != 'object') {
        object[n] = source[n];
      } else if (typeof source[n] == 'object') {
        object[n] = merge(object[n], source[n]);
      }
    }
  }
  return object;
};

const omit = (obj, path) => {
  if(!isObject(obj)) throw new Error('Please, enter the Object.');
  if(!Array.isArray(path)) throw new Error('Please, enter the array as the second argument.');
  customForEach(path, (k) => {
    delete obj[k];
  });
  return obj;
};

const omitBy = (obj, check) => {
  if(!isObject(obj)) throw new Error('Please, enter the Object.');
  if(typeof check !== 'function') throw new Error('Please, enter the function as the second argument.');
  obj = { ...obj };
  arr = Object.entries(obj);
  customForEach(arr, ([key, value]) => {
    check(value) && delete obj[key]
  });
  return obj;
};

const pick = (obj = {}, keys = []) => {
  if(!isObject(obj)) throw new Error('Please, enter the Object.');
  if(!Array.isArray(keys)) throw new Error('Please, enter the array as the second argument.');
  const result = {};
  for (const key in obj) {
    if (customIncludes(keys, key)) {
      result[key] = obj[key];
    }
  }
  return result;
};

const pickBy = (obj, fn) => {
  if(!isObject(obj)) throw new Error('Please, enter the Object.');
  if(typeof fn !== 'function') throw new Error('Please, enter the function as the second argument.');
  obj = { ...obj };
  arr = Object.entries(obj);
  customForEach(arr, ([key, value]) => {
    fn(value) || delete obj[key]
  });
  return obj;
};

const toPairs = (obj) => {
  if(obj instanceof Set || obj instanceof Map) return [...obj.entries()];
  return Object.entries(obj);
};
