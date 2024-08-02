document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleButton');
  const settingsButton = document.getElementById('settingsButton');
  const qualityButton = document.getElementById('qualityButton');
  const soundButton = document.getElementById('soundButton');

  chrome.storage.sync.get('enabled', (data) => {
    toggleButton.checked = data.enabled;
  });

  toggleButton.addEventListener('change', () => {
    const newStatus = toggleButton.checked;
    chrome.storage.sync.set({ enabled: newStatus }, () => {
      console.log('Extension status:', newStatus);
    });
  });

  settingsButton.addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://your-settings-page-url.com' });
  });

  qualityButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'increaseQuality' });
    });
  });

  soundButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'boostSound' });
    });
  });
});
