import express from "express"
import 'dotenv/config'
import { Collection, MongoClient } from "mongodb"
import bodyParser from "body-parser"
import cors from "cors"

const port = 3000
const app = express()
app.use(bodyParser.json())
app.use(cors())

const url = process.env.MONGO_URI 
const client = new MongoClient(url)
const dbName = "passop"
client.connect()

//save all the passwords
app.post("/",async (req, res)=>{
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const finalResult = await collection.insertOne(password)
    res.send({success:true,result:finalResult})
})

app.delete("/",async (req, res)=>{
    const password = req.body
    console.log(password)
    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const finalResult = await collection.deleteOne({id:password.id})
    res.send({success:true,result:finalResult})
})


// get all the passwords
app.get("/",async (req,res)=>{
    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const finalResult = await collection.find({}).toArray()
    res.json(finalResult)
})



app.listen(port,()=>{
    console.log(`Server has started on port : http://localhost:${port}`);
    
})
