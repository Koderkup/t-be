import { FC } from 'react';
import { clsx as cn } from 'clsx';

interface MenuButtonProps {
  isOpen: boolean;
  clickFn: () => void;
}

const MenuButton: FC<MenuButtonProps> = ({ isOpen, clickFn }) => {
  const commonStyles = 'button__common';

  return (
    <button
      aria-label="menu-toggler"
      onClick={clickFn}
      className={cn('button')}
    >
      <span className="button__parts">
        <span
          className={cn(commonStyles, {
            'button__parts--first': isOpen,
          })}
        />
        <span
          className={cn(`${commonStyles} button__parts__second-line`, {
            'button__parts--second': isOpen,
          })}
        />
        <span
          className={cn(commonStyles, {
            'button__parts--third': isOpen,
          })}
        />
      </span>
    </button>
  );
};

export default MenuButton;
