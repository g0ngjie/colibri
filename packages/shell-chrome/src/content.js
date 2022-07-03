console.log("Colibri content.js")

window.chrome.storage.sync.set({["test"]: false})

window.chrome.storage.sync.get(null, result => {
    console.log("[debug]result:", result)
})
