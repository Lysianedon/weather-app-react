
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';
import {createContext, useState} from "react";
import Home from './views/Home'
import Favorites from './views/Favorites'




export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <li><Link to='/'>HOME</Link></li>
        <li><Link to='/favorites'>FAVORITES</Link></li>
      </nav>

      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/favorites' component={Favorites}></Route>
      </Switch>
    
    </BrowserRouter>
  )
}

