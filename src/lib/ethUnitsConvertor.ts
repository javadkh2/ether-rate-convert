/**
 * this file handling unit conversion to wei
 */
import { convertToBase, tenExponentiation } from "./utils";

// compose convertToBase and tenExponentiation to create convert function
// the function get a bower an return a convertor that convert the input to base with ratio 10**power
export const tenPowerConvert = (power: number) => convertToBase(tenExponentiation(power));

// collection on conversion function that convert ether units to wei
export const etherToWei = tenPowerConvert(18);
export const millietherToWei = tenPowerConvert(15);
export const microetherToWei = tenPowerConvert(12);
export const gweiToWei = tenPowerConvert(9);
export const mweiToWei = tenPowerConvert(6);
export const kweiToWei = tenPowerConvert(3);
export const weiToWei = tenPowerConvert(0);

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
