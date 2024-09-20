import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Typo } from '../../../components';
import ContactInformation from './contact-information';
import { useAppConfigurationAPI } from '../../../hooks/useAppConfigurationAPI';
import HelpForm from './help-form';
import FormActions from './form-actions';
import { HelpMessage } from '../../../shared/types/types';
import { useMainStore } from '../../../store';
import ItalyContactInformation from './italy-contact-information';

type Props = {
  onButtonClick: (location: string) => void;
};

const InfoPage: FC<Props> = ({ onButtonClick }) => {
  const {
    appCfg: { data, isError },
    sendHelpMessage,
  } = useAppConfigurationAPI();
  const [designType] = useMainStore(state => [state.designType]);

  const methods = useForm<HelpMessage>();

  const onSubmit: SubmitHandler<HelpMessage> = ({ name, email, text }) => {
    sendHelpMessage.mutate({
      name,
      email,
      text,
    });
    methods.reset();
  };

  if (isError) return <Navigate to="/404" replace />;

  if (!data) return null;

  return (
    <div>
      <div className="info-page">
        <div>
          <Typo className="info-page__title">Here to help</Typo>
          {designType === 'italy' ? (
            <ItalyContactInformation
              location={data.location}
              email={data.email}
              phoneNumber={data.phoneNumber}
              onClick={onButtonClick}
            />
          ) : (
            <ContactInformation
              location={data.location}
              email={data.email}
              phoneNumber={data.phoneNumber}
              onClick={onButtonClick}
            />
          )}
          <FormProvider {...methods}>
            <HelpForm />
          </FormProvider>
        </div>
        <FormActions clickFn={methods.handleSubmit(onSubmit)} />
      </div>
    </div>
  );
};

export default InfoPage;
