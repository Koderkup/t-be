import { PropsWithChildren, useMemo, useState } from 'react';
import AccordionContext from './context/accordion-context.ts';
import AccordionItem from './components/accordion-item.tsx';

function Accordion({ children }: PropsWithChildren) {
  const [activeItem, setActiveItem] = useState(0);

  const contextValue = useMemo(
    () => ({ state: { activeItem }, dispatch: setActiveItem }),
    [activeItem, setActiveItem]
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className="accordion">{children}</ul>
    </AccordionContext.Provider>
  );
}

Accordion.Item = AccordionItem;

export default Accordion;
