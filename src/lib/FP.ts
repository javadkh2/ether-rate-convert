/**
 * this file includes basic Functional Programing tools
 */

// it's mathematical function f o g = f(g(x))- compose n function to each other and return a function
export const compose = (...func: Array<(arg: any) => any>) => (args: any) => func.reduceRight((arg, fn) => fn(arg), args);

// curry return a function for treat with a function like a chain of functions with partial input
export const curry = (func: (...args: any) => any) => {
    const chain = (oldArgs: any[]) => (...partials: any[]) => {
        const args = [...oldArgs, ...partials]
        return args.length >= func.length ? func(...args) : chain(args);
    };
    return chain([]);
};

// trampoline for TCO (Tail Call Optimization) on javascript till the engines implement it
// wrap the main function to it and return a function instead of run it inside the main function
// trampoline calls the returned function. With this trick the main function execution path finish
// so the stack become free
export const trampoline = (fn: any) => (...args: any[]) => {
    let result = fn(...args);
    while (typeof result === "function") {
        result = result();
    }
    return result();
};

// a function for convert input to base type with special ratio;
export type convertorType = (amount: number) => number;
export type convertorToBaseType = (ratio: number) => convertorType;
export const convertToBase: convertorToBaseType = curry((ratio: number, amount: number) => ratio * amount);

export const replace = (replaceValue: string) => (regex: RegExp) => (str: string) => str.replace(regex, replaceValue);
export const removeMatches = replace("");
export const ignoreWhiteSpaces = removeMatches(/\s/ig);
