import { isWindowDefined } from '~/utils/window';
import KeyStatusService, { KeyStatus } from '~/sevice/KeyStatusService';
import { useState } from 'react';
import { AnswerType } from '~/api';

export const useKeyStatus = () => {
  const [keyStatus, setKeyStatus] = useState<KeyStatus>(() => {
    if (!isWindowDefined()) return {};

    const storedKeyStatus = KeyStatusService.getKeyStatus();
    if (storedKeyStatus) return storedKeyStatus;

    return {};
  });

  const updateKeyStatus = ({ currentMatrix, currentAnswer }: { currentMatrix: AnswerType[]; currentAnswer: string; }) => {
    const keyStatusCopy = { ...keyStatus };
    const currentChars = currentAnswer.split('');

    currentMatrix.forEach((_keyStatus, idx) => {
      const memoizedStatus = keyStatusCopy[currentChars[idx]] || -1;
      keyStatusCopy[currentChars[idx]] = Math.max(memoizedStatus, Number(_keyStatus));
    });

    KeyStatusService.setKeyStatus(keyStatusCopy);
    setKeyStatus(keyStatusCopy);
  };

  return {
    keyStatus,
    updateKeyStatus,
  };
};
