import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

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
    //TODO handle enter
    //TODO handle backspace
    let key = e.key.toUpperCase();

    if (key.length === 1 && key.charCodeAt(0) >= 65 && key.charCodeAt(0) <= 90) {
      let currGuess = guesses[currGuessNum]
      if (currGuess.length < 5) {
        let currGuesses = guesses.slice()
        currGuesses[currGuessNum] = currGuess + key;
        setGuesses(currGuesses);
      } 
    }

    if (key === 'BACKSPACE') {
      let currGuesses = guesses.slice();
      currGuesses[currGuessNum] = currGuesses[currGuessNum].slice(0, -1);
      setGuesses(currGuesses);
    }

    if (key === 'ENTER') {
      if (guesses[currGuessNum].length < 5) {
        notify('Not enough letters!')
      }
      else {
        setCurrGuessNum(currGuessNum + 1);
      }
    }
  }

  const [guesses, setGuesses] = useState(["", "", "", "", "", ""]);
  const [currGuessNum, setCurrGuessNum] = useState(0);

  return (
    <div className="main-area" onKeyUp={handleKeyUp} tabIndex="-1">
      <ToastContainer />
      <GuessGrid words={guesses} />
      <Keyboard />
    </div>
  );
}

const notify = (msg) => {
  toast(msg);
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
