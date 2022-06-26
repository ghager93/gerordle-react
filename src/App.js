import {useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import GuessGrid from './components/GuessGrid';
import Keyboard from './components/Keyboard';

import {analyseGuess} from './utils/utils';

const TopArea = () => (
  <div className="top-area">
    <h1>Gerordle.</h1>
  </div>
);

const MainArea = () => {
  const handleKeyUp = (e) => {
    const key = e.key.toUpperCase();

    if (
      key.length === 1 &&
      key.charCodeAt(0) >= 65 &&
      key.charCodeAt(0) <= 90
    ) {
      const currGuess = guesses[currGuessNum];
      if (currGuess.length < 5) {
        const currGuesses = guesses.slice();
        currGuesses[currGuessNum] = currGuess + key;
        setGuesses(currGuesses);
      }
    }

    if (key === 'BACKSPACE') {
      const currGuesses = guesses.slice();
      currGuesses[currGuessNum] = currGuesses[currGuessNum].slice(0, -1);
      setGuesses(currGuesses);
    }

    if (key === 'ENTER') {
      if (currGuessNum < 6) {
        if (guesses[currGuessNum].length < 5) {
          notify('Not enough letters!');
        } else {
          const currSquareStatus = squareStatus.slice();
          let currGuessSquareStatus = currSquareStatus[currGuessNum].slice();
          currGuessSquareStatus = analyseGuess(guesses[currGuessNum], answer);
          currSquareStatus[currGuessNum] = currGuessSquareStatus;
          setSquareStatus(currSquareStatus);

          if (guesses[currGuessNum] === answer) {
            notify('You Won!');
          } else if (currGuessNum === 5) {
            notify('You lost :(, the answer was ' + answer);
          } 

          setCurrGuessNum(currGuessNum + 1);
        }
      }
    }
  };

  const [guesses, setGuesses] = useState(['', '', '', '', '', '']);
  const [currGuessNum, setCurrGuessNum] = useState(0);
  const [squareStatus, setSquareStatus] = useState(
      [...Array(6)].map((x) => Array(5).fill(0)),
  );
  const [answer, setAnswer] = useState('RADIO');

  return (
    <div className="main-area" onKeyUp={handleKeyUp} tabIndex="-1">
      <ToastContainer />
      <GuessGrid words={guesses} status={squareStatus} />
      <Keyboard />
    </div>
  );
};

const notify = (msg) => {
  toast(msg);
};

function App() {
  return (
    <div className="App">
      <TopArea />
      <MainArea />
    </div>
  );
}

export default App;
