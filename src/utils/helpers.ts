export const generateRandomId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const normalizePhone = (phone: string) => (phone || '').replace(/\D/g, '');

export const normalizeString = (s: string) => (s || '').trim().toLowerCase();

export const makeContactKey = (c: { name?: string; email?: string; phone_number?: string }) =>
  `${normalizeString(c.name || '')}::${normalizeString(c.email || '')}::${normalizePhone(c.phone_number || '')}`;

export const fuzzySearch = (items: any[], searchTerm: string) => {
  if (!searchTerm.trim()) return items;
  const term = searchTerm.toLowerCase();
  return items.filter((contact) =>
    contact.name.toLowerCase().includes(term) ||
    contact.email.toLowerCase().includes(term) ||
    contact.phone_number.toLowerCase().includes(term)
  );
};
