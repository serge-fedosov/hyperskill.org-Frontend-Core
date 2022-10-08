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

function checkAccessStart() {
    let elements = document.querySelector(".check-buttons").children;
    for (const element of elements) {
        if (!element.checked) {
            return;
        }
    }

    let elements2 = document.querySelector(".levers").children;
    for (const element of elements2) {
        if (element.value !== "100") {
            return;
        }
    }

    document.getElementById("launch").removeAttribute("disabled");
}

function onLoad() {
    setAccess(false);

    let elements = document.querySelector(".check-buttons").children;
    for (const element of elements) {
        element.onchange = () => {
            checkAccessStart();
        };
    }

    let elements2 = document.querySelector(".levers").children;
    for (const element of elements2) {
        element.onchange = () => {
            checkAccessStart();
        };
    }
}

function launchRocket() {
    let rocket = document.querySelector(".rocket");
    let rocketWidth = rocket.getBoundingClientRect().width;
    let rocketHeight = rocket.getBoundingClientRect().height;
    let rocketLeft = getComputedStyle(rocket).left.slice(0, -2);
    let rocketTop = getComputedStyle(rocket).top.slice(0, -2);

    let animation = setInterval(function () {

        if (rocketLeft <= -rocketLeft || rocketTop <= -rocketHeight) {
            clearInterval(animation);
        } else {
            rocketTop = rocketTop - 10;
            rocketLeft = rocketLeft - 10 * Math.tan(25 * Math.PI / 180);

            rocket.style.left = rocketLeft + "px";
            rocket.style.top = rocketTop + "px";
        }
    }, 20)
}
