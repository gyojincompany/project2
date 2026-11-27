import { useReducer, useRef } from 'react';
import './TodoEditor.css';

function reducer(state, action) {
    switch(action.type)  {
        case "SETCONTENT":
            return action.value;
        case "RESET":
            return "";
        default:
            return state;    
    }
}


function TodoEditor({onCreate}) {

    const [content, dispatch] = useReducer(reducer, "");

    const inputRef = useRef();

    //input에 텍스트가 입력되거나 수정되었을 때 호출되는 이벤트 핸들러 -> input 에 입력된 텍스트를 가져오기
    function onChangeContent(e) {
        dispatch(
            {
                type:"SETCONTENT",
                value:e.target.value
            }
        );
    };

    function onKeyDown(e) { //엔터키 입력 이벤트 핸들러
        //엔터키의 코드번호 13
        if(e.keyCode === 13) {
            onSubmit();
        }    
    };

    //추가버튼->이벤트 핸들러
    function onSubmit() {
        if(!content) { //참->공백으로 입력됨
            inputRef.current.focus();
            return;
        }
        onCreate(content);
        // setContent(""); //입력폼 초기화
        dispatch(
            {
                type:"RESET"
            }
        );
        inputRef.current.focus();
    }

    return (
        <div className="TodoEditor">
            <h4>새로운 Todo 작성하기 ✏️</h4>
            <div className="editor_wrapper">
                <input 
                    ref={inputRef} 
                    value={content} 
                    placeholder="새로운 Todo..." 
                    onChange={onChangeContent} 
                    onKeyDown={onKeyDown}
                />
                <button onClick={()=>onSubmit()}>추가</button>
            </div>
        </div>
    );
}

export default TodoEditor;