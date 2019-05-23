/**
 * this file includes basic general functions
 */

// a function for convert input to base type with special ratio;
export type convertorType = (amount: number) => number;
export type convertorToBaseType = (ratio: number) => convertorType;
export const convertToBase: convertorToBaseType = (ratio: number) => (amount: number) => ratio * amount;

export const replace = (replaceValue: string) => (regex: RegExp) => (str: string) => str.replace(regex, replaceValue);
export const removeMatches = replace("");
export const ignoreWhiteSpaces = removeMatches(/\s/ig);
