import React, { useState, useRef } from "react";
import TimeSlider from "react-input-slider";

import TetImg from "../../../../assets/images/pause.png";
import { AiOutlinePauseCircle, AiFillAccountBook } from "react-icons/ai";
import audios from "./audios";
import pause from "../../../../assets/images/pause.png";

const PlayMusic = () => {
  const audioRef: any = useRef();
  const [audioIndex, setAudioIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlay, setPlay] = useState(false);

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
    if (isPlay) audioRef.current.play();
  };

  const handlePausePlayClick = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlay(!isPlay);
  };

  const handleTimeSliderChange = ({ x }: any) => {
    audioRef.current.currentTime = x;
    setCurrentTime(x);

    if (!isPlay) {
      setPlay(true);
      audioRef.current.play();
    }
  };

  return (
    <div className="App">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="Pause-Play-Button" onClick={handlePausePlayClick}>
          {isPlay ? (
            <img src={pause} alt="" style={{ width: "60%", marginRight: 10 }} />
          ) : (
            <img src={pause} alt="" style={{ width: "60%", marginRight: 10 }} />
          )}
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#00B0F0" ,fontSize:10}}>00:00</span>
            <span style={{ color: "#00B0F0" ,fontSize:10}}>04:11</span>
          </div>
          <TimeSlider
            axis="x"
            xmax={duration}
            x={currentTime}
            onChange={handleTimeSliderChange}
            styles={{
              track: {
                backgroundColor: "#00B0F0",
                height: "2px",
              },
              active: {
                backgroundColor: "#00B0F0",
                height: "2px",
                cursor: "pointer",
              },
              thumb: {
                width: "15px",
                height: "15px",
                backgroundColor: "#00B0F0",
                borderRadius: 10,
              },
            }}
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={audios[audioIndex].src}
        onLoadedData={handleLoadedData}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onEnded={() => setPlay(false)}
      />
    </div>
  );
};

export default PlayMusic;
