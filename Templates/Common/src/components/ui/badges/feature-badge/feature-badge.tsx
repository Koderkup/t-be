import { FC, ReactNode } from 'react';
import { Typo } from '../../../../components';

type Props = {
  featuredText?: string;
  icon?: ReactNode;
};

const FeatureBadge: FC<Props> = ({ featuredText, icon }) => {
  return (
    <div className="badge">
      {icon}
      {featuredText && <Typo className="badge__text">{featuredText}</Typo>}
    </div>
  );
};

export default FeatureBadge;
