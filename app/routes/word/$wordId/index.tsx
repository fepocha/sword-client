import { useParams } from "remix";

export default function GamePlayPage() {
  const params = useParams();
  console.log(params.wordId);

  return (
    <section>
      <h1>Play page</h1>
      {/* <h1>Play result</h1> */}
    </section>
  );
}
