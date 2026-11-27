import './TodoItem.css';

function TodoItem({id, content, isDone, createDate, onUpdate, onDelete}) {

    function onChangeCheckBox() {
        onUpdate(id);
    }

    return (
        <div className="TodoItem">
            <div className='checkbox_col'>
                <input onChange={onChangeCheckBox} checked={isDone} type='checkbox' />
            </div>
            <div className='title_col'>{content}</div>
            <div className='date_col'>{new Date(createDate).toLocaleDateString()}</div>
            <div className='btn_col'>
                <button onClick={()=>onDelete(id)}>삭제</button>
            </div>
        </div>
    );
}

export default TodoItem;