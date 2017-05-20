	class VideoTracker {
		constructor(videoPlayer, requestURL, outputText = undefined){
			// The player to track
			this.videoPlayer = videoPlayer;
			// The URL to send data
			this.requestURL = requestURL;
			// (optional) the div to show events
			this.outputText = outputText;
			
			this.pausedCount = 0;
			this.resumeCount = 0;
			this.alreadyStarted = false;
			this.lastPercentSeen = 0;
			this.secondsPaused = 0;
			this.startTimeStamp = Date.now();

			this._subscribeEvents();
		}
		
		_subscribeEvents() {
			this.videoPlayer.onplay = () => {
				this._playerResumed();
			};
		    this.videoPlayer.onpause = () => {
				this._playerPaused();
			};
			this.videoPlayer.onended = () => {
				this._playerEnded();
			};
		}

		_playerResumed() {
			this.resumeCount++;
			this.lastIntervalStart = this.videoPlayer.currentTime;
			this.secondsPaused = (Date.now() - this.startTimeStamp) / 1000;
			// text to console
			console.log( `Paused ${this.secondsPaused} seconds.` );
			console.log( `Resumed ${this.resumeCount} times.` );
			// if we have a div, text also shown there
			if(this.outputText){
				this.outputText.innerHTML = `${this.outputText.innerHTML}<br> Paused ${this.secondsPaused} seconds.`;
				this.outputText.innerHTML = `${this.outputText.innerHTML}<br> Resumed ${this.resumeCount} times.`;
			}
			
			if(!this.alreadyStarted) {
				this.alreadyStarted = true;
				// send http video start
				this.sendDataStart(this.secondsPaused);
			} else {
				// send http video resume
				this.sendDataResume(this.resumeCount,this.secondsPaused);
			}
		}
		
		_playerPaused() {
			this.pausedCount++;
			this.startTimeStamp = Date.now();
			const lastInterval = this.videoPlayer.currentTime - this.lastIntervalStart;
			this.lastPercentSeen = (lastInterval / this.videoPlayer.duration) * 100;
			// text to console
			console.log( `${this.lastPercentSeen}% of the video seen.`);
			console.log( `Paused ${this.pausedCount} times.` );
			// if we have a div, text also shown there
			if(this.outputText){
				this.outputText.innerHTML = `${this.outputText.innerHTML}<br> ${this.lastPercentSeen}% of the video seen.`;
				this.outputText.innerHTML = `${this.outputText.innerHTML}<br> Paused ${this.pausedCount} times.`;
			}
		}
		
		_playerEnded() {
			// send http video end
			this.sendDataEnd(this.resumeCount,this.pausedCount);
		}
		
		// http requests, data object creators for each case
		sendDataStart(pausedTime) {
			var data = new FormData();
			data.append('Started','True');
			data.append('LoadedToPlayTime', pausedTime);
			this.sendRequest(data);
		}
		
		sendDataResume(resumedCount, secondsPaused) {
			var data = new FormData();
			data.append('Resumed','True');
			data.append('ResumedCount', resumedCount);
			data.append('SecondsPaused', secondsPaused);
			this.sendRequest(data);
		}
		
		sendDataEnd(resumedCount, pausedCount) {
			var data = new FormData();
			data.append('Ended','True');
			data.append('ResumedCount', resumedCount);
			data.append('PausedCount', pausedCount);
			this.sendRequest(data);
		}
		
		// http request send
		sendRequest(dataToSend){
			var request = new XMLHttpRequest();
			request.open('POST', this.requestURL, true); // async
			request.send(dataToSend);
		}
	}