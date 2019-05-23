/**
 * test file for parseRateRequest module;
 */
import { getErrors, getNormalRate, IRateRequest, parseRateRequest } from "../../src/lib/rateParser";

describe("test parseRateRequest functionality", () => {
    it("should return an RateRequest object if the request match by pattern", () => {
        const request = "1.1 Ether/ Day";
        const rateRequest = parseRateRequest(request);
        expect(rateRequest).not.toBeNull();
        if (rateRequest) {
            expect(rateRequest.etherUnit).toEqual("ether");
            expect(rateRequest.timeUnit).toEqual("day");
            expect(rateRequest.rate).toEqual(1.1);
        }
    });

    it("should ignore white spaces around or between words and change Capital words to lower case", () => {
        const request = "  1.1   Et her  /  D ay";
        const rateRequest = parseRateRequest(request);
        expect(rateRequest).not.toBeNull();
        if (rateRequest) {
            expect(rateRequest.etherUnit).toEqual("ether");
            expect(rateRequest.timeUnit).toEqual("day");
            expect(rateRequest.rate).toEqual(1.1);
        }
    });

    it("should return null if the request format is not valid", () => {
        const request = "one Ether per Day";
        const rateRequest = parseRateRequest(request);
        expect(rateRequest).toBeNull();
    });
});

describe("test getErrors functionality", () => {

    it("should return null if there is no error", () => {
        const rateRequest = parseRateRequest("1.1 Ether / Day");
        const error = getErrors(rateRequest);
        expect(error).toBeNull();
    });

    it("should return error if the parse result is null", () => {
        const rateRequest = parseRateRequest("one Ether per Day");
        const error = getErrors(rateRequest);
        expect(error).not.toBeNull();
    });

    it("should return error if request parser but the ether units are invalid ", () => {
        const rateRequest = parseRateRequest("1.1 Etherr / Day");
        const error = getErrors(rateRequest);
        expect(error).not.toBeNull();
    });



    it("should return error if request parser but the time units are invalid ", () => {
        const rateRequest = parseRateRequest("1.1 Ether / Days");
        const error = getErrors(rateRequest);
        expect(error).not.toBeNull();
    });

    it("should return error if request parser but the number cant convert truly ", () => {
        const rateRequest = parseRateRequest("one Ether / Day");
        const error = getErrors(rateRequest);
        expect(error).not.toBeNull();
    });

});

describe("test getNormalRate functionality", () => {
    it("it should return 4166666666666666.5   for  0.1 Ether / Day", () => {
        const result = 0.1 * 1000000000000000000 / 24;
        const rateRequest = parseRateRequest("0.1 Ether / day") as IRateRequest;
        const rate = getNormalRate(rateRequest);
        expect(rate).toBe(result);
    });
});
