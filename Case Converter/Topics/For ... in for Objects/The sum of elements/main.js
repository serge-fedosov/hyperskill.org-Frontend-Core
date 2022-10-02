let data = [11, 5, 29, 75];

let sum = 0;
for (const key in data) {
    sum += data[key];
}

console.log(sum);