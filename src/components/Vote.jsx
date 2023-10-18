import { useState } from 'react';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { updateSurveyOptionValue } from '../api/updateSurvey';
import { useOption } from './customHooks';

const Vote = () => {
  const [searchparams] = useSearchParams();
  const id = searchparams.get('identifier');

  const navigate = useNavigate();

  const { data, error, isLoading } = useOption(id);

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await updateSurveyOptionValue(selectedOption);

    console.log(result);

    navigate(
      {
        pathname: '/results',
        search: createSearchParams({
          idSurvey: id,
        }).toString(),
      },
      {
        replace: true,
      }
    );
  };

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
    <div className='h-screen flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='backdrop-blur-md p-8 rounded-lg shadow-md w-1/2 '
      >
        <div className='mb-4'>
          <label className='block text-white text-lg mb-2'>
            Opciones de selección:
          </label>

          {data.map((opt) => (
            <div key={opt.id}>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  value={opt.id}
                  checked={selectedOption == opt.id}
                  onChange={handleOptionChange}
                  className='form-radio text-indigo-600 h-5 w-5'
                />
                <span className='ml-2'>{opt.alternative}</span>
              </label>
            </div>
          ))}
        </div>

        <button
          type='submit'
          className='bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600'
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Vote;
