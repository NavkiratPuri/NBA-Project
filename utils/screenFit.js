export const screenFit = () => {
    const header = 88;
    const footer = 84;
  
    const extra = header + footer;
    const screenHeight = window.innerHeight;
  
    return screenHeight - extra;
  };
  