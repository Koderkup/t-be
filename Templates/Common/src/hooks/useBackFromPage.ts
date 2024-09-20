import { useNavigate } from 'react-router-dom';
import { useMainStore } from '../store';
import { RoutesPaths } from '../shared';

export const useBackFromPage = (path?: string) => {
  const [isNavigationMenuOpen, toggleNavigationMenu] = useMainStore(state => [
    state.isNavigationMenuOpen,
    state.toggleNavigationMenu,
  ]);
  const navigate = useNavigate();

  return () => {
    if (isNavigationMenuOpen) toggleNavigationMenu();
    navigate(path || RoutesPaths.HOME);
  };
};
