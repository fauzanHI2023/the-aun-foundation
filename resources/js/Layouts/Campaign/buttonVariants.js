// Semua kombinasi class Tailwind untuk tombol, meniru .btn + modifier
// (.btn-primary, .btn-outline, dst.) dari CSS asli. Dipisah "look" (warna/border)
// dan "size" (padding/font-size) supaya bisa dikombinasikan bebas seperti CSS asli.

export const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-full font-bold font-title ' +
  'transition-all duration-[250ms] ease-aun whitespace-nowrap';

export const btnPrimary =
  'bg-brown text-white shadow-[0_8px_20px_-8px_rgba(116,77,44,0.6)] ' +
  'hover:bg-walnut hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-8px_rgba(77,58,40,0.55)]';

export const btnGhostDark =
  'bg-white/[0.08] text-white border border-white/[0.28] backdrop-blur-md ' +
  'hover:bg-white/[0.16] hover:-translate-y-0.5';

export const btnOutline =
  'bg-transparent border-[1.5px] border-alabaster text-carbon ' +
  'hover:border-brown hover:text-brown hover:-translate-y-0.5';

export const btnOutlineInvert =
  'bg-transparent border-[1.5px] border-white/[0.35] text-white ' +
  'hover:border-amberl2 hover:text-amberl2 hover:-translate-y-0.5';

// Ukuran (meniru .btn default, .btn-sm, dan override khusus per section)
export const btnSizeDefault = 'px-[22px] py-3 text-[14px]';
export const btnSizeSm = 'px-4 py-[9px] text-[12.5px]';
export const btnSizeHero = 'px-6 py-[13px] text-[14px]'; // .hero-actions .btn
export const btnSizeSearch = 'px-[22px] py-[11px] text-[14px]'; // .search-panel .btn-primary

export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}
