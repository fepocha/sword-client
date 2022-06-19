import classNames from 'classnames';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { postWords, POST_WORDS_API_PATH } from '~/api/post-words';
import type { Key } from '~/components/word/Keyboard';
import { Keyboard } from '~/components/word/Keyboard';
import { WordBlock } from '~/components/word/WordBlock';
import { useDialogContext } from '~/context/dialog';
import { useUserInfoForm } from '~/hooks/use-user-info-form';
import { useWordForm } from '~/hooks/use-word-form';
import { getMaxLimitHelperText } from '~/utils/helper-text';
import wordsService from '~/sevice/WordsService';
import Title from '~/components/Text/Title';
import { ErrorResponse } from '~/api';

function WordForm({ nickname, description }: { nickname: string; description?: string }) {
  const {
    word,
    helperText,
    typeCharacter,
    deleteCharacter,
    clearWord,
    showHelperText,
    clearHelperText,
  } = useWordForm();

  const { openDialog } = useDialogContext();
  const { mutate: mutateWords } = useMutation(POST_WORDS_API_PATH, postWords, {
    onSuccess: response => {
      openDialog({
        title: 'Thank you!',
        description: `${response.word} is successfully added`,
        onClick: () => clearWord(),
      });
    },
    onError: (error: ErrorResponse) => {
      if (error.response?.status === 400) {
        openDialog({
          title: 'Error',
          description: error?.response?.data.message,
          onClick: () => clearWord(),
        });
      } else {
        openDialog({
          onClick: () => clearWord(),
        });
      }
    },
  });

  const handleKeyClick = ({ type, value }: Key) => {
    clearHelperText();
    if (type === 'character') {
      typeCharacter(value);
      return;
    }
    if (type === 'backspace') {
      deleteCharacter();
      return;
    }
    if (word.length < wordsService.WORD_MAX_LENGTH) {
      showHelperText(getMaxLimitHelperText('word', wordsService.WORD_MAX_LENGTH));
      return;
    }

    mutateWords({
      word,
      createdBy: nickname,
      description,
    });
  };

  return (
    <>
      <WordBlock characters={word.split('')} />
      {helperText && <div className="helper-text mt-6 text-center">{helperText}</div>}
      <Keyboard onKeyClick={handleKeyClick} />
    </>
  );
}

export default function NewWordFormPage() {
  const [currentActivePage, setCurrentActivePage] = useState<'userInfoForm' | 'wordForm'>(
    'userInfoForm'
  );

  const { nickname, description, handleInputChange, isFormFieldValid } = useUserInfoForm();

  const handleNextButtonClick = () => {
    if (!isFormFieldValid) return;

    setCurrentActivePage('wordForm');
  };

  return (
    <section className="main-section">
      <Title>Add a new word.</Title>
      {currentActivePage === 'wordForm' && (
        <WordForm nickname={nickname.value} description={description.value} />
      )}
      {currentActivePage === 'userInfoForm' && (
        <form className="grid gap-6">
          <div>
            <label htmlFor="nickname">
              <span className="input-label">Your Nickname</span>
              <input
                id="nickname"
                name="nickname"
                value={nickname.value}
                onChange={handleInputChange}
              />
            </label>
            {nickname.helperText && <div className="helper-text">{nickname.helperText}</div>}
          </div>
          <div>
            <label htmlFor="description">
              <span className="input-label">Single line comment (optional)</span>
              <textarea
                id="description"
                name="description"
                value={description.value}
                onChange={handleInputChange}
              />
            </label>
            {description.helperText && <div className="helper-text">{description.helperText}</div>}
          </div>
          <button
            type="button"
            onClick={handleNextButtonClick}
            className={classNames('button-lg mt-4', { 'bg-gray-light': !isFormFieldValid })}
            aria-disabled={!isFormFieldValid}
          >
            Next
          </button>
        </form>
      )}
    </section>
  );
}
