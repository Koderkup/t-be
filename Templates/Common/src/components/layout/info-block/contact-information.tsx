import { FC } from 'react';
import { ReactComponent as LocationIcon } from '../../../assets/icons/location.svg';
import { ReactComponent as PhoneIcon } from '../../../assets/icons/phone.svg';
import { ReactComponent as MailIcon } from '../../../assets/icons/email.svg';
import ContactInfoRow from './contact-info-row';
import { Typo } from '../../../components';

interface ContactInformationProps {
  location: string;
  phoneNumber: string;
  email: string;
  onClick: (location: string) => void;
}

const ContactInformation: FC<ContactInformationProps> = ({
  location,
  phoneNumber,
  email,
  onClick,
}) => {
  return (
    <div className="contact-info">
      <button
        className="contact-info__button"
        onClick={() => onClick(location)}
      >
        <LocationIcon />
        <Typo className="contact-info__location">{location}</Typo>
      </button>
      <ContactInfoRow
        link={`tel:${phoneNumber.replace(/\s+/g, '')}`}
        icon={<PhoneIcon />}
        value={phoneNumber}
      />
      <ContactInfoRow
        icon={<MailIcon />}
        value={email}
        link={`mailto:${email}`}
      />
    </div>
  );
};

export default ContactInformation;
