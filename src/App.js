import logo from "./logo.svg";
import "./App.css";

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

function App() {
  return (
    <div className="App">
      <div id="top-area">
        <h1>Gerordle.</h1>
      </div>
      <div id="main-area">
        <GuessGrid words={['hello', 'world', 'abc', '1@3$5^7', '', '']} />
        <div id="keyboard">
          <button className="keyboard-button">Q</button>
          <button className="keyboard-button">W</button>
          <button className="keyboard-button">E</button>
          <button className="keyboard-button">R</button>
          <button className="keyboard-button">T</button>
          <button className="keyboard-button">Y</button>
          <button className="keyboard-button">U</button>
          <button className="keyboard-button">I</button>
          <button className="keyboard-button">O</button>
          <button className="keyboard-button">P</button>
          <button className="keyboard-button">A</button>
          <button className="keyboard-button">S</button>
          <button className="keyboard-button">D</button>
          <button className="keyboard-button">F</button>
          <button className="keyboard-button">G</button>
          <button className="keyboard-button">H</button>
          <button className="keyboard-button">J</button>
          <button className="keyboard-button">K</button>
          <button className="keyboard-button">L</button>
          <button className="keyboard-button">ENTER</button>
          <button className="keyboard-button">Z</button>
          <button className="keyboard-button">X</button>
          <button className="keyboard-button">C</button>
          <button className="keyboard-button">V</button>
          <button className="keyboard-button">B</button>
          <button className="keyboard-button">N</button>
          <button className="keyboard-button">M</button>
          <button className="keyboard-button">&#8617</button>
        </div>
      </div>
    </div>
  );
}

export default App;
