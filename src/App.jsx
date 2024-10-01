import Difficulty from "./components/Difficulty/difficulty";
import GamePlay from "./components/GamePlay/GamePlay";
import { useState } from "react";
export default function App(){
  const [difficulty, setDifficulty] = useState("");
  const [musicStatus, setMusicStatus] = useState(false);
  console.log(musicStatus);
  return (
    <>
      <Difficulty getDifficulty={setDifficulty} difficulty={difficulty} musicStatus={musicStatus} setMusicStatus={setMusicStatus} />
      <GamePlay difficulty={difficulty} setDifficulty={setDifficulty} musicStatus={musicStatus} setMusicStatus={setMusicStatus}/>
    </>
  )
}