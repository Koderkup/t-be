import { ReactComponent as PendingIcon } from '../../../assets/icons/status-icons/pending-icon.svg';
import { ReactComponent as PaidIcon } from '../../../assets/icons/status-icons/paid-icon.svg';
import { ReactComponent as ConfirmedIcon } from '../../../assets/icons/status-icons/confirmed-icon.svg';
import { ReactComponent as ShippedIcon } from '../../../assets/icons/status-icons/shipped-icon.svg';
import { ReactComponent as DeliveredIcon } from '../../../assets/icons/status-icons/delivered-icon.svg';
import { ReactComponent as CancelledIcon } from '../../../assets/icons/status-icons/cancelled-icon.svg';

export const STATUS_VARIANTS = [
  {
    icon: PendingIcon,
    text: 'Pending',
  },
  {
    icon: PaidIcon,
    text: 'Paid',
  },
  {
    icon: ConfirmedIcon,
    text: 'Confirmed',
  },
  {
    icon: ShippedIcon,
    text: 'Shipped',
  },
  {
    icon: DeliveredIcon,
    text: 'Delivered',
  },
  {
    icon: CancelledIcon,
    text: 'Cancelled',
  },
];
