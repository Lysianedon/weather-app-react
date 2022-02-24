import React from 'react'
import { useContext, useEffect, useState, createContext } from 'react'
//UseContext allContexts : 
import {AllContexts} from '../App'
import styled from "styled-components"; //Style library
import Card from '../components/Card';


export default function Favorites() {

  const allContexts = useContext(AllContexts);
    
  useEffect(() => {
      
      console.log("test context: ", allContexts);

  }, [])

  return (
    <StyledFavorites>

      <h1>FAVORITES</h1>

      <Card/>




    </StyledFavorites>
  )
}

const StyledFavorites = styled.div`

height: 73vh;

`
