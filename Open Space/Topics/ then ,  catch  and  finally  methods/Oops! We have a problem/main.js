function hasDownloaded (value) {
    const promise = new Promise(function(resolve, reject){
        if (value === "true"){
            resolve("Now you can watch the video!");
        } else {
            reject("Oops! An error occurs");
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
        });

    return promise;
}