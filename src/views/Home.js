import React from 'react'
import styled from 'styled-components'
import { useState, useEffect, useContext } from "react";

export default function Home() {

    const [city, setCity] = useState("Paris");
    const [cityInfos, setCityInfos] = useState({
        name : city,
        weather : "",
        temperature : 0,
        icon : "",

    })

    //DISPLAYING PARIS WEATHER BY DEFAULT 
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
        })
    }, [])

    //DISPLAYING THE USER'S SEARCH RESULTS
    useEffect(() => {

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3ba0e4bcb575e9fa5452e20b8284a174`)
        .then(res => res.json())
        .then(res => {

            setCityInfos({
                name : city.toUpperCase(),
                weather : res.weather[0].description,
                icon : res.weather[0].icon,
                temperature : res.main.temp,
            })

            let locationIcon = document.querySelector('.weather-icon');
            const icon = cityInfos.icon;
            // locationIcon.innerHTML = <img src="icons/${icon}.png"></img>
            locationIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${icon}.png">`

        })

    }, [city])

  return (
    <DivWrapper>
        <GeneralContent className="infos">
        <h1>HOME</h1>

        <form action="" onSubmit={
            (e) => {
                e.preventDefault();
                const searchbarValue = document.querySelector('#searchbar').value;
                // console.log(searchbarValue);
                setCity(searchbarValue);
                // console.log("test city; ",city);
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
        </GeneralContent>

    </DivWrapper>
  )
}

const DivWrapper = styled.div`
height: 71vh;
background: rgb(9,9,121);
background: linear-gradient(0deg, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 54%);

`

const GeneralContent = styled.div`

    width: 50%;
    margin: auto;

    h1 {
        text-align: center;
        margin: 0;
        padding: 0;
        color: white;
    }

    h2 {
        color: white;
    }

    label {
        display: block;
        /* text-align: center; */
    }

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

`

