let elements = ["first-name", "last-name", "email", "phone", "company", "address"];

function getValues() {
    for (const key in elements) {
        let element = document.getElementById(elements[key]);
        element.value = localStorage.getItem(elements[key]);
        element.oninput = () => {
            localStorage.setItem(elements[key], element.value);
        };
    }

    window.addEventListener('storage', (event) => {
        let element = document.getElementById(event.key);
        element.value = localStorage.getItem(event.key);
    });
}

function submitForm() {
    let arr = [];

    for (const key in elements) {
        arr[key] = document.getElementById(elements[key]).value;

        localStorage.setItem(elements[key], "");
        let element = document.getElementById(elements[key]);
        element.value = "";
    }

    let history = localStorage.getItem("history");
    if (history == null) {
        history = [];
    } else {
        history = JSON.parse(history);
    }

    history[history.length] = arr;

    let json = JSON.stringify(history);
    localStorage.setItem("history", json);
}

function getHistory() {
    let history = localStorage.getItem("history");
    if (history == null) {
        history = [];
    } else {
        history = JSON.parse(history);
    }

    let result = "";
    for (let i = 0; i < history.length; i++) {
        let val = history[i];
        if (val === undefined || val === null) {
            continue;
        }

        let el = `<div class="submit-history-card" id="history-id-${i}">
    <p><b>First Name</b></p>
    <p class="card-first-name">${val[0]}</p>
    <br>
    <p><b>Last Name</b></p>
    <p class="card-last-name">${val[1]}</p>
    <br>
    <p><b>Email</b></p>
    <p class="card-email">${val[2]}</p>
    <br>
    <p><b>Phone</b></p>
    <p class="card-phone">${val[3]}</p>
    <br>
    <p><b>Company</b></p>
    <p class="card-company">${val[4]}</p>
    <br>
    <p><b>Address</b></p>
    <p class="card-address">${val[5]}</p>
    <br>
    <button type="button" class="delete-button" onclick="deleteDiv(${i})">Delete</button>
</div>
`;
        result = result + "\n" + el;
    }

    let element = document.getElementById("history");
    element.innerHTML = result;
    // localStorage.setItem("history", "");
}

function deleteDiv(i) {
    let element = document.getElementById("history-id-" + i);
    element.remove();

    let history = localStorage.getItem("history");
    if (history == null) {
        history = [];
    } else {
        history = JSON.parse(history);
    }

    delete history[i];

    let json = JSON.stringify(history);
    localStorage.setItem("history", json);
}
