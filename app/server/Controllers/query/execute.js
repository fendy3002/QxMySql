import fs from 'fs';
import path from 'path';
import mysql from 'mysql';

let QExecute = (config, log) => {
    return {
        _post: function(req, res, next) {
            let connection = req.body.connection;
            let dbname = req.body.dbname;
            let query = req.body.query;
            
            let db = mysql.createConnection({
                ...connection,
                database: dbname
            });

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
                        query, [], 
                        (err, results) => {
                            if(err){
                                console.log(err);
                                res.status(500).json({
                                    message: err.sqlMessage || err.toString()
                                });
                                db.end();
                            }else{
                                res.status(200).json({
                                    data: {
                                        results: results
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
module.exports = QExecute;