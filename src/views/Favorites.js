import React from 'react'
import { useContext, useEffect, useState, createContext } from 'react'
//UseContext allContexts : 
import {AllContexts} from '../App'
import styled from "styled-components"; //Style library
import Card from '../components/Card';

export const FavCitiesCards = createContext();

export default function Favorites() {

  const allContexts = useContext(AllContexts);

  const [favoriteCities, setFavoriteCities] = useState([]);

    
  useEffect(() => {

    const listFavoritesArray = allContexts.listFavorites.split(',');

      for (let i = 0; i < listFavoritesArray.length; i++) {
        
        
        fetch(`https:/api.openweathermap.org/data/2.5/weather?id=${listFavoritesArray[i]}&units=metric&appid=3ba0e4bcb575e9fa5452e20b8284a174`)
        .then(res => res.json())
        .then(res => {

          const copyFavorites = favoriteCities;
          copyFavorites.push(res);
          setFavoriteCities([copyFavorites])
        })
        
      }
      console.log("test favoritescities: ", favoriteCities);

  }, [allContexts.favorites])


  const value = {
    favoriteCities : favoriteCities,
    setFavoriteCities : setFavoriteCities,
  }

  return (
    <FavCitiesCards.Provider value={value}>
    <StyledFavorites>

      <h1>FAVORITES </h1>

      {
        favoriteCities.map((favoriteCity,i) => {
          console.log("current fav: ",favoriteCities);
          return   <StyledCard key={favoriteCity[i]}>

                    <h2 key={favoriteCity[i]}>City : {favoriteCity[i].name}</h2>
                    <div className="weather-infos" key={favoriteCity[i]}>
                    <h2 key={favoriteCity[i]}>Weather: {favoriteCity[i].weather[0].description} </h2>
                    <div class="weather-icon" key={favoriteCity[i]}><img src="icons/unknown.png" alt="weather-icon" key={favoriteCity[i]}/></div>
    
                    </div>
    
                    <h2 key={favoriteCity[i]}>Temperature : {favoriteCity[i].main.temp} °C </h2>
  
                 </StyledCard>
        })
      }




    </StyledFavorites>
    </FavCitiesCards.Provider>
  )
}

const StyledFavorites = styled.div`

height: 75vh;

.weather-infos {
  display: flex;
}

`

const StyledCard = styled.div`
border: 1px solid black;
width: 30%;
margin: auto;
padding: 6% 5%;
border-radius: 5px;
color: white;
background-color: #111111;

`