import fs from 'fs';
import path from 'path';
import mysql from 'mysql';

let QExecute = (config, log) => {
    let parseTable = (tableResult) => {
        if(tableResult.constructor && tableResult.constructor.name == "OkPacket"){
            // result of non-query execution
            // such as update, delete            
            return {
                data: [{
                    message: tableResult.message
                }],
                fields: [
                    "message"
                ]
            };
        }
        else{
            if(tableResult && tableResult.length > 0){
                return {
                    data: tableResult,
                    fields: Object.keys(tableResult[0])
                };
            }
            else{
                return {
                    data: tableResult,
                    fields: []
                };
            }
        }
    };
    
    let parseResult = (result) => {
        let results = [];
        if(!result || result.length == 0){
            return [{
                data: [],
                fields: []
            }];
        }
        else if(Array.isArray(result[0]) ||
            (result[0].constructor && result[0].constructor.name == "OkPacket")){
            results = result;
        }
        else { 
            //for single statement
            results = [result];
        }

        return results.map((table, index) => parseTable(table));
    };
    return {
        _post: function(req, res, next) {
            let connection = req.body.connection;
            let dbname = req.body.dbname;
            let query = req.body.query;

            if(!query){
                res.status(200).json({
                    data: {
                        results: []
                    }
                });
            }
            else{
                let db = mysql.createConnection({
                    ...connection,
                    database: dbname,
                    dateStrings: 'date',
                    multipleStatements: true
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
                            (err, result) => {
                                if(err){
                                    console.log(err);
                                    res.status(500).json({
                                        message: err.sqlMessage || err.toString()
                                    });
                                    db.end();
                                }else{
                                    let results = parseResult(result);
    
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
    }
};
module.exports = QExecute;