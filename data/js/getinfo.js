var songTitle = document.getElementsByClassName("cm-songtitle")[0].textContent
var songLength = document.getElementsByClassName("jp-duration")[0].textContent
var pause = document.getElementsByClassName("jp-pause")[0];

if (pause.style.display != 'none') {
    self.postMessage({
        status: "Playing",
        title: songTitle,
        length: songLength
    });
} else {
    self.postMessage({
        status: "Paused",
        title: songTitle,
        length: songLength
    });
}
