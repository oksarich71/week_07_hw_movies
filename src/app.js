const MoviesListView = require('./views/movies_list_view.js');
const Movies = require('./models/movies.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');
  const moviesListContainer = document.querySelector('#movies');
  const moviesListView = new MoviesListView(moviesListContainer);
  moviesListView.bindEvents();

  const movies = new Movies();
  movies.getData();
});
