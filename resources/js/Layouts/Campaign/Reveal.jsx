import React, { useEffect, useRef, useState } from 'react';

/**
 * Reveal — pengganti class ".reveal"/".in" + script IntersectionObserver pada HTML asli.
 * Bungkus elemen apa pun dengan komponen ini agar fade + slide-up saat masuk viewport.
 *
 * Props:
 * - as: tag/elemen pembungkus (default 'div')
 * - delay: jeda transisi dalam detik (meniru staggering (i % 6) * 0.05s di script asli)
 * - className: class tambahan yang digabung ke elemen
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...props }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={[
        'transition-all duration-700 ease-aun',
        'motion-reduce:transition-none motion-reduce:transform-none',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Tag>
  );
}
