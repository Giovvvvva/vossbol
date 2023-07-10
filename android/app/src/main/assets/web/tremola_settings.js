// tremola_settings.js

"use strict";

function get_default_settings() {
    return {
        'enable_preview': false,
        'background_map': true,
        'pub_autoconnect': true,
        'wifi_autoconnect': true,
        'show_shortnames': true,
        'hide_forgotten_conv': true,
        'hide_forgotten_contacts': true,
        'timer_undelivered_messages' : false
    }
}

function toggle_changed(e) {
    // console.log("toggle ", e.id);
    tremola.settings[e.id] = e.checked;
    persist()
    applySetting(e.id, e.checked);
}

function getSetting(nm) {
    return document.getElementById(nm).checked
}

function applySetting(nm, val) {
    if (nm == 'background_map') {
        if (val)
            document.body.style.backgroundImage = "url('img/splash-as-background.jpg')";
        else
            document.body.style.backgroundImage = null;
    } else if (nm == 'hide_forgotten_conv') {
        load_chat_list();
    } else if (nm == 'hide_forgotten_contacts') {
        load_contact_list();
    } else if (nm === 'timer_undelivered_messages') {//GIO: new here for testing toggle
            //TODO add the function for delete old messages
            //FIXME: problem toggle is only on change and not dependent on status of toggle but on change
            var selection = document.getElementById("menuDiv");
              if (val) {
                del_msg_bool = true;
                selection.style.display = "block";//makes the element visible
              } else {
                del_msg_bool = false;
                selection.style.display = "none";//makes the element not visible
              }
            //deleteOldMessages();
        }
}

function setSetting(nm, val) {
    // console.log("setting", nm, val)
    applySetting(nm, val);
    document.getElementById(nm).checked = val;
}

/* async */
function settings_wipe() {
    closeOverlay();
    backend("wipe"); // will not return
    /*
    window.localStorage.setItem("tremola", "null");
    backend("ready"); // will call initialize()
    await new Promise(resolve => setTimeout(resolve, 500));
    // resetTremola();
    menu_redraw();
    setScenario('chats');
    */
}

// eof
