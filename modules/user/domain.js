const {
    serviceAddUser,
    serviceGetUsers,
    serviceGetUsersById,
    serviceUpdateUser,
    serviceDeleteUser,
    serviceLogin
} = require("./query")

const {genSaltSync, hashSync, compareSync, compare} = require("bcryptjs");
const {sign} = require("jsonwebtoken")

module.exports = {
    controllerAddUser: (req, res)=>{
        const data = req.body;
        
        const salt = genSaltSync(10);
        data.password = hashSync(data.password, salt);
        
        serviceAddUser(data, (err, results)=>{
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success:1, 
                data: results
            })
        })
        
    },
    controllerGetUsersById: (req, res)=>{
        const {id} = req.params;
        serviceGetUsersById(id, (err, results)=>{
            if(err){
                res.json(err)
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }else{
                return res.json({
                    success: 1,
                    data: results
                })
            }
        })
    },
    controllerGetUsers: (req, res)=>{
        serviceGetUsers((err, results)=>{
            if(err){
                console.log(err)
                return
            }else{
                return res.json({
                    success: 1, 
                    data: results
                })
            }
        })
    },
    controllerUpdateUser: (req, res)=>{
        const salt = genSaltSync(10)
        data={
            nama,
            email,
            password,
            id_akun,
        }=req.body
        data.password = hashSync(data.password, salt)
        data.id_akun = req.params.id
        serviceUpdateUser(data, (err, results)=>{
            if(err){
                res.json(err)
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Update failed"
                })
            }else{
                return res.json({
                    success: 1, 
                    message: "Update successfully"
                })
            }
        })
    },
    controllerDeleteUser: (req, res)=>{
        const {id} = req.params
        serviceDeleteUser(id, (err, results)=>{
            if(err){
                console.log(err)
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }else{
                return res.json({
                    success: 1,
                    message: "user delete successfully"
                })
            }
        })
    },
    controllerLogin: (req, res)=>{
        const data = req.body
        
        serviceLogin(data.email, (err, results)=>{
            if(err){
                console.log(err)
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                })
            }
            const result = compare(data.password, results.password)

            if(result){
                results.password = undefined
                const jsonwebtoken = sign({result:results}, "secretkey",{
                    expiresIn: "1h"
                })
                return res.json({
                    success: 1,
                    message: "Login successfully, Your Account Already Use",
                    account: results,
                    token: jsonwebtoken
                })
            }else{
                return res.json({
                    success: 0,
                    message: "email or password invalid",
                })
            }
        })
    }
}