addon.port.on("content", function (message) {
    var statusdiv = self.document.getElementById("status");
    var messagediv = self.document.getElementById("message");
    var cover = self.document.getElementById("cover");
    statusdiv.textContent = message.status;
    
    if (message.status === "Stopped") {
        messagediv.textContent = "CherryMusic is not opened yet";
    } else {
        messagediv.textContent = message.title;
    }
    
    if (message.hasOwnProperty("cover")) {
        cover.src = message.cover;
    } else {
        cover.src = "cherrymusic.png";
    }
});
