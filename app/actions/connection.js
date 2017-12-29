let fs = require("fs");
let path = require("path");
import sa from 'superagent';

export function saveConnections(connections){
    return (dispatch, getState) => {        
        dispatch({
            type: "SET_CONNECTIONS",
            connections: connections
        });
        sa.post(server.api.connection.insert)
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