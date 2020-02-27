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
    serviceGetItem: (data,callBack)=>{
        db.query(`SELECT * FROM item WHERE owner=?`,data,(err,result,fileds)=>{
            if (err) {
                return callBack(err)
            }else{
                return callBack(null,result)
            }
        })
    },
    serviceUpdateItem:(data,callBack)=>{
        db.query(`UPDATE item SET itemName = ?, stock=?, price=? where id_item = ? AND owner = ?`,
        [
            data.itemName,
            data.stock,
            data.price,
            data.id,
            data.owner
        ],(err,result,fileds)=>{
            if (err) {
                return callBack(err)
            }else{
                return callBack(null,result)
            }
        })
    },
    serviceDeleteItem:(data,callBack)=>{
        db.query(`DELETE FROM item WHERE id_item = ? AND owner = ?`,
        [data.id,data.owner],(err,result,fileds)=>{
            if (err) {
                return callBack(err)
            }else{
                return callBack(null,result)
            }
        })
    }
}