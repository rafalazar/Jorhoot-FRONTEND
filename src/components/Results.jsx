import { useNavigate, useSearchParams } from 'react-router-dom';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { usePlayerStore } from '../store/store';
import { useResult } from './customHooks';

const Results = () => {
  const [searchparams] = useSearchParams();
  const idSurvey = searchparams.get('idSurvey');

  const navigate = useNavigate();
  const surveyTitle = usePlayerStore((store) => store.surveyTitle);

  const { data: optionData, error, isLoading } = useResult(idSurvey);

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

  const data = optionData.map((opt) => {
    return {
      name: opt.alternative,
      amount: opt.vote,
    };
  });

  const turnBack = () => {
    navigate('/surveys', { replace: true });
  };

  return (
    <div className='h-screen'>
      <div className='h-[80%] grid grid-cols-1 justify-center items-center gap-10 sm:grid-cols-2'>
        <div className='text-center'>
          <h3 className='text-xl'>Los resultados para la pregunta</h3>
          <p className='text-xl'>{surveyTitle}</p>
        </div>
        <ResponsiveContainer width={500} height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey='name'
              stroke='#ffffff'
              fontSize={13}
              tickLine={false}
              axisLine={false}
              width={500}
            />
            <YAxis
              stroke='#ffffff'
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <Bar dataKey='amount' fill='#1df3fa' radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className='flex justify-center items-center'>
        <button
          onClick={turnBack}
          className='border-2 border-white rounded-lg p-3'
        >
          Volver
        </button>
      </div>
    </div>
  );
};
export default Results;
