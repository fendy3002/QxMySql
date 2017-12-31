import fs from 'fs';
import path from 'path';
import mysql from 'mysql';

let Service = (config, log) => {
    return {
        _post: function(req, res, next) {
            let connection = req.body.connection;
            let db = mysql.createConnection(connection);
            db.connect((err) => {
                if(err){
                    console.log(err);
                    res.status(500).json({
                        message: err.sqlMessage || err.toString()
                    });
                }
                else{
                    db.query("show databases;", [], (err, result) => {
                        let databases = result.map((obj, index) => {
                            return obj.Database;
                        });
                        res.status(200).json({
                            message: "Connected successfully.",
                            data: {
                                databases: databases
                            }
                        });
                        db.end();
                    })
                }
            });
        }
    }
};
module.exports = Service;