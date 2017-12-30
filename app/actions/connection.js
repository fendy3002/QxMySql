let fs = require("fs");
let path = require("path");
import sa from 'superagent';
import {toastr} from 'react-redux-toastr';

export function saveConnections(connections){
    return (dispatch, getState) => {        
        let {server} = getState();
        dispatch({
            type: "SET_CONNECTIONS",
            connections: connections
        });
        sa.put(server.api.connection.insert)
            .send({
                connections: connections
            })
            .end((err, res) => {
            if(err){
                console.log(err);
            }
            else{
            }
        })
    }
}

export function testConnection(connection){
    return (dispatch, getState) => {
        let {server} = getState();
        sa.post(server.api.connection.testConnection)
            .send({
                connection: connection
            })
            .end((err, res) => {
            if(err){
                toastr.error("Test connection error", err);
            }
            else{
                toastr.success("Connection success");
            }
        })
    }
}

export function getConnections(){
    return (dispatch, getState) => {
        let {server} = getState();
        sa.get(server.api.connection.list)
            .end((err, res) => {
            if(err){
                console.log(err);
            }
            else{
                dispatch({
                    type: "SET_CONNECTIONS",
                    connections: res.body.data
                });
            }
        });
    }
}