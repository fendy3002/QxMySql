var request = function(state = [], action){
    switch (action.type) {
        case "SET_CONNECTIONS":
            return {
                ...state,
                connections: action.connections
            }
        default:
            return state;
    };
};

module.exports = request;
