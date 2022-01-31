function Builder(arg) {
    this.arg = arg;
    this.arr = [];
}

Builder.prototype = {
    plus() {
        const args = [].slice.call(arguments);
        this.arr.push({method:'plus', arg:args});
        return this;
    },
    minus() {
        const args = [].slice.call(arguments);
        this.arr.push({method:'minus', arg:args});
        return this;
    },
    multiply(n) {
        this.arr.push({method:'multiply', arg:n});
        return this;
    },
    divide(n) {
        this.arr.push({method:'divide', arg:n});
        return this;
    },
    get() {
        throw new Error("not implemented"); 
    },
    remove(str) {
        this.arr.push({method:'remove', arg:str});
        return this;
    },
    sub(from, n) {
        this.arr.push({method:'sub', arg:from, arg2:n});
        return this;
    },
    mod(n) {
        this.arr.push({method:'mod', arg:n});
        return this;
    }
}

class IntBuilder extends Builder {
    constructor(arg = 0) {
        super(arg);
    }
    get() {
        for(let i = 0; i < this.arr.length; i++) {
            if(this.arr[i].method === 'plus') {
                this.arg += this.arr[i].arg
                .reduce((a,b) => a + b);
            }
            if(this.arr[i].method === 'minus') {
                this.arg -= this.arr[i].arg
                .reduce((a,b) => a + b);
            }
            if(this.arr[i].method === 'multiply') {
                this.arg = this.arg * this.arr[i].arg;
            }
            if(this.arr[i].method === 'divide') {
                this.arg = this.arg / this.arr[i].arg;
            }
            if(this.arr[i].method === 'mod') {
                this.arg = this.arg % this.arr[i].arg;
            }
        }
        return this.arg;
    }
    static random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

function StringBuilder(arg) {
    Builder.call(this, arg);
    if(this.arg === undefined) {
        this.arg = '';
    }
    this.get = function() {
        for(let i=0; i < this.arr.length; i++) {
            if(this.arr[i].method === 'plus') {
                this.arg += this.arr[i].arg
                .reduce((a,b) => a + b);
            }
            if(this.arr[i].method === 'minus') {
                this.arg = this.arg.slice(0, -this.arr[i].arg);
            }
            if(this.arr[i].method === 'multiply') {
                let newStr = '';
                while (this.arr[i].arg-- > 0) newStr += this.arg;
                this.arg = newStr;
            }
            if(this.arr[i].method === 'divide') {
                let k = Math.floor(this.arg.length / this.arr[i].arg);
                this.arr[i].arg = k;
                this.arg = this.arg.slice(0, this.arr[i].arg);
            }
            if(this.arr[i].method === 'remove') {
                this.arg = this.arg.split(this.arr[i].arg).join('');
            }
            if(this.arr[i].method === 'sub') {
                this.arg = this.arg.slice(this.arr[i].arg);
                this.arg = this.arg.substring(0,this.arr[i].arg2);
            }
        }
        return this.arg;
    }
}

StringBuilder.prototype = Object.create(Builder.prototype);
