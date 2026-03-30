import 'dotenv/config';
import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("yay you connected");
}
catch (err) {
    console.error("oh hell nah", err);
}
let db = client.db("umsa");
export default db;
