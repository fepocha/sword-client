import { useMutation, UseMutationOptions } from 'react-query';
import { CharacterType } from '~/components/word/WordBlock';
import { api } from '.';

interface IPostAnswerRequest {
  wordId: string;
  answer: string;
}

interface IPostAnswerResponse {
  step: number; // 현재 단계 (min: 0, max: 5)
  word: string; // word id
  id: string; // answer id
  isSolved: boolean; // 통과 여부
  answer: string[][]; // 답변 매트릭스 ("0", "1", "2")만 입력 가능
  answerMatrix: CharacterType[][]; // 답변 매트릭스 ("0", "1", "2")만 입력 가능
  createdAt: Date; // 생성 일자
}

const FETCH_RANDOM_WORDS = (wordId: string) => `/words/${wordId}/answers`;

export const postAnswer = (baseUrl: string, payload: IPostAnswerRequest) => {
  const { wordId, ...body } = payload;
  return api(baseUrl)
    .post<IPostAnswerResponse>(FETCH_RANDOM_WORDS(wordId), body)
    .then(res => res.data);
};

export const usePostAnswerMutation = <TError = unknown, TContext = unknown>(
  baseUrl: string,
  options?: UseMutationOptions<IPostAnswerResponse, TError, IPostAnswerRequest, TContext>
) =>
  useMutation<IPostAnswerResponse, TError, IPostAnswerRequest, TContext>(
    ['PostAnswer'],
    (payload: IPostAnswerRequest) => postAnswer(baseUrl, payload),
    options
  );
