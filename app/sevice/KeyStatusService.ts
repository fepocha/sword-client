import { LocalStorage } from '~/utils/local-storage';

export type KeyStatus = Record<string, number>;

class KeyStatusService {
  private KEY_STATUS_KEY = '__key_status__';

  keyStatusStorage = LocalStorage<KeyStatus>(this.KEY_STATUS_KEY);

  getKeyStatus() {
    return this.keyStatusStorage.get();
  }

  setKeyStatus(value: KeyStatus) {
    this.keyStatusStorage.set(value);
  }

  removeKeyStatus() {
    this.keyStatusStorage.remove();
  }
}

export default new KeyStatusService();
