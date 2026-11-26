import { useState } from 'react';
import './TodoEditor.css';

function TodoEditor({onCreate}) {

    const [content, setContent] = useState("");

    //input에 텍스트가 입력되거나 수정되었을 때 호출되는 이벤트 핸들러
    function onChangeContent(e) {
        setContent(e.target.value);
    };

    return (
        <div className="TodoEditor">
            <h4>새로운 Todo 작성하기 ✏️</h4>
            <div className="editor_wrapper">
                <input placeholder="새로운 Todo..." onChange={onChangeContent} />
                <button onClick={()=>onCreate(content)}>추가</button>
            </div>
        </div>
    );
}

export default TodoEditor;