
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';
import {createContext, useState} from "react";
import Home from './views/Home'
import Favorites from './views/Favorites'
import styled from "styled-components"; //Style library
import logo from './img/weatherapp3.png'

var moment = require('moment'); // require
moment().format(); 


export default function App() {
  return (
    <BrowserRouter>
      <StyledNav>
        <img src={logo} alt="logo weather-app" srcset="" />
        <div className="links">
        <li><Link to='/' className='link '>HOME</Link></li>
        <li><Link to='/favorites' className='link favorites'>FAVORITES</Link></li>
        </div>
      </StyledNav>

      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/favorites' component={Favorites}></Route>
      </Switch>

      <StyledFooter>
        <h4> &copy; <a href="https://github.com/Lysianedon" target="_blank" rel="noopener noreferrer"> Made by Lysiane</a></h4>
        <h4>{moment().format(" [Today is] MMMM Do, YY")} </h4>
      </StyledFooter>
    </BrowserRouter>
  )
}


// ----------------------- Styled Components -----------------------

//  --------------- NAV  ---------------
const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding-right: 3%;
  list-style: none;
  background-color: #111111;
  padding-top: 1%;
  height: 15vh;

  img {
    width: 16vw;
    height: 44vh;
    margin-top: -8.5%;
    margin-left: -3%;
  }

  .links {
    display: flex;
    flex-direction: row;
    padding-top: 2%;
  }

  .link {
    color: white;
    text-decoration: none;
    font-size: 1.5em;
  }

  .favorites {
    margin-left: 1em;
  }
`
// --------------- FOOTER ---------------

const StyledFooter = styled.footer `
color: white;
display: flex;
justify-content: space-around;
background-color: #111111;


a {
    text-decoration: none;
    color: white;
  }

`




