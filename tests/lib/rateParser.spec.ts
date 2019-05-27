/**
 * test file for parseRateRequest module;
 */
import { validate, getNormalRate, IRateRequest, parseRateRequest, getErrorMessage } from "../../src/lib/rateParser";

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

    it("should return null if the request is an empty string", () => {
        const rateRequest = parseRateRequest("");
        expect(rateRequest).toBeNull();
    });
});

describe("test validate functionality", () => {

    it("should return null if there is no error", () => {
        const rateRequest = parseRateRequest("1.1 Ether / Day");
        const error = validate(rateRequest);
        expect(error).toBeNull();
    });

    it("should return error if the parse result is null", () => {
        const rateRequest = parseRateRequest("one Ether per Day");
        const error = validate(rateRequest);
        expect(error).not.toBeNull();
        expect(error).toEqual(["INVALID_FORMAT"]);
    });

    it("should return error if request parser but the ether units are invalid ", () => {
        const rateRequest = parseRateRequest("1.1 Etherr / Day");
        const error = validate(rateRequest);
        expect(error).not.toBeNull();
        expect(error).toEqual(["INVALID_ETHER_UNIT"]);
    });



    it("should return error if request parser but the time units are invalid ", () => {
        const rateRequest = parseRateRequest("1.1 Ether / Days");
        const error = validate(rateRequest);
        expect(error).not.toBeNull();
        expect(error).toEqual(["INVALID_TIME_UNIT"]);
    });

    it("should return error if request parser but the number cant convert truly ", () => {
        const rateRequest = parseRateRequest("one Ether / Day");
        const error = validate(rateRequest);
        expect(error).not.toBeNull();
        expect(error).toEqual(["INVALID_RATE"]);
    });

});

describe("test getNormalRate functionality", () => {
    it("it should return 4166666666666666.5   for  0.1 Ether / Day", () => {
        const result = 0.1 * 1000000000000000000 / 24;
        const rateRequest = parseRateRequest("0.1 Ether / day") as IRateRequest;
        const rate = getNormalRate(rateRequest);
        expect(rate).toBe(result);
    });

    it("it should return null for invalid request", () => {
        const rateRequest = parseRateRequest("0.1 Ethers / day") as IRateRequest;
        const rate = getNormalRate(rateRequest);
        expect(rate).toBeNull();
    });
});

describe("test getErrorMessage functionality", () => {
    it("it should return null if the input is null", () => {
        const message =  getErrorMessage(null);
        expect(message).toEqual("");
    });
    it("it should return null if the input is empty array", () => {
        const message =  getErrorMessage([]);
        expect(message).toEqual("");
    });

    it("it should return error message if the input is an array with length > 0", () => {
        const message =  getErrorMessage(["ERROR_KEY"]);
        expect(message).toBeDefined();
        expect(message).not.toBeNull();
        expect(message.length > 0).toBeTruthy();
    });
});
