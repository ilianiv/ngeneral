/**
 * Make a string's first character uppercase
 * @param subject
 * @returns {string}
 */
export function ucfirst(subject: string) {
  return subject.charAt(0).toUpperCase() + subject.substr(1);
}

/**
 *
 * @param value
 */
export function toNumber(value: any): number {
  return +value || 0;
}