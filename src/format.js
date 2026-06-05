/** Sum an arbitrary number of planck values (string|bigint) -> BigInt. */
export function sumPlanck(...values) {
  return values.reduce((acc, v) => acc + BigInt(v ?? 0n), 0n);
}

/**
 * Format a planck value (string|bigint) into a decimal string applying
 * `decimals`, e.g. formatPlanck("5119335029711074", 9) -> "5119335.029711074".
 * Trailing zeros in the fractional part are trimmed.
 */
export function formatPlanck(value, decimals) {
  const planck = BigInt(value ?? 0n);
  const negative = planck < 0n;
  const abs = negative ? -planck : planck;

  if (decimals <= 0) {
    return (negative ? '-' : '') + abs.toString();
  }

  const base = 10n ** BigInt(decimals);
  const whole = abs / base;
  const fraction = (abs % base).toString().padStart(decimals, '0').replace(/0+$/, '');

  const sign = negative ? '-' : '';
  return fraction ? `${sign}${whole}.${fraction}` : `${sign}${whole}`;
}
