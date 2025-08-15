export const formatCardNumber = (input: string): string => {
  const value = input.replace(/\D/g, '').slice(0, 19);
  const groups = value.match(/.{1,4}/g) || [];
  return groups.join(' ');
};

export const formatExpiry = (input: string): string => {
  const digits = input.replace(/\D/g, '').slice(0, 4);
  let formatted = digits;
  if (digits.length >= 3) {
    formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return formatted;
};

export const formatCvc = (input: string): string => {
  return input.replace(/\D/g, '').slice(0, 3);
};

export const formatCardholder = (input: string): string => {
  return input
    .toUpperCase()
    .replace(/[^A-Z\s]/g, '')
    .replace(/\s+/g, ' ')
    .trimStart();
};

