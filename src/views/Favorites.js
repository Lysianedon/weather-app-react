import React from 'react'
import { useContext, useEffect, useState, createContext } from 'react'
//UseContext allContexts : 
import {AllContexts} from '../App'
import styled from "styled-components"; //Style library

export const FavCitiesCards = createContext();

export default function Favorites() {

  const allContexts = useContext(AllContexts);

  const [favoriteCities, setFavoriteCities] = useState([]);
  let listFavoritesArray = [];
    
  useEffect(() => {

    listFavoritesArray = allContexts.listFavorites.split(',');

      for (let i = 0; i < listFavoritesArray.length; i++) {
        
        
        fetch(`https:/api.openweathermap.org/data/2.5/weather?id=${listFavoritesArray[i]}&units=metric&appid=3ba0e4bcb575e9fa5452e20b8284a174`)
        .then(res => res.json())
        .then(res => {

          const copyFavorites = favoriteCities;
          copyFavorites.push(res);
          setFavoriteCities(copyFavorites)
          let icon = document.querySelector('.weather-icon');
          // icon.style.display = "block";
          // icon.innerHTML= `<img src="http://openweathermap.org/img/w/${res.weather[0].icon}.png" alt="weather-icon"/>`
          console.log("the weather icon: ",icon);
        })
        
      }
      console.log("test favoritescities: ", favoriteCities);


  }, [allContexts.isFavorite])


  const value = {
    favoriteCities : favoriteCities,
    setFavoriteCities : setFavoriteCities,
  }

  return (

    <StyledFavorites>

      <h1>FAVORITES </h1>
        <div className='favoritecards'>
          {
            favoriteCities.map((fav)=> {
              console.log(fav);
              return <StyledCard> <h2>{fav.name}</h2>
                            <h3>Weather: {fav.weather[0].description} </h3>
                            <div className="weather-infos">
                          <h3 className='lastH3'>Temperature: {fav.main.temp} °C</h3>
                          {/* <div class="weather-icon"><img src={`http://openweathermap.org/img/w/${fav.weather[0].icon}`} alt="weather icon"/></div> */}
                          {/* <div class="weather-icon"></div> */}
                        </div>
                    </StyledCard>
            })
          } 
          </div>

    </StyledFavorites>

  )
}

// ----------------------- Styled Components -----------------------

const StyledFavorites = styled.div`
height: 100vh;
display: flex;
flex-direction: column;


.weather-infos {
  display: flex;
}

.favoritecards{
  display: flex;
}

`

const StyledCard = styled.div`
border: 1px solid black;
width: 30%;
margin: 2% 4%;
height: 30vh;
padding: 6% 5%;
border-radius: 5px;
color: white;
background-color: #111111;

`