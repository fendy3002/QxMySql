let fs = require("fs");

let defaultConfig = {
    main: {
        left: 150,
        top: 600
    }
};
let userData = null;
try{
    userData = fs.readFileSync("../user/ui.json", "utf8");
    if(userData){
        let obj = JSON.parse(data);
        if(obj){
            defaultConfig = {
                ...defaultConfig,
                ...obj
            };

            module.exports = defaultConfig;        
        }
        else{
            module.exports = defaultConfig;    
        }
    }
    else{
        module.exports = defaultConfig;
    }
}catch(ex){
    module.exports = defaultConfig;    
}