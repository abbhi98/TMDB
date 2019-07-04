import React from "react";
import "./App.css";
import MovieList from "./MovieList";
import $ from "jquery";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.search("john");
  }
  search(searchTerm) {
    const urlString =
      "https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=" +
      searchTerm;
    $.ajax({
      url: urlString,
      success: searchResults => {
        console.log("Fetched");
        const results = searchResults.results;
        var movieRows = [];
        results.forEach(movie => {
          movie.poster_src =
            "https://image.tmdb.org/t/p/w185" + movie.poster_path;

          const movieRow = <MovieList key={movie.id} movie={movie} />;
          movieRows.push(movieRow);
        });
        this.setState({ rows: movieRows });
      }
    });
  }
  searchChangeHandler(event) {
    console.log(event.target.value);
    const boundObject = this;
    const searchTerm = event.target.value;
    boundObject.search(searchTerm);
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <img src="logo.png" height="80px" width="80px" />
          <a href="#" class="text_">
            <span id="t">T</span>
            <span id="m">M</span>
            <span id="d">D</span>
            <span id="b">B</span>
          </a>
          <button id="btn2">
            <a href="#scroll" id="clr">
              LETS GET STARTED
            </a>
          </button>
        </div>
        <section id="scroll">
          <div className="main">
            <form>
              <h1>Search Your Movies</h1>
              <div className="form-box">
                <input
                  onChange={this.searchChangeHandler.bind(this)}
                  type="text"
                  placeholder="Search for Movies"
                  className="search"
                />
              </div>
            </form>
          </div>
        </section>
        <div className="flex"> {this.state.rows}</div>
      </div>
    );
  }
}

export default App;
