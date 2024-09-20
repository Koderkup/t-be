import { FC, PropsWithChildren } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { clsx as cn } from 'clsx';
import ModalCloseButton from './modal-close-button.tsx';
import { useMainStore } from '../../../store';
import ModalHeading from './modal-heading.tsx';

interface ModalRootProps extends PropsWithChildren {
  isHeadingActive?: boolean;
}

const ModalRoot: FC<ModalRootProps> = ({
  isHeadingActive = true,
  children,
}) => {
  const { setModal } = useMainStore();
  const handleModalClose = () => {
    setModal(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        className="modal-backdrop"
        onClick={handleModalClose}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        key="modal"
        className={cn('modal')}
        transition={{ duration: 0.2, delay: 0.1, ease: 'easeInOut' }}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.2,
          },
        }}
      >
        <ModalCloseButton onClick={handleModalClose} />
        {isHeadingActive && <ModalHeading />}
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalRoot;
