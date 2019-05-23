/**
 * this file handling unit conversion to wei
 */
import { convertToBase } from "./utils";

// collection on conversion function that convert ether units to wei
export const etherToWei = convertToBase(1000000000000000000);
export const millietherToWei = convertToBase(1000000000000000);
export const microetherToWei = convertToBase(1000000000000);
export const gweiToWei = convertToBase(1000000000);
export const mweiToWei = convertToBase(1000000);
export const kweiToWei = convertToBase(1000);
export const weiToWei = convertToBase(1);

// check a ether unit name and return the convertor function
export function ethUnitsConvertor(convertor: string) {
    switch (convertor) {
        case "eth":
        case "ether": return etherToWei;
        case "milliether": return millietherToWei;
        case "microether": return microetherToWei;
        case "gwei": return gweiToWei;
        case "mwei": return mweiToWei;
        case "kwei": return kweiToWei;
        case "wei": return weiToWei;
        default: return null;
    }
}
