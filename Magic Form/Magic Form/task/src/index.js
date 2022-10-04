let elements = ["first-name", "last-name", "email", "phone", "company", "address"];

function getValues() {
    for (const key in elements) {
        let element = document.getElementById(elements[key]);
        element.value = localStorage.getItem(elements[key]);
        element.oninput = () => {
            localStorage.setItem(elements[key], element.value);
        };
    }
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
    // let json = JSON.stringify([["1","2","3","4","5","6"],["1","2","3","4","5","6"]]);
    localStorage.setItem("history", json);
//    localStorage.clear();
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
        let el = `<div class="submit-history-card">
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
    <button type="submit" class="delete-button">Delete</button>
</div>
`;
        result = result + "\n" + el;
    }

    let element = document.getElementById("history");
    if (result.length === 0) {
        result = "test";
    }
    element.innerHTML = result;
    // localStorage.setItem("history", "");
}
