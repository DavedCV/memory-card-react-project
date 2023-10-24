import { useEffect, useState } from "react";
import "./styles/App.css";
import ScoreBoard from "./components/ScoreBoard";
import CardsBoard from "./components/CardsBoard";

const baseUrl = "https://api.attackontitanapi.com/characters";

export default function App() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [currentCharacters, setCurrentCharacters] = useState([]);
  const [nextPage, setNextPage] = useState(null);

  const [guesses, setGuesses] = useState([]);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    fetchCharacters(baseUrl);
  }, []);

  async function fetchCharacters(url) {
    let json = null;

    if (localStorage.getItem(url)) {
      console.log("local");
      json = JSON.parse(localStorage.getItem(url));
    } else {
      console.log("fetch");
      const res = await fetch(url);
      json = await res.json();
      localStorage.setItem(url, JSON.stringify(json));
    }

    console.log(json);
    console.log("url: " + url);

    setNextPage(json.info.next_page);

    if (!allCharacters) setAllCharacters(json.results);
    selectCharacters(json.results);
  }

  function selectCharacters(oldAllCharacters) {
    const newCurrentCharacters = [];
    const newAllCharacters = [...oldAllCharacters];

    // console.log(allCharacters);

    while (newCurrentCharacters.length != 8) {
      const character = newAllCharacters.splice(
        Math.random() * allCharacters.length,
        1,
      )[0];

      // console.log(character);

      if (character?.img) {
        character.img = character.img.split(".png")[0] + ".png";
        newCurrentCharacters.push(character);
      }
    }

    setCurrentCharacters(newCurrentCharacters);
    setAllCharacters(newAllCharacters);
  }

  function handleGuesses(id) {
    if (guesses.indexOf(id) == -1) {
      const newGuesses = [...guesses, id];
      if (newGuesses.length % 8 === 0) {
        console.log("should re-fetch");

        if (nextPage) fetchCharacters(nextPage);
        else fetchCharacters(baseUrl);
      }
      setGuesses(newGuesses);
    } else {
      console.log("carta repetida");
      if (guesses.length > bestScore) setBestScore(guesses.length);
      setGuesses([]);
    }
  }

  return (
    <div className="app">
      <h1>Shingeki Memo</h1>
      <ScoreBoard currentScore={guesses.length} bestScore={bestScore} />
      <CardsBoard cards={currentCharacters} setGuess={handleGuesses} />
    </div>
  );
}
