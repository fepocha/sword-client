import { Keyboard } from '~/components/word/Keyboard';
import { WordBlock } from '~/components/word/WordBlock';

export default function NewWordFormPage() {
  return (
    <section className="max-w-page px-2 mx-auto pt-10">
      <h2 className="text-2xl">Add a new word.</h2>
      <WordBlock />
      <Keyboard
        onKeyClick={(key) => {
          console.log(key);
        }}
      />
    </section>
  );
}
