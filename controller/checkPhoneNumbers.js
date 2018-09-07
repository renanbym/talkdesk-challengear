
const areaCode = require('./areaCode');

function isValid(n) {
    const arrayN = n.split('');
    if (arrayN[0] == '+' && arrayN[1] == ' ') return false
    if (n.match(/[^0-9\+]/i)) return false
    if (arrayN[0] == '+' && (arrayN[1] + arrayN[2]) == 0) return false
    if (n.match(/\+/i) && arrayN[0] != '+') return false
    const cleanedN = n.match(/^\+?([0-9]{3})/i);
    return areaCode.find(cur => cleanedN && cur == cleanedN[1]);
}

const checkNumber = (numbers) => {
    return numbers.reduce((acc, phone) => {
        const n = isValid(phone);

        if (n) {
            const check = acc.find(cur => n in cur);
            if (check) {
                ++check[n];
            } else {
                const obj = new Object();
                obj[n] = 1;
                acc.push(obj)
            }
        }
        return acc;
    }, []).sort((a, b) => Object.keys(a)[0] - Object.keys(b)[0]);
}


module.exports = checkNumber; 