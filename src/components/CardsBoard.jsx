import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Card from "./Card";

export default function CardsBoard({ cards, setGuess }) {
  const [localCards, setLocalCards] = useState([]);
  const [flip, setFlip] = useState(true);

  useEffect(() => {
    setLocalCards([...cards]);
  }, [cards]);

  function shuffle() {
    const shuffleCards = [...localCards];

    for (let i = shuffleCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap shuffleCards[i] and shuffleCards[j]
      [shuffleCards[i], shuffleCards[j]] = [shuffleCards[j], shuffleCards[i]];
    }

    setLocalCards(shuffleCards);
  }

  function onClickHandle(id) {
    setGuess(id);
    setFlip(!flip);
    setTimeout(shuffle, 300);
  }

  return (
    <div className="card-grid">
      {localCards.map((character) => (
        <div className="card-container" key={character.id}>
          <CSSTransition
            timeout={800}
            classNames="flip"
            appear={true}
            in={flip}
          >
            <Card character={character} onClickHandle={onClickHandle} />
          </CSSTransition>
        </div>
      ))}
    </div>
  );
}
