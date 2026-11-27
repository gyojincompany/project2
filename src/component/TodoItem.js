import { useContext } from 'react';
import './TodoItem.css';
import { TodoContext } from '../App';

function TodoItem({id, content, isDone, createDate}) {
    
    //context에 전달된 데이터 중 필요한 데이터 가져오기
    const {onUpdate, onDelete } = useContext(TodoContext);

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