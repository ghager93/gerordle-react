const Keyboard = ({ handleInput, getKeyStatus }) => {
    const KEYS_FIRST_ROW = 'QWERTYUIOP'.split('');
    const KEYS_SECOND_ROW = 'ASDFGHJKL'.split('');
    const KEYS_THIRD_ROW = ['↩', ...'ZXCVBNM'.split(''), 'ENTER'];
  
    return (
      <div className="keyboard">
        <KeyboardRow keys={KEYS_FIRST_ROW} handleInput={handleInput} getKeyStatus={getKeyStatus}/>
        <KeyboardRow keys={KEYS_SECOND_ROW} handleInput={handleInput} getKeyStatus={getKeyStatus}/>
        <KeyboardRow keys={KEYS_THIRD_ROW} handleInput={handleInput} getKeyStatus={getKeyStatus}/>
      </div>
    );
  };
  
const KeyboardRow = ({ keys, handleInput, getKeyStatus }) => {
  return (
    <div className="keyboard-row">
      {keys.map(k => (
        <KeyboardButton key={k} letter={k} handleInput={handleInput} keyStatus={getKeyStatus(k)}/>
      ))}
    </div>
  );
}

const KeyboardButton = ({ letter, handleInput, isDimmed, keyStatus }) => {
  let className;
  switch (keyStatus) {
    case 3:
      className = "keyboard-button-correct";
      break;
    case 2:
      className = "keyboard-button-misplaced";
      break;
    case 1:
      className = "keyboard-button-incorrect";
      break;
    default:
      className = "keyboard-button"
      break;
  }

  return (
    <button className={className} onClick={() => handleInput(letter)}>{letter}</button>
  );
}

export default Keyboard;
  