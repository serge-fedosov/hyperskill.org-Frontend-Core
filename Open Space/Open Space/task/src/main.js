// setAccess(false);

function setAccess(attribute) {
    if (attribute) {
        let elements = document.querySelector(".check-buttons").children;
        for (const element of elements) {
            element.removeAttribute("disabled");
        }

        let elements2 = document.querySelector(".levers").children;
        for (const element of elements2) {
            element.removeAttribute("disabled");
        }

        document.getElementById("launch").removeAttribute("disabled");
        document.getElementById("password").setAttribute("disabled", "");
        document.getElementById("button").setAttribute("disabled", "");

    } else {
        let elements = document.querySelector(".check-buttons").children;
        for (const element of elements) {
            element.setAttribute("disabled", "");
        }

        let elements2 = document.querySelector(".levers").children;
        for (const element of elements2) {
            element.setAttribute("disabled", "");
        }

        document.getElementById("launch").setAttribute("disabled", "");
    }
}

function checkAccess() {
    let element = document.getElementById("password");
    if (element.value === "TrustNo1") {
        setAccess(true);
    }
}
