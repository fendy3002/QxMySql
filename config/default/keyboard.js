let configurations = [
    { 
        "key": "ctrl+f4",          "when": "inQueriesPage",
        "command": "editorPage.removeTab"
    },
    { 
        "key": "ctrl+tab",          "when": "inQueriesPage",
        "command": "editorPage.tabNext"
    },
    { 
        "key": "ctrl+shift+tab",    "when": "inQueriesPage",
        "command": "editorPage.tabPrev"
    },
    { 
        "key": "alt+1",             "when": "inQueriesPage",
        "command": "editorPage.tabMove1",
    },
    { 
        "key": "alt+2",             "when": "inQueriesPage",
        "command": "editorPage.tabMove2"
    },
    { 
        "key": "alt+3",             "when": "inQueriesPage",
        "command": "editorPage.tabMove3"
    },
    { 
        "key": "alt+4",             "when": "inQueriesPage",
        "command": "editorPage.tabMove4"
    },
    { 
        "key": "alt+5",             "when": "inQueriesPage",
        "command": "editorPage.tabMove5"
    },
    { 
        "key": "ctrl+shift+enter",  "when": "inQueryEditor",
        "command": "editor.execute"
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