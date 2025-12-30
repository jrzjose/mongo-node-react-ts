import express from "express";
import { connectClient } from "../db";

const router = express.Router();

router.get("", async (_: express.Request, res: express.Response) => {
    //  res.send({ contests: testData });
    const client = await connectClient();

    const contests = await client
        .collection("contests")
        .find()
        .project({
            id: 1,
            categoryName: 1,
            contestName: 1,
            _id: 0,
        })
        .toArray();

    res.send({ contests });
});

router.get("/:contestId", async (req: express.Request, res: express.Response) => {
    const client = await connectClient();

    const contest = await client
        .collection("contests")
        .findOne({ id: req.params.contestId });

    res.send({ contest });
});

router.put("/:contestId", async (req: express.Request, res: express.Response) => {
    const client = await connectClient();

    const { categoryName,  contestName} = req.body;

    const doc = await client
        .collection("contests")
        .findOneAndUpdate(
            { id: req.params.contestId },
            {
                $set: {
                    categoryName: categoryName,
                    contestName: contestName,
                    timestamp: new Date(),
                },
            },
            { returnDocument: "after" },
        );

    res.send({ updatedContest: doc.value });
});

router.delete("/:contestId", async (req: express.Request, res: express.Response) => {
    const client = await connectClient();
    const id = req.params.contestId;

    const contest = await client
        .collection("contests")
        .findOne({ id: id });

    const result = await client.collection('contests').deleteOne({
        _id: contest._id
    });
    
    if (result.acknowledged && result.deletedCount > 0)
        res.status(200).json({ message: `Resource ${id} deleted successfully` })
    else
        res.status(200).json({ message: `Could not remove Resource ${id}` })
});

router.post("/", async (req: express.Request, res: express.Response) => {
    const { contestName, categoryName, description } = req.body;

    const client = await connectClient();
    const doc = await client.collection("contests").insertOne({
        id: contestName.toLowerCase().replace(/\s/g, "-"),
        contestName,
        categoryName,
        description,
        names: [],
    });

    const contest = await client
        .collection("contests")
        .findOne({ _id: doc.insertedId });

    res.send({ contest });
});

export default router;