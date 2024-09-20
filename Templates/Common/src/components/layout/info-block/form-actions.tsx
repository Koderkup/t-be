import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Typo } from '../../../components';

interface FormActionsProps {
  clickFn: () => void;
}

const FormActions: FC<FormActionsProps> = ({ clickFn }) => {
  return (
    <div className="actions">
      <button onClick={clickFn} type="submit" className="actions__submit">
        <Typo className="actions__text">Send</Typo>
      </button>
      <div className="actions__info">
        <Link className="actions__link" to="/">
          <Typo className="actions__link--link">Powered by Tapply</Typo>
        </Link>
      </div>
    </div>
  );
};

export default FormActions;
