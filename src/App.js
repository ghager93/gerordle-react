import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const analyseGuess = (guess, answer) => {
  let guessArr = guess.split('');
  let answerArr = answer.split('');
  let analysisArr = [0, 0, 0, 0, 0];

  for (let i = 0; i < guessArr.length; i++) {
    if (guessArr[i] === answerArr[i]) {
      analysisArr[i] = 2;
    }
    else if (answerArr.includes(guessArr[i])) {
      analysisArr[i] = 1;
    }
  }

  return analysisArr;
}

const GuessSquare = ({ letter, status }) => {
  const backgroundColours = ['dark-grey', 'yellow', 'green'];

  return (
  <div className="guess-square" style={{backgroundColor: backgroundColours[status]}}>
    <p>{ letter.toUpperCase() }</p>
  </div>
  )
}

const GuessRow = ({ word, status }) => (
  <div className="guess-row">
    { 
      convertWordtoGuessArray(word).map(
        (letter, i) => <GuessSquare letter={letter} status={status[i]} />
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

const GuessGrid = ({ words, status }) => (
  <div className="guess-grid">
    {
      words.slice(0, 6).map(
        (word, i) => <GuessRow word={word} status={status[i]} />
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
        if (guesses[currGuessNum] === answer) {
          notify('You Won!')
        }
        let currSquareStatus = squareStatus.slice();
        let currGuessSquareStatus = currSquareStatus[currGuessNum].slice()
        currGuessSquareStatus = analyseGuess(guesses[currGuessNum], answer);
        currSquareStatus[currGuessNum] = currGuessSquareStatus;
        setSquareStatus(currSquareStatus);
        setCurrGuessNum(currGuessNum + 1);

        // console.log('function output: ' + currGuessSquareStatus);
        // console.log('state: ' + squareStatus);
      }
    }
  }

  const [guesses, setGuesses] = useState(["", "", "", "", "", ""]);
  const [currGuessNum, setCurrGuessNum] = useState(0);
  const [squareStatus, setSquareStatus] = useState([...Array(6)].map(x=>Array(5).fill(0)));
  const [answer, setAnswer] = useState("RIGHT");

  return (
    <div className="main-area" onKeyUp={handleKeyUp} tabIndex="-1">
      <ToastContainer />
      <GuessGrid words={guesses} status={squareStatus} />
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
