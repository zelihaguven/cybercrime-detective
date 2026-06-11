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
  const check = () =>
    typeof window !== 'undefined'
      ? window.innerWidth > window.innerHeight && window.innerHeight < 500
      : false;

  const [landscape, setLandscape] = useState(check);

  useEffect(() => {
    // orientationchange fires before resize on Android Chrome
    const onOrient = () => setTimeout(() => setLandscape(check()), 100);
    const onResize = () => setLandscape(check());
    window.addEventListener('orientationchange', onOrient);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('orientationchange', onOrient);
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return landscape;
}
