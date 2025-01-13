import { useState, useEffect } from "react";
import Card from "./card";
import { characterData } from "./characterData";

export default function CardBoard({
  difficulty, 
  setCurrentScore, 
  currentScore, 
  setGameResult, 
  setBestScore, 
  resetGameSettings, 
  setResetGameSettings
}) {
  // Khởi tạo các state cần thiết
  const [flipNumber, setFlipNumber] = useState(0);
  const [newCardIndex, setNewCardIndex] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
  const [chosenCardIndex, setChosenCardIndex] = useState([]);
  const [cardListData, setCardListData] = useState([]);  // Sửa initial state thành mảng rỗng
  const [displayingIndex, setDisplayingIndex] = useState([]);
  const [initGame, setInitGame] = useState(false);

  // Khởi tạo game khi component mount hoặc khi initGame thay đổi
  useEffect(() => {
    if (difficulty) {  // Thêm điều kiện kiểm tra difficulty
      getRandomCardIndex();
    }
  }, [initGame, difficulty]);  // Thêm difficulty vào dependencies

  // Reset game khi có yêu cầu
  useEffect(() => {
    if(resetGameSettings){
      resetGame();
    }
  }, [resetGameSettings]);


  // Cấu hình độ khó
  let cardNumber = 3;
  let flipLimit = 5;
  
  switch(difficulty){
    case "Easy":
      cardNumber = 3;  // Cố định 3 thẻ
      flipLimit = 6;
      break;
    case "Medium": 
      cardNumber = 4;  // Cố định 4 thẻ
      flipLimit = 8;
      break;
    case "Hard":
      cardNumber = 5;  // Cố định 5 thẻ, bỏ randomInRange
      flipLimit = 10;
      break;
    case "Impossible":
      cardNumber = 6;  // Cố định 6 thẻ, bỏ randomInRange
      flipLimit = 12;
      break;
  }

  // Hàm trộn mảng
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // Hàm lấy thẻ ngẫu nhiên
  function getRandomCardIndex() {
    if (!characterData || !characterData.length) return;

    const displayCardData = [];
    const renderCardIndex = [];
    const chosenIndex = [...chosenCardIndex];
    const newIndex = [...newCardIndex];
    
    // Tỷ lệ cố định cho mỗi độ khó
    let maxChosenCardRatio = 0;
    switch(difficulty) {
      case "Easy":
        maxChosenCardRatio = 0.3;  // 30% thẻ đã chọn
        break;
      case "Medium":
        maxChosenCardRatio = 0.4;  // 40% thẻ đã chọn
        break;
      case "Hard":
        maxChosenCardRatio = 0.6;  // 60% thẻ đã chọn
        break;
      case "Impossible":
        maxChosenCardRatio = 0.7;  // 70% thẻ đã chọn
        break;
    }

    maxChosenCardRatio = Math.min(maxChosenCardRatio, 0.9);

    // Tính số lượng thẻ đã chọn tối đa có thể hiển thị
    const maxChosenCards = Math.min(
      Math.floor(cardNumber * maxChosenCardRatio),
      chosenCardIndex.length
    );

    // Chọn số lượng thẻ đã chọn ngẫu nhiên
    const randomChosenCard = Math.floor(Math.random() * (maxChosenCards + 1));

    // Trộn và thêm thẻ đã chọn
    const shuffledChosen = shuffleArray(chosenIndex);
    const shuffledNew = shuffleArray(newIndex);

    // Thêm thẻ đã chọn
    for(let i = 0; i < randomChosenCard && i < shuffledChosen.length; i++) {
      displayCardData.push(characterData[shuffledChosen[i]]);
      renderCardIndex.push(shuffledChosen[i]);
    }

    // Thêm thẻ mới
    for(let i = 0; i < cardNumber - randomChosenCard && i < shuffledNew.length; i++) {
      displayCardData.push(characterData[shuffledNew[i]]);
      renderCardIndex.push(shuffledNew[i]);
    }

    // Trộn kết quả cuối cùng
    const shuffledResults = shuffleArray(
      Array.from({ length: displayCardData.length }, (_, i) => i)
    );

    // Cập nhật state
    setCardListData(shuffledResults.map(index => displayCardData[index]));
    setDisplayingIndex(shuffledResults.map(index => renderCardIndex[index]));
  }

  // Xử lý sự kiện lật thẻ
  function onFlipCard(e) {
    // Lấy thông tin thẻ được chọn
    let cardOrder = e.target.closest(".card").getAttribute("data-order");
    let characterIndex = displayingIndex[cardOrder];
    
    // Kiểm tra nếu thẻ đã được chọn trước đó
    if(chosenCardIndex.includes(characterIndex)){
      setGameResult("lose");
      return;
    }

    // Cập nhật điểm và số lần lật
    setFlipNumber(flipNumber + 1);
    setCurrentScore(currentScore + 1);

    // Kiểm tra điều kiện thắng
    if(flipNumber + 1 === flipLimit){
      setGameResult("win");
      return;
    }

    // Lật tất cả thẻ
    flipAllCard();

    // Cập nhật danh sách thẻ đã chọn
    for(let i = 0; i < newCardIndex.length; i++){
      if(newCardIndex[i] === characterIndex){
        const updatedNewCardIndex = [...newCardIndex];
        updatedNewCardIndex.splice(i, 1);
        setNewCardIndex(updatedNewCardIndex);
        setChosenCardIndex([...chosenCardIndex, characterIndex]);
        break;
      }
    }

    // Tính toán thời gian hiển thị dựa trên độ khó và tiến độ
    let baseDelay = 1000;
    let progressPenalty = (flipNumber / flipLimit) * 300;

    switch(difficulty) {
      case "Easy":
        baseDelay = 1200 - progressPenalty;
        break;
      case "Medium":
        baseDelay = 1000 - progressPenalty;
        break;
      case "Hard":
        baseDelay = 800 - progressPenalty;
        break;
      case "Impossible":
        baseDelay = 500 - progressPenalty;
        break;
    }

    // Đảm bảo thời gian hiển thị không quá ngắn
    let flipDelay = Math.max(baseDelay, 300);

    // Set timeout để lật thẻ và lấy thẻ mới
    setTimeout(() => {
      getRandomCardIndex();
      flipAllCard();
    }, flipDelay);
  }

  // Tạo các card component
  const characterCards = [];
  for(let i = 0; i < cardNumber; i++){
    // Kiểm tra dữ liệu trước khi render
    if (cardListData[i]) {
      characterCards.push(
        <Card 
          key={i} 
          order={i} 
          frontUrl={cardListData[i].url} 
          name={cardListData[i].name} 
          onFlipCard={onFlipCard} 
          difficulty={difficulty}
        />
      );
    }
  }

  // Reset game về trạng thái ban đầu
  function resetGame(){
    setFlipNumber(0);
    setChosenCardIndex([]);
    setDisplayingIndex([]);
    setCardListData([]); // Sửa thành mảng rỗng
    setNewCardIndex([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
    setBestScore(currentScore);
    setCurrentScore(0);
    setGameResult("");
    setInitGame(prev => !prev);
    setResetGameSettings(false);
  }

  // Render component
  return(
    <div className="cardBoard">
      <div className="card-list">
        {characterCards.length > 0 ? characterCards : <div>Loading...</div>}
      </div>
      <div className="flip-display">{flipNumber}/{flipLimit}</div>
    </div>
  );
}

// Helper function để lật tất cả thẻ
function flipAllCard(){
  const cards = [...document.querySelectorAll(".card")];
  cards.forEach(card => {
    card.classList.toggle("flipped");
  });
}