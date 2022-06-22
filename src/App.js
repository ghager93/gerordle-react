import logo from "./logo.svg";
import "./App.css";
import { render } from "@testing-library/react";

const GuessSquare = ({ letter }) => (
  <div className="guess-square">
    <p>{ letter.toUpperCase() }</p>
  </div>
);

const GuessRow = ({ word }) => (
  <div className="guess-row">
    { 
      convertWordtoGuessArray(word).map(
        letter => <GuessSquare letter={letter} />
      )
    }
  </div>
);

const convertWordtoGuessArray = word => {
  let guessArray = ['', '', '', '', ''];

  word.slice(0, 5).split('').map(
    (letter, index) => guessArray[index] = letter
  );

  return guessArray;
}

const GuessGrid = ({ words }) => (
  <div className="guess-grid">
    {
      words.slice(0, 6).map(
        word => <GuessRow word={word} />
      )
    }
  </div>
)

const Keyboard = () => {
  const KEYS = "QWERTYUIOPASDFGHJKLZXCVBNM".split('');
  
  return (
    <div className="keyboard">
      {
        KEYS.map(key => <button className="keyboard-button">{ key }</button>)
      }
      <button className="keyboard-button">ENTER</button>
      <button className="keyboard-button">↩</button>
    </div>
  );
}

const TopArea = () => (
  <div className="top-area">
    <h1>Gerordle.</h1>
  </div>
)

const MainArea = () => {
  const handleKeyUp = (e) => {
    console.log(String.fromCharCode(e.keyCode));
  }

  return (
    <div className="main-area" onKeyUp={handleKeyUp} tabIndex="-1">
      <GuessGrid words={['hello', 'world', 'abc', '1@3$5^7', '', '']} />
      <Keyboard />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <TopArea />
      <MainArea />
    </div>
  );
}

export default App;
