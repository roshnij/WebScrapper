const Nightmare = require('nightmare');
const nightmare = Nightmare({show: true});

class Work{
    f1(param) {
         return new Promise((resolve,reject) =>{
            if (nightmare) {
                resolve(param + " Got the ouput!");
            }
            else {
                reject(Error("Failed!!!"));
            }
         });         
    }
    
    login(param1){
        console.log("in login: " + param1);
        return param1;
    }
    statement(param2){
        console.log("in statement: " + param2);
        return param2;
    }

    //not understood how to use this function
    fetch(){

    }

    success(message){
        return message;
    }
}

const obj1 =  new Work();
obj1.f1(obj1.login(nightmare)).then((data) => {
    console.log("outer: " + data);
    obj1.f1(obj1.statement(nightmare)).then((innerdata) => {
        console.log("inner: " + obj1.success(innerdata));
        return obj1.success(innerdata);
    }, function(err) {
        console.log("Error: " + err); // Error:
    }); 
}, (err) => {
    console.log("Error: " + err); // Error:
});
