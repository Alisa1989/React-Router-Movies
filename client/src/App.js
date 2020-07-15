import React, { useState, useEffect } from 'react';
import axios from 'axios';


import { Route } from "react-router-dom";

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie     from './Movies/Movie';


const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  console.log("Movie List: " ,movieList);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <div>
      <SavedList list={savedList} />
    
    <Route exact path= "/">
      <MovieList movies = {movieList} /> 
    </Route> 
    
    <Route path= "/movies/:id" component= {Movie}/> 
    </div>
  );
};
//route that is rendering a component it automatically sends props down.
//it has "match" by default from the "history" which is used to match params

export default App;
