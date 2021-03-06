let fs = require("fs");
let path = require("path");
import sa from 'superagent';
import {toastr} from 'react-redux-toastr';

export function getTable(connection, dbname, tablename, callback) {
    return (dispatch, getState) => {

        let {server} = getState();
        sa.post(server.api.database.table)
            .send({
                connection: connection,
                dbname: dbname,
                tablename: tablename
            })
            .end((err, res) => {
            if(err){
                callback(err);
            }
            else{
                callback(null, res.body);
            }
        });
    };
}

export function getTables(connection, dbname, callback) {
    return (dispatch, getState) => {

        let {server} = getState();
        sa.post(server.api.database.tables)
            .send({
                connection: connection,
                dbname: dbname
            })
            .end((err, res) => {
            if(err){
                callback(err);
            }
            else{
                callback(null, res.body);
            }
        });
    };
}