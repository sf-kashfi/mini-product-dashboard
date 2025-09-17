import numeral from 'numeral';

export function fCurrency(value: number): string {
    return numeral(value).format(Number.isInteger(value) ? '$0,0' : '$0,0.00');
}