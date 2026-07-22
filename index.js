const express = require('express');
const app = express();
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb')
const port = process.env.PROT || 8000;


app.use(cors())
app.use(express.json())
// from mongobd
const uri = `mongodb://SimpleCrudUser:iPiZCecBDZHCgbgp@ac-tbahnbk-shard-00-00.cg84gdj.mongodb.net:27017,ac-tbahnbk-shard-00-01.cg84gdj.mongodb.net:27017,ac-tbahnbk-shard-00-02.cg84gdj.mongodb.net:27017/?ssl=true&replicaSet=atlas-cbdgwz-shard-0&authSource=admin&appName=Cluster0&compressors=zlib`
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})
const run = async () => {
    try {
        await client.connect()
        // from mongodb doce client laibary find  documnet 
        const database = client.db("SimpleCrud");
        const userCollection = database.collection("user");

        app.get('/users', async(req,res)=>{
            const cursor = userCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        })

        await client.db('admin').command({ ping: 1 });
        console.log('pinged your deployment seccesfully connect Mongobd');
    }
    finally {

    }
}
run().catch(console.dir)

// mongodb+srv://SimpleCrudUser:iPiZCecBDZHCgbgp@cluster0.cg84gdj.mongodb.net/?appName=Cluster0

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// iPiZCecBDZHCgbgp
// SimpleCrudUser