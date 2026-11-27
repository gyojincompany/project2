import { useReducer } from "react";

function reducer(state, action) { //상태변화함수
    // if(action.type === "+") {
    //     return state + action.data;
    // } else if(action.type === "-") {
    //     return state - action.data;
    // }
    switch(action.type) {
        case "+":
            return state + action.number; 
        case "-":
            return state - action.number; 
        default:
            return 0;    

    }
}

function TestComp() {
    
    const [count, dispatch] = useReducer(reducer, 0); //0->초깃값
    //useReducer->setCount 사용 X
    //dispatch->상태변화 촉발 함수

    return (
        <div>
            <div>
                <h4>{count}</h4>
            </div>
            <div>
                <button onClick={()=>dispatch({type:"+", number:1})}>+</button>
                <button onClick={()=>dispatch({type:"-", number:1})}>-</button>
                <button onClick={()=>dispatch({type:"0"})}>초기화</button>
            </div>
        </div>
    );
}

export default TestComp;