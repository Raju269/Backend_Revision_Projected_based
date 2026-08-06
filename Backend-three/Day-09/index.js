import { MongoClient } from "mongodb";
import dns from "dns";
// thisi is important for connect to internet if ip address phasing problem issue 
dns.setServers(["8.8.8.8", "1.1.1.1"]);
async function runGetStarted() {
    // Replace the url string with your connection String 
    const url = "mongodb+srv://rajuk631149_db_user:269269@hammer.9ox6ijl.mongodb.net/";
    const client = new MongoClient(url);
  try {
    const database = client.db('Thunder_Progamed');
    const movies = database.collection('Raju');
    // Queries for a movie that has a title value of 'Back to the Future'
    // url, database
    const query = { title: 'Back to the Future' };
     const movie = await movies.insertMany([
  {
    item: 'Raju kumar',
    qty: 25,
    tags: ['blank', 'red'],
    size: { h: 14, w: 21, uom: 'cm' }
  },
  {
    item: 'Vikas',
    qty: 85,
    tags: ['gray'],
    size: { h: 27.9, w: 35.5, uom: 'cm' }
  },
  {
    item: 'Vishal',
    qty: 25,
    tags: ['gel', 'blue'],
    size: { h: 19, w: 22.85, uom: 'cm' }
  }
])
    console.log(movie);
  } finally {
    await client.close();
  }
}

runGetStarted().catch(console.dir);