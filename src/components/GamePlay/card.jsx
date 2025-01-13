export default function Card({frontUrl, name, onFlipCard, order, isFlipped, difficulty}) {
  return(
    <div 
      className={`card-wrapper ${difficulty.toLowerCase()}-card`} 
      onClick={(e) => {
        if (e.type === 'click' && e.clientX !== 0 && e.clientY !== 0) {
          onFlipCard(e);
        }
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        onFlipCard(e);
      }}
      role="button"
      tabIndex={0}
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