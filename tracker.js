	class VideoTracker {
		constructor(videoPlayer){
			this.videoPlayer = videoPlayer;
			this.pausedCount = 0;
			this.resumeCount = 0;
			this._subscribeEvents();
		}
		
		_subscribeEvents() {
			this.videoPlayer.onplay = () => {
				this._playerResumed();
			};
		    this.videoPlayer.onpause = () => {
				this._playerPaused();
			};
		}

		_playerResumed() {
			this.resumeCount++;
			console.log('play');
		}
		
		_playerPaused() {
			this.pausedCount++;
			console.log('pause');
		}
	}