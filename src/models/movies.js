const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Movies = function () {
  this.data = null;
}

Movies.prototype.getData = function () {
const url = 'https://ghibliapi.herokuapp.com/films'
  const request = new Request(url);
  request.get()
      .then((data) =>{
    this.data = data;
    console.log(this.data);
    PubSub.publish('Movies:data-ready', this.data);
  })
};

Movies.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:change', (evt) => {
    selectedIndex = evt.detail;
    const selectedMovie = [];
    selectedMovie.push(this.data[selectedIndex]);
    PubSub.publish('Movies:selected-movie-ready', selectedMovie);
    console.log(selectedMovie);
  });
};






module.exports = Movies;
