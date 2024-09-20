import { FC, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MENU_LINKS } from './data';
import { useMainStore } from '../../../../../store/main-store';

const NavigationLinks: FC = () => {
  const toggleNavigationMenu = useMainStore(
    state => state.toggleNavigationMenu
  );
  const navigate = useNavigate();

  const handleLinkClick = useCallback(
    (href: string) => {
      toggleNavigationMenu();
      navigate(href);
    },
    [toggleNavigationMenu, navigate]
  );

  return MENU_LINKS.map(link => (
    <li key={link.href}>
      <Link
        onClick={() => handleLinkClick(link.href)}
        to={link.href}
        className="menu__link"
      >
        {link.value}
      </Link>
    </li>
  ));
};

export default NavigationLinks;
