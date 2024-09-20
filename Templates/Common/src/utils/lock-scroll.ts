export const lockScroll = (lock: boolean) => {
  if (window !== undefined) {
    const html = document.getElementsByTagName('html')[0];

    html?.classList[lock ? 'add' : 'remove']('scroll-fixed');
  }
};
