let {exec} = require("child_process");
let crypto = require("crypto");
let os = require("os");
let path = require("path");
let fs = require("fs")


let _execpython = function(pythonpath){
    return new Promise((resolve,reject)=>{
        try {
            exec(`python ${pythonpath}`,function(err,data){
                if(err){
                    reject({data:`执行${pythonpath} 错误:${err}`,pythonpath})
                }else{
                    resolve({data,pythonpath})
                }
            })
        } catch (error) {
            reject({data:`执行${pythonpath} 异常:${error}`,pythonpath})
        }
        
    })
}


function runpath(path){
    _execpython(path).then(
        data=>{
            console.log('执行py文件成功 :', data);
        },
        err=>{
            console.log('执行py路劲错误 :', err);
        }
    )
}
/**
 * 把文本输入到　路劲
 * @param {*} pythontext 类python文件
 * @param {*} tmppath  路径
 */
let _writeFile = function(pythontext,tmppath){
    return new Promise((resolve,reject)=>{
        fs.writeFile(tmppath,pythontext,function(err){
            if(err){
                reject(`writing data err! ${err}`)
            }else{
                resolve(tmppath)
            }
        })
    })
}

let _removeFile = function(tmppath){
    return new Promise((resolve,reject)=>{
        fs.unlink(tmppath,function(err){
            if (err) {
                reject(`remove file err! ${err}`)
            }else{
                resolve(`成功删除${tmppath}`)
            }
        })
    })
}

let runpytext = (pythontext,dosomething,hasdeletething)=>{
    let md5 = crypto.createHash("md5");
    let pathname = md5.update(pythontext).digest("hex")
    let tmppath = path.join(os.tmpdir(),`${pathname}.py`)
    console.log('tmppath :', tmppath);
    _writeFile(pythontext,tmppath).then(
        data=>{
            dosomething &&　dosomething()
            console.log("成功创建文件",data);
            return _execpython(data)
        },
        err=>{
            console.log(' 创建失败 :', err);
        }
    ).then(
        filedata =>{
            let {data,pythonpath} = filedata
            console.log(' 成功执行 :', data);
            return _removeFile(pythonpath)
        },
        err=>{
            let {data,pythonpath} = err
            console.log(' 执行失败:', data);
            return _removeFile(pythonpath)
        }
    ).then(
        data =>{
            console.log(' 删除成功file :', data);
        },
        err=>{
            console.log(' 删除失败err :', err);
        }
    )
}

module.exports = {
    runpath,
    runpytext
}


