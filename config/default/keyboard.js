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

module.exports = configurations;