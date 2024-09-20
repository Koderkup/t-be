import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import AppCurrencyForm from './app-currency-form';
import { useCustomersAPI } from '../../../hooks';

type Props = {
  telegramId: string;
};

const ProfileInformationBlock: FC<Props> = ({ telegramId }) => {
  const {
    currencies: { data, isError },
  } = useCustomersAPI();

  if (isError) return <Navigate to="/404" replace />;

  if (!data) return null;

  return (
    <div className="profile-information">
      <AppCurrencyForm appCurrency={data} telegramId={telegramId} />
    </div>
  );
};

export default ProfileInformationBlock;
