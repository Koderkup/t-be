import { FC, ReactNode } from 'react';
import { Typo } from '../../../components';

interface ContactInfoRowProps {
  link: string;
  icon?: ReactNode;
  value: string;
  text?: string;
}

const ContactInfoRow: FC<ContactInfoRowProps> = ({
  link,
  icon,
  value,
  text,
}) => {
  return (
    <a
      href={link}
      target="_blank"
      className="contact-info__row"
      rel="noreferrer"
    >
      {text ? <Typo className="contact-info__text">{text}</Typo> : icon}
      <Typo className="contact-info__value">{value}</Typo>
    </a>
  );
};

export default ContactInfoRow;
