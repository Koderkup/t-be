import { FC } from 'react';
import ContactInfoRow from './contact-info-row';
import { Typo } from '../../../components';

interface ContactInformationProps {
  location: string;
  phoneNumber: string;
  email: string;
  onClick: (location: string) => void;
}

const ItalyContactInformation: FC<ContactInformationProps> = ({
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
        <Typo className="contact-info__text">Address</Typo>
        <Typo className="contact-info__location">{location}</Typo>
      </button>
      <ContactInfoRow
        link={`tel:${phoneNumber.replace(/\s+/g, '')}`}
        text="Phone number"
        value={phoneNumber}
      />
      <ContactInfoRow text="Email" value={email} link={`mailto:${email}`} />
    </div>
  );
};

export default ItalyContactInformation;
