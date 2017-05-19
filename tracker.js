	class VideoTracker {
		constructor(videoPlayer){
			this.videoPlayer = videoPlayer;
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
			if(!this.alreadyStarted) {
				this.alreadyStarted = true;
				// send http video start
			} else {
				// send http video resume
			}
			this.lastIntervalStart = this.videoPlayer.currentTime;
			this.secondsPaused = (Date.now() - this.startTimeStamp) / 1000;
			console.log( `Paused ${this.secondsPaused} seconds.` ); // to page element
			console.log( `Resumed ${this.resumeCount} times.` ); // to page element
		}
		
		_playerPaused() {
			this.pausedCount++;
			this.startTimeStamp = Date.now();
			const lastInterval = this.videoPlayer.currentTime - this.lastIntervalStart;
			this.lastPercentSeen = (lastInterval / this.videoPlayer.duration) * 100;
			console.log( `${this.lastPercentSeen}% of the video seen.`); // to page element
			console.log( `Paused ${this.pausedCount} times.` ); // to page element
		}
		
		_playerEnded() {
			// send http video end
		}
	}