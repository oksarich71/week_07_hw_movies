/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MoviesListView = __webpack_require__(/*! ./views/movies_list_view.js */ \"./src/views/movies_list_view.js\");\nconst Movies = __webpack_require__(/*! ./models/movies.js */ \"./src/models/movies.js\");\nconst SelectView = __webpack_require__(/*! ./views/select_view.js */ \"./src/views/select_view.js\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  console.log('JavaScript Loaded');\n  const moviesListContainer = document.querySelector('#movies');\n  const moviesListView = new MoviesListView(moviesListContainer);\n  moviesListView.bindEvents();\n\n  const movieSelectElement = document.querySelector(\"#movies-dropdown\");\n  const selectView = new SelectView(movieSelectElement);\n  selectView.bindEvents();\n\n\n  const movies = new Movies();\n  movies.getData();\n  movies.bindEvents();\n});\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/helpers/pub_sub.js":
/*!********************************!*\
  !*** ./src/helpers/pub_sub.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const PubSub = {\n  publish: function (channel, payload) {\n    const event = new CustomEvent(channel, {\n      detail: payload\n    });\n    document.dispatchEvent(event);\n  },\n  subscribe: function (channel, callback) {\n    document.addEventListener(channel, callback);\n  }\n}\n\nmodule.exports = PubSub;\n\n\n//# sourceURL=webpack:///./src/helpers/pub_sub.js?");

/***/ }),

/***/ "./src/helpers/request.js":
/*!********************************!*\
  !*** ./src/helpers/request.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Request = function (url) {\n  this.url = url;\n}\n\nRequest.prototype.get = function () {\n  return fetch (this.url)\n    .then((response) => response.json());\n  \n};\n\nmodule.exports = Request;\n\n\n//# sourceURL=webpack:///./src/helpers/request.js?");

/***/ }),

/***/ "./src/models/movies.js":
/*!******************************!*\
  !*** ./src/models/movies.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Request = __webpack_require__(/*! ../helpers/request.js */ \"./src/helpers/request.js\");\nconst PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\nconst Movies = function () {\n  this.data = null;\n}\n\nMovies.prototype.getData = function () {\nconst url = 'https://ghibliapi.herokuapp.com/films'\n  const request = new Request(url);\n  request.get()\n      .then((data) =>{\n    this.data = data;\n    console.log(this.data);\n    PubSub.publish('Movies:data-ready', this.data);\n  })\n};\n\nMovies.prototype.bindEvents = function () {\n  PubSub.subscribe('SelectView:change', (evt) => {\n    selectedIndex = evt.detail;\n    const selectedMovie = [];\n    selectedMovie.push(this.data[selectedIndex]);\n    PubSub.publish('Movies:selected-movie-ready', selectedMovie);\n    console.log(selectedMovie);\n  });\n};\n\n\n\n\n\n\nmodule.exports = Movies;\n\n\n//# sourceURL=webpack:///./src/models/movies.js?");

/***/ }),

/***/ "./src/views/movie_view.js":
/*!*********************************!*\
  !*** ./src/views/movie_view.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const MovieView = function (container, movie) {\n  this.container = container;\n  this.movie = movie;\n}\nMovieView.prototype.render = function () {\n  // create div to contain this movie's set of elements\n  const movieContainer = document.createElement(\"div\");\n  movieContainer.classList.add(\"movie-container\");\n  this.container.appendChild(movieContainer);\n//\nconst title = document.createElement('h3');\n  title.classList.add(\"movie-title\");\n  title.textContent = this.movie.title;\n  movieContainer.appendChild(title);\n\n  const movieList = document.createElement(\"ul\");\n  movieList.classList.add(\"movie-list\");\n  movieContainer.appendChild(movieList);\n\n  const description = document.createElement(\"li\");\n  description.classList.add(\"movie-description\");\n  description.textContent = `DESCRIPTION: ${ this.movie.description }`;\n  movieList.appendChild(description);\n\n  const director = document.createElement(\"li\");\n  director.classList.add(\"movie-detail\");\n  director.textContent = `DIRECTOR: ${ this.movie.director }`;\n  movieList.appendChild(director);\n\n  const releaseDate = document.createElement(\"li\");\n  releaseDate.classList.add(\"movie-detail\");\n  releaseDate.textContent = `RELEASE DATE: ${ this.movie.release_date}`;\n  movieList.appendChild(releaseDate);\n\n  const rtScore = document.createElement(\"li\");\n  rtScore.classList.add(\"movie-detail\");\n  rtScore.textContent = `RT SCORE: ${this.movie.rt_score}`;\n  movieList.appendChild(rtScore);\n\n}\n\n\n\nmodule.exports = MovieView;\n\n\n//# sourceURL=webpack:///./src/views/movie_view.js?");

/***/ }),

/***/ "./src/views/movies_list_view.js":
/*!***************************************!*\
  !*** ./src/views/movies_list_view.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\nconst MovieView = __webpack_require__(/*! ./movie_view.js */ \"./src/views/movie_view.js\");\n\nconst MoviesListView = function (container) {\n  this.container = container;\n\n}\n\nMoviesListView.prototype.bindEvents = function () {\n\n  PubSub.subscribe('Movies:data-ready', (evt) => {\n    this.movies = evt.detail;\n    this.render()\n})\n\nPubSub.subscribe('Movies:selected-movie-ready', (evt) => {\n  this.movies = evt.detail;\n  this.render();\n}\n)}\n\nMoviesListView.prototype.render = function () {\n  this.container.innerHTML = '';\n  this.movies.forEach((movie) => {\n    const movieView = new MovieView(this.container, movie);\n\n    movieView.render();\n  });\n}\n\n\nmodule.exports = MoviesListView;\n\n\n//# sourceURL=webpack:///./src/views/movies_list_view.js?");

/***/ }),

/***/ "./src/views/select_view.js":
/*!**********************************!*\
  !*** ./src/views/select_view.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\nconst SelectView = function (element) {\n  this.element = element;\n}\n\nSelectView.prototype.bindEvents = function(){\n  PubSub.subscribe('Movies:data-ready', (event) => {\n    const allMovies = event.detail;\n    this.populate(allMovies);\n  })\n  this.element.addEventListener('change', (evt) => {\n      const selectedIndex = evt.target.value;\n      PubSub.publish('SelectView:change', selectedIndex);\n    })\n}\nSelectView.prototype.populate = function (movies) {\n  movies.forEach((movie, index) => {\n    const movieOption = this.createOption(movie.title, index);\n    this.element.appendChild(movieOption);\n  });\n};\n\nSelectView.prototype.createOption = function (title, index) {\n  const option = document.createElement('option');\n  option.textContent = title;\n  option.value = index;\n  return option;\n};\n\nSelectView.prototype.publishMovieDetail = function(movieIndex){\n  const selectedMovie = this.movies[movieIndex];\n  PubSub.publish('Movies:selected-movie-ready', selectedMovie)\n};\n\n\n\nmodule.exports = SelectView;\n\n\n//# sourceURL=webpack:///./src/views/select_view.js?");

/***/ })

/******/ });