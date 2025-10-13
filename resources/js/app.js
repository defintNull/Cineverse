import './bootstrap';

console.log('Hello, Cineverse!');
import {MovieDBService} from "./services/MovieDBService";

const movieDBService = new MovieDBService();
movieDBService.getMovieByName("").then(movies => {
    // console.log('Popular Movies:', movies);
    [...movies.results].forEach(movie => {
        console.log(movie.original_title);
    });
});
