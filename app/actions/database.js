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

export function testConnection(connection, onNext = (() => {})){
    return (dispatch, getState) => {
        let {server} = getState();
        sa.post(server.api.connection.testConnection)
            .send({
                connection: connection
            })
            .end((err, res) => {
                if(err){
                    onNext(err);
                }
                else{
                    onNext(null, res.body);
                }
            });
    }
}

export function openConnection(connection, onNext = (() => {})){
    return (dispatch, getState) => {
        let {server} = getState();
        sa.post(server.api.connection.openConnection)
            .send({
                connection: connection
            })
            .end((err, res) => {
                if(err){
                    onNext(err);
                }
                else{
                    onNext(null, res.body);
                }
            });
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