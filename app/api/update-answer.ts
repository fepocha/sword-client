import axios from 'axios';
import { getApiBaseUrl } from './index';

export type AnswerType = '' | '0' | '1' | '2';

export interface IUpdateAnswerPayload {
  wordId: string;
  answerId: string;
  answer: string; // ex) "WORDY"
}

export interface IUpdateAnswerResponse {
  step: number; // 현재 단계 (min: 1, max: 6 / 0: default)
  maxStep: number; // 최대 단계
  wordId: string; // word id
  word: string; // word text
  id: string; // answer id
  isSolved: boolean; // 통과 여부
  answers: string[]; // 제출된 답변
  answerMatrix: AnswerType[][]; // 답변 매트릭스 ("0", "1", "2")만 입력 가능
  createdAt: Date; // 생성 일자
}

export const UPDATE_ANSWERS_API_PATH = (wordId: string, answerId: string) =>
  `${getApiBaseUrl()}/words/${wordId}/answers/${answerId}`;

export const updateAnswer = async ({ wordId, answerId, answer }: IUpdateAnswerPayload) => {
  const response = await axios.put<IUpdateAnswerResponse>(
    UPDATE_ANSWERS_API_PATH(wordId, answerId),
    { answer }
  );

  return response.data;
};
