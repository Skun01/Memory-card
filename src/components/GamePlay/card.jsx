export default function Card({frontUrl, name, onFlipCard, order, isFlipped, difficulty}) {
  return(
    <div 
      className="card-wrapper" 
      onClick={onFlipCard} 
    >
      <div className={`card ${isFlipped ? 'flipped' : ''}` } data-order={order}>
        <div className="card-front">
          <img src={frontUrl} alt={name} className="card-front-img" />
          {difficulty !== 'Impossible' && <p className="card-name">{name}</p>}
        </div>
        <div className="card-back"></div>
      </div>
    </div>
  )
}