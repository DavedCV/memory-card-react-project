import cardBackImage from "/src/assets/card-back.jpg";
import "/src/styles/card.css";

export default function Card({ name, img }) {
  return (
    <div className="card">
      <div>
        <img className="front" src={img} alt={name} />
        <img
          className="back"
          src={cardBackImage}
          alt="card back"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
}
