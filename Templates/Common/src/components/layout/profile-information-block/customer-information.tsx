import { FC } from 'react';
import { TextField, Typo } from '../../../components';
import { useTgStore } from '../../../store';

const CustomerInformation: FC = () => {
  const { userInformation } = useTgStore();

  return (
    <div className="customer-info">
      <div className="customer-info__title-block">
        <Typo className="customer-info__title-block__title">
          Profile information
        </Typo>
      </div>
      <div className="customer-info__fields">
        <TextField
          label="Name"
          isError={false}
          id="name"
          className="customer-info__field"
          defaultValue={userInformation?.userName}
          multiline={false}
          disabled
        />
        <TextField
          label="Phone"
          isError={false}
          id="phone"
          className="customer-info__field"
          defaultValue={userInformation?.userPhoneNumber}
          multiline={false}
          disabled
        />
        {/*  <TextField
          label="Email"
          isError={false}
          id="email"
          defaultValue="hannabokhan@mail.com"
          multiline={false}
        /> */}
      </div>
    </div>
  );
};

export default CustomerInformation;
