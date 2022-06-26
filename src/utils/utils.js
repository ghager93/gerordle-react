export const analyseGuess = (guess, answer) => {
    const guessArr = guess.split('');
    const answerArr = answer.split('');
    const analysisArr = [0, 0, 0, 0, 0];
  
    for (let i = 0; i < guessArr.length; i++) {
      if (guessArr[i] === answerArr[i]) {
        analysisArr[i] = 2;
        guessArr[i] = '#';
        answerArr[i] = '#';
      }
    }
  
    for (let i = 0; i < guessArr.length; i++) {
      if (guessArr[i] !== '#') {
        for (let j = 0; j < guessArr.length; j++) {
          if (guessArr[i] === answerArr[j]) {
            analysisArr[i] = 1;
            answerArr[j] = '#';
          }
        }
      }
    }
  
    return analysisArr;
};