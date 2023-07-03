import React, { useEffect } from 'react';
export const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (event: any) => void
) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {   
        return;
      }
      if(event.target.dataset.button === 'trigger-when-click-outside'){ //trigger function when click outside
        event.target.click();
      }    
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
