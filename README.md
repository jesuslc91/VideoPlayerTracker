# VideoPlayerTracker

This is a JavaScript tracker for HTML5 video.
It tracks how many times is paused/resumed, and the time between both events in both ways.

It prints data in the following cases:
-When the video is paused: how many times has been paused, % of the video seen.
-When the video is resumed: how many times has been resumed, seconds paused before resume.

Also sends HTTP requests to the selected adress:
-When the video is started for first time: time between page load and video start event.
-When the video is resumed: how many seconds has been paused, how many times has been resumed.
-When the video ends: how many times has been paused and resumed.

###Usage

1- Import the tracker:

	<script src="tracker.js"></script>
	
2- Then, create the class VideoTracker:

	const tracker = new VideoTracker(video, requestURL, consoleDiv);
	
	-video: reference to <video> element
	-requestURL: string with the adress to send HTTP requests with the data
	-consoleDiv: (optional) reference to a <div> where to print events
		In any case, events will be also shown in console

