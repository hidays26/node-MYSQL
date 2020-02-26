const db = require("../../.config/connection")

module.exports = {
    serviceAddItem: (data, callBack)=>{
        db.query(
            `insert INTO item set ?`,
            data,
            (err, result, fileds)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null, result)
                }

            }
        )
    },
    async serviceGetItem(data,callBack){
        db.query(`SELECT * FROM item WHERE owner=?`,data,(err,result,fileds)=>{
            if (err) {
                return callBack(err)
            }else{
                return callBack(null,result)
            }
        })
    }
}