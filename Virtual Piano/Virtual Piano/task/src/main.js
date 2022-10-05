function onLoad() {
    document.addEventListener("keydown", function(event) {
        if (event.code === "KeyA" || event.code === "KeyS" || event.code === "KeyD" || event.code === "KeyF" ||
                event.code === "KeyG" || event.code === "KeyH" || event.code === "KeyJ") {
            console.log("The \'" + event.key + "\' key is pressed.");
        }
    });
}
