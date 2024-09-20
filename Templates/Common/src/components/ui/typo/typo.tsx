import { FC, PropsWithChildren, ReactNode } from 'react';
import { VariantTypoComponent } from './types';

type Props = PropsWithChildren & {
  children?: ReactNode;
  className?: string;
  tag?: VariantTypoComponent;
};

const Typo: FC<Props> = ({ tag = 'span', className, children }) => {
  const Component = tag;

  return <Component className={className}>{children}</Component>;
};

export default Typo;
