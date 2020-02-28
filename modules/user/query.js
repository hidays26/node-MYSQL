const db = require("../../.config/connection")

module.exports = {
    serviceAddUser: (data, callBack)=>{
        db.query(
            `INSERT INTO akun SET ?`, data, (error, result, fields) =>{
                if(error){
                    return callBack(error);
                }else{
                    return callBack(null, result)
                }
            }
        )
    },
    serviceGetUsers: callBack =>{
        db.query(
            `SELECT * FROM akun`,(err, results, fields)=> {
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null, results)
                }
            }
        )
    },
    serviceGetUsersById: (id, callBack)=>{
        db.query(
            `SELECT * FROM akun WHERE id_akun = ?`,
            [id],
            (err, results, fields) => {
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null, results[0])
                }
            }
        )
    },
    serviceUpdateUser: (data, callBack)=>{
        db.query(
            `UPDATE akun SET  nama=?, email=?, password=?WHERE id_akun=?`,
            [
                data.nama,
                data.email,
                data.password,
                data.id_akun
            ],
            (err, results, fields) => {
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null, results)
                }
            }
        )
    },
    serviceDeleteUser: (id, callBack)=>{
        db.query(
            `DELETE FROM akun WHERE id_akun = ?`,
            [id],
            (err, results, fields)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null, results)
                }
            }
        )
    },
    serviceLogin: (email, callBack)=>{
        db.query(
            `SELECT * FROM akun WHERE email = ?`,email,
            (err, results, fields) => {
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null, results[0])
                }
            }
        )
    }
}