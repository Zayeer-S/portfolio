export function formatExpressionForDispaly(expression: string): string {
  return expression
    .replace(/(and|or|not)/g, ' $1 ')
    .replace(/([+\-*/^()])/g, ' $1 ')
    .replace(/([<>!=]{1,2})/g, ' $1 ')
    .replace(/\s+/g, ' ')
    .trim();
}
