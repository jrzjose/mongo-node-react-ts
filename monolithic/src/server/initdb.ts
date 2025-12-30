
import mongoose, { Schema, Model, Document } from "mongoose";
import { readFileSync } from "fs";

// 1) Define the TypeScript interface for your Book data
interface IBook {
    id: string;
    description: string;
    author: string;
    summary: string;
}

// (Optional) If you need mongoose document methods, use an extended type
// For basic insertMany use-cases, IBook is often enough. If you need
// document fields like _id and timestamps, you can extend Document.
interface IBookDocument extends IBook, Document { }

// 2) Define Schema and Model with generics
const bookSchema = new Schema<IBookDocument>({
    id: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    summary: { type: String, required: true }
});

// The Model type can be Model<IBookDocument>
const Book: Model<IBookDocument> = mongoose.model<IBookDocument>("Book", bookSchema);

async function existCollection(collectionName: string): Promise<boolean> {
    console.log("validating collection...");
    const collections = await mongoose.connection.db.listCollections({ name: collectionName }).toArray();
    console.log("collection found..." + collections.length);
    const count = await Book.countDocuments({ status: 'active' });
    console.log("countDocuments..." + count);
    return collections.length > 0;
}

async function isEmpty(): Promise<boolean> {
    const count = await Book.countDocuments();
    console.log("countDocuments..." + count);
    return count == 0;
}

async function importData(): Promise<void> {
    try {
        console.log("reading dataset");
        console.log(process.cwd());
        const data = readFileSync("./books-dataset.json", "utf-8");
        const books: IBook[] = JSON.parse(data);

        console.log("inserting dataset");
        const result = await Book.insertMany(books);
        console.log(`${result.length} documents were inserted.`);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.error("An unexpected error occurred", error);
        }
    }
    finally {
        // Always close the connection
        await mongoose.connection.close();
    }
}

export async function initdb(): Promise<void> {
    // 5) Connect to MongoDB and run the import
    console.log("init import...");
    await mongoose.connect("mongodb://admin:adminpass@mongodb:27017/local?authSource=admin");
    isEmpty().then((empty: boolean) => {
        console.log("is book collection empty:" + empty);
        if (empty) {
            importData();
        }
  })
}
