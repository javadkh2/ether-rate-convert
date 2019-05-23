/**
 * etcConvertor test file
 */

import { ethUnitsConvertor } from "../../src/lib/ethUnitsConvertor";
import { convertorType } from "../../src/lib/FP";

describe("testing eth convertor functionality", () => {
    [
        ["ether", 1000000000000000000],
        ["milliether", 1000000000000000],
        ["microether", 1000000000000],
        ["gwei", 1000000000],
        ["mwei", 1000000],
        ["kwei", 1000],
        ["wei", 1],
    ].map(([unit, ratio]) => it(`it should return ${unit}ToWei convertor and the convertor return ${ratio} for 1 ${unit}`, () => {
        const convertor = ethUnitsConvertor(unit as string);
        expect(convertor).not.toBeNull();
        expect((convertor as convertorType)(1)).toEqual(ratio as number);
    }));
});
