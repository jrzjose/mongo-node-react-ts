import express from "express";

const router = express.Router();

router.get("/hello", (_: express.Request, res: express.Response) => {
    res.send("Hello Vite + React + TypeScript2!");
});

router.get("/health", (_req: express.Request, res: express.Response) => res.json({ ok: true }));

export default router;