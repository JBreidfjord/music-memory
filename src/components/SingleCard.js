import "./SingleCard.css";

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="card-front" src={card.src} alt="card-front" draggable="false" />
        <img
          className="card-back"
          onClick={handleClick}
          src="/img/cover.png"
          alt="card-back"
          draggable="false"
        />
      </div>
    </div>
  );
}
