import React, { Component } from 'react';
import { debounce } from "debounce";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import Recipe from './Recipe.js';

import './Recipes.css';

const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const RECIPE_API = 'http://www.recipepuppy.com/api/';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      isSearching: false,
      recipes: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.debounceRequest = debounce(this.debounceRequest, 600);
  }

  componentDidMount() {
    fetch(PROXY_URL + RECIPE_API)
      .then(response => response.json())
      .then(data => this.setState({recipes: data.results, isSearching: false}))
      .catch(error => console.log(error));
  }

  handleChange(event) {
    event.preventDefault();

    const searchTerm = event.target.value;
    this.setState({ search: searchTerm });

    const query = `${PROXY_URL}${RECIPE_API}?q=${encodeURIComponent(searchTerm)}`;
    this.debounceRequest(query);    
  }

  debounceRequest(query) {
    this.setState({ isSearching: true });

    fetch(query)
      .then(response => response.json())
      .then(data => this.setState({recipes: data.results, isSearching: false}))
      .catch(error => console.log(error));      
  }

  getRecipes() {
    return this.state.recipes.map((recipe, key) => {
      return (<Recipe key={key}
        thumbnail={recipe.thumbnail}
        title={recipe.title}
        href={recipe.href}
        ingredients={recipe.ingredients} />);
    });
  }

  getRecipesLength() {
    return this.state.recipes ? this.state.recipes.length : 0;
  }

  render() {
    return (
      <div className="Recipes">
        <div className="Recipes-container">
          <header className="Recipes-header">
            <form className="Recipes-search" onSubmit={(e) => e.preventDefault()}>
              <label className="Recipes-search__label" 
                htmlFor="name">Search Recipes</label>
              <input
                id="name"
                className="Recipes-search__input"
                type="text"
                placeholder="Enter search term"
                value={this.state.search}
                onChange={this.handleChange}
              />
            </form>
          </header>

          <h2 className="Recipes-count">
            <span className="Recipes-count-length">{this.getRecipesLength()}</span>{' '}
            Recipe(s)
            {this.state.isSearching && <FontAwesomeIcon icon={faSpinner} />}
          </h2>

          <ul className="Recipes-list">
            {this.getRecipes()}
          </ul>

          <footer className="Recipes-footer">
            <p className="Recipes-footer__project">openRecipes</p>
            <p className="Recipes-footer__developer">Developed by Reneldy Senat</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default Recipes;
