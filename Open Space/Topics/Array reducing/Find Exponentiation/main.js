function calculateExp(numbers){
    let result = numbers.reduceRight((sum, val) => Math.pow(val, sum));
    console.log(result);
}