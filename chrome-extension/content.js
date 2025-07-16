// This script extracts the transcript from the YouTube page if the transcript panel is open.
;(function () {
	const transcriptPanel = document.querySelector("ytd-transcript-renderer")
	if (!transcriptPanel) {
		console.log("Transcript panel not open or not available.")
		return
	}
	const cues = transcriptPanel.querySelectorAll(
		"div.cue-group style-scope ytd-transcript-segment-renderer"
	)
	let transcript = ""
	cues.forEach((cue) => {
		transcript += cue.innerText + "\n"
	})
	if (transcript) {
		console.log("Transcript:", transcript)
	} else {
		console.log("Transcript panel found, but no transcript text extracted.")
	}
})()
