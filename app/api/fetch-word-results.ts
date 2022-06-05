import axios from 'axios';
import { Answer, getApiBaseUrl, Word } from './index';

export interface Statistics {
  answersCount: number;
  win: number;
  lose: number;
  winningRate: number;
}
export interface IFetchWordResultsResponse {
  word: Word;
  solvedAnswers: Answer[];
  statistics: Statistics;
}

export const FETCH_WORD_RESULTS_API_PATH = (wordId: string) => `${getApiBaseUrl()}/words/${wordId}/results`;

export const fetchWordResults = async (wordId: string) => {
  const response = await axios.get<IFetchWordResultsResponse>(FETCH_WORD_RESULTS_API_PATH(wordId));

  return response.data;
};
