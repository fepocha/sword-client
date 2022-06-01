import { useQuery } from 'react-query';
import { useSearchParams  } from 'remix';
import { AnswerType } from '~/api';
import { fetchWordResults, FETCH_WORD_RESULTS_API_PATH } from '~/api/fetch-word-results';

function AnswerMatrix({ answerMatrix }: {answerMatrix: AnswerType[][]}) {
  console.log('🚀 ~ file: result.tsx ~ line 7 ~ AnswerMatrix ~ answerMatrix', answerMatrix);
  return <>div</>;
}

function Result() {
  const [searchParams] = useSearchParams();
  const wordId = searchParams.get('wordId');

  if (wordId === null) throw new Error('wordId is not exist');

  const { data } = useQuery(FETCH_WORD_RESULTS_API_PATH(wordId), () => fetchWordResults(wordId));

  if (data) {
    const { word, statistics, solvedAnswers } = data;

    return (
      <section className="main-section">
        <h2 className="main-title">
          Answer is
          <span className="ml-2 text-blue-mid tracking-widest">{word.word}</span>
        </h2>

        <dl>
          <dt className="mb-1 text-gray-mid text-sm">Created By.</dt>
          <dd className="mb-6 pl-4">{word.createdBy}</dd>

          <dt className="mb-1 text-gray-mid text-sm">Description.</dt>
          <dd className="pl-4">{word.description}</dd>
        </dl>

        <div>
          <div>Total Played : {statistics.answersCount}</div>
          <div>Winner : {statistics.win}</div>
          <div>Loser : {statistics.lose}</div>
          <div>Winning Rate : {statistics.winningRate}%</div>
        </div>

        <ul>
          {solvedAnswers.map(answer => (
            <li key={answer.id}>
              <AnswerMatrix answerMatrix={answer.answerMatrix}/>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  // TODO: 로더 만들기
  return <div>loading</div>;
}

export default Result;
