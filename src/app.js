const MoviesListView = require('./views/movies_list_view.js');
const Movies = require('./models/movies.js');
const SelectView = require('./views/select_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');
  const moviesListContainer = document.querySelector('#movies');
  const moviesListView = new MoviesListView(moviesListContainer);
  moviesListView.bindEvents();

  const movieSelectElement = document.querySelector("#movies-dropdown");
  const selectView = new SelectView(movieSelectElement);
  selectView.bindEvents();


  const movies = new Movies();
  movies.getData();
  movies.bindEvents();
});
