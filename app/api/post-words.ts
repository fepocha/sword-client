import axios from 'axios';
import { API_BASE_URL } from './index';

interface PostWordsRequest {
  word: string; // 문제 단어
  createdBy: string; // 출제자 이름
  description?: string; // 출제자의 한마디
}

interface PostWordsResponse {
  word: string; // 문제 단어
  createdBy: string; // 출제자 이름
  description: string; // 출제자의 한마디
  createdAt: Date; // 생성일자
  id: string; // 아이디
}

export const POST_WORDS_API_PATH = `${API_BASE_URL}/words`;

export const postWords = async (data: PostWordsRequest) => {
  const response = await axios.post<PostWordsResponse>(POST_WORDS_API_PATH, data);

  return response.data;
};
