import React, { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SearchPage from './pages/SearchPage/SearchPage';
import DetailPage from './pages/DetailPage/DetailPage';
import ListPage from './pages/ListPage/ListPage';
import FavoritePage from './pages/FavoritePage/FavoritePage';
import FavoriteContextProvider from './contexts/FavoriteContext';

function App() {


  return (
        <div>
          <FavoriteContextProvider>
            <Header/>
            <Router>
              <Switch>
                <Route path="/list-page">
                  <ListPage/>
                </Route>
                <Route path="/detail/:id">
                  <DetailPage/>
                </Route>
                <Route path="/favorite">
                  <FavoritePage/>
                </Route>
                <Route path="/">
                  <SearchPage/>
                </Route>
              </Switch>
            </Router>
            <Footer/>
          </FavoriteContextProvider>
        </div>
  )
  ;
}

export default App;
