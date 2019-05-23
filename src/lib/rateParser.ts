import { ethUnitsConvertor } from "./ethUnitsConvertor";
import { timeUnitsConvertor } from "./timeUnitsConvertor";
import { ignoreWhiteSpaces } from "./utils";

export interface IRateRequest {
    etherUnit: string;
    rate: number;
    timeUnit: string;
}

// parse a request string and return a json with IRateRequest structure;
// if the string has not valid format return null
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

// check a rateRequest for different errors
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

// return normal result in wei/hour unit
export function getNormalRate(rateRequest: IRateRequest) {
    const etherUnitConvertor = ethUnitsConvertor(rateRequest.etherUnit);
    const timeUnitConvertor = timeUnitsConvertor(rateRequest.timeUnit);
    if (etherUnitConvertor && timeUnitConvertor) {
        return etherUnitConvertor(rateRequest.rate) / timeUnitConvertor(1);
    } else {
        return null;
    }
}
