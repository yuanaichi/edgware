export function randomNum(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1,10);
        break;
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
        break;
            default:
                return 0;
            break;
    }
}
export function padding(number, length, prefix) {
    if(String(number).length >= length){
        return String(number);
    }
    return padding(prefix+number, length, prefix);
}

export function paddingRight(number, length, prefix) {
    if(String(number).length >= length){
        return String(number);
    }
    return paddingRight(number+prefix, length, prefix);
}

export function formatNum(num,n){

    num = String(num.toFixed(n));      
   var re = /(-?\d+)(\d{3})/;

while(re.test(num)) {

        num = num.replace(re,"$1,$2");

   }

return num;

}
