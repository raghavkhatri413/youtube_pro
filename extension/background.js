chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ enabled: true }, () => {
    console.log('YouTube Pro extension installed and enabled by default.');
  });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.enabled) {
    const newStatus = changes.enabled.newValue;
    chrome.action.setIcon({ path: newStatus ? "icons/icon128.png" : "icons/icon128_disabled.png" });
  }
});
