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
import { useNavigate } from 'remix';

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
      onSuccess: (answer) => {
        // TODO: 문제 푼 경우와 못 푼 경우 UX 구분
        if (answer.isSolved || answer.step === answer.maxStep) {
          navigate(`/word/result?wordId=${answer.wordId}`);
          WordsService.addSolvedWords(answer.wordId);
          answerService.removeCurrentAnswer();
          return;
        }

        answerService.setCurrentAnswer(answer);
        updateAnswerMatrix(answer.answerMatrix);
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
        <div className="mb-5" key={i}>
          <WordBlock characters={answer.split('')} boardStatus={answerMatrix[i]} />
        </div>
      ))}

      <Keyboard onKeyClick={handleKeyClick} />
    </section>
  );
}

export default Play;
