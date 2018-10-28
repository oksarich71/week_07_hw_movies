const PubSub = require('../helpers/pub_sub.js');

const SelectView = function (element) {
  this.element = element;
}

SelectView.prototype.bindEvents = function(){
  PubSub.subscribe('Movies:data-ready', (event) => {
    const allMovies = event.detail;
    this.populate(allMovies);
  })
  this.element.addEventListener('change', (evt) => {
      const selectedIndex = evt.target.value;
      PubSub.publish('SelectView:change', selectedIndex);
    })
}
SelectView.prototype.populate = function (movies) {
  movies.forEach((movie, index) => {
    const movieOption = this.createOption(movie.title, index);
    this.element.appendChild(movieOption);
  });
};

SelectView.prototype.createOption = function (title, index) {
  const option = document.createElement('option');
  option.textContent = title;
  option.value = index;
  return option;
};

SelectView.prototype.publishMovieDetail = function(movieIndex){
  const selectedMovie = this.movies[movieIndex];
  PubSub.publish('Movies:selected-movie-ready', selectedMovie)
};



module.exports = SelectView;
