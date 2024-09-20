import { useMainStore } from '../store';

export const useNavigateBack = () => {
  const { actionSheets, closeActionSheet } = useMainStore();

  return () => {
    const lastOpenedActionSheet = actionSheets.at(-1);
    if (lastOpenedActionSheet) {
      closeActionSheet(lastOpenedActionSheet);
    }
  };
};
