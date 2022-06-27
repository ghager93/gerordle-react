const GuessSquare = ({letter, status}) => {
  const backgroundColours = ['dark-grey', 'yellow', 'green'];

  return (
    <div
      className="guess-square"
      style={{backgroundColor: backgroundColours[status]}}
    >
      <p>{letter.toUpperCase()}</p>
    </div>
  );
};

const GuessRow = ({word, status}) => (
  <div className="guess-row">
    {convertWordtoGuessArray(word).map((letter, i) => (
      <GuessSquare key={i} letter={letter} status={status[i]} />
    ))}
  </div>
);

const convertWordtoGuessArray = (word) => {
  const guessArray = ['', '', '', '', ''];

  word
      .slice(0, 5)
      .split('')
      .map((letter, index) => (guessArray[index] = letter));

  return guessArray;
};

const GuessGrid = ({words, status}) => {
  return (
    <div className="guess-grid">
      {words.slice(0, 6).map((word, i) => (
        <GuessRow key={i} word={word} status={status[i]} />
      ))}
    </div>
  )
}

export default GuessGrid;