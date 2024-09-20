import { createContext, Dispatch, SetStateAction, useContext } from 'react';

type accordionState = {
  activeItem: number;
};

const initialState: accordionState = {
  activeItem: 0,
};

const AccordionContext = createContext<{
  state: accordionState;
  dispatch: Dispatch<SetStateAction<number>>;
}>({ state: initialState, dispatch: () => 0 });

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error('Accordion.* component must be a child of Accordion');
  }

  return context;
};

export default AccordionContext;
