import express from "express";
import{ movies} from './movie.js';
import { title } from "node:process";

const app = express();
const PORT = 3000;
app.use(express.json());

// TODO Home routes 
// Middleware: Log Every Request
app.use((req, res, next) => {
    console.log(req.method, req.url);

    next();
});
app.get("/",(req,res)=>{
    res.send("Movie API is running ");
})

// TODO 2. Filter Movies Using Query Parameter 

app.get("/movies",(req,res)=>{
    const {genre,language,rating,releaseYear,avaiableOneOTT} = req.query;
    let filterMove = movies;

    if(genre){
        filterMove = movies.filter((movies)=>{
            return movies.genre === genre;
        })
    }

    if(language){
        filterMove = movies.filter((movies)=>{
            return movies.language === language;
        })
    }
    if(rating){
        filterMove = movies.filter((movies)=>{
            return movies.rating === rating;
        })
    }
    if(releaseYear){
        releaseYear = movies.filter((movies)=>{
            return releaseYear === releaseYear;
        })
    }

    if(avaiableOneOTT){
        filterMove = movies.filter((movies)=>{
            return avaiableOneOTT === avaiableOneOTT;
        })
    }
    res.json({
        filterMove
    });
});

// TODO 3. Search Movies by Title 
app.get("/movies",(req,res)=>{
    const {title} = req.query;

    let filterMovie = movies;

    if(title){
        filterMovie = movies.filter((movies)=>{
            return movies.title
            .toLowerCase()
            .includes(title.toLowerCase())
        });
    };

    res.json({
        filterMovie
    });
});


// TODO 4.A ALL Movie data 

app.get('/movies',(req,res)=>{
    res.json({
        movies
    });
});
// TODO GET Single Movie by ID
app.get("/movies/:id", (req, res) => {

    // Get ID from URL
    const id = Number(req.params.id);

    // Find movie by ID
    const movie = movies.find((movie) => {
        return movie.id === id;
    });

    // Check if movie exists
    if (!movie) {
        return res.status(404).json({
            message: "Movie is not Found"
        });
    }

    // Return movie
    res.status(200).json(movie);
});

// TODO 6. Create New Movie 

// Create a new movie
app.post("/movies", (req, res) => {

    const newMovie = {
        id: movies.length + 1,
        title: req.body.title,
        genre: req.body.genre,
        language: req.body.language,
        rating: req.body.rating,
        releaseYear: req.body.releaseYear,
        duration: req.body.duration,
        availableOnOTT: req.body.availableOnOTT
    };

    movies.push(newMovie);

    res.status(201).json({
        message: "Movie Created Successfully",
        movie: newMovie
    });
});

// TODO Update : Moves using patch 
// Update Movie Using PATCH
app.patch("/movies/:id", (req, res) => {

    const id = Number(req.params.id);

    // Find movie by ID
    const movie = movies.find((movie) => movie.id === id);

    if (!movie) {
        return res.status(404).json({
            message: "Movie is not found"
        });
    }

    // Update only the fields received in request body
    if (req.body.title !== undefined) {
        movie.title = req.body.title;
    }

    if (req.body.genre !== undefined) {
        movie.genre = req.body.genre;
    }

    if (req.body.language !== undefined) {
        movie.language = req.body.language;
    }

    if (req.body.rating !== undefined) {
        movie.rating = req.body.rating;
    }

    if (req.body.releaseYear !== undefined) {
        movie.releaseYear = req.body.releaseYear;
    }

    if (req.body.duration !== undefined) {
        movie.duration = req.body.duration;
    }

    if (req.body.availableOnOTT !== undefined) {
        movie.availableOnOTT = req.body.availableOnOTT;
    }

    res.status(200).json({
        message: "Movie updated successfully",
        movie
    });
});
//TODO  Replace movie using PUT 

// Replace Movie Using PUT
app.put("/movies/:id", (req, res) => {

    const id = Number(req.params.id);

    // Find index of movie
    const index = movies.findIndex((movie) => {
        return movie.id === id;
    });

    // Check if movie exists
    if (index === -1) {
        return res.status(404).json({
            message: "Movie is not found"
        });
    }

    // Create completely new movie object
    const newMovie = {
        id: id,
        title: req.body.title,
        genre: req.body.genre,
        language: req.body.language,
        rating: req.body.rating,
        releaseYear: req.body.releaseYear,
        duration: req.body.duration,
        availableOnOTT: req.body.availableOnOTT
    };

    // Replace old movie with new movie
    movies[index] = newMovie;

    res.status(200).json({
        message: "Movie replaced successfully",
        movie: newMovie
    });
});
// TODO Delete Movie 
// Delete Movie Using DELETE
app.delete("/movies/:id", (req, res) => {

    const id = Number(req.params.id);

    // Find index of movie
    const index = movies.findIndex((movie) => {
        return movie.id === id;
    });

    // Check if movie exists
    if (index === -1) {
        return res.status(404).json({
            message: "Movie is not found"
        });
    }

    // Delete movie from array
    const deleteMovie = movies.splice(index, 1);

    res.status(200).json({
        message: "Movie deleted successfully",
        movie: deleteMovie[0]
    });
});

// TODO Bonus TASK 

// TODO Bonus TASK 2
app.listen(PORT,(req,res)=>{
    console.log(`Server is running at ${PORT}`);
})
