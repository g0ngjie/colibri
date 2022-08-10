console.log("Colibri document.js");

import lib from "@colibri/lib.v2";

window.addEventListener(
    "message",
    function (event) {
        const data = event.data;
        let globalSwitch = false
        if (data.type === "colibri_message" && data.to === "document") {
            console.log("[debug]document data:", data)
            switch (data.key) {
                case "globalSwitchOn":
                    globalSwitch = data.value;
                    lib.setGlobalSwitch(globalSwitch)
                    break;
                case "proxy_routes":
                    lib.update(data.value)
                    break;
            }
        }
    },
    false
);