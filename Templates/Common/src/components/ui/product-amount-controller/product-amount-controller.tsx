import { FC } from 'react';
import { clsx as cn } from 'clsx';
import { ReactComponent as Remove } from '../../../assets/icons/subtract-line.svg';
import { ReactComponent as Add } from '../../../assets/icons/add-line.svg';
import { IconButton, Typo } from '../../../components';
import { useCart } from '../../../hooks/useCart.ts';

type Props = {
  uniqueId: string;
  footnote?: string;
  accentColor?: 'white' | 'black';
  disabled?: boolean;
};

const ProductAmountController: FC<Props> = ({
  uniqueId,
  footnote,
  accentColor = 'white',
  disabled,
}) => {
  const { increaseAmount, decreaseAmount, cart } = useCart();

  return (
    <div className="amount-controller">
      <IconButton onClick={() => !disabled && decreaseAmount(uniqueId)}>
        <Remove
          className={cn(
            'amount-controller__remove',
            accentColor === 'white' && 'amount-controller__remove--white'
          )}
        />
      </IconButton>

      <div className="amount-controller__quantity">
        <Typo
          className={cn(
            'amount-controller__text',
            accentColor === 'white'
              ? 'amount-controller__text--white'
              : 'amount-controller__text--black'
          )}
        >
          {cart.get(uniqueId)?.quantity}
        </Typo>
        {footnote && (
          <Typo className="amount-controller__footnote">{footnote}</Typo>
        )}
      </div>

      <IconButton onClick={() => !disabled && increaseAmount(uniqueId)}>
        <Add
          className={cn(
            'amount-controller__add',
            accentColor === 'white' && 'amount-controller__add--white'
          )}
        />
      </IconButton>
    </div>
  );
};

export default ProductAmountController;
