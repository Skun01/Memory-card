import RestartGameLogo from "./restartGameLogo";
import Score from "./score";
import { useState } from "react";
import CardBoard from "./cardBoard";
import ResultScreen from "./resultScreen";
import Tools from '../Difficulty/tools.jsx';
import winScreen from '/others/winscreen.jpg';
import loseScreen from '/others/loseScreen.jpg';
import gamingTheme from '/others/gamingTheme.mp3';
export default function GamePlay({difficulty, setDifficulty, musicStatus, setMusicStatus}){
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameResult, setGameResult] = useState("");
  const [resetGameSettings, setResetGameSettings] = useState(false);
  if(!difficulty){return (<></>)}
  function onRestartGame(){
    setDifficulty("");
    setCurrentScore(0);
  }
  function onResetGameSettings(){
    setResetGameSettings(true);
  }
  return(
    <div className="gameplay">
      <div className="gameplay-header">
        <RestartGameLogo onRestartGame={onRestartGame}/>
        <Score score={currentScore} bestScore={bestScore}/>
      </div>
      {gameResult === "win" && <ResultScreen resultText="You Win!" backgroundUrl={winScreen} onRestartGame={onResetGameSettings} difficulty={difficulty}/>}
      {gameResult === "lose" && <ResultScreen resultText="You Lose!" backgroundUrl={loseScreen} onRestartGame={onResetGameSettings} difficulty={difficulty}/>}
      <CardBoard difficulty={difficulty} resetGameSettings={resetGameSettings} setResetGameSettings={setResetGameSettings} currentScore={currentScore} setCurrentScore={setCurrentScore} setGameResult={setGameResult} gameResult={gameResult} bestScore={bestScore} setBestScore={setBestScore} onResetGameSettings={onResetGameSettings}/>
      <Tools musicStatus={musicStatus} setMusicStatus={setMusicStatus} audioUrl={gamingTheme}/>
    </div>
  )
}