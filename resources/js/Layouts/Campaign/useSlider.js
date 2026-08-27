import { useRef } from 'react';

/**
 * useSlider
 * Menggantikan fungsi bindSlider() pada script asli.
 * Mengembalikan ref untuk dipasang ke elemen track, serta
 * fungsi goPrev/goNext untuk tombol panah.
 */
export default function useSlider() {
  const trackRef = useRef(null);

  const getStep = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const firstSlide = track.querySelector('[data-slide-item]');
    return (firstSlide ? firstSlide.offsetWidth : 0) + 22;
  };

  const goPrev = () => {
    trackRef.current?.scrollBy({ left: -getStep(), behavior: 'smooth' });
  };

  const goNext = () => {
    trackRef.current?.scrollBy({ left: getStep(), behavior: 'smooth' });
  };

  return { trackRef, goPrev, goNext };
}
