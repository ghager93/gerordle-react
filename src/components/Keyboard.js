const Keyboard = () => {
    const KEYS_FIRST_ROW = 'QWERTYUIOP'.split('');
    const KEYS_SECOND_ROW = 'ASDFGHJKL'.split('');
    const KEYS_THIRD_ROW = ['↩', ...'ZXCVBNM'.split(''), 'ENTER'];
  
    return (
      <div className="keyboard">
        <KeyboardRow keys={KEYS_FIRST_ROW} />
        <KeyboardRow keys={KEYS_SECOND_ROW} />
        <KeyboardRow keys={KEYS_THIRD_ROW} />
      </div>
    );
  };
  
const KeyboardRow = ({ keys }) => {
  return (
    <div className="keyboard-row">
      {keys.map((key) => (
        <button className="keyboard-button">{key}</button>
      ))}
    </div>
  );
}

export default Keyboard;
  