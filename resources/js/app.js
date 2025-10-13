import './bootstrap';

console.log('Hello, Cineverse!');
import {MovieDBService} from "./Services/MovieDBService";

const movieDBService = new MovieDBService();
movieDBService.getMovieByName("").then(movies => {
    // console.log('Popular Movies:', movies);
    [...movies.results].forEach(movie => {
        console.log(movie.original_title);
    });
});

//funzione di ricerca film

document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const query = document.getElementById('searchBox').value;
    movieDBService.getMovieByName(query).then(movies => {
        [...movies.results].forEach(movie => {
            console.log(movie.original_title);
        });
    });
});
