/**
 * etcConvertor test file
 */

import { convertorType } from "../../src/lib/utils";
import { timeUnitsConvertor } from "../../src/lib/timeUnitsConvertor";

describe("testing time convertor functionality", () => {
    [
        ["day", 24],
        ["hour", 1],
        ["minute", 1 / 60],
        ["second", 1 / (60 * 60)],
    ].map(([unit, ratio]) => it(`it should return ${unit}ToHour convertor and the convertor return ${ratio} for 1 ${unit}`, () => {
        const convertor = timeUnitsConvertor(unit as string);
        expect(convertor).not.toBeNull();
        expect((convertor as convertorType)(1)).toEqual(ratio as number);
    }));
});
