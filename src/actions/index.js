import axios from 'axios'
const server = 'http://localhost:4011/dataList'
const ADD_TODO = "ADD_TODO"
const DEL_TODO = "DEL_TODO"
const EDIT_TODO = "EDIT_TODO"
const SET_TODO = "SET_TODO"

export function getData() {
    return (dispatch) => {
        return axios.get(server, {})
            .then((res) => {
                dispatch(setTodo(res.data))
            })
            .catch((error) => {
            });
    }
}
export function addTodoApi(item) {
    return dispatch => {
        return axios.post(server, {
            ...item
        }).then((res) => {
            dispatch(addTodo(item))
        })
    }
}
export function delTodoApi(pos,id) {
    return dispatch => {
        return axios.delete(`${server}/${id}`, {
        }).then(() => {
            dispatch(delTodo(pos))
        })
        .catch(() => {
            console.log("ERROR");
            
        })
    }
}
export function editTodoApi(item,id, newItem) {
    console.log(newItem);
    
    return dispatch => {
        return axios.put(`${server}/${id}`, {
            ...newItem
        }).then(() => {
            dispatch(editTodo(item,id))
        })
        .catch(() => {
            console.log("ERROR");
            
        })
    }
}
export function setTodo(data) {
    return {
        type: SET_TODO,
        payload: data
    };
}
export function addTodo(item) {
    return {
        type: ADD_TODO,
        payload: item
    };
}
export function delTodo(index) {
    return {
        type: DEL_TODO,
        payload: index
    };
}
export function editTodo(item, pos) {
    return {
        type: EDIT_TODO,
        id: pos,
        payload: item
    };
}
