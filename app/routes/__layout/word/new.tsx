import type { Key } from '~/components/word/Keyboard';
import { Keyboard } from '~/components/word/Keyboard';
import { WordBlock } from '~/components/word/WordBlock';
import { useWordType } from '~/hooks/use-word-type';

const HELPER_TEXT = {
  INVALID_LENGTH: 'A word should be 5 characters long',
};

export default function NewWordFormPage() {
  const {
    word,
    helperText,
    typeCharacter,
    deleteCharacter,
    showHelperText,
    clearHelperText,
  } = useWordType();

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
    }
    // submit event
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
