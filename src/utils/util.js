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
