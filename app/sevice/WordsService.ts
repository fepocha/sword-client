import { LocalStorage } from '~/utils/local-storage';
import { IFetchRandomWordResponse } from '~/api/fetch-random-word';

class WordsService {
  private RANDOM_WORD_KEY = '__current_word__';

  private SOLVED_WORDS_KEY = '__solved_words__';

  randomWordStorage = LocalStorage<IFetchRandomWordResponse>(this.RANDOM_WORD_KEY);

  solvedWordsStorage = LocalStorage<string[]>(this.SOLVED_WORDS_KEY);

  WORD_MAX_LENGTH = 5;

  getRandomWord() {
    return this.randomWordStorage.get();
  }

  setRandomWord(value: IFetchRandomWordResponse) {
    this.randomWordStorage.set(value);
  }

  clearRandomWord() {
    this.randomWordStorage.remove();
  }

  getSolvedWords() {
    return this.solvedWordsStorage.get() || [];
  }

  addSolvedWords(id: string) {
    const solvedWords = this.getSolvedWords() || [];
    solvedWords.push(id);
    this.solvedWordsStorage.set(solvedWords);
  }
}

export default new WordsService();
