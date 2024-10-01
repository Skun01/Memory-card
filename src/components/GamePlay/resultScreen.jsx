export default function ResultScreen({resultText,backgroundUrl, onRestartGame, difficulty}){
  return(
    <div className="result-screen">
      <div className="result-screen-content" style={{backgroundImage: `url(${backgroundUrl})`}}>
        <h1>{resultText}</h1>
        {difficulty === "Hard" && <p>You are the best!</p>}
        {difficulty === "Impossible" && <p>You are the mother of memory, father of the name, sugar daddy of the game!</p>}
        <button onClick={onRestartGame} className="restart-button">Restart Game</button>
      </div>
    </div>
  )
}