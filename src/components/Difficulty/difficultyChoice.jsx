export default function DifficultyChoice({getChoice}){
  return (
    <div className="difficulty-choice">
      <h1 className="title" data-text="Memory Card Game">Memory Card Game</h1>
      <div className="difficulty-button-list">
        <DifficultyButton onHandleClick={getChoice} btnClass="easy">Easy</DifficultyButton>
        <DifficultyButton onHandleClick={getChoice} btnClass="medium">Medium</DifficultyButton>
        <DifficultyButton onHandleClick={getChoice} btnClass="hard">Hard</DifficultyButton>
        <DifficultyButton onHandleClick={getChoice} btnClass="impossible">Impossible</DifficultyButton>
      </div>
    </div>
  )
}

function DifficultyButton({children, onHandleClick, btnClass}){
  return (
    <button className={"difficulty-button " + btnClass} onClick={onHandleClick}>
      {children}
    </button>
  )
}