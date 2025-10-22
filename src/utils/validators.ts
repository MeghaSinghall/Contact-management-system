export const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validateForm = (formData: { name: string; email: string; phone_number: string }) => {
  if (!formData.name.trim()) return { valid: false, message: 'Please enter a name' };
  if (!formData.email.trim()) return { valid: false, message: 'Please enter an email' };
  if (!validateEmail(formData.email)) return { valid: false, message: 'Please enter a valid email' };
  if (!formData.phone_number || formData.phone_number.replace(/\D/g, '').length < 7)
    return { valid: false, message: 'Please enter a valid phone number' };
  return { valid: true };
};
