const express = require('express');
const app = express();
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
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
        // for daynamic id 
        app.get('/users/:id',async(req,res)=>{
            const id = req.params.id;
            const query ={
                _id: new ObjectId(id)
            }
            const user = await userCollection.findOne(query)
         
            res.send(user)
        })
        // for post / add 
        app.post('/users', async(req,res)=>{
            const newUser = req.body;
            console.log("user to inserted", newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result)
        })
        // update
        app.patch('/users/:id', async(req,res)=>{
            const id = req.params.id
            const filter = {
                _id:new ObjectId(id)

            }
            const modifieduser= req.body;
            const updateDocumnet = {
                $set:{
                    name:modifieduser.name,
                    email:modifieduser.email,
                    role:modifieduser.role


                }
            }
            const result = await userCollection.updateOne(filter, updateDocumnet);
            res.send(result);
        })
        // for delete
        app.delete('/users/:id',async(req, res) =>{
            const id = req.params.id;
            const query ={
                _id: new ObjectId(id)
            }
            const result = await userCollection.deleteOne(query)
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