/**
 * Kontak & sosial — sumber tunggal agar konsisten di seluruh situs
 */
export const CONTACT = {
  whatsappDisplay: '0821 4733 1906',
  whatsappE164: '6282147331906',
  email: 'gugdemayun64@gmail.com',
  location: 'Jalan Mawar No. 8, Batubulan',
  locationShort: 'Batubulan, Bali',
  github: 'https://github.com/gungdemayun12',
  instagram: 'https://www.instagram.com/_gungde/',
};

export function whatsappLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${CONTACT.whatsappE164}?text=${text}`;
}
