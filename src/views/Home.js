import React from 'react'
import styled from 'styled-components' //Style 
import { useState, useEffect, useContext } from "react";
import { createContext } from 'react';

export const FavoritesContext = createContext();


export default function Home() {

    const favoritesContextObject = {
        id : favorites.id,
        isFavorite : favorites.isFavorite,
        setFavorites : setFavorites,
    }

    //City by default (on component mount)
    const [city, setCity] = useState("Paris");
    //User's research
    const [cityInfos, setCityInfos] = useState({
        name : city,
        weather : "",
        temperature : 0,
        icon : "",
    })

    //Error message's display 
    const [displayError, setDisplayError] = useState("none");
    const [displayFavorites, setDisplayFavorites] = useState({
        display : "none",

    });

    //User's favorites
    const [favorites, setFavorites] = useState({
        isFavorite : false,
        id : [],
    });


    //DISPLAYING PARIS WEATHER BY DEFAULT :
    useEffect (() => {

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3ba0e4bcb575e9fa5452e20b8284a174`)
        .then(res => res.json())
        .then(res => {

            setCityInfos({
                name : "Paris",
                weather : res.main.feels_like,
                temperature : res.main.temp,
                icon : res.weather[0].icon,
            })

            let locationIcon = document.querySelector('.weather-icon');
            const icon = cityInfos.icon;
            locationIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${icon}.png">`
            locationIcon.style.display = "none";
        })
    }, [])

    //DISPLAYING THE USER'S SEARCH RESULTS + UPDATE USER'S FAVORITES LIST
    useEffect(() => {

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3ba0e4bcb575e9fa5452e20b8284a174`)
        .then(res => res.json())
        .then(res => {

            //Getting the user's research from the search bar:
            let searchbarValue = document.querySelector('#searchbar').value;

            //GUARD : IF THE USER HASN'T MADE A RESEARCH YET, THE UPDATE WONT BE MADE 
            if (searchbarValue !== "" || searchbarValue !== " ") {
                 
                //Removing the city's name from the searchbar
                document.querySelector('#searchbar').value = "";

                setCityInfos({
                    name : city.toUpperCase(),
                    weather : res.weather[0].description,
                    icon : res.weather[0].icon,
                    temperature : res.main.temp,
                })
                
                //If the user adds the city to its Favorites, the city's ID is added to his Favorites'list :
                if (favorites.isFavorite) {

                    console.log("current city ID: ",res.name, res.id );
                    console.log("test etat favoris avant nouvel ajout: ",favorites.isFavorite);

                    console.log("id favoris ",favorites.id);

                    //Resetting the favorite state
                    setFavorites({
                        isFavorite : false,
                        id : [...favorites.id],
                    })
                    //If the city is already in the user's favorites, a notification is displayed
                    if (favorites.id.includes(res.id)) {
                        
                        document.querySelector('.error').style.display = "initial";
                        setTimeout(() => {
                            document.querySelector('.error').style.display = "none";
                        }, 1500);

                    } else {

                        console.log("id favoris ",favorites.id);
                        setFavorites({
                            isFavorite : false,
                            id : [...favorites.id, res.id],
                        })

                        document.querySelector('.success').style.display = "initial";
                        setTimeout(() => {
                            document.querySelector('.success').style.display = "none";
                        }, 1500);
                    }
                }
                
                //Getting and displaying weather's icon :
                let locationIcon = document.querySelector('.weather-icon');
                const icon = cityInfos.icon;
                locationIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${icon}.png">`
                locationIcon.style.display = "initial";
            }

        //Guard
        }).catch(err => {
            console.log(err);
            setDisplayError("initial");
            
            setTimeout(() => {
                setDisplayError("none");     
            }, 1500);
        })

    }, [city,favorites])


  return (
    <FavoritesContext.Provider value={favoritesContextObject}>
        <DivWrapper>
            <GeneralContent className="infos">
            {/* <h1>HOME</h1> */}

            <form action="" onSubmit={
                (e) => {
                    e.preventDefault();
                    const searchbarValue = document.querySelector('#searchbar').value;
                    setCity(searchbarValue);
                }
            }>
                <label htmlFor="searchbar">What's the weather like in... </label>
                <input type="search" name="searchbar" id="searchbar" placeholder='Belo Horizonte, Sydney...'/>
                <input type="submit" 
                value="SEARCH" 
            />
            </form>
                <h2>City : {cityInfos.name}</h2>
                <div className="weather-infos">
                <h2>Weather: {cityInfos.weather} </h2>
                <div class="weather-icon"><img src="icons/unknown.png"/></div>

                </div>

                <h2>Temperature : {cityInfos.temperature} °C</h2>

                <button onClick={(e) => {
                    e.preventDefault();
                    //Setting "favorite" state to True, so that it gets added to the list in the useEffect : 
                    setFavorites({
                        isFavorite : true,
                        id : favorites.id,
                    })
                }}>ADD TO FAVORITES</button>

                {/* HIDDEN NOTIFICATION MESSAGES */}
                <p style={{display: `${displayError}`,}}>Error : Please enter a correct city name.</p>
                <p className="error" style={{display: "none",}}>This city is already in your favorites</p>
                <p className="success" style={{display: "none",}}>Added to your favorites !</p>
            </GeneralContent>

        </DivWrapper>
    </FavoritesContext.Provider>
  )
}


// ----------------------- Styled Components -----------------------

//------------ DIV WRAPPER ------------
const DivWrapper = styled.div`
height: 73vh;
background: rgb(9,9,121);
background: linear-gradient(0deg, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 54%);

`

//------------ CONTENT ----------------
const GeneralContent = styled.div`

    width: 50%;
    margin: auto;

    h1 {
        text-align: center;
        margin: 0;
        padding: 0;
        color: white;
    }

    //Weather infos
    h2 {
        color: white;
    }

    //Searchbar Label
    label {
        display: block;
    }
    //Searchbar + submit button
    input {
        width: 80%;
        border: 1px solid black;
        border-radius: 3px;
        height: 5vh;
        margin-top: 2%;
        padding-left: 1.5%;
        font-size: 17px;
        background-color: white;
    }

    .weather-infos {
        display: flex;
    }

    //Error message
    p {
        text-align: center;
        color: white;
        background-color: #111111;
        font-size: 20px;
        font-weight: 900;
        margin-left: 16%;
    }

`

