const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
const port = 3000;
app.use(cors());

const uri = "mongodb+srv://p455:cpsc455@cpsc455.ij1dhgf.mongodb.net/CPSC455-project?retryWrites=true&w=majority&appName=CPSC455"

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Successfully connected with the database");
    } catch (error) {
        console.log("Error connecting to database: ", error);
    }
}

connect()

app.get('/users', async (req, res) => {
    try {
        const db = mongoose.connection.db;
        const collection = db.collection('users');
        const data = await collection.find().toArray();
        res.json(data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}.`)
})