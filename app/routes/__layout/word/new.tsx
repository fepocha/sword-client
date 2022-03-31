import { Keyboard } from '~/components/word/Keyboard';
import { WordBlock } from '~/components/word/WordBlock';

export default function NewWordFormPage() {
  return (
    <section className="main-section">
      <h2 className="main-title">Add a new word.</h2>
      <WordBlock characters={'TABLE'.split('')} />
      <Keyboard
        onKeyClick={(key) => {
          console.log(key);
        }}
      />
    </section>
  );
}
