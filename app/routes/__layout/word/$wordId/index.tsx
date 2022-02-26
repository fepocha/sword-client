import { useParams } from "remix";

export default function GamePlayPage() {
  const params = useParams();
  console.log(params.wordId);

  return (
    <section>
      <h2>Play page</h2>
      {/* <h2>Play result</h2> */}
    </section>
  );
}
