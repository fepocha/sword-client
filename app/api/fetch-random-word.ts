import axios from 'axios';
import { getApiBaseUrl } from './index';

export interface IFetchRandomQueryRequest {
  excludedWords: string[]; // 이미 푼 단어
}

export interface IFetchRandomWordResponse {
  word: string; // 문제 단어
  createdBy: string; // 출제자 이름
  description: string; // 출제자의 한마디
  createdAt: Date; // 생성일자
  id: string; // 아이디
  answerId: string; // answer id
}

export const FETCH_RANDOM_WORDS_API_PATH = `${getApiBaseUrl()}/words/random`;

export const fetchRandomWord = async (query: IFetchRandomQueryRequest) => {
  const response = await axios.get<IFetchRandomWordResponse>(FETCH_RANDOM_WORDS_API_PATH, {
    params: query,
  });

  return response.data;
};
