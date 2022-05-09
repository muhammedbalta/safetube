chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ 'url': 'chrome-extension://' + chrome.runtime.id  + '/options.html'});
});