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
import AnswerService from '~/sevice/AnswerService';
import { useDialogContext } from '~/context/dialog';

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

  const { data, refetch } = useQuery<IFetchRandomWordResponse>(
    FETCH_RANDOM_WORDS_API_PATH,
    async () => {
      const recentWord = WordsService.getRandomWord();
      if (recentWord) {
        return recentWord;
      }
      const res = await fetchRandomWord({ excludedWords: WordsService.getSolvedWords() });

      WordsService.setRandomWord(res);

      return res;
    }
  );

  const { mutateAsync } = useMutation(
    UPDATE_ANSWERS_API_PATH(data?.id || '', data?.answerId || ''),
    updateAnswer
  );

  const { openDialog } = useDialogContext();

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

        updateAnswerMatrix(answerRes.answerMatrix);

        if (answerRes.isSolved) {
          openDialog({
            title: "That's right.",
            description: "Let's move on to the next word",
            onClick: () => {
              WordsService.addSolvedWords(answerRes.wordId);
              WordsService.clearRandomWord();
              AnswerService.clearCurrentAnswer();
              updateAnswerMatrix([]);
              clearWord();
              refetch();
            },
            buttonText: 'Next =>',
          });

          return;
        }

        AnswerService.setCurrentAnswer(answerRes);
        updateAnswerMatrix(answerRes.answerMatrix);
        clearWord();
        moveNextAnswer();
      }
    } catch (e: any) {
      openDialog({
        title: 'Warning!',
        description: e?.response?.data?.message || 'Something is wrong.',
        buttonText: 'Close',
      });
    }
  };

  return (
    <section className="main-section">
      <h2 className="main-title">Play Game! by {data?.createdBy}</h2>

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
