function convertToNumber(arrayOfString) {
   let arrayOfNumber = arrayOfString.map((value) => {
      return Number(value);
   });
   return arrayOfNumber;
}