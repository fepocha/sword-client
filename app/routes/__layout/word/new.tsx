import { useMutation } from 'react-query';
import { postWords, POST_WORDS_API_PATH } from '~/api/post-words';
import type { Key } from '~/components/word/Keyboard';
import { Keyboard } from '~/components/word/Keyboard';
import { WordBlock } from '~/components/word/WordBlock';
import { useUserInfoForm } from '~/hooks/use-user-info-form';
import { useWordForm } from '~/hooks/use-word-form';
import { getMaxLimitHelperText } from '~/utils/helper-text';

const WORD_MAX_LENGTH = 5;

const usePostWordsMutation = () => useMutation(POST_WORDS_API_PATH, postWords);

export default function NewWordFormPage() {
  const {
    word,
    helperText,
    typeCharacter,
    deleteCharacter,
    showHelperText,
    clearHelperText,
  } = useWordForm();

  const {
    nickname,
    description,
    handleInputChange
  } = useUserInfoForm();

  const { mutate: mutateWords } = usePostWordsMutation();

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
    if (word.length < WORD_MAX_LENGTH) {
      showHelperText(getMaxLimitHelperText('word', WORD_MAX_LENGTH));
      return;
    }

    mutateWords({
      word,
      // TODO: 로그인 기능 넣고 createdBy, description 추가
      createdBy: '',
      description: '',
    });
  };

  return (
    <section className="main-section">
      <h2 className="main-title">Add a new word.</h2>
      <input
        name="nickname"
        value={nickname.value}
        onChange={handleInputChange}
        className="bg-transparent border-[1px]"
      />
      <textarea
        name="description"
        value={description.value}
        onChange={handleInputChange}
        className="bg-transparent border-[1px]"
      />
      <WordBlock characters={word.split('')} />
      {helperText && (
        <p className="mt-6 text-center text-orange-light text-sm">{helperText}</p>
      )}
      <Keyboard onKeyClick={handleKeyClick} />
    </section>
  );
}
