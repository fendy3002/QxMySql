let configurations = [
    { 
        "key": "ctrl+s",
        "command": "connection.save",
        "when": "inConnectionPage"
    },
    { 
        "key": "ctrl+shift+enter",
        "command": "editor.execute",
        "when": "inQueryEditor"
    }
];

try{
    userData = fs.readFileSync("../user/keyboard.json", "utf8");
    if(userData){
        let obj = JSON.parse(data);
        if(obj){
            configurations = {
                ...configurations,
                ...obj
            }; 
        }
    }
}catch(ex){
}

let createFunction = (when) => {
    let defaultAssert = {
        inConnectionPage: false,
        inQueryEditor: false,
        inDatabaseItem: false
    };
    let body = 'let {' + Object.keys(defaultAssert).join(", ") + '} = {...this, ...obj}; return ' + when;
    return new Function('obj', body).bind(defaultAssert);
};

module.exports = configurations.map((config, index) => {
    return {
        "key": config.key,
        "command": config.command,
        "when": createFunction(config.when)
    };
});