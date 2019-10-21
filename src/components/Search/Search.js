import React, { useState } from 'react'
import styled from 'styled-components'

const Search = styled.div`
    width:30%;
    margin: 0 auto;
    text-align:center;
    margin-bottom:30px;

    & input{
        height:30px;
        width:60%;
        border: 1px solid gray;
        border-radius: 3px;
        text-indent:10px;
    }
    & button{
        height:36px;
        width:20%;
        margin-left:4px;
        border: 1px solid #5d5a5a;
        border-radius: 3px;
        color:white;
        background:#5680F9;
        cursor:pointer;
    }
` 

export default (props) => {
    const [searchValue, setSearchValue] = useState(null)
    const handleInput = (event) => {        
        setSearchValue(event.target.value)
    }    
    
    return (
        <Search>
            <input type="text" onChange = {handleInput}></input>
            <button onClick = {() => props.handleSearch(searchValue)}><i class="fa fa-search"></i></button>
        </Search>
    )
}