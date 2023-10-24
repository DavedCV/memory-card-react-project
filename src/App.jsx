import "./App.css";
import Card from "./components/Card.jsx";
import { useEffect, useState } from "react";

export default function App() {
  const [nextPage, setNextPage] = useState(null);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchCharacters();
  }, []);

  async function fetchCharacters() {
    const res = await fetch("https://api.attackontitanapi.com/characters");
    const json = await res.json();

    console.log(json.results);

    setCharacters(json.results);
  }

  return (
    <div className="app">
      <h1>Shingeki Memo</h1>
      <div className="card-grid">
        {characters.map((character) => {
          // get the image url
          let img;
          if (character.img) img = character.img.split(".png")[0] + ".png";
          else img = null;

          return <Card key={character.id} name={character.name} img={img} />;
        })}
      </div>
    </div>
  );
}
