import dataDAO from "../dao/dataDAO.js"

export default class DataController {
    static async apiGetData(req, res, next){
        let data = await dataDAO.getData()
        if (!data) {
            res.status(404).json({error:"Not Found"})
            return
        }
        res.json(data)
    } catch(e) {
        console.log(`api, ${e}`)
        res.status(500).json({error:e})
    }
}