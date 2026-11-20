import { MongoClient } from "mongodb";

async function runGetStarted(){
    // Replace the url string with you connection String 
    const url = "mongodb+srv://rajuk631149_db_user:rajuk631149_db_user>@mainthunder.2ikce3w.mongodb.net/";

const client = new MongoClient(url);

try{
    const database = client.db('Rajukumar');
    const movies = database.collection('Sumit');
    // Queris for a movie that has a title value of 'Back to the future'
    // url, database

    const query = {title:"Back to the Future"};
    const movie = await movies.insertMany([
        {
            item:'journal',
            qty:25,
            tags:['blank','red'],
            size:{h:14,w:21,uom:'cm'}
        },
        {
            item :'mat',
            qty : 85,
            tags:['gray'],
            size :{h:27.9,w:35.5,uom:'cm'}
        },
        {
            item:'mousepad',
            qty:25,
            tags:['gel','blue'],
            size:{h:19,w:22.85,uom:'cm'}
        }
    ])

    console.log(movie);
}finally{
    await client.close();
}
}

runGetStarted().catch(console.dir);