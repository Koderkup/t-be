import { PropsWithChildren, useRef } from 'react';
import { clsx as cn } from 'clsx';
import { ReactComponent as ExpandArrow } from '../../../../assets/icons/arrow-drop-left-line.svg';
import { ReactComponent as NolaExpandArrow } from '../../../../assets/icons/nola-expand-arrow.svg';
import { Typo } from '../../../../components';
import { useAccordionContext } from '../context/accordion-context.ts';
import { useKeyboardInteractions } from '../../../../hooks/useKeyboardInteractions.ts';
import { useMainStore } from '../../../../store';

type Props = PropsWithChildren & {
  id: number;
  body?: string[];
};

function AccordionItem({ children, body, id }: Props) {
  const { state, dispatch } = useAccordionContext();
  const accordionContentRef = useRef<HTMLDivElement>(null);
  const handleKeyboardPress = useKeyboardInteractions();
  const [designType] = useMainStore(state => [state.designType]);

  const handleClick = () => {
    if (state.activeItem === id) {
      dispatch(0);
    } else {
      dispatch(id);
    }
  };

  return (
    <div className="accordion__wrapper">
      <li
        className="accordion__item"
        onClick={handleClick}
        onKeyDown={handleKeyboardPress}
        role="presentation"
      >
        {children}
        {designType === 'denmark' || designType === 'italy' ? (
          <NolaExpandArrow
            className={cn(
              state.activeItem === id && 'accordion__arrow--active',
              designType === 'italy' && 'accordion__arrow'
            )}
          />
        ) : (
          <ExpandArrow
            className={cn(
              'accordion__arrow',
              state.activeItem === id && 'accordion__arrow--active'
            )}
          />
        )}
      </li>

      <div
        ref={accordionContentRef}
        style={{
          height:
            state.activeItem === id
              ? `${Number(accordionContentRef?.current?.scrollHeight)}px`
              : 0,
        }}
        className={cn(
          'accordion__content',
          state.activeItem === id && 'accordion__content--active'
        )}
      >
        {body?.map(elem => (
          <li key={elem} className="accordion__body">
            <Typo className="accordion__text">{elem}</Typo>
          </li>
        ))}
      </div>
    </div>
  );
}

export default AccordionItem;
