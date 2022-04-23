import { LoaderFunction } from '@remix-run/server-runtime';
import React, { useState } from 'react';
import { useLoaderData } from 'remix';
import { useRandomWordQuery } from '~/api/fetchRandomWord';
import { Key, Keyboard } from '~/components/word/Keyboard';
import { WordBlock } from '~/components/word/WordBlock';
import { usePostAnswerMutation } from '~/api/postAnswer';
import { useUpdateAnswerMutation } from '~/api/updateAnswer';
import { cloneDeep } from 'lodash';

interface LoaderData {
  apiBaseUrl: string;
}

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    apiBaseUrl: process.env.API_BASE_URI || '',
  };

  return data;
};

const initialAnswers = new Array(6).fill('');

function Play() {
  const { apiBaseUrl } = useLoaderData<LoaderData>();
  const { data } = useRandomWordQuery(apiBaseUrl, { excludedWords: [] });
  const { mutateAsync: postAnswerMutate, data: postAnswerRes } = usePostAnswerMutation(apiBaseUrl);
  const { mutateAsync: updateAnswerMutate, data: updateAnswerRes } =
    useUpdateAnswerMutation(apiBaseUrl);

  console.log(postAnswerRes);
  const [answers, setAnswers] = useState(initialAnswers);
  const [current, setCurrent] = useState(0);

  const handleKeyClick = async ({ value, type }: Key) => {
    const answer = answers[current];

    if (type === 'enter' && answer.length === 5) {
      if (postAnswerRes?.id) {
        await updateAnswerMutate({ wordId: data?.id || '', answerId: postAnswerRes.id, answer });
      } else {
        await postAnswerMutate({ wordId: data?.id || '', answer });
      }

      setCurrent(current + 1);
      return;
    }

    if (type === 'character' && answer.length < 5) {
      const clone = cloneDeep(answers);
      clone[current] = answer + value;
      setAnswers(clone);
      return;
    }

    if (type === 'backspace') {
      const clone = cloneDeep(answers);
      clone[current] = answer.slice(0, -1);
      setAnswers(clone);
    }
  };

  return (
    <section className="main-section">
      <h2 className="main-title">Play Game! by {data?.createdBy}</h2>

      {answers.map((answer, i) => {
        if (i > current) {
          return null;
        }
        return (
          <div className="mb-10">
            <WordBlock
              key={i}
              characters={answer.split('')}
              boardStatus={
                updateAnswerRes?.answerMatrix?.[i] || postAnswerRes?.answerMatrix?.[i] || []
              }
            />
          </div>
        );
      })}

      {/* {helperText && <p className="mt-6 text-center text-orange-light text-sm">{helperText}</p>} */}
      <Keyboard onKeyClick={handleKeyClick} />
    </section>
  );
}

export default Play;
