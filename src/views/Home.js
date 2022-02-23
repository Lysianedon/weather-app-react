import React from 'react'
import styled from 'styled-components'
import { useState, useEffect, useContext } from "react";

export default function Home() {

    const [city, setCity] = useState("Paris");
    const [cityInfos, setCityInfos] = useState({
        name : city,
        weather : "",
        temperature : 0,

    })

    //ComponentDidMount : displaying Paris weather
    useEffect (() => {

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3ba0e4bcb575e9fa5452e20b8284a174`)
        .then(res => res.json())
        .then(res => {
            // console.log("res:",res.main);

            setCityInfos({
                name : "Paris",
                weather : res.main.feels_like,
                temperature : res.main.temp,

            })
        })
    }, [])

    //ComponentDidUpdate : displaying the user's search results
    useEffect(() => {

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3ba0e4bcb575e9fa5452e20b8284a174`)
        .then(res => res.json())
        .then(res => {

            setCityInfos({
                name : city.toUpperCase(),
                weather : res.main.feels_like,
                temperature : res.main.temp,
            })
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
            <h3>City : {cityInfos.name}</h3>
            <h3>Weather (Feels like): {cityInfos.weather} °C</h3>
            <h3>Temperature : {cityInfos.temperature} °C</h3>
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

    h3 {
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

`

