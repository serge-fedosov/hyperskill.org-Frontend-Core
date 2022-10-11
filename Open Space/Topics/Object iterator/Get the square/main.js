function getTheSquare(arrayOfObjects) {
    arrayOfObjects.forEach(element => {
        element.square = Math.sqrt(element.source);
    });
    return arrayOfObjects;
}