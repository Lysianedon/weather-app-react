import React from 'react'
import styled from 'styled-components'

export default function Home() {
  return (
    <DivWrapper>
        <GeneralContent className="infos">
        <h1>HOME</h1>

        <form action="">
            <label htmlFor="searchbar">What's the weather like in :</label>
            <input type="search" name="searchbar" id="searchbar" placeholder='Belo Horizonte, Sydney...'/>
            <input type="submit" value="SEARCH" />
        </form>
            <h3>Ville : </h3>
            <h3>Temps : </h3>
            <h3>Température : </h3>
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

