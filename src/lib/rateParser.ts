import { ethUnitsConvertor } from "./ethUnitsConvertor";
import { ignoreWhiteSpaces } from "./FP";
import { timeUnitsConvertor } from "./timeUnitsConvertor";

export interface IRateRequest {
    etherUnit: string;
    rate: number;
    timeUnit: string;
}

export function parseRateRequest(request: string): IRateRequest | null {
    const matcher = /([\d\.\s]+)([^\/\\]+)[\/\\](.+)/;
    const groups = (request || "").match(matcher);
    if (groups && groups.length === 4) {
        const [, rate, etherUnit, timeUnit] = groups.map(ignoreWhiteSpaces);
        return {
            etherUnit: etherUnit.toLowerCase(),
            rate: Number.parseFloat(rate),
            timeUnit: timeUnit.toLowerCase(),
        };
    } else {
        return null;
    }
}

export function getErrors(rateRequest: IRateRequest | null) {
    const message: string[] = [];
    if (!rateRequest) {
        message.push("invalid request format, you must send your request as /?rate=<number> <ETHUnit> / <timeUnit>");
    } else {
        if (Number.isNaN(rateRequest.rate)) {
            message.push("you must enter a valid number for rate");
        }
        if (!ethUnitsConvertor(rateRequest.etherUnit)) {
            message.push("you must choose ether unit in [ether,milliether,microether,gwei,mwei,kwei,wei]");
        }

        if (!timeUnitsConvertor(rateRequest.timeUnit)) {
            message.push("you must choose time unit in [day,hour,minute,second]");
        }
    }
    if (!message.length) {
        return null;
    } else {
        return `error(s) in processing your request: \n ${message.join("\n")}`;
    }
}

export function getNormalRate(rateRequest: IRateRequest) {
    const etherUnitConvertor = ethUnitsConvertor(rateRequest.etherUnit);
    const timeUnitConvertor = timeUnitsConvertor(rateRequest.timeUnit);
    if (etherUnitConvertor && timeUnitConvertor) {
        return etherUnitConvertor(rateRequest.rate) / timeUnitConvertor(1);
    } else {
        return null;
    }
}
