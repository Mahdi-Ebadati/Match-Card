function shuffle(array) {
    for (let i = 0; i < array.length; i++) {
        let random = Math.floor(Math.random() * array.length)
        let tmp = array[i];
        array[i] = array[random];
        array[random] = tmp;
    }
    return array;
}