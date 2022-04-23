import { useMutation, UseMutationOptions } from 'react-query';
import { CharacterType } from '~/components/word/WordBlock';
import { api } from '.';

interface IUpdateAnswerRequest {
  wordId: string;
  answerId: string;
  answer: string;
}

interface IUpdateAnswerResponse {
  step: number; // 현재 단계 (min: 0, max: 5)
  word: string; // word id
  id: string; // answer id
  isSolved: boolean; // 통과 여부
  answer: string[][]; // 답변 매트릭스 ("0", "1", "2")만 입력 가능
  answerMatrix: CharacterType[][]; // 답변 매트릭스 ("0", "1", "2")만 입력 가능
  createdAt: Date; // 생성 일자
}

const FETCH_RANDOM_WORDS = (wordId: string, answerId: string) =>
  `/words/${wordId}/answers/${answerId}`;

export const postAnswer = (baseUrl: string, payload: IUpdateAnswerRequest) => {
  const { wordId, answerId, ...body } = payload;
  return api(baseUrl)
    .put<IUpdateAnswerResponse>(FETCH_RANDOM_WORDS(wordId, answerId), body)
    .then(res => res.data);
};

export const useUpdateAnswerMutation = <TError = unknown, TContext = unknown>(
  baseUrl: string,
  options?: UseMutationOptions<IUpdateAnswerResponse, TError, IUpdateAnswerRequest, TContext>
) =>
  useMutation<IUpdateAnswerResponse, TError, IUpdateAnswerRequest, TContext>(
    ['UpdateAnswer'],
    (payload: IUpdateAnswerRequest) => postAnswer(baseUrl, payload),
    options
  );
