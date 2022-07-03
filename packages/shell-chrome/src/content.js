console.log("Colibri content.js")

import { getStorage, initStorage } from "@colibri/shared-utils";

window.chrome.storage.sync.set({ ["test"]: false })

initStorage().then(() => {

    const storage = getStorage("sync", "default value is null");
    console.log("[debug]storage:", storage)

})

window.chrome.storage.sync.get(null, result => {
    console.log("[debug]result:", result)
})
