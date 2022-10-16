import express from 'express';

const app = express();

app.use(express.static("public"));

const port = process.env.PORT || 5050;
app.listen(port, () => {
    //link to the server
    console.log(`Server: http://localhost:${port}`);
});