import { useRef, useState, useEffect, useCallback } from "react";
const VideoPlayer = () => {
  const videoRef = useRef(null);
  const playBtnRef = useRef(null);
  const volumeBtnRef = useRef(null);
  const volumeSliderRef = useRef(null);
  const volumeFillRef = useRef(null);
  const progressSliderRef = useRef(null);
  const progressFillRef = useRef(null);
  const textCurrentRef = useRef(null);
  const speedBtnsRef = useRef([]);
  const fullscreenBtnRef = useRef(null);
  const playerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    video.volume = volume;
  }, [volume]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleMute = () => {
    const video = videoRef.current;
    if (isMuted) {
      video.volume = volume;
    } else {
      video.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume =
      e.nativeEvent.offsetX / volumeSliderRef.current.offsetWidth;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateProgress = () => {
    const video = videoRef.current;
    const progress = (video.currentTime / video.duration) * 100;
    progressFillRef.current.style.width = `${progress}%`;
    textCurrentRef.current.textContent = `${formatTime(
      video.currentTime
    )} / ${formatTime(video.duration)}`;
  };

  const setProgress = (e) => {
    const video = videoRef.current;
    const newTime =
      (e.nativeEvent.offsetX / progressSliderRef.current.offsetWidth) *
      video.duration;
    video.currentTime = newTime;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleSpeedChange = (rate) => {
    const video = videoRef.current;
    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      playerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  });

  useEffect(() => {
    const video = videoRef.current;
    const playBtn = playBtnRef.current;
    const volumeBtn = volumeBtnRef.current;
    const volumeSlider = volumeSliderRef.current;
    const progressSlider = progressSliderRef.current;
    const fullscreenBtn = fullscreenBtnRef.current;

    playBtn.addEventListener("click", togglePlay);
    video.addEventListener("click", togglePlay);
    video.addEventListener("play", () => setIsPlaying(true));
    video.addEventListener("pause", () => setIsPlaying(false));
    video.addEventListener("ended", () => setIsPlaying(false));
    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("canplay", updateProgress);
    volumeBtn.addEventListener("click", toggleMute);
    window.addEventListener("mousedown", () => setIsMouseDown(true));
    window.addEventListener("mouseup", () => setIsMouseDown(false));
    volumeSlider.addEventListener("click", handleVolumeChange);
    progressSlider.addEventListener("click", setProgress);
    fullscreenBtn.addEventListener("click", toggleFullscreen);

    speedBtnsRef.current.forEach((btn) => {
      btn.addEventListener("click", (e) =>
        handleSpeedChange(parseFloat(e.target.dataset.speed))
      );
    });

    const handleKeypress = (e) => {
      const video = videoRef.current;
      switch (e.key) {
        case " ":
          togglePlay();
          break;
        case "ArrowRight":
          video.currentTime += 5;
          break;
        case "ArrowLeft":
          video.currentTime -= 5;
          break;
        default:
          return;
      }
    };
    window.addEventListener("keydown", handleKeypress);

    return () => {
      if (playBtn) playBtn.removeEventListener("click", togglePlay);
      if (video) {
        video.removeEventListener("click", togglePlay);
        video.removeEventListener("play", () => setIsPlaying(true));
        video.removeEventListener("pause", () => setIsPlaying(false));
        video.removeEventListener("ended", () => setIsPlaying(false));
        video.removeEventListener("timeupdate", updateProgress);
        video.removeEventListener("canplay", updateProgress);
      }
      if (volumeBtn) volumeBtn.removeEventListener("click", toggleMute);
      window.removeEventListener("mousedown", () => setIsMouseDown(true));
      window.removeEventListener("mouseup", () => setIsMouseDown(false));
      if (volumeSlider)
        volumeSlider.removeEventListener("click", handleVolumeChange);
      if (progressSlider)
        progressSlider.removeEventListener("click", setProgress);
      if (fullscreenBtn)
        fullscreenBtn.removeEventListener("click", toggleFullscreen);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      speedBtnsRef.current.forEach((btn) => {
        if (btn)
          btn.removeEventListener("click", (e) =>
            handleSpeedChange(parseFloat(e.target.dataset.speed))
          );
      });
      window.removeEventListener("keydown", handleKeypress);
    };
  }, [
    isFullscreen,
    volume,
    isMuted,
    playbackRate,
    updateProgress,
    toggleMute,
    toggleFullscreen,
  ]);

  return (
    <div className="player-container">
      <div className="player" ref={playerRef}>
        <video
          id="video"
          ref={videoRef}
          src="./public/Videos/Crypto.mp4"
          autoPlay
          playsInline
          loop
        ></video>
        <div className="controls">
          <div className="time">
            <span className="time-current" ref={textCurrentRef}></span>
            <span className="time-total"></span>
          </div>
          <div
            className="progress"
            ref={progressSliderRef}
            onClick={setProgress}
          >
            <div className="progress-filled" ref={progressFillRef}></div>
          </div>
          <div className="controls-main">
            <div className="controls-left">
              <div className="volume">
                <div
                  className={`volume-btn ${
                    isMuted ? "muted" : volume > 0.7 ? "loud" : ""
                  }`}
                  ref={volumeBtnRef}
                >
                  <svg
                    width="26"
                    height="24"
                    viewBox="0 0 26 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.75497 17.6928H2C0.89543 17.6928 0 16.7973 0 15.6928V8.30611C0 7.20152 0.895431 6.30611 2 6.30611H6.75504L13.9555 0.237289C14.6058 -0.310807 15.6 0.151473 15.6 1.00191V22.997C15.6 23.8475 14.6058 24.3098 13.9555 23.7617L6.75497 17.6928Z"
                      transform="translate(0 0.000518799)"
                      fill="white"
                    />
                    <path
                      id="volume-low"
                      d="M0 9.87787C2.87188 9.87787 5.2 7.66663 5.2 4.93893C5.2 2.21124 2.87188 0 0 0V2C1.86563 2 3.2 3.41162 3.2 4.93893C3.2 6.46625 1.86563 7.87787 0 7.87787V9.87787Z"
                      transform="translate(17.3333 7.44955)"
                      fill="white"
                    />
                    <path
                      id="volume-high"
                      d="M0 16.4631C4.78647 16.4631 8.66667 12.7777 8.66667 8.23157C8.66667 3.68539 4.78647 0 0 0V2C3.78022 2 6.66667 4.88577 6.66667 8.23157C6.66667 11.5773 3.78022 14.4631 0 14.4631V16.4631Z"
                      transform="translate(17.3333 4.15689)"
                      fill="white"
                    />
                    <path
                      id="volume-off"
                      d="M1.22565 0L0 1.16412L3.06413 4.0744L0 6.98471L1.22565 8.14883L4.28978 5.23853L7.35391 8.14883L8.57956 6.98471L5.51544 4.0744L8.57956 1.16412L7.35391 0L4.28978 2.91031L1.22565 0Z"
                      transform="translate(17.3769 8.31403)"
                      fill="white"
                    />
                  </svg>
                </div>
                <div
                  className="volume-slider"
                  ref={volumeSliderRef}
                  onClick={handleVolumeChange}
                >
                  <div
                    className="volume-filled"
                    ref={volumeFillRef}
                    style={{ width: `${volume * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div
              className={`play-btn ${isPlaying ? "" : "paused"}`}
              ref={playBtnRef}
            ></div>
            <div className="controls-right">
              <div className="speed">
                <ul className="speed-list">
                  {[0.5, 0.75, 1, 1.5, 2].map((rate, index) => (
                    <li
                      key={rate}
                      className={`speed-item ${
                        playbackRate === rate ? "active" : ""
                      }`}
                      data-speed={rate}
                      ref={(el) => (speedBtnsRef.current[index] = el)}
                      onClick={() => handleSpeedChange(rate)}
                    >
                      {rate}x
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="fullscreen"
                ref={fullscreenBtnRef}
                onClick={toggleFullscreen}
              >
                <svg
                  width="30"
                  height="22"
                  viewBox="0 0 30 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0V-1.5H-1.5V0H0ZM0 18H-1.5V19.5H0V18ZM26 18V19.5H27.5V18H26ZM26 0H27.5V-1.5H26V0ZM1.5 6.54545V0H-1.5V6.54545H1.5ZM0 1.5H10.1111V-1.5H0V1.5ZM-1.5 11.4545V18H1.5V11.4545H-1.5ZM0 19.5H10.1111V16.5H0V19.5ZM24.5 11.4545V18H27.5V11.4545H24.5ZM26 16.5H15.8889V19.5H26V16.5ZM27.5 6.54545V0H24.5V6.54545H27.5ZM26 -1.5H15.8889V1.5H26V-1.5Z"
                    transform="translate(2 2)"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
