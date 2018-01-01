import fs from 'fs';
import path from 'path';
import mysql from 'mysql';

let Tables = (config, log) => {
    return {
        _post: function(req, res, next) {
            let connection = req.body.connection;
            let dbname = req.body.dbname;
            let db = mysql.createConnection(connection);
            db.connect((err) => {
                if(err){
                    console.log(err);
                    res.status(500).json({
                        message: err.sqlMessage || err.toString()
                    });
                    db.end();
                }
                else{
                    db.query(
                        "SELECT table_name FROM information_schema.tables where table_schema= ?;", 
                        [dbname], 
                        (err, result) => {
                            if(err){
                                console.log(err);
                                res.status(500).json({
                                    message: err.sqlMessage || err.toString()
                                });
                                db.end();
                            }else{
                                let tables = result.map((k, index) => {
                                    return k.table_name; 
                                });
                                res.status(200).json({
                                    data: {
                                        tables: tables
                                    }
                                });
                                db.end();
                            }
                        });
                }
            });
        }
    }
};
module.exports = Tables;