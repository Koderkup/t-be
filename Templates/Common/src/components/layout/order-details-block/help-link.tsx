import { useNavigate } from 'react-router-dom';
import { Typo } from '../../../components';
import { RoutesPaths } from '../../../shared';

const HelpLink = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(RoutesPaths.INFO);
  };
  return (
    <div className="help-link">
      <button onClick={handleClick} className="help-link__button">
        <Typo className="help-link__text">Need help?</Typo>
      </button>
    </div>
  );
};

export default HelpLink;
