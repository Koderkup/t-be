import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ErrorEmoji } from '../../../assets/icons/emotion-unhappy-line.svg';
import { Button, HomeIndicator, Typo } from '../../../components';
import { RoutesPaths } from '../../../shared';

const ErrorBoundaryFallback: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="error-boundary">
      <div className="error-boundary__wrapper">
        <ErrorEmoji />
        <Typo className="error-boundary__title">Oh no!</Typo>

        <Typo className="error-boundary__subtitle">
          Something went wrong at our end. Don’t worry, just try again.
        </Typo>
      </div>

      <div className="error-boundary__actions">
        <Button
          size="large"
          variant="secondary"
          onClick={() => navigate(RoutesPaths.HOME)}
        >
          <Typo className="error-boundary__button">Back to Home page</Typo>
        </Button>

        <HomeIndicator />
      </div>
    </div>
  );
};
export default ErrorBoundaryFallback;
