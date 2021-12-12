module.exports = {
    createAutoComplete: function(data) {
        return function(str) {
            let result = [];
            let start = 0;
            let end = data.length;
            let mid;
            let isFound = false;
            
            if(str) {
                const strToLower = str.toLowerCase();
                while(!isFound && start <= end) {
                    mid = Math.floor((start + end) / 2);
                    const word = data[mid].toLowerCase();
                    if(word.startsWith(strToLower)) {
                        isFound = true;
                    } else if(word > strToLower) {
                        if(end === mid) break;
                        end = mid;
                    } else if(word < strToLower) {
                        if(start === mid) break;
                        start = mid;
                    }
                }

                const toLeft = (strToLower, step) => {
                    step --;
                    while(step >= 0 && data[step].slice(0, strToLower.length).toLowerCase() === strToLower) {
                        step --;
                    }
                    return step + 1;
                };

                const toRight = (strToLower, step) => {
                    step ++;
                    while(step < end && data[step].slice(0, strToLower.length).toLowerCase() === strToLower) {
                        step ++;
                    }
                    return step;
                };

                if(isFound) {
                    result = data.slice(toLeft(strToLower, mid), toRight(strToLower, mid));
                }
                return result;
            }
            return result;
        };
    }
};