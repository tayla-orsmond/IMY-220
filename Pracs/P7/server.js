//Tayla Orsmond u21467456

//importing the express module
import express from "express";

const app = express();

app.use(express.static("public"));

const PORT = 5050;
app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}/`);
});