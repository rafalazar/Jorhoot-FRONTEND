import { createSearchParams, useNavigate } from 'react-router-dom';
import { usePlayerStore } from '../store/store';

const Survey = ({ id, title, desc }) => {
  const navigate = useNavigate();

  const updateSurveyTitle = usePlayerStore((store) => store.updateSurveyTitle);

  const handleClick = (identifier) => {
    updateSurveyTitle(title);

    navigate(
      {
        pathname: '/vote',
        search: createSearchParams({ identifier: id }).toString(),
      },
      { replace: true }
    );
  };
  return (
    <div
      onClick={handleClick}
      className='border-2 border-white border-dashed rounded-md p-5 cursor-pointer text-2xl'
    >
      <p>Encuenta #{id}</p>
      <p>{title}</p>
      <p>{desc}</p>
    </div>
  );
};
export default Survey;
