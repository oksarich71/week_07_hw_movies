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




module.exports = Movies;
