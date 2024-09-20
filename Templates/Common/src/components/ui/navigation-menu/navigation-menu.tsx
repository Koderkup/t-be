import { FC, useEffect } from 'react';
import { clsx as cn } from 'clsx';
import { useMainStore } from '../../../store/main-store.ts';
import { lockScroll } from '../../../utils/lock-scroll.ts';
import MenuButton from './components/menu-button/menu-button.tsx';
import NavigationLinks from './components/navigation-links/navigation-links.tsx';

const NavigationMenu: FC = () => {
  const [isNavigationMenuOpen, toggleNavigationMenu] = useMainStore(state => [
    state.isNavigationMenuOpen,
    state.toggleNavigationMenu,
  ]);

  useEffect(() => {
    if (isNavigationMenuOpen) {
      lockScroll(true);
    }
    return () => {
      lockScroll(false);
    };
  }, [isNavigationMenuOpen]);

  return (
    <div className="menu">
      <MenuButton
        isOpen={isNavigationMenuOpen}
        clickFn={toggleNavigationMenu}
      />
      <nav
        className={cn('menu__wrapper', {
          'menu__wrapper--open': isNavigationMenuOpen,
          'menu__wrapper--closed': !isNavigationMenuOpen,
        })}
      >
        <div className="menu__inner">
          <div
            className={cn('menu__backdrop', {
              'menu__backdrop--closed': !isNavigationMenuOpen,
              'menu__backdrop--open': isNavigationMenuOpen,
            })}
          />
        </div>
        <ul
          className={cn('menu__items', {
            'menu__items--closed': !isNavigationMenuOpen,
            'menu__items--open': isNavigationMenuOpen,
          })}
        >
          <NavigationLinks />
        </ul>
      </nav>
    </div>
  );
};

export default NavigationMenu;
