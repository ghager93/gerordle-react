import {useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import GuessGrid from './components/GuessGrid';
import Keyboard from './components/Keyboard';

import {analyseGuess} from './utils/utils';

// const analyseGuess = (guess, answer) => {
//   const guessArr = guess.split('');
//   const answerArr = answer.split('');
//   const analysisArr = [0, 0, 0, 0, 0];

//   for (let i = 0; i < guessArr.length; i++) {
//     if (guessArr[i] === answerArr[i]) {
//       analysisArr[i] = 2;
//       guessArr[i] = '#';
//       answerArr[i] = '#';
//     }
//   }

//   for (let i = 0; i < guessArr.length; i++) {
//     if (guessArr[i] !== '#') {
//       for (let j = 0; j < guessArr.length; j++) {
//         if (guessArr[i] === answerArr[j]) {
//           analysisArr[i] = 1;
//           answerArr[j] = '#';
//         }
//       }
//     }
//   }

//   return analysisArr;
// };

// const GuessSquare = ({letter, status}) => {
//   const backgroundColours = ['dark-grey', 'yellow', 'green'];

//   return (
//     <div
//       className="guess-square"
//       style={{backgroundColor: backgroundColours[status]}}
//     >
//       <p>{letter.toUpperCase()}</p>
//     </div>
//   );
// };

// const GuessRow = ({word, status}) => (
//   <div className="guess-row">
//     {convertWordtoGuessArray(word).map((letter, i) => (
//       <GuessSquare letter={letter} status={status[i]} />
//     ))}
//   </div>
// );

// const convertWordtoGuessArray = (word) => {
//   const guessArray = ['', '', '', '', ''];

//   word
//       .slice(0, 5)
//       .split('')
//       .map((letter, index) => (guessArray[index] = letter));

//   return guessArray;
// };

// const GuessGrid = ({words, status}) => (
//   <div className="guess-grid">
//     {words.slice(0, 6).map((word, i) => (
//       <GuessRow word={word} status={status[i]} />
//     ))}
//   </div>
// );

// const Keyboard = () => {
//   const KEYS_FIRST_ROW = 'QWERTYUIOP'.split('');
//   const KEYS_SECOND_ROW = 'ASDFGHJKL'.split('');
//   const KEYS_THIRD_ROW = ['↩', ...'ZXCVBNM'.split(''), 'ENTER'];

//   return (
//     <div className="keyboard">
//       <KeyboardRow keys={KEYS_FIRST_ROW} />
//       <KeyboardRow keys={KEYS_SECOND_ROW} />
//       <KeyboardRow keys={KEYS_THIRD_ROW} />
//     </div>
//   );
// };

// const KeyboardRow = ({ keys }) => {
//   return (
//     <div className="keyboard-row">
//       {keys.map((key) => (
//         <button className="keyboard-button">{key}</button>
//       ))}
//     </div>
//   );
// }

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
