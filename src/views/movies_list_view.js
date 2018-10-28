const PubSub = require('../helpers/pub_sub.js');
const MovieView = require('./movie_view.js');

const MoviesListView = function (container) {
  this.container = container;

}

MoviesListView.prototype.bindEvents = function () {

  PubSub.subscribe('Movies:data-ready', (evt) => {
    this.movies = evt.detail;
    this.render();
    // console.log('Data: ',this.movies);

  });
}

MoviesListView.prototype.render = function () {
  this.movies.forEach((movie) => {
    const movieView = new MovieView(this.container, movie);
    movieView.render();
  });
}


module.exports = MoviesListView;
