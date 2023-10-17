import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const Results = () => {
  const [searchparams] = useSearchParams();
  const idSurvey = searchparams.get('idSurvey');

  const navigate = useNavigate();

  const fetcherSurvey = (url) =>
    axios
      .get(`https://localhost:7115/api/Survey/${url}/${idSurvey}`)
      .then((res) => res.data);

  const fetcherOpt = (url) =>
    axios
      .get(`https://localhost:7115/api/Survey/${url}/${idSurvey}`)
      .then((res) => res.data);

  const {
    data: surveyData,
    error: surveyError,
    isLoading: surIsloading,
  } = useSWR('survey', fetcherSurvey);
  const { data: optionData, error, isLoading } = useSWR('option', fetcherOpt);

  if (surveyError || error) return <div>failed to load</div>;
  if (surIsloading || isLoading) return <div>loading...</div>;

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
          <p className='text-xl'>{surveyData.question}</p>
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
              tickFormatter={(value) => `$${value}`}
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
