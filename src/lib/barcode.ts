export function generateBoletoLinhaDigitavel(receiptNumber: string, amountCents: number): string {
  // Extract numbers from receiptNumber or generate deterministic digits
  const numDigits = receiptNumber.replace(/\D/g, "").padEnd(8, "0").slice(0, 8);
  const amountStr = amountCents.toString().padStart(10, "0");

  const p1 = `34191.${numDigits.slice(0, 5)}`;
  const p2 = `${numDigits.slice(5, 8)}01.450123`;
  const p3 = `91020.150008`;
  const dv = `8`;
  const p4 = `9654${amountStr}`;

  return `${p1} ${p2} ${p3} ${dv} ${p4}`;
}
