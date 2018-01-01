import fs from 'fs';
import path from 'path';
import mysql from 'mysql';

let SystemVariables = (config, log) => {
    let namedQuery = (db, name) => {
        return new Promise((resolve, reject) => {
            db.query(
                "SHOW VARIABLES WHERE VARIABLE_NAME LIKE ?;", 
                [name],
                (err, result) => {
                    if(err){ reject(err); }
                    else{ resolve(result); }
                }
            );
        });
    };
    let unnamedQuery = (db) => {
        return new Promise((resolve, reject) => {
            db.query(
                "SHOW VARIABLES;", 
                [],
                (err, result) => {
                    if(err){ reject(err); }
                    else{ resolve(result); }
                }
            );
        });
    };
    return {
        _post: function(req, res, next) {
            let connection = req.body.connection;
            let name = req.body.name;
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
                    let action = name ? namedQuery(db, name) : unnamedQuery(db);
                    action.then(result => {
                        res.status(200).json({
                            data: {
                                variables: result
                            }
                        });
                        db.end();
                    }).catch(reason => {
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
module.exports = SystemVariables;