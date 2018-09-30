// let pyexec = require("../index");
// // pyexec.runpath("./test/test.py")

// pyexec.runpytext("import os;import time;time.sleep(1);print('you are my love');time.sleep(5);a = 2;a+=1;print(a)")
let {run_ipynb_code} = require("../index")

run_ipynb_code("I:/家和工作记录/jupytertest/test.ipynb",function(data){
    console.log(data);
})
