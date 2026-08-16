import express from "express";
import { movies } from "./movie.js";
import { availableMemory, title } from "node:process";
import { json } from "node:stream/consumers";
import { relative } from "node:path";

const app = express();
const PORT = 3000; 

app.get("/",(req,res)=>{
    res.send("Moive API is running ");
});


// filter Movie Using Query Parameter 

app.get("/Movie",(req,res)=>{
    const {genre,language,rating,releaseYear,availableOneOTT} = req.query;
    let filterMovie = movies;

    if(genre){
        filterMovie = movies.filter((movies)=>{
            return movies.genre === genre;
        });
    }
    else if(language){
        filterMovie = movies.filter((movies)=>{
            return movies.language === language;
        })
    }
    else if(rating){
        filterMovie = movies.filter((movie)=>{
            return movies.rating = rating;
        })
    }
    else if(releaseYear){
        filterMovie = movies.filter((movies)=>{
            return movies.releaseYear = releaseYear
        })
    }
    
    else if(availableOneOTT){
        filterMovie = movies.filter((movies)=>{
            return movies.availableOnOTT = availableOneOTT
        })
    }
    res.json(filterMovie);
    

})


// Search Movie by title 

app.get("/Movie", (req, res) => {
    const { title } = req.query;

    let filterMovie = movies;

    if (title) {
        filterMovie = movies.filter((movie) => {
            return movie.title
                .toLowerCase()
                .includes(title.toLowerCase());
        });
    }

    res.json(filterMovie);
});
// All movie data 
app.get("/Movie",(req,res)=>{
    res.json(movies);
})
// Get single Movie using Route params / Route parameter 
app.get("/Movie/:id",(req,res)=>{
    const id = Number(req.params.id);

    const index = movies.find((movies)=>movies.id === id);
    if(!index){
        return res.status(404).json({
            message:"Movie is not found"
        })
    };
    res.json(index);
})




// Create a New Movei

// app.post("/Movie",(req,res)=>{
//     const newMovie = {
//         id: movies.length+1,
//         title = req.body.title,
//         genre = req.body.genre,
//         language = req.body.language,
//         rating = req.body.rating,
//         releaseYear = req.body.releaseYear,
//         duration = req.body.duration,
//         availableOneOTT = req.body.availableOneOTT

//     }
//     movies.push(newMovie);
//     res.status(201).json({
//         message:"Movie created successfully",
//         movies : newMovie
//     })
// })

// Update Movie using patch 
app.patch('/Movie/:id',(req,res)=>{
    const id = Number(req.params.id);

    const movie = movies.find((movies)=>movie.id===id);

    if(!movie){
        return res.status(404).json({
            message:"Movie is not found"
        })
    }
    if(req.body.id !== undefined){
        movie.id = req.body.id
    }
    if(req.body.title !== undefined){
        movie.title = req.body.title
    }
    if(req.body.genre !== undefined){
        movie.body.genre = req.body.genre
    }
    if(req.body.language !== undefined){
        movie.body.language = req.body.language
    }
    if(req.body.rating !== undefined){
        movie.body.rating = req.body.rating
    }
    if(req.body.releaseYear !== undefined){
        movie.body.releaseYear = req.body.releaseYear
    }
    if(req.body.duration !== undefined){
        movie.body.duration = req.body.duration
    }
    if(req.body.availableOneOTT !== undefined){
        movie.body.availableOneOTT = req.body.availableOneOTT
    }
    res.json({
        message: "Movie is Update",
        movie
    });
})


// Replace movie using PUT 
app.put("/movie/:id",(req,res)=>{
    const id = Number(req.params.id);

    const Replace = movies.find((movies)=>movies.id===id);

    if(!Replace){
        return res.status(404)/json({
            message:"User is not found"
        })
    }

    const NewMovies  = {
        id:id,
        title:req.body.title,
        genre: req.body.genre,
        language:req.body.language,
        rating:req.body.rating,
        releaseYear:req.body.releaseYear,
        duration:req.body.duration,
        availableOneOTT:req.body.availableOneOTT
    }
    movies[Replace] = NewMovies;
    res.json({
        message:"Move Replace successful",
        movies : Replace
    })
})

// Delete Movie 
app.delete('/Movie/:id',(req,res)=>{
    const id = Number(req.params.id);
    const index = movies.find((movies)=>movies.id===id);
    if(!index){
        return res.json({
            menubar:"Movie is not found"
        })
    }

    const deleteMovie = movies.splice(index,1);

    res.json({
        message:"Movie is delete successfull",
        movies:deleteMovie[0]
    })
})
app.listen(PORT,(req,res)=>{
    console.log(`Server is running at ${PORT}`);

})