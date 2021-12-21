import "./App.css";

import { useEffect, useState } from "react";

import SingleCard from "./components/SingleCard";

const genNums = () => {
  // Generate 6 unique random integers between 1 and 358 (358 = number of images)
  const nums = [];
  while (nums.length < 6) {
    const num = Math.floor(Math.random() * 358) + 1;
    if (!nums.includes(num)) {
      nums.push(num);
    }
  }
  return nums;
};

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    // Creates objects with filepath for generated image numbers
    const cardImages = genNums().map((num) => ({ src: `/img/album/${num}.png`, matched: false }));

    const shuffledCards = [...cardImages, ...cardImages] // Duplicate array creating pairs of cards
      .sort(() => 0.5 - Math.random()) // Randomly sort the array
      .map((card, i) => ({ ...card, id: i })); // Assign an id to each card

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne && choiceOne.id !== card.id ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 750);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Music Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
