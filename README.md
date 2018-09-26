# 项目的目标是让nodejs可以正常并无缝使用 python脚本
## python脚本格式
1. 可以是字符串,但是要符合正常的python脚本
2. 可以.py文件

## 主入口文件 index.js

## 使用方法 安装本地包
```
    $ npm install --save jsexecpy 
```
## 测试包
```nodejs
> let pyexec = require("jsexecpy");
> pyexec.runpytext("import os;print('you are my love');a = 2;a+=1;print(a)")
```
