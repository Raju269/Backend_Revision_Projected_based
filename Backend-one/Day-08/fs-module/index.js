import fs from 'fs';


const data = fs.readFileSync(DB_FILE,'utf-8');
const datainformation = fs.readFileSync("./database.txt",'utf-8');

JSON.parse(data);
JSON.parse(datainformation


)

function readDB(){
    const data = fs.readFileSync('./database.txt','utf-8');
    return JSON.parse(data);

}

function writeDB(){
    const data = fs.writeFileSync('./database.txt',JSON.stringify(data,null,2));
    return JSON.parse(data);
}

