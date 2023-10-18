import { usePlayerStore } from '../store/store';
import Survey from './Survey';
import { useSurvey } from './customHooks/useSurvey';

const Surveys = () => {
  const { data, error, isLoading } = useSurvey();

  const username = usePlayerStore((store) => store.userName);

  if (error)
    return (
      <div className='h-screen flex justify-center items-center'>
        failed to load
      </div>
    );
  if (isLoading)
    return (
      <div className='h-screen flex justify-center items-center'>
        loading...
      </div>
    );

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
