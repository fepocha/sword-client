/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams  } from 'remix';
import { AnswerType } from '~/api';
import { fetchWordResults, FETCH_WORD_RESULTS_API_PATH } from '~/api/fetch-word-results';
import { FloatingContainer } from '~/components/FloadingContainer';
import Title from '~/components/Text/Title';
import TypewriterText from '~/components/Text/TypewriterText';

function AnswerMatrix({ answerMatrix }: {answerMatrix: AnswerType[][]}) {
  return (
    <div className="grid grid-rows-1 gap-[2px] w-[110px]">
      {answerMatrix.map((row, rowIdx) => (
        <div key={`answer-matrix-row-${rowIdx}`} className="grid grid-flow-col gap-[2px]">
          {row.map((col, colIdx) => (
            <div
              key={`answer-matrix-col-${colIdx}`}
              className={classNames(
              'w-full h-[20px]',
              {
                'bg-gray-light': col === '0',
                'bg-orange-dark': col === '1',
                'bg-blue-mid': col === '2',
              }
              )} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Result() {
  const [searchParams] = useSearchParams();
  const wordId = searchParams.get('wordId');
  const navigate = useNavigate();

  // TODO: Global Error handling
  if (wordId === null) throw new Error('wordId is not exist');

  const { data } = useQuery(FETCH_WORD_RESULTS_API_PATH(wordId), () => fetchWordResults(wordId));

  if (data) {
    const { word, statistics, solvedAnswers } = data;

    return (
      <section className="main-section">
        <Title>
          Answer is
          <TypewriterText type="span" className="flex ml-2 text-blue-mid">{word.word}</TypewriterText>
        </Title>

        <dl className="mb-8">
          <dt>Created By.</dt>
          <dd>{word.createdBy}</dd>

          <dt>Description.</dt>
          <dd>{word.description}</dd>
        </dl>

        <dl className="mb-10">
          <dt>Total Played.</dt>
          <dd>{statistics.answersCount}</dd>

          <dt>Total Played.</dt>
          <dd>{statistics.answersCount}</dd>

          <dt>Winner.</dt>
          <dd>{statistics.win}</dd>

          <dt>Loser.</dt>
          <dd>{statistics.lose}</dd>

          <dt>Winning Rate.</dt>
          <dd>{statistics.winningRate}%</dd>
        </dl>

        <Title type="h2">Answers</Title>
        <ul className="flex flex-wrap flex-row gap-9">
          {solvedAnswers.map(answer => (
            <li key={answer.id}>
              <AnswerMatrix answerMatrix={answer.answerMatrix}/>
            </li>
          ))}
        </ul>

        <FloatingContainer>
          <button
            type="button"
            role="link"
            className="button-lg"
            onClick={() => {
              navigate('/play');
            }}
          >
            Play Again
          </button>
        </FloatingContainer>
      </section>
    );
  }
  // TODO: 로더 만들기
  return <div>loading</div>;
}

export default Result;
