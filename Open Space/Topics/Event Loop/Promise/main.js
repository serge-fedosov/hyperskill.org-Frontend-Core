setTimeout(() => console.log("timeout"));

Promise.resolve()
    .then(() => console.log("promise"))
    .finally(() => console.log("microtask"));

console.log("code");