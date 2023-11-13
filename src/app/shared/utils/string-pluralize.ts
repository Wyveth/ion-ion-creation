export function pluralize(str: string): string {
  return str
    .split(' ')
    .map((word: string) => word + 's')
    .join(' ');
}
