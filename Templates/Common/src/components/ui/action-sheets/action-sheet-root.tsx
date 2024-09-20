import { FC, PropsWithChildren, useEffect, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { lockScroll } from '../../../utils/lock-scroll.ts';
import { useMainStore } from '../../../store';

const ActionSheetRoot: FC<PropsWithChildren> = ({ children }) => {
  const id = useId();
  const { actionSheets } = useMainStore();

  useEffect(() => {
    lockScroll(true);

    return () => {
      lockScroll(false);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key={id}
        initial={{ top: '100%' }}
        animate={actionSheets?.length ? { top: '0' } : { top: '100%' }}
        className="action-sheet"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default ActionSheetRoot;
