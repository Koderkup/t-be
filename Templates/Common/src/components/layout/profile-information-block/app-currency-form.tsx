import { FC, FormEvent, useState } from 'react';
import Select from 'react-select';
import { ShopCurrency } from '../../../shared/types/app-configuration.interface';
import { useCustomersAPI } from '../../../hooks';
import CustomerInformation from './customer-information';
import DropdownIndicator from './dropdown-indicator';
import FormAction from './form-action';

interface AppCurrencyFormProps {
  appCurrency: Array<ShopCurrency>;
  telegramId: string;
}

const AppCurrencyForm: FC<AppCurrencyFormProps> = ({
  appCurrency,
  telegramId,
}) => {
  const { updateCustomerPreferredCurrency } = useCustomersAPI();

  const [currency, setCurrency] = useState(appCurrency[0]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateCustomerPreferredCurrency.mutate({
      telegramId,
      data: {
        currency: currency.value,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__block">
        <CustomerInformation />
        <div className="select-block">
          <p className="select-block__name">App currency</p>
          <div className="select-block__input">
            <Select
              classNamePrefix="select-app-currency"
              value={{ value: currency.value, label: currency.label }}
              options={appCurrency}
              onChange={data => {
                if (data) {
                  const selectData = data as ShopCurrency;
                  setCurrency({
                    value: selectData.value,
                    label: selectData.label,
                  });
                }
              }}
              components={{
                DropdownIndicator,
              }}
            />
          </div>
        </div>
      </div>
      <FormAction />
    </form>
  );
};

export default AppCurrencyForm;
