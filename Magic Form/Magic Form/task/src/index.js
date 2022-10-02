let elements = ["first-name", "last-name", "email", "phone", "company", "address"];

for (const key in elements) {
    let element = document.getElementById(elements[key]);
    element.value = localStorage.getItem(elements[key]);
    element.oninput = () => {
        localStorage.setItem(elements[key], element.value);
    };
}
