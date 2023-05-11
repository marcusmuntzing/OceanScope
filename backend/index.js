import app from "./server.js"
import mongodb from "mongodb"
import dataDAO from "./dao/dataDAO.js"

const MongoClient = mongodb.MongoClient
const mongo_username = "oceanscope"
const mongo_password = "oceanscope"

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.fbyof7e.mongodb.net/?retryWrites=true&w=majority`
const port = 8000


MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await dataDAO.injectDB(client)
        app.listen(port, ()=> {
            console.log(`listening on port ${port}`)
        })
    })