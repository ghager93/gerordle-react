const Keyboard = ({ handleInput, guessedLetters }) => {
    const KEYS_FIRST_ROW = 'QWERTYUIOP'.split('');
    const KEYS_SECOND_ROW = 'ASDFGHJKL'.split('');
    const KEYS_THIRD_ROW = ['↩', ...'ZXCVBNM'.split(''), 'ENTER'];
  
    return (
      <div className="keyboard">
        <KeyboardRow keys={KEYS_FIRST_ROW} handleInput={handleInput} guessedLetters={guessedLetters}/>
        <KeyboardRow keys={KEYS_SECOND_ROW} handleInput={handleInput} guessedLetters={guessedLetters}/>
        <KeyboardRow keys={KEYS_THIRD_ROW} handleInput={handleInput} guessedLetters={guessedLetters}/>
      </div>
    );
  };
  
const KeyboardRow = ({ keys, handleInput, guessedLetters }) => {
  return (
    <div className="keyboard-row">
      {keys.map(k => (
        <KeyboardButton key={k} letter={k} handleInput={handleInput} isDimmed={guessedLetters.has(k)} />
      ))}
    </div>
  );
}

const KeyboardButton = ({ letter, handleInput, isDimmed }) => {
  let className = isDimmed ? "keyboard-button-dimmed" : "keyboard-button";

  return (
    <button className={className} onClick={() => handleInput(letter)}>{letter}</button>
  );
}

export default Keyboard;
  