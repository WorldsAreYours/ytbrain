document.getElementById("grab").addEventListener("click", function () {
	document.getElementById("results").innerText =
		"Transcript extraction triggered. Check the console of each YouTube tab."
	chrome.runtime.sendMessage({ action: "extractTranscripts" })
})
