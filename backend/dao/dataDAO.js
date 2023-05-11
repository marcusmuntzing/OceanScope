import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId


let data

export default class dataDAO{
    static async injectDB(conn){
        if (data){
            return
        }
        try{
            data = await conn.db("data").collection("data")
        } catch(e){
            console.error(`Unable to establish collection handels in userDAO: ${e}`)
        }
    }

    static async getData(){
        try{
            return await data.findAll()
        } catch(e){
            console.error(`Unable to fetch data ${e}`)
            return {error: e}
        }
    }

}