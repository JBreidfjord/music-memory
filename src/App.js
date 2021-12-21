import "./App.css";

import SingleCard from "./components/SingleCard";
import { useState } from "react";

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

  const shuffleCards = () => {
    // Creates objects with filepath for generated image numbers
    const cardImages = genNums().map((num) => ({ src: `/img/album/${num}.png` }));

    const shuffledCards = [...cardImages, ...cardImages] // Duplicate array creating pairs of cards
      .sort(() => 0.5 - Math.random()) // Randomly sort the array
      .map((card, i) => ({ ...card, id: i })); // Assign an id to each card

    setCards(shuffledCards);
    setTurns(0);
  };

  return (
    <div className="App">
      <h1>Music Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard card={card} key={card.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
