export const useKeyboardInteractions = <T extends HTMLElement>(
  callback?: () => void
) => {
  return (event: React.KeyboardEvent<T>) => {
    if ((event.key === 'Enter' || event.key === ' ') && callback) {
      callback();
    }
  };
};
