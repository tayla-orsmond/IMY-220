//connect to mongodb server
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://taylaOrsmond:<imyiscool>@demo.yqz62w3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
require("regenerator-runtime/runtime");

queryEvents();

//async function that queries the events collection to fetch only the events that take place in Brooklyn and fall between 8th of October and the 26th of October
//console logs the events
async function queryEvents() {
    try {
        await client.connect();
        const db = client.db("DBExample");
        const col = db.collection("events");
        const cursor = col.find({"location": "Brooklyn", "date": { $gte: "2019-10-08", $lte: "2019-10-26" }}, { "name": 1, "description": 1 });
        const results = await cursor.toArray();
        console.log(results);
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}







