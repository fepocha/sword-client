import { LocalStorage } from '~/utils/local-storage';
import { IUpdateAnswerResponse } from '~/api/update-answer';

class AnswerService {
  private CURRENT_ANSWER_KEY = '__current_answer__';

  answerStorage = LocalStorage<IUpdateAnswerResponse>(this.CURRENT_ANSWER_KEY);

  getCurrentAnswer() {
    return this.answerStorage.get();
  }

  setCurrentAnswer(value: IUpdateAnswerResponse) {
    this.answerStorage.set(value);
  }
}

export default new AnswerService();
