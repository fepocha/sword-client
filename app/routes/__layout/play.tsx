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
import { ErrorResponse } from '~/api';

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
  const { openToast } = useToastContext();

  const { data } = useQuery<IFetchRandomWordResponse>(FETCH_RANDOM_WORDS_API_PATH, async () => {
    const recentWord = WordsService.getRandomWord();
    if (recentWord) {
      return recentWord;
    }
    const res = await fetchRandomWord({ excludedWords: WordsService.getSolvedWords() });

    WordsService.setRandomWord(res);

    return res;
  });

  const { mutateAsync } = useMutation(
    UPDATE_ANSWERS_API_PATH(data?.id || '', data?.answerId || ''),
    updateAnswer
  );

  const handleKeyClick = async ({ type, value }: Key) => {
    try {
      if (type === 'character') {
        typeCharacter(value);
        return;
      }
      if (type === 'backspace') {
        deleteCharacter();
        return;
      }
      if (type === 'enter' && data) {
        const answerRes = await mutateAsync({
          wordId: data.id,
          answerId: data.answerId,
          answer: answers.slice(-1)[0],
        });

        answerService.setCurrentAnswer(answerRes);
        updateAnswerMatrix(answerRes.answerMatrix);
        clearWord();
        moveNextAnswer();
      }
    } catch (error) {
      openToast({
        text: (error as ErrorResponse).response?.data.message,
      });
    }
  };

  return (
    <section className="main-section">
      <Title>Play Game! by {data?.createdBy}</Title>

      {answers.map((answer, i) => (
        <div className="mb-5" key={i}>
          <WordBlock characters={answer.split('')} boardStatus={answerMatrix[i]} />
        </div>
      ))}

      <Keyboard onKeyClick={handleKeyClick} />
    </section>
  );
}

export default Play;
