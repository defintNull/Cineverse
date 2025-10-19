import { Model } from "./Model";

export default class Watchlist {
  constructor({ id = null, name = "", movies = [], user_id = null } = {}) {
    this.id = id;
    this.name = name;
    this.movies = Array.isArray(movies) ? movies : [];
    this.user_id = user_id;
  }

  // Factory method to build from JSON (e.g. API response)
  static fromJson(json) {
    return new Watchlist({
      id: json.id,
      name: json.name,
      movies: json.movies,   // backend should return movies as array
      user_id: json.user_id
    });
  }

  // Convert back to JSON (for POST/PUT requests)
  toJson() {
    return {
      id: this.id,
      name: this.name,
      movies: this.movies,
      user_id: this.user_id
    };
  }

  // Example: add a movie to this watchlist
  addMovie(movie) {
    this.movies.push(movie);
  }

  // Example: remove a movie by id/title
  removeMovie(movieId) {
    this.movies = this.movies.filter(m => m.id !== movieId);
  }
}
