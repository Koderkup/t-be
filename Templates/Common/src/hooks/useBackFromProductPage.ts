import { useLocation, useNavigate } from 'react-router-dom';
import { useCartStore, useMainStore } from '../store';
import { Paths } from '../shared/types/constants.ts';
import { useNavigateBack } from './useNavigateBack.ts';

export const useBackFromProductPage = () => {
  const { actionSheets, toggleNavigationMenu, isNavigationMenuOpen } =
    useMainStore();
  const { setSelectedColor, setSelectedSize } = useCartStore();
  const handleNavigateBack = useNavigateBack();
  const navigate = useNavigate();
  const location = useLocation();

  return (categoryId?: string) => {
    if (actionSheets.length) {
      handleNavigateBack();
    } else {
      if (isNavigationMenuOpen) toggleNavigationMenu();
      setSelectedColor(null);
      setSelectedSize(null);
      navigate(location.state?.prevLocation || Paths.HOME, {
        state: { categoryId },
      });
    }
  };
};
