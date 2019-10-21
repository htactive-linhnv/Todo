import React, { useState } from 'react'
import styled from 'styled-components'

const SearchInput = styled.input`
    height:30px;
    width:60%;
    border: 1px solid gray;
    border-radius: 3px;
    text-indent:10px;
    
` 

export default (props) => {
    const [searchValue, setSearchValue] = useState(null)
    const handleInput = (event) => {        
        setSearchValue(event.target.value)
    }    
    
    return (
        <SearchInput type="text" onChange = {handleInput}>
        </SearchInput>
    )
}