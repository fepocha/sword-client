import { useParams } from "remix";

export default function SharePage() {
  const params = useParams();
  console.log(params.wordId);

  return (
    <section>
      <h1>External share page</h1>
    </section>
  );
}
