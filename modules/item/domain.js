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
    },
    updateItem: (req,res)=>{
        let token = req.get("authorization")
        let {id}=req.params,data = req.body
        if (token) {
            token =token.slice(7)
            verify(token,'secretkey',(err,decoded)=>{
                if (err) {
                    return res.status(404).json({
                        success: 0,
                        message: "U cant update data"
                    })
                }else{
                    data.owner = decoded.result.nama
                    data.id = id
                    serviceUpdateItem(data,(err,result)=>{
                        if (err) {
                            return res.status(404).json({
                                success: 0,
                                message: "U dont have this item please add before"
                            })
                        }else if(result.affectedRows<1){
                            return res.status(400).json({
                                success: 0,
                                message: "U dont have this item please add before"
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
    },
    deleteItem:(req,res)=>{
        let token = req.get("authorization")
        let {id}=req.params,data = req.body
        if (token) {
            token =token.slice(7)
            verify(token,'secretkey',(err,decoded)=>{
                data.id = id
                data.owner = decoded.result.nama
                serviceDeleteItem(data,(err,result)=>{
                    if (err) {
                        return res.status(404).json({
                            success: 0,
                            message: "U dont have this item please add before"
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item Has been deleted"
                    })
    
                })    
            })
        }
    }
}