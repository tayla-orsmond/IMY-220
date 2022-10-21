//41_Orsmond
/** 2.1
 * Use NodeJS to read the contents of questions.json and use socket.io to send the file (which can only be read server-side) to the client.
 * 
 */
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//connect to mongodb server
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://taylaOrsmond:imyiscool@demo.yqz62w3.mongodb.net/test?authSource=DBExample&authMechanism=SCRAM-SHA-1';
const client = new MongoClient(uri);
require("regenerator-runtime/runtime");


io.on('connection', (socket) => {
    queryClasses().then((results) => {
        socket.emit('classes', results);
    });
    console.log('Connection successful:');
    socket.on("enrollment", (code) => {
        console.log("Enrollment request received for code: " + code);
        queryUsers(code).then((results) => {
            socket.emit('users', results);
        });
    });
});


const PORT = 3000;

server.listen(PORT, () => {
    console.log(`\nListening on http://localhost:${PORT}`);
});

//async function to query the classes collection to fetch only the name and code of the classes
//sends the results to the client + logs the results in the console
async function queryClasses() {
    try {
        await client.connect();
        const db = client.db("DBExample");
        const col = db.collection("classes");
        const cursor = col.find({}, { projection: { name: 1, code: 1 , _id: 0} });
        const results = await cursor.toArray();
        io.emit('classes', results);
        console.log(results);
        return results;
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

//async function to query the users collection to fetch only the users that are enrolled in the class with the given code
//sends the results to the client
async function queryUsers(code) {
    try {
        await client.connect();
        const db = client.db("DBExample");
        const col = db.collection("users");
        const cursor = col.find({ enrolled: code });
        const results = await cursor.toArray();
        return results;
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
