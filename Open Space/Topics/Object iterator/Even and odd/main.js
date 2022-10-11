function sumTheArrays(naturalNumbers) {
  let result = [];
  for (let i = 0; i < naturalNumbers.even.length; i++) {
    result[i] = naturalNumbers.even[i] + naturalNumbers.odd[i];
  }

  return result;
}