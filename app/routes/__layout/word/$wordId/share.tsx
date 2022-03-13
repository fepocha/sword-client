import { useParams } from 'remix';

export default function SharePage() {
  const params = useParams();
  console.log(params.wordId);

  return (
    <section>
      <h2>External share page</h2>
    </section>
  );
}
