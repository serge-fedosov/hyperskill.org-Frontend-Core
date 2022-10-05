function onLoad() {
    document.addEventListener("keydown", function(event) {
        if (event.code === "KeyA" || event.code === "KeyS" || event.code === "KeyD" || event.code === "KeyF" ||
                event.code === "KeyG" || event.code === "KeyH" || event.code === "KeyJ" ||
                event.code === "KeyW" || event.code === "KeyE" || event.code === "KeyT" ||
                event.code === "KeyY" || event.code === "KeyU") {
            let audio = new Audio(`mp3/${event.key}.mp3`);
            audio.play();
        }
    });
}
