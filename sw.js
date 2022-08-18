const filter = {
  url: [
    {
      urlMatches: 'https://www.instagram.com/',
    },
  ],
}

chrome.webNavigation.onCompleted.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.tabId },
    files: ["./main.js"]
  });

  chrome.scripting.insertCSS(
    {
      target: { tabId: tab.tabId },
      files: ['./assets/css/inject.css'],
    });
}, filter)



