import { translate } from "../vocabs/dictionary";
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
export function validate(rateRequest: IRateRequest | null) {
    const error: string[] = [];
    if (!rateRequest) {
        error.push("INVALID_FORMAT");
    } else {
        if (Number.isNaN(rateRequest.rate)) {
            error.push("INVALID_RATE");
        }
        if (!ethUnitsConvertor(rateRequest.etherUnit)) {
            error.push("INVALID_ETHER_UNIT");
        }

        if (!timeUnitsConvertor(rateRequest.timeUnit)) {
            error.push("INVALID_TIME_UNIT");
        }
    }
    if (!error.length) {
        return null;
    } else {
        return error;
    }
}

export const getErrorMessage = (errors: string[] | null) => !errors || !errors.length ? "" : ["ERRORS", ...errors].map(translate).join(".\n")

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
