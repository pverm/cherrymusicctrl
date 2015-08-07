addon.port.on("content", function (message) {
    var statusdiv = self.document.getElementById("status");
    var messagediv = self.document.getElementById("message");
    statusdiv.textContent = message.status;
    if (message.status === "Stopped") {
        messagediv.textContent = "CherryMusic is not opened yet";
    } else {
        messagediv.textContent = message.title + " [" + message.length + "]";
    }
});
