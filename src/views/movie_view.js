const MovieView = function (container, movie) {
  this.container = container;
  this.movie = movie;
}
MovieView.prototype.render = function () {
  // create div to contain this movie's set of elements
  const movieContainer = document.createElement("div");
  movieContainer.classList.add("movie-container");
  this.container.appendChild(movieContainer);
//
const title = document.createElement('h3');
  title.classList.add("movie-title");
  title.textContent = this.movie.title;
  movieContainer.appendChild(title);

  const movieList = document.createElement("ul");
  movieList.classList.add("movie-list");
  movieContainer.appendChild(movieList);

  const description = document.createElement("li");
  description.classList.add("movie-description");
  description.textContent = `DESCRIPTION: ${ this.movie.description }`;
  movieList.appendChild(description);

  const director = document.createElement("li");
  director.classList.add("movie-detail");
  director.textContent = `DIRECTOR: ${ this.movie.director }`;
  movieList.appendChild(director);

  const releaseDate = document.createElement("li");
  releaseDate.classList.add("movie-detail");
  releaseDate.textContent = `RELEASE DATE: ${ this.movie.release_date}`;
  movieList.appendChild(releaseDate);

  const rtScore = document.createElement("li");
  rtScore.classList.add("movie-detail");
  rtScore.textContent = `RT SCORE: ${this.movie.rt_score}`;
  movieList.appendChild(rtScore);

}



module.exports = MovieView;
