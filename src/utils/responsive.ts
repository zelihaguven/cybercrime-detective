import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 640);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mobile;
}

export function useIsLandscape() {
  const [landscape, setLandscape] = useState(() =>
    typeof window !== 'undefined'
      ? window.innerWidth > window.innerHeight && window.innerHeight < 500
      : false
  );
  useEffect(() => {
    const fn = () => setLandscape(window.innerWidth > window.innerHeight && window.innerHeight < 500);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return landscape;
}
