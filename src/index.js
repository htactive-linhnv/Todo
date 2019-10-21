import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
const initState = {
    dataList: [
      
    ],  
};


function reducer(state = initState, action) {
    switch (action.type) {
        case "SET_TODO":
            return {
                dataList: action.payload
            }
        case "ADD_TODO":
            return {
                dataList: state.dataList.concat(action.payload)
            }
        case "DEL_TODO":
            const index = action.payload
            return {
                ...state,
                dataList: [
                    ...state.dataList.slice(0, index),
                    ...state.dataList.slice(index + 1)  
                ],
            }
        case "EDIT_TODO":
            const update = action.payload
            return {
                dataList: state.dataList.map((item) => {                    
                    return item.id === action.id ? {...item,...update} : item
                })
            }
        default: return state;
    }

}
const store = createStore(reducer,applyMiddleware(thunk));
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


