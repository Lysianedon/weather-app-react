import React from 'react'
import styled from 'styled-components' //Style 
import { useContext, useEffect, useState, createContext} from 'react'
//UseContext AllContexts : 
import {AllContexts} from '../App'


export default function Home() {

    const allContexts = useContext(AllContexts);

    //DISPLAYING PARIS WEATHER BY DEFAULT :
    useEffect (() => {

        // console.log("ajout objet city: ", allContexts.favorites.favoriteCitiesObjects);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${allContexts.city}&units=metric&appid=3ba0e4bcb575e9fa5452e20b8284a174`)
        .then(res => res.json())
        .then(res => {

            allContexts.setCityInfos({
                name : "Paris",
                weather : res.main.feels_like,
                temperature : res.main.temp,
                icon : res.weather[0].icon,
            })

            let locationIcon = document.querySelector('.weather-icon');
            const icon = allContexts.icon;
            locationIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${allContexts.icon}.png">`
            locationIcon.style.display = "none";
        })
    }, [])

    //DISPLAYING THE USER'S SEARCH RESULTS + UPDATE USER'S FAVORITES LIST
    useEffect(() => {

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${allContexts.city}&units=metric&appid=3ba0e4bcb575e9fa5452e20b8284a174`)
        .then(res => res.json())
        .then(res => {

            //Getting the user's research from the search bar:
            let searchbarValue = document.querySelector('#searchbar').value;

            //GUARD : IF THE USER HASN'T MADE A RESEARCH YET, THE UPDATE WONT BE MADE 
            if (searchbarValue !== "" || searchbarValue !== " ") {
                 
                //Removing the city's name from the searchbar
                document.querySelector('#searchbar').value = "";

                allContexts.setCityInfos({
                    name : allContexts.city.toUpperCase(),
                    weather : res.weather[0].description,
                    icon : res.weather[0].icon,
                    temperature : res.main.temp,
                })
                
                //If the user adds the city to its Favorites, the city's ID is added to his Favorites'list :
                if (allContexts.favorites.isFavorite) {

                    //Resetting the favorite state
                    allContexts.setFavorites({
                        isFavorite : false,
                        id : [...allContexts.favorites.id],
                        // favoriteCities : [...allContexts.favorites.favoriteCities],
                    })
                    //If the city is already in the user's favorites, a notification is displayed
                    if (allContexts.favorites.id.includes(res.id)) {
                        
                        document.querySelector('.error').style.display = "initial";
                        setTimeout(() => {
                            document.querySelector('.error').style.display = "none";
                        }, 1500);
                        
                    } else if (allContexts.favorites.id.length === 3 ) {

                        document.querySelector('.errorLengthFav').style.display = "initial";
                        setTimeout(() => {
                            document.querySelector('.errorLengthFav').style.display = "none";
                        }, 1500);
                        
                    } else {
                        
                        allContexts.setFavorites({
                            isFavorite : false,
                            id : [...allContexts.favorites.id, res.id],
                            // favoriteCities : [...allContexts.favorites.favoriteCities, res],
                        })
                        
                        //Adding it to the localStorage,
                        localStorage.setItem("listFavorites", allContexts.id);
                        
                        document.querySelector('.success').style.display = "initial";
                        setTimeout(() => {
                            document.querySelector('.success').style.display = "none";
                        }, 1500);
                    }
                }
                
                //Getting and displaying weather's icon :
                let locationIcon = document.querySelector('.weather-icon');
                const icon = allContexts.cityInfos.icon;
                locationIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${icon}.png">`
                locationIcon.style.display = "initial";

            }
            
            localStorage.setItem("listFavorites", allContexts.id);
            console.log("check local storage: ", allContexts.listFavorites);
            
        //Guard
        }).catch(err => {
            console.log(err);
            allContexts.setDisplayError("initial");
            
            setTimeout(() => {
                allContexts.setDisplayError("none");     
            }, 1500);
        })

    }, [allContexts.city,allContexts.favorites, allContexts.favorites.id])


  return (

        <DivWrapper>
            <GeneralContent className="infos">

            <form action="" onSubmit={
                (e) => {
                    e.preventDefault();
                    const searchbarValue = document.querySelector('#searchbar').value;
                    allContexts.setCity(searchbarValue);
                }
            }>
                <label htmlFor="searchbar">What's the weather like in... </label>
                <input type="search" name="searchbar" id="searchbar" placeholder='Belo Horizonte, Sydney...'/>
                <input type="submit" 
                value="SEARCH" 
            />
            </form>
                <h2>City : {allContexts.cityInfos.name}</h2>
                <div className="weather-infos">
                <h2>Weather: {allContexts.cityInfos.weather} </h2>
                <div class="weather-icon"><img src="icons/unknown.png" alt="weather-icon"/></div>

                </div>

                <h2>Temperature : {allContexts.cityInfos.temperature} ??C</h2>

                <button onClick={(e) => {
                    e.preventDefault();
                    //Setting "favorite" state to True, so that it gets added to the list in the useEffect : 
                    allContexts.setFavorites({
                        isFavorite : true,
                        id : allContexts.favorites.id,
                    })
                }}>ADD TO FAVORITES</button>

                {/* HIDDEN NOTIFICATION MESSAGES */}
                <p style={{display: `${allContexts.displayError}`,}}>Error : Please enter a correct city name.</p>
                <p className="error" style={{display: "none",}}>This city is already in your favorites</p>
                <p className="errorLengthFav" style={{display: "none",}}>Error : you can add 3 favorite cities maximum.</p>
                <p className="success" style={{display: "none",}}>Added to your favorites !</p>
            </GeneralContent>

        </DivWrapper>
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

