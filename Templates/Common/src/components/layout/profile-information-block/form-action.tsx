import { FC } from 'react';
import { Typo } from '../../../components';

const FormAction: FC = () => {
  return (
    <div className="form-actions">
      <button type="submit" className="form-actions__button">
        <Typo className="form-actions__button__button-text">Done</Typo>
      </button>
    </div>
  );
};

export default FormAction;
