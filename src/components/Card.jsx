import cardBackImage from "/src/assets/card-back.jpg";
import "../styles/card.css";

export default function Card({ character, onClickHandle }) {
  return (
    <div className="card" onClick={() => onClickHandle(character.id)}>
      <div className="card-back">
        <img
          className="back"
          src={cardBackImage}
          alt="card back"
          width={50}
          height={50}
        />
      </div>
      <div className="card-front">
        <img className="front" src={character.img} alt={character.name} />
        <div className="character-info">
          <p>Name: {character.name}</p>
          <p>Occupation: {character.occupation}</p>
          <p>Residence: {character.residence}</p>
        </div>
      </div>
    </div>
  );
}
