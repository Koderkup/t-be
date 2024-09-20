import { FC } from 'react';
import { Typo } from '../../../components';

type Props = {
  name?: string;
  description?: string;
};

const CategoryPageHeading: FC<Props> = ({ name, description }) => (
  <div className="category-page__heading">
    <Typo className="category-page__heading--name">{name}</Typo>
    <Typo className="category-page__heading--description">{description}</Typo>
  </div>
);

export default CategoryPageHeading;
