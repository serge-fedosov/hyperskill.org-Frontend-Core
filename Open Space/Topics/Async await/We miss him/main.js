async function rockBand(band) {
    return new Promise((resolve, reject) => {
        if (band === 'Linkin Park') {
            resolve('Chester, we miss you!');
        } else {
            reject('No matter the band we miss him anyway!');
        }
    });
}