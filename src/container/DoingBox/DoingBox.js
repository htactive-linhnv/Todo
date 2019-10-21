import React, { useState, useEffect } from 'react';
import TodoList from '../../components/TodoList/TodoList'
import '../../Box.css'
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { addTodoApi, delTodoApi, editTodoApi, getData } from '../../actions/index';
import moment from 'moment'

const uuidv4 = require('uuid/v4');
const DoingBox = (props) => {

    const { type, dispatch, isSingleMode, dataList, typeName, search } = props
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [input, setInput] = useState(false)
    const openModal = () => {
        setModalIsOpen(true)
    }

    const afterOpenModal = () => {
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const handleInput = (e) => {
        setInput(e.target.value)
    }

    const deleteItem = (id) => {
        const data = dataList;
        const newItem = data.filter(item => item.id === id)
        const position = data.indexOf(newItem[0])
        dispatch(delTodoApi(position, id))
    }

    const addItem = () => {
        const randomId = uuidv4()
        dispatch(addTodoApi({ id: randomId, name: input, status: false, type: type, typeName: typeName, time: moment().format('MMMM Do YYYY, h:mm:ss a') }))
    }

    const editItem = (type, id) => {
        const data = dataList;
        const item = data.filter(item => item.id === id)[0]
        const newItem = { ...item, ...type }
        dispatch(editTodoApi(type, id, newItem))
    }

    useEffect(() => {
        dispatch(getData())
    }, [])

    //drop
    const drop = e => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData("card_id")
        editItem({ type: parseInt(type) }, card_id)
    }

    const dragOver = e => {
        e.preventDefault();
    }

    const typedList = dataList.filter(item => item.type == type)
    const searchedList = search === null ? typedList : typedList.filter(item => item.name.includes(search))
    const listTodos = searchedList.map((item, index) => {
        return (
            // <div className={item.status && isSingleMode ? "TodoItem__wrapper done" : "TodoItem__wrapper"} >
            <TodoList name={item.name} status={item.status}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                index={item.id}
                item={item}
                type={type}
                deleteItem={deleteItem}
                editItem={editItem}
                time={item.time}
                className={"TodoItem__wrapper"}
            >
            </TodoList>
            // </div>
        )
    })

    return (
        <div className={isSingleMode ? "gridItem singleMode" : "gridItem"}>
            <div className="gridItem__header">
                <div className="header__left">
                    <p>
                        <span className="numberItems">{typedList.length}</span>
                        {typeName}
                    </p>
                </div>
                <div className="header__right">
                    <button className="btn btn--blue" onClick={openModal}>+ New </button>
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        className="addModal"
                    >
                        <div className="modal__header">
                            <p>Create New Task</p>
                        </div>
                        <div className="modal__body">
                            <form >
                                <div className="modal__input">
                                    <input type="text" onChange={handleInput} />
                                </div>
                                <div className="modal__btn">
                                    <button className="btn btn--blue btn--modal" onClick={() => {
                                        closeModal();
                                        addItem();
                                    }
                                    }
                                    >Save</button>
                                    <button className="btn btn--blueLight btn--modal" onClick={closeModal}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                </div>
            </div>
            <hr className="boxLine"></hr>
            <div
                id={props.id}
                className={`todoField ${props.className}`}
                onDrop={drop}
                onDragOver={dragOver}
            >
                {listTodos}
            </div>
        </div>

    )
}

const mapStateToProps = state => {
    return {
        dataList: state.dataList
    };
};

// 
export default connect(mapStateToProps)(DoingBox);