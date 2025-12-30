import express from "express";
import { connectClient } from "../db";

const router = express.Router();

router.get("", async (_: express.Request, res: express.Response) => {
    //  res.send({ books: testData });
    const client = await connectClient();

    const books = await client
        .collection("books")
        .find()
        .project({
            id: 1,
            description: 1,
            author: 1,
            summary: 1,
            _id: 0,
        })
        .toArray();

    res.send({ books });
});

router.get("/:bookId", async (req: express.Request, res: express.Response) => {
    const client = await connectClient();

    const book = await client
        .collection("books")
        .findOne({ id: req.params.bookId });

    res.send({ book });
});

router.put("/:bookId", async (req: express.Request, res: express.Response) => {
    const client = await connectClient();

    const { description, author, summary } = req.body;

    const doc = await client
        .collection("books")
        .findOneAndUpdate(
            { id: req.params.bookId },
            {
                $set: {
                    description: description, 
                    author: author, 
                    summary: summary, 
                    timestamp: new Date()
                }
            },
            { returnDocument: "after" },
        );

    res.send({ updatedBook: doc.value });
});

router.delete("/:bookId", async (req: express.Request, res: express.Response) => {
    const client = await connectClient();
    const id = req.params.bookId;

    const book = await client
        .collection("books")
        .findOne({ id: id });

    const result = await client.collection('books').deleteOne({
        _id: book._id
    });
    if (result.acknowledged && result.deletedCount > 0)
        res.status(200).json({ message: `Resource ${id} deleted successfully` })
    else
        res.status(200).json({ message: `Could not remove Resource ${id}` })
});

router.post("/", async (req: express.Request, res: express.Response) => {
    const { description, author, summary } = req.body;

    const client = await connectClient();
    const doc = await client.collection("books").insertOne({
        id: description.toLowerCase().replace(/\s/g, "-"),
        description,
        author,
        summary
    });

    const book = await client
        .collection("books")
        .findOne({ _id: doc.insertedId });

    res.send({ book });
});


export default router;