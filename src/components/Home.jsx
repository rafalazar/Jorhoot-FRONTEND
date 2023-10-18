import { useState } from 'react';
import { usePlayerStore } from '../store/store';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const updateUserName = usePlayerStore((store) => store.updateUserName);

  const handleClick = (e) => {
    e.preventDefault();

    if (name.trim() === '') {
      alert('You need to enter a name');
      return;
    }

    updateUserName(name);
    setName('');

    navigate('surveys');
  };

  return (
    <div className='h-screen flex justify-center items-center text-center'>
      <div className='flex flex-col gap-20'>
        <h1 className='text-6xl font-neon'>Jorhoot!</h1>
        <div className='flex flex-col gap-5'>
          <input
            type='text'
            className='p-3 bg-transparent border border-white rounded-lg focus:outline-none placeholder:text-white'
            placeholder='Ingresa tu nombre...'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={(e) => handleClick(e)}
            className='p-3 bg-slate-700 rounded-lg'
          >
            Comenzar
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;
