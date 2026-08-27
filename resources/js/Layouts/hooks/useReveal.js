import { useEffect, useRef } from "react";

/**
 * Menambahkan class "active" pada elemen ketika elemen tersebut
 * masuk ke viewport (mereplikasi efek reveal-on-scroll pada versi HTML asli).
 * Pakai: const ref = useReveal(); <div ref={ref} className="reveal">...</div>
 */
export default function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
