import fs from 'fs';
import path from 'path';
import mysql from 'mysql';

let Tables = (config, log) => {
    let getColumns = (db, dbname, tablename) => {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?;", 
                [dbname, tablename], 
                (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                }
            );
        });
    };

    let getCreateStatement = (db, dbname, tablename) => {
        return new Promise((resolve, reject) => {
            db.query(
                "SHOW CREATE TABLE `" + dbname + "`.`" + tablename + "`;", 
                [dbname, tablename], 
                (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                }
            );
        });
    };

    return {
        _get: function(req, res, next) {
            let connection = req.body.connection;
            let dbname = req.body.dbname;
            let tablename = req.body.tablename;
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
                    Promise.all([
                        getColumns(db, dbname, tablename), 
                        getCreateStatement(db, dbname, tablename)
                    ]).then((results) => {
                        let columns = results[0].map((k, index) => {
                            return k.column_name; 
                        });
                        let selectStatement = `select ` + 
                            columns.map((col, index) => {
                                return 'a1.`' + col + '`'
                            }).join(",\n") +
                            "from `" + dbname + "`.`" + tablename + "` a1 \n" +
                            "limit 1000;";

                        res.status(200).json({
                            data: {
                                table: {
                                    name: tablename,
                                    columns: columns,
                                    selectStatement: selectStatement,
                                    createStatement: results[1]
                                }
                            }
                        });
                        db.end();
                    }).catch((reason) => {
                        console.log(err);
                        res.status(500).json({
                            message: err.sqlMessage || err.toString()
                        });
                        db.end();
                    });
                }
            });
        }
    }
};
module.exports = Service;