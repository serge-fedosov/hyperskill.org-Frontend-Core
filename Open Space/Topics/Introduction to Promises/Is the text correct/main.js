const isCorrectText = true;
let checkingText = new Promise(function(resolve, reject) {
    if (isCorrectText){
        resolve("Your text is correct");
    } else {
        reject(new Error("Whoops!"));
    }
});