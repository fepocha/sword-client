import { useDarkmode } from "~/hooks/use-darkmode";

export default function Index() {
  useDarkmode();

  return (
    <section className="main-container">
      <h1>Wordssay</h1>
      <p>Initial landing page</p>
    </section>
  );
}
