#!/usr/bin/env node

const fs = require("fs");
const chalk = require("chalk");
const path = require("path");

const { lstat } = fs.promises;

//gets the third value of arguments -> which will be the string(location) passed after nls
const targetDir = process.argv[2] || process.cwd();

//process is included by default, no need to use default
fs.readdir(targetDir,async (err,filenames)=>{
    if(err){
        console.log(err);
        return;//to stop the function execution
    }

    const statPromises = filenames.map(filename=>{
        return lstat(path.join(targetDir,filename));
    })

    const allStats = await Promise.all(statPromises);
    for(let stats of allStats){
        const index = allStats.indexOf(stats);
        if(stats.isFile()){
            console.log(filenames[index]);
        }
        else{
            //chalk to make folders bold.
            console.log(chalk.bold.yellow(filenames[index]));
        }
    }
});

//standard library modules used
//fs.readdir()
//process.cwd()