import React, { useEffect }  from 'react';
import './Body.css'
import DoingBox from '../DoingBox/DoingBox';
import { useState } from 'react'
import Search from '../../components/Search/Search';
const Body = () =>   {
    const [isSingleMode, setMode] = useState(false);
    const [search, setSearch] = useState(null)
    const changeMode = () => setMode(!isSingleMode);
    const handleSearch = (value) => {   
        setSearch(value)
    }

    
    return (
        <div className="Body">
            <h1>ToDo App</h1>
            <Search handleSearch={handleSearch} />   
            <div className="setting">
                <p onClick = {changeMode}>
                    <i className="fas fa-cog" ></i>
                    <span>Switch Mode</span>
                </p>
            </div>
                <div className="Body__wrapper Body__wrapper--singleMode">
                    { isSingleMode 
                        ?       <DoingBox type="1" typeName="Todo" isSingleMode={isSingleMode} search= {search}></DoingBox>
                        :   <>
                                <DoingBox type="1" id="board-1" typeName="Todo" search= {search}></DoingBox>
                                <DoingBox type="2" id="board-2" typeName="Doing" search= {search}></DoingBox>
                                <DoingBox type="3" id="board-3" typeName="Done" search= {search}></DoingBox>
                            </>
                    
                    }
                </div>
        </div>
    )
    }

export default Body ;


