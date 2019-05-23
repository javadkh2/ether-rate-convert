/**
 * this file includes the eth-normalizer express router
 */

import Router, { NextFunction, Request, Response } from "express";

const router = Router();

// response to get request for normalizing ETH rates per time
router.get("/", function ethNormalizer(req: Request, res: Response, next: NextFunction) {
    next(new Error("its nut implemented"));
});

export default router;
