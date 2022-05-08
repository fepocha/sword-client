import React, { useEffect, useState } from 'react';
import WordsService from '~/sevice/WordsService';
import { useQuery } from 'react-query';
import {
  FETCH_RANDOM_WORDS_API_PATH,
  fetchRandomWord,
  IFetchRandomWordResponse,
} from '~/api/fetch-random-word';

function Play() {
  const [enabled, setEnabled] = useState(false);
  const [word, setWord] = useState<IFetchRandomWordResponse | null>(null);
  const [solvedWords, setSolvedWords] = useState<string[]>([]);
  const { data } = useQuery<IFetchRandomWordResponse>(
    FETCH_RANDOM_WORDS_API_PATH,
    () => fetchRandomWord({ excludedWords: solvedWords }),
    { enabled }
  );

  const currentWord = word || data;

  useEffect(() => {
    if (data) {
      WordsService.setRandomWord(data);
    }
  }, [data]);

  useEffect(() => {
    const recentWord = WordsService.getRandomWord();

    if (recentWord) {
      setWord(recentWord);
    } else {
      setEnabled(true);
    }
    setSolvedWords(WordsService.getSolvedWords());
  }, []);

  return (
    <section className="main-section">
      <h2 className="main-title">Play Game! by {currentWord?.createdBy}</h2>

      <div className="mb-10">{currentWord?.id}</div>
      <div className="mb-10">{currentWord?.word}</div>
    </section>
  );
}

export default Play;
