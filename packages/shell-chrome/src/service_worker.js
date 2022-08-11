
console.log("Colibri service_worker.js")

// 这里可能不需要了。 感觉 popup 和 background 权限一致
chrome.action.setBadgeBackgroundColor({ color: "#006d75" });
// chrome.action.setBadgeBackgroundColor({ color: "#F56C6C" });
chrome.action.setBadgeText({ text: '+1' });