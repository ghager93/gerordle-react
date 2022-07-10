import {useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import './styles/App.css';
import './styles/Keyboard.css';
import './styles/GuessGrid.css';
import 'react-toastify/dist/ReactToastify.css';

import GuessGrid from './components/GuessGrid';
import Keyboard from './components/Keyboard';

import {analyseGuess, getRandomWord, isAWord} from './utils/utils';
import { dark } from '@mui/material/styles/createPalette';

import github_logo from './iconmonstr-github-1.svg';

const TopArea = () => (
  <div className="top-area">
    <div>
      <h1>Gerordle.</h1>
    </div>
    <div>
      <a href="https://github.com/ghager93/gerordle-react">
        <img src={github_logo} alt="github" style={{width:"42px",height:"42px"}}/>
      </a>
    </div>
  </div>
);

const MainArea = () => {
  const handleKeyUp = (e) => {
    const key = e.key.toUpperCase();

    handleInput(key);
  };

  const handleLetter = (key) => {
    const currGuess = guesses[currGuessNum];
    if (currGuess.length < 5) {
      const currGuesses = guesses.slice();
      currGuesses[currGuessNum] = currGuess + key;
      setGuesses(currGuesses);
    }
  };

  const isLetter = (key) => {
    return (
      key.length === 1 &&
      key.charCodeAt(0) >= 65 &&
      key.charCodeAt(0) <= 90
    )
  };

  const getKeyStatus = (key) => {
    if (correctLetters.has(key)) {
      return 3;
    } else if (misplacedLetters.has(key)) {
      return 2;
    } else if (guessedLetters.has(key)) {
      return 1;
    } else {
      return 0;
    }
  }

  const handleReturn = () => {
    const currGuesses = guesses.slice();
    currGuesses[currGuessNum] = currGuesses[currGuessNum].slice(0, -1);
    setGuesses(currGuesses);
  }

  const handleEnter = () => {
    if (currGuessNum < 6) {
      if (guesses[currGuessNum].length < 5) {
        notify('Not enough letters!');
      } else if (!isAWord(guesses[currGuessNum])) {
        notify('Not a word!');
      } else {
        const currSquareStatus = squareStatus.slice();
        let currGuessSquareStatus = currSquareStatus[currGuessNum].slice();
        currGuessSquareStatus = analyseGuess(guesses[currGuessNum], answer);
        currSquareStatus[currGuessNum] = currGuessSquareStatus;
        setSquareStatus(currSquareStatus);

        let currGuessedLetters = guessedLetters;
        [...guesses[currGuessNum]].forEach(letter => currGuessedLetters.add(letter));
        setGuessedLetters(currGuessedLetters);

        let currMisplacedLetters = misplacedLetters;
        [...guesses[currGuessNum]].forEach((letter, i) => {
          if (currGuessSquareStatus[i] === 1) {
            currMisplacedLetters.add(letter);
          }
        })
        setMisplacedLetters(currMisplacedLetters);

        let currCorrectLetters = correctLetters;
        [...guesses[currGuessNum]].forEach((letter, i) => {
          if (currGuessSquareStatus[i] === 2) {
            currCorrectLetters.add(letter);
          }
        })
        setCorrectLetters(currCorrectLetters);

        if (guesses[currGuessNum] === answer) {
          setBanner('You Won!')
        } else if (currGuessNum === 5) {
          setBanner('Word was ' + answer + ' 😞')
        } 

        setCurrGuessNum(currGuessNum + 1);
      };
    }
  }

  const handleInput = (key) => {
    if (isLetter(key)) {
      handleLetter(key);
    }
    if (key === 'BACKSPACE' || key === '↩') {
      handleReturn();
    }
    if (key === 'ENTER') {
      handleEnter();
    } 
  }

  const [guesses, setGuesses] = useState(['', '', '', '', '', '']);
  const [currGuessNum, setCurrGuessNum] = useState(0);
  const [squareStatus, setSquareStatus] = useState(
      [...Array(6)].map((x) => Array(5).fill(0)),
  );
  const [answer, setAnswer] = useState(getRandomWord().toUpperCase());
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [banner, setBanner] = useState(' ');
  const [misplacedLetters, setMisplacedLetters] = useState(new Set());
  const [correctLetters, setCorrectLetters] = useState(new Set());

  return (
    <div className="main-area" onKeyUp={handleKeyUp} tabIndex="-1">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2 className="banner">{banner}</h2>
      <GuessGrid words={guesses} status={squareStatus} />
      <Keyboard handleInput={handleInput} getKeyStatus={getKeyStatus}/>
    </div>
  );
};

const notify = (msg) => {
  toast(msg, {icon: "😱", theme: dark});
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
