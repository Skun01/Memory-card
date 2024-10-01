import logo from '/others/Arcane_logo.jpg';
export default function RestartGameLogo({onRestartGame}){
  return(
    <div className="restart-game-logo">
      <img src={logo} alt="" className="restart-game-logo-image" onClick={onRestartGame}/>
    </div>
  )
}