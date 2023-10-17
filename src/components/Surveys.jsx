import useSWR from 'swr';
import { usePlayerStore } from '../store/store';
import Survey from './Survey';
import axios from 'axios';

const Surveys = () => {
  const fetcher = (url) =>
    axios
      .get(`https://localhost:7115/api/Survey/${url}`)
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR('surveys', fetcher);

  const username = usePlayerStore((store) => store.userName);

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div className='h-screen flex flex-col mt-10 gap-y-20'>
      <div className='text-center'>
        <h2 className='text-5xl p-2'>Bienvenido {username}</h2>
        <p className='text-3xl p-2'>Puede elegir una de nuestras encuentas:</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 mx-auto gap-10 text-center '>
        {data.map((survey) => (
          <Survey
            id={survey.id}
            title={survey.question}
            desc={survey.description}
            key={survey.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Surveys;
