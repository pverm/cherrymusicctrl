var ui = require("sdk/ui");
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;
var panels = require("sdk/panel");
var preferences = require('sdk/simple-prefs');
var { Hotkey } = require("sdk/hotkeys");


/* help functions */

function endsWith(str, suffix){
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

var cherryMusicTab;

function cherryMusicIsOpen() {
    if (cherryMusicTab === undefined) {
        return findCherryMusicTab();
    } else {
        return true;
    }
}

function findCherryMusicTab() {
    for each (var tab in tabs) {
        if (endsWith(tab.title, "CherryMusic")) {
            cherryMusicTab = tab;
            cherryMusicTab.on("close", function(tab) {
                cherryMusicTab = undefined;
            });
            return true;
        }
    }
    return false;
}

function isPaused() {
    
}


/* interface elements */

var playButton = ui.ActionButton({
    id: "play-button",
    label: "CherryMusic Play/Pause",
    icon: getIcon("play.png"),
    onClick: clickPlay
});
playButton.iconName = "play.png";

var prevButton = ui.ActionButton({
    id: "prev-button",
    label: "CherryMusic Previous",
    icon: getIcon("prev.png"),
    onClick: clickPrev
});
prevButton.iconName = "prev.png";

var nextButton = ui.ActionButton({
    id: "next-button",
    label: "CherryMusic Next",
    icon: getIcon("next.png"),
    onClick: clickNext
});
nextButton.iconName = "next.png";

var infoButton = ui.ToggleButton({
    id: "info-button",
    label: "CherryMusic Info",
    icon: getIcon("info.png"),
    onChange: clickInfo
});
infoButton.iconName = "info.png";

var logoutButton = ui.ActionButton({
    id: "logout-button",
    label: "CherryMusic Logout",
    icon: getIcon("logout.png"),
    onClick: clickLogout
});
logoutButton.iconName = "logout.png";

var buttons = [playButton, prevButton, nextButton, logoutButton, infoButton];

var infoPanel = panels.Panel({
    width: 350,
    height: 70,
    contentURL: data.url("infopanel.html"),
    onHide: function() {
        infoButton.state("window", { checked: false });
    }
});



/* button click handler */

function clickPlay(state) {
    if (cherryMusicIsOpen()) {
        if (playButton.iconName == "pause.png") {
            cherryMusicTab.attach({
                contentScript: 'document.getElementsByClassName("jp-pause")[0].click();'
            })
            playButton.iconName = "play.png";
        } else {
            cherryMusicTab.attach({
                contentScript: 'document.getElementsByClassName("jp-play")[0].click();'
            });
            playButton.iconName = "pause.png";
        }
        updateIcon(playButton);
    }
}

function clickPrev(state) {
    if (cherryMusicIsOpen()) {
        cherryMusicTab.attach({
            contentScript: 'document.getElementsByClassName("jp-previous")[0].click();'
        });
    }
}

function clickNext(state) {
    if (cherryMusicIsOpen()) {
        cherryMusicTab.attach({
            contentScript: 'document.getElementsByClassName("jp-next")[0].click();'
        });
    }
}

function clickLogout(state) {
    if (cherryMusicIsOpen()) {
        if (playButton.iconName == 'pause.png') {
            playButton.click();
        }
        cherryMusicTab.attach({
            contentScript: 'document.getElementById("logout-menu-button").click();'
        });
        cherryMusicTab = undefined;
    }
}

function clickInfo(state) {
    if (cherryMusicIsOpen()) {
        cherryMusicTab.attach({
            contentScriptFile: data.url('js/getinfo.js'),
            onMessage: function(message) {
                infoPanel.port.emit("content", message);
            }
        });
    } else {
        infoPanel.port.emit("content", { status: "Stopped" });
    }
    if (state.checked) {
        infoPanel.show({
            position: infoButton
        });
    }
}



/* icon themes */

preferences.on("iconTheme", updateIconTheme );

function getIcon(icon) {
    var themes = {
        "0": "original",
        "1": "glyphicons",
        "2": "oxygen",
        "3": "openworld"
    }
    return data.url("icons/" + themes[preferences.prefs.iconTheme] + "/" + icon);
}

function updateIcon(button) {
    button.state(button, {
        icon: getIcon(button.iconName)
    });
}

function updateIconTheme() {
    for (var i in buttons) {
        updateIcon(buttons[i]);
    }
}


/* hotkeys */

var playHotkey = Hotkey({
    combo: "accel-ctrl-space",
    onPress: function() {
        if (preferences.prefs.hotkeyEnabled && cherryMusicIsOpen()) {
            playButton.click();
        }
    }
});
