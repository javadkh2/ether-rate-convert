/**
 * this file includes the eth-normalizer express router
 */

import Router, { NextFunction, Request, Response } from "express";
import { getErrorMessage, getNormalRate, IRateRequest, parseRateRequest, validate } from "../lib/rateParser";

const router = Router();

// response to get request for normalizing ETH rates per time
router.get("/", function ethNormalizer(req: Request, res: Response, next: NextFunction) {
    const rate = req.query.rate;
    const rateRequest = parseRateRequest(rate);
    const error = validate(rateRequest);
    if (error) {
        res.status(400);
        res.json({ error: getErrorMessage(error) });
    } else {
        res.json({ result: getNormalRate(rateRequest as IRateRequest) });
    }
});

export default router;
