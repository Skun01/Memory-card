import {useState, useEffect, useRef} from 'react';
import CircleButton from './circleButton.jsx';
import Instruction from './instruction.jsx';
import BackgroundMusic from './backgroundMusic.jsx';


export default function Tools({musicStatus, setMusicStatus, audioUrl}) {
  const [instructionIcon, setInstructionIcon] = useState(false);
  const audio = useRef(null);
  function displayInstruction(e){
    e.target.parentElement.classList.toggle("instruction-display");
    const instructionElem = document.querySelector("ul.instruction");
    instructionElem.classList.toggle("instruction-display");
    setInstructionIcon(!instructionIcon);
  }

  function controlMusic() {
    setMusicStatus(!musicStatus);
  }
  useEffect(() => {
    audio.current.volume = 0.5;
    if(musicStatus){
      audio.current.play();
    }else{
      audio.current.pause();
    }
  }, [musicStatus]);

  return (
    <div className="opening-tools">
      <CircleButton themify_icon={musicStatus ? "ti-control-play" : "ti-music-alt"} onHandleClick={controlMusic}>
        <BackgroundMusic Ref={audio} audioUrl = {audioUrl}/>
      </CircleButton>
      <CircleButton themify_icon={instructionIcon ? "ti-close" : "ti-help"} onHandleClick={displayInstruction}>
        <Instruction />
      </CircleButton>
    </div>
  );
}