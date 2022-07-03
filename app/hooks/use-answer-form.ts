import { useEffect, useState } from 'react';
import { AnswerType } from '~/api';
import { useWordForm } from '~/hooks/use-word-form';
import answerService from '~/sevice/AnswerService';
import wordsService from '~/sevice/WordsService';

export const useAnswerForm = () => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [answerMatrix, setAnswerMatrix] = useState<AnswerType[][]>([]);
  const { word, helperText, typeCharacter, deleteCharacter, clearWord } = useWordForm();

  const updateAnswerMatrix = (matrix: AnswerType[][]) => {
    setAnswerMatrix(matrix);
  };

  const moveNextAnswer = () => {
    setAnswers([...answers, '']);
  };

  useEffect(() => {
    setAnswers(_answers => {
      const answersWithoutCurrent = _answers.slice(0, -1);

      return [...answersWithoutCurrent, word];
    });
  }, [word]);

  useEffect(() => {
    const currentAnswer = answerService.getCurrentAnswer();

    if (currentAnswer) {
      setAnswerMatrix(currentAnswer.answerMatrix);

      if (
        currentAnswer?.isSolved &&
        currentAnswer.answers.length === wordsService.WORD_MAX_LENGTH
      ) {
        setAnswers(currentAnswer.answers);
      } else {
        setAnswers([...currentAnswer.answers, '']);
      }
    }
  }, []);

  return {
    answers,
    answerMatrix,
    currentWord: word,
    moveNextAnswer,
    updateAnswerMatrix,
    helperText,
    typeCharacter,
    deleteCharacter,
    clearWord,
  };
};
