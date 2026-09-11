import { useEffect, useRef } from 'react';

export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      if (ref.current) {
        ref.current.classList.add('reveal-visible');
      }
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: options.threshold || 0.15,
      ...options,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          if (!options.persist) {
            observer.unobserve(entry.target);
          }
        } else if (options.persist) {
          entry.target.classList.remove('reveal-visible');
        }
      });
    }, observerOptions);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.persist]);

  return ref;
}
