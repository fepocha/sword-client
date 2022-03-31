import { Keyboard } from '~/components/word/Keyboard';
import { WordBlock } from '~/components/word/WordBlock';

export default function NewWordFormPage() {
  return (
    <section className="max-w-[600px] px-2 mx-auto pt-10">
      <h2 className="text-2xl">Add a new word.</h2>
      <WordBlock />
      <Keyboard />
      <form className="mt-10">
        <label htmlFor="word" className="flex flex-col mb-10">
          <span className="mb-2">Word</span>
          <input
            type="text"
            id="word"
            className="bg-transparent border-b-[1px] px-4 py-2 border-black-dark"
          />
          <span className="text-orange-mid mt-2 text-sm">warning</span>
        </label>
        <button type="button" className="w-full bg-white-light rounded-full py-2 border-2 border-black-dark text-lg">Submit</button>
      </form>
    </section>
  );
}
