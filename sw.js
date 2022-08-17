const filter = {
  url: [
    {
      urlMatches: 'https://www.instagram.com/',
    },
  ],
}

chrome.webNavigation.onCompleted.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.tabId},
    files: ['./content-script.js']
  });
}, filter)

