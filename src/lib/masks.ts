/**
 * Utility functions for Brazilian input masks (CNPJ/CPF and Phone)
 */

export function formatDocumentMask(value: string): string {
  // Allow alphanumeric characters (supporting new CNPJ format)
  const cleaned = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

  if (cleaned.length <= 11) {
    // Format as CPF: 000.000.000-00
    return cleaned
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  } else {
    // Format as CNPJ (traditional or alphanumeric): 00.000.000/0001-00
    return cleaned
      .replace(/^([a-zA-Z0-9]{2})([a-zA-Z0-9])/, "$1.$2")
      .replace(/^([a-zA-Z0-9]{2})\.([a-zA-Z0-9]{3})([a-zA-Z0-9])/, "$1.$2.$3")
      .replace(/\.([a-zA-Z0-9]{3})([a-zA-Z0-9])/, ".$1/$2")
      .replace(/\/([a-zA-Z0-9]{4})([a-zA-Z0-9])/, "/$1-$2")
      .slice(0, 18);
  }
}

export function formatPhoneMask(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) {
    return digits.length > 0 ? `(${digits}` : "";
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    // Landline: (00) 0000-0000
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  // Mobile: (00) 00000-0000
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}
