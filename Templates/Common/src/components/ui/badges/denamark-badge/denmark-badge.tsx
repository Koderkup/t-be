import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { Typo } from '../../..';

type Props = {
  featuredText?: string;
  icon?: ReactNode;
  gridType: string;
};

const DenmarkBadge: FC<Props> = ({ featuredText, icon, gridType }) => {
  return (
    <div className={clsx('badge', gridType === 'double' && 'badge-double')}>
      {icon}
      {featuredText && <Typo className="badge__text">{featuredText}</Typo>}
    </div>
  );
};

export default DenmarkBadge;
