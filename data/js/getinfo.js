var songTitle = document.getElementsByClassName("cm-songtitle")[0].textContent
//var songLength = document.getElementsByClassName("jp-duration")[0].textContent
var cover = document.getElementById("albumart").src
var pause = document.getElementsByClassName("jp-pause")[0];

if (pause.style.display != 'none') {
    self.postMessage({
        status: "Playing",
        title: songTitle,
        cover: cover
    });
} else {
    self.postMessage({
        status: "Paused",
        title: songTitle,
        cover: cover
    });
}
