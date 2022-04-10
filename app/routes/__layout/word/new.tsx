import { useMutation } from 'react-query';
import { postWords, POST_WORDS_API_PATH } from '~/api/post-words';
import type { Key } from '~/components/word/Keyboard';
import { Keyboard } from '~/components/word/Keyboard';
import { WordBlock } from '~/components/word/WordBlock';
import { useWordType } from '~/hooks/use-word-type';

const HELPER_TEXT = {
  INVALID_LENGTH: 'A word should be 5 characters long',
};


const usePostWordsMutation = () => useMutation(POST_WORDS_API_PATH, postWords);

export default function NewWordFormPage() {
  const {
    word,
    helperText,
    typeCharacter,
    deleteCharacter,
    showHelperText,
    clearHelperText,
  } = useWordType();

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
    if (word.length < 5) {
      showHelperText(HELPER_TEXT.INVALID_LENGTH);
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
      <WordBlock characters={word.split('')} />
      {helperText && (
        <p className="mt-6 text-center text-orange-light text-sm">{helperText}</p>
      )}
      <Keyboard onKeyClick={handleKeyClick} />
    </section>
  );
}
