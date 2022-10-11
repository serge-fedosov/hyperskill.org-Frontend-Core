function loader(value) {
    const promise = new Promise(function(resolve, reject){
        if (value === "true"){
            resolve("The info has loaded.");
        } else {
            reject("Please, try again later.");
        }
    });

    promise
        .then(function successStatus(response) {
            console.log(response);
            return response;
        })
        .catch(function failStatus(error) {
            console.log(error);
            return error;
        })
        .finally(function stopLoader() {
            console.log("Hello, Mr. Smith!");
        });

    return promise;
}