function upperCase() {
    let text = document.querySelector("textarea");
    text.value = text.value.toUpperCase();
}

function lowerCase() {
    let text = document.querySelector("textarea");
    text.value = text.value.toLowerCase();
}

function properCase() {
    changeCase(" ");
}

function sentenceCase() {
    changeCase(". ");
}

function changeCase(separator) {
    let text = document.querySelector("textarea");

    let arr = text.value.toLowerCase().split(separator);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    text.value = arr.join(separator);
}
