chrome.tabs.query({ url: "*://www.youtube.com/watch*" }, function (tabs) {
	for (const tab of tabs) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ["content.js"],
		})
	}
})
