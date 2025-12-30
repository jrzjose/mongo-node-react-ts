import express from "express";
import { ObjectId } from "mongodb";
import { connectClient } from "../db";

const router = express.Router();

router.get("", async (_: express.Request, res: express.Response) => {
    //  res.send({ customers: testData });
    const client = await connectClient();

    const customers = await client
        .collection("customers")
        .find()
        .project({
            email: 1,
            customer: 1,            
            address: 1,
            joinDate: 1,
            _id: 1,
        })
        .toArray();

    res.send({ customers });
});

router.get("/:customerId", async (req: express.Request, res: express.Response) => {
    const client = await connectClient();

    const customer = await client
        .collection("customers")
        .findOne({ _id: new ObjectId(req.params.customerId) });

    res.send({ customer });
});


router.post("/", async (req: express.Request, res: express.Response) => {
    const { email, customer, address, joinDate} = req.body;

    const client = await connectClient();
    const doc = await client.collection("customers").insertOne({
        email,
        customer, 
        address, 
        joinDate
    });

    const c = await client
    .collection("customers")
    .findOne({ _id: doc.insertedId });

    res.send({ c });
});

router.put("/:customerId", async (req: express.Request, res: express.Response) => {
    const client = await connectClient();

    const { email, customer, address, joinDate} = req.body;
    const doc = await client
        .collection("customers")
        .findOneAndUpdate(
            { _id: new ObjectId(req.params.customerId) },
            {
                $set: {
                    email: email, 
                    customer: customer, 
                    address: address, 
                    joinDate: joinDate,
                    timestamp: new Date()
                }
            },
            { returnDocument: "after" },
        );

    res.send({ updatedCustomer: doc.value });
});

router.delete("/:customerId", async (req: express.Request, res: express.Response) => {
    const client = await connectClient();
    const id = new ObjectId(req.params.customerId);

    const customer = await client
        .collection("customers")
        .findOne({ _id: id });

    const result = await client.collection('customers').deleteOne({
        _id: customer._id
    });
    if (result.acknowledged && result.deletedCount > 0)
        res.status(200).json({ message: `Resource ${id} deleted successfully` })
    else
        res.status(200).json({ message: `Could not remove Resource ${id}` })
});

export default router;