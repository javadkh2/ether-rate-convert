/**
 * this file includes the express app
 */

import express from "express";
import ethNormalizerRouter from "./routes/ethNormalizer";

const app = express();

app.use("/eth-rate-convert", ethNormalizerRouter);

export default app;
