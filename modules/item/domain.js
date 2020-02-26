const{
    serviceAddItem,
    serviceUpdateItem,
    serviceDeleteItem,
    serviceGetItem,
    serviceGetItemById
} = require("./query")
const {
    checkToken
} = require("../../.Auth/token.validation")
const { verify } = require("jsonwebtoken")

module.exports = {
    async addItem (req,res){
        const data = req.body
        let token = req.get("authorization")
        if (token) {
            token =token.slice(7)
            verify(token,'secretkey',(err,decoded)=>{
                if (err) {
                    res.status(500).json({
                        status: "denied",
                        message: "login before"
                    })
                }else{
                    data.owner = decoded.result.nama
                    serviceAddItem(data,(err,result)=>{
                        if (err) {
                            return res.status(500).json({
                                success: 0,
                                message: "Database connection error"
                            })
                        }
                        return res.status(200).json({
                            success:1, 
                            data: result
                        })
                    })
                }
            })
        }
    },
    
    async getItem(req,res){
        let token = req.get("authorization")
        if (token) {
            token =token.slice(7)
            verify(token,'secretkey',(err,decoded)=>{
                if (err) {
                    res.status(500).json({
                        status: "denied",
                        message: "login before"
                    })
                }else{
                    serviceGetItem(decoded.result.nama,(err,result)=>{
                        result.owner = undefined
                        if (err) {
                            return res.status(404).json({
                                success: 0,
                                message: "U dont have item please add before"
                            })
                        }
                        return res.status(200).json({
                            success: 1,
                            dataItem: result
                        })
                    })
                }
            })
        }
    }
}