import { useQuery, UseQueryOptions } from 'react-query';
import { api } from '~/api/index';

export interface IFetchRandomWordsQuery {
  excludedWords: string[]; // 랜덤추출에서 제외할 wordId 집합
}

export interface IFetchRandomWordsResponse {
  word: string; // 문제 단어
  createdBy: string; // 출제자 이름
  description: string; // 출제자의 한마디
  createdAt: Date; // 생성일자
  id: string; // 아이디
}

const FETCH_RANDOM_WORDS = '/words/random';

export const fetchRandomWord = (baseUrl: string, query: IFetchRandomWordsQuery) =>
  api(baseUrl)
    .get<IFetchRandomWordsResponse>(FETCH_RANDOM_WORDS, { params: query })
    .then(res => res.data);

export const useRandomWordQuery = <TData = IFetchRandomWordsResponse, TError = unknown>(
  baseUrl: string,
  query: IFetchRandomWordsQuery,
  options?: UseQueryOptions<IFetchRandomWordsResponse, TError, TData>
) =>
  useQuery<IFetchRandomWordsResponse, TError, TData>(
    [FETCH_RANDOM_WORDS, query],
    () => fetchRandomWord(baseUrl, query),
    options
  );
