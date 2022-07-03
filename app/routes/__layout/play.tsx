import WordsService from '~/sevice/WordsService';
import { useMutation, useQuery } from 'react-query';
import {
  FETCH_RANDOM_WORDS_API_PATH,
  fetchRandomWord,
  IFetchRandomWordResponse,
} from '~/api/fetch-random-word';
import { WordBlock } from '~/components/word/WordBlock';
import { Key, Keyboard } from '~/components/word/Keyboard';
import { UPDATE_ANSWERS_API_PATH, updateAnswer } from '~/api/update-answer';
import { useAnswerForm } from '~/hooks/use-answer-form';
import answerService from '~/sevice/AnswerService';
import Title from '~/components/Text/Title';
import { useToastContext } from '~/context/toast';
import { AnswerType, ErrorResponse } from '~/api';
import { useNavigate } from 'remix';
import KeyStatusService, { KeyStatus } from '~/sevice/KeyStatusService';
import { useState } from 'react';
import { isWindowDefined } from '~/utils/window';

function Play() {
  const {
    answers,
    moveNextAnswer,
    answerMatrix,
    updateAnswerMatrix,
    deleteCharacter,
    typeCharacter,
    clearWord,
  } = useAnswerForm();

  const [keyStatus, setKeyStatus] = useState<KeyStatus>(() => {
    if (!isWindowDefined()) return {};

    const storedKeyStatus = KeyStatusService.getKeyStatus();
    if (storedKeyStatus) return storedKeyStatus;

    return {};
  });

  const updateKeyStatus = ({ currentMatrix, currentAnswer }: { currentMatrix: AnswerType[]; currentAnswer: string; }) => {
    const keyStatusCopy = { ...keyStatus };
    const currentChars = currentAnswer.split('');

    currentMatrix.forEach((_keyStatus, idx) => {
      const memoizedStatus = keyStatusCopy[currentChars[idx]] || -1;
      keyStatusCopy[currentChars[idx]] = Math.max(memoizedStatus, Number(_keyStatus));
    });

    KeyStatusService.setKeyStatus(keyStatusCopy);
    setKeyStatus(keyStatusCopy);
  };

  const { openToast } = useToastContext();
  const navigate = useNavigate();

  const { data } = useQuery<IFetchRandomWordResponse>(FETCH_RANDOM_WORDS_API_PATH, async () => {
    const recentWord = WordsService.getRandomWord();
    if (recentWord) {
      return recentWord;
    }
    const res = await fetchRandomWord({ excludedWords: WordsService.getSolvedWords() });

    WordsService.setRandomWord(res);

    return res;
  });

  const { mutate: mutateAnswer } = useMutation(
    UPDATE_ANSWERS_API_PATH(data?.id || '', data?.answerId || ''),
    updateAnswer,
    {
      onSuccess: (result) => {
        if (result.isSolved || result.step === result.maxStep) {
          updateAnswerMatrix(result.answerMatrix);
          updateKeyStatus({
            currentMatrix: result.answerMatrix.at(-1) as AnswerType[],
            currentAnswer: result.answers.at(-1) as string,
          });
          WordsService.addSolvedWords(result.wordId);
          answerService.removeCurrentAnswer();
          KeyStatusService.removeKeyStatus();

          if (result.isSolved) {
            openToast({ text: 'Great!' });
          } else {
            openToast({ text: 'Game over!' });
          }

          setTimeout(() => {
            navigate(`/word/result?wordId=${result.wordId}`);
          }, 2000);
          return;
        }

        answerService.setCurrentAnswer(result);
        updateAnswerMatrix(result.answerMatrix);
        updateKeyStatus({
          currentMatrix: result.answerMatrix.at(-1) as AnswerType[],
          currentAnswer: result.answers.at(-1) as string,
        });
        clearWord();
        moveNextAnswer();
      },
      onError: (error: ErrorResponse) => {
        openToast({
          text: error.response?.data.message,
        });
      },
    }
  );

  const handleKeyClick = async ({ type, value }: Key) => {
    if (type === 'character') {
      typeCharacter(value);
      return;
    }
    if (type === 'backspace') {
      deleteCharacter();
      return;
    }
    if (type === 'enter' && data) {
      mutateAnswer({
        wordId: data.id,
        answerId: data.answerId,
        answer: answers.slice(-1)[0],
      });
    }
  };

  return (
    <section className="main-section">
      <Title>Play Game! by {data?.createdBy}</Title>

      {answers.map((answer, i) => (
        <div className="pb-10" key={i}>
          <WordBlock characters={answer.split('')} boardStatus={answerMatrix[i]} />
        </div>
      ))}

      <Keyboard keyStatus={keyStatus} onKeyClick={handleKeyClick} />
    </section>
  );
}

export default Play;
