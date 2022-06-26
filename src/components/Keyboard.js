const Keyboard = ({ handleInput }) => {
    const KEYS_FIRST_ROW = 'QWERTYUIOP'.split('');
    const KEYS_SECOND_ROW = 'ASDFGHJKL'.split('');
    const KEYS_THIRD_ROW = ['↩', ...'ZXCVBNM'.split(''), 'ENTER'];
  
    return (
      <div className="keyboard">
        <KeyboardRow keys={KEYS_FIRST_ROW} handleInput={handleInput} />
        <KeyboardRow keys={KEYS_SECOND_ROW} handleInput={handleInput} />
        <KeyboardRow keys={KEYS_THIRD_ROW} handleInput={handleInput} />
      </div>
    );
  };
  
const KeyboardRow = ({ keys, handleInput }) => {
  return (
    <div className="keyboard-row">
      {keys.map((key) => (
        <button className="keyboard-button" onClick={() => handleInput(key)}>{key}</button>
      ))}
    </div>
  );
}

export default Keyboard;
  