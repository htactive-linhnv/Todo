import React, { useState } from 'react';
const TodoList = props => {
    const [isEditing, setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState("")
    const { name, index, deleteItem, editItem, changeStatus, time, status, isSingleMode, type } = props;
    
    const changeEditing = () => {
        props.setIsEditing(!props.isEditing)
        setIsEditing(!props.isEditing)
    }
    const handleEdit = (e) => {
        setEditValue(e.target.value)
    }
    const dragStart = e => {
        const target = e.target
        const card = document.getElementById(target.id)
        card.style.opacity = 1
        e.dataTransfer.setData('card_id', target.id)
    }
    const dragOver = e => {
        e.stopPropagation()
    }
    return (
        <div
            id={index}
            className={props.className}
            draggable="true"
            onDragStart={dragStart}
            onDragOver={dragOver}
        >
            <div>
                <div className="todo__time"><i class="far fa-calendar-alt"> </i> {time} </div>
                {isEditing ?
                    <div className="editField">
                        <div className="editField__input">
                            <input type="text" onChange={handleEdit} />
                        </div>
                        <div className="editField__btn">
                            <i onClick={() => {
                                editItem({ name: editValue }, index);
                                changeEditing();
                            }} className="fas fa-check btn--green"></i>
                            <i onClick={changeEditing} className="fas fa-ban"></i>
                        </div>
                        <div className="Task__editing-bgr"></div>
                    </div>
                    : null}
            </div>
            {!isEditing ?
                <>
                    <div className="todoContent">
                        <p className="todo__text">
                            {name}
                        </p>
                    </div>
                    <div className="btnGroup">
                        <button className="btn btn--row btn--purple"
                            onClick={changeEditing}>
                            <i class="far fa-edit"></i></button>
                        <button className="btn btn--row btn--red"
                            onClick={() => deleteItem(index)} >
                            <i class="far fa-trash-alt"></i></button>
                        {isSingleMode
                            ?
                            status ? <button onClick={() => changeStatus(index)} className="btn btn--row btn--green"><i class="fas fa-check-square"></i></button>
                                : <button onClick={() => changeStatus(index)} className="btn btn--row btn--green"><i class="far fa-square"></i></button>
                            : null}
                    </div>
                </>
                : null}
        </div>
    )

}
export default TodoList;