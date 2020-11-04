const searchAlternate = (str, arr) =>{
    var flag = false
    for(var i=0; i < arr.length; i++){
        if (str.indexOf(arr[i].toLowerCase())>= 0) {
            flag = true
        }
    }
    return flag
}

module.exports = searchAlternate
