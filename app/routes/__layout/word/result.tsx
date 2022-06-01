import { LoaderFunction, useParams  } from 'remix';

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const wordId = url.searchParams.get('wordId');
  console.log('🚀 ~ file: result.tsx ~ line 6 ~ wordId', wordId);
  return wordId;
};

function Result() {
  const params = useParams();
  console.log('🚀 ~ file: result.tsx ~ line 5 ~ Result ~ params', params);
  return <>result</>;
}

export default Result;
