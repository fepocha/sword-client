import axios from 'axios';
import { getApiBaseUrl, Answer } from './index';


export interface IUpdateAnswerPayload {
  wordId: string;
  answerId: string;
  answer: string; // ex) "WORDY"
}

export type IUpdateAnswerResponse = Answer;

export const UPDATE_ANSWERS_API_PATH = (wordId: string, answerId: string) =>
  `${getApiBaseUrl()}/words/${wordId}/answers/${answerId}`;

export const updateAnswer = async ({ wordId, answerId, answer }: IUpdateAnswerPayload) => {
  const response = await axios.put<IUpdateAnswerResponse>(
    UPDATE_ANSWERS_API_PATH(wordId, answerId),
    { answer }
  );

  return response.data;
};
