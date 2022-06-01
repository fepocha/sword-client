import axios from 'axios';
import { getApiBaseUrl, Word } from './index';

export interface IFetchRandomQueryRequest {
  excludedWords: string[]; // 이미 푼 단어
}

export type IFetchRandomWordResponse = Word;

export const FETCH_RANDOM_WORDS_API_PATH = `${getApiBaseUrl()}/words/random`;

export const fetchRandomWord = async (query: IFetchRandomQueryRequest) => {
  const response = await axios.get<IFetchRandomWordResponse>(FETCH_RANDOM_WORDS_API_PATH, {
    params: query,
  });

  return response.data;
};
