import { isWindowDefined } from '~/utils/window';

export interface Word {
  word: string; // 문제 단어
  createdBy: string; // 출제자 이름
  description: string; // 출제자의 한마디
  createdAt: Date; // 생성일자
  id: string; // 아이디
  answerId: string; // answer id
}

export type AnswerType = '' | '0' | '1' | '2';

export interface Answer {
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

export const getApiBaseUrl = () => isWindowDefined() ? window.ENV.API_BASE_URL : '';

