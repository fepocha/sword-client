import { Keyboard } from '~/components/word/Keyboard';
import { WordBlock } from '~/components/word/WordBlock';

export default function NewWordFormPage() {
  return (
    <section className="max-w-[600px] px-2 mx-auto pt-10">
      <h2 className="text-2xl">Add a new word.</h2>
      <WordBlock />
      <Keyboard
        onCharacterClick={(key) => {
          console.log(key);
        }}
        onBackspaceClick={(key) => {
          console.log(key);
        }}
        onEnterClick={(key) => {
          console.log(key);
        }}
      />
    </section>
  );
}
