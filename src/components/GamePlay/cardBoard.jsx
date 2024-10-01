import { useState, useEffect } from "react";
import Card from "./card";
import { characterData } from "./characterData";
export default function CardBoard({difficulty, setCurrentScore, currentScore, setGameResult, setBestScore, resetGameSettings, setResetGameSettings}){
  const [flipNumber, setFlipNumber] = useState(0);
  const [newCardIndex, setNewCardIndex] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
  const [chosenCardIndex, setChosenCardIndex] = useState([]);
  const [cardListData, setCardListData] = useState([{}, {}, {}, {}, {}, {}]);
  const [displayingIndex, setDisplayingIndex] = useState([]);
  const [initGame, setInitGame] = useState(false);
  // innit random card index
  useEffect(() => {
    getRandomCardIndex();
  }, [initGame]);

  useEffect(() => {
    if(resetGameSettings){
      resetGame();
    }
  }, [resetGameSettings]);

  // get difficulty settings
  let cardNumber = 3;
  let flipLimit = 5;
  switch(difficulty){
    case "Medium":
      cardNumber = 4;
      flipLimit = 8;
      break;
    case "Hard":
      cardNumber = 5;
      flipLimit = 12;
      break;
    case "Impossible":
      cardNumber = 6;
      flipLimit = 18;
      break;
  }

  // make card component and handle flip card
  const characterCards = [];
  function onFlipCard(e){
    let cardOrder = e.target.closest(".card").getAttribute("data-order");
    let characterIndex = displayingIndex[cardOrder];
    
    // check if the card is already chosen
    if(chosenCardIndex.includes(characterIndex)){
      setGameResult("lose");
      return;
    }
    //set new point as well as flip all card
    setFlipNumber(flipNumber + 1);
    setCurrentScore(currentScore + 1);
    // check if the flip number is reached the limit
    if(flipNumber + 1 === flipLimit){
      setGameResult("win");
      return;
    }
    flipAllCard();
    // remove the card from new card index and add to chosen card index
    for(let i = 0; i < newCardIndex.length; i++){
      if(newCardIndex[i] === characterIndex){
        newCardIndex.splice(i, 1);
        setChosenCardIndex([...chosenCardIndex, characterIndex]);
        break;
      }
    }
    // get new card index and flip all card
    setTimeout(() => {
      getRandomCardIndex();
      flipAllCard();
    }, 1000);
  }
  function getRandomCardIndex(){
    const randomChosenCard = Math.floor(Math.random() * Math.min(chosenCardIndex.length, cardNumber));
    const displayCardData = [];
    const renderCardIndex = [];
    const chosenIndex = [...chosenCardIndex];
    const newIndex = [...newCardIndex];
    for(let i = 0; i < randomChosenCard; i++){
      let randomIndex = Math.floor(Math.random() * chosenIndex.length);
      displayCardData.push(characterData[chosenIndex[randomIndex]]);
      renderCardIndex.push(chosenIndex[randomIndex]);
      chosenIndex.splice(randomIndex, 1);
    }
    for(let i = 0; i < cardNumber - randomChosenCard; i++){
      let randomIndex = Math.floor(Math.random() * newIndex.length);
      displayCardData.push(characterData[newIndex[randomIndex]]);
      renderCardIndex.push(newIndex[randomIndex]);
      newIndex.splice(randomIndex, 1);
    }
    setCardListData(displayCardData);
    setDisplayingIndex(renderCardIndex);
  }
  for(let i = 0; i < cardNumber; i++){
    characterCards.push(<Card key= {i} order = {i} frontUrl={cardListData[i].url} name={cardListData[i].name} onFlipCard={onFlipCard}/>)
  }

  // handle game result
  function resetGame(){
    setFlipNumber(0);
    setChosenCardIndex([]);
    setDisplayingIndex([]);
    setCardListData([{}, {}, {}, {}, {}, {}]);
    setNewCardIndex([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
    setBestScore(currentScore);
    setCurrentScore(0);
    setGameResult("");
    setInitGame(prev => !prev);
    setResetGameSettings(false);
  }

  return(
    <div className="cardBoard">
      <div className="card-list">
        {characterCards}
      </div>
      <div className="flip-display">{flipNumber}/{flipLimit}</div>
    </div>
  )
}




function flipAllCard(){
  const cards = [...document.querySelectorAll(".card")];
  cards.forEach(card => {
    card.classList.toggle("flipped");
  });
}