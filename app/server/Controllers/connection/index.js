import fs from 'fs';
import path from 'path';

let Service = (config, log) => {
    return {
        _get: function(req, res, next) {
            let respond = (connection) => {
                res.status(200).json({
                    data: connection
                });
            }

            let connections = [];
            fs.readFile(path.resolve(config.path.config, "user", "connection.json"), 
                "utf8", (err, data) => {
                if(err){
                    console.log(err);
                    respond(connections);
                }
                else{
                    try{
                        let connections = JSON.parse(data);
                        respond(connections);
                    }
                    catch(ex){
                        console.log(ex);
                        respond(connections);
                    }
                }
            })
        },
        _put: function(req, res, next) {
            fs.writeFile(
                path.resolve(config.path.config, "user", "connection.json"),
                JSON.stringify(connections), 
                (err) => {
                    console.log(err);
                }
            );

            res.status(200).json({
                message: ""
            });
        }
    }
};
module.exports = Service;