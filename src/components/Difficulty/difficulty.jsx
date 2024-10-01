import Logo from './logo.jsx';
import DifficultyChoice from './difficultyChoice.jsx';
import Tools from './tools.jsx';
import openingAudio from '/others/opening.mp3';
export default function Difficulty({getDifficulty, difficulty, musicStatus, setMusicStatus}){
  function getUserChoice(e){
    getDifficulty(e.target.textContent); 
  }
  const openingTools = <Tools musicStatus={musicStatus} setMusicStatus={setMusicStatus} audioUrl={openingAudio}/>;
  if(difficulty){return (<></>)}
  return (
    <div className="difficulty">
      <Logo/>
      <DifficultyChoice getChoice={getUserChoice}/>
      {openingTools}
    </div>
  )
}