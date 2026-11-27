import React, { useReducer, useRef } from 'react';
import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';

function reducer(state, action) { //상태 변화 함수
  switch(action.type) {
    case "CREATE":
      return [action.newItem, ...state]; //기존 할일 리스트에 새로운 할일 객체가 추가된 할일 리스트

    case "UPDATE":
      return state.map((item)=> {
        if(item.id === action.tId) {
          return {...item, isDone : !item.isDone};
        } else {
          return item;
        }
      });
    
    case "DELETE":
      return state.filter((item) =>
        item.id !== action.tId 
      );  

    default:
      return state;
  }
}

export const TodoContext = React.createContext(); //context 생성

function App() {

  const idRef = useRef(3); //초깃값으로 지정된 변수가 서버의 메모리에 생성

  const mockTodo = [ //테스트용 할일 데이터 리스트
    {
      id : 0,
      isDone : false,
      content: "React 복습하기!!",
      createDate: new Date().getTime()
    },
    {
      id : 1,
      isDone : false,
      content: "빨래 널기",
      createDate: new Date().getTime()
    },
    {
      id : 2,
      isDone : false,
      content: "노래 연습하기",
      createDate: new Date().getTime()
    }
  ];
  
  //useState -> useReducer 스타일로 변경
  const [todoList, dispatch] = useReducer(reducer, mockTodo);

  function onCreate(content) { //
    dispatch(
      {
        type:"CREATE",
        newItem : { //새로운 할일 객체
        id : idRef.current,
        content : content, //content
        isDone : false, //체크박스(초깃값 체크되지 않은 상태->false)
        createDate : new Date().getTime() //오늘 날짜시간
        }
      }
    );    
    idRef.current = idRef.current + 1; 
  };

  function onUpdate(targetId) {
    dispatch(
      {
        type:"UPDATE",
        tId:targetId
      }
    )  
  };

  function onDelete(targetId) {
    dispatch(
      {
        type:"DELETE",
        tId:targetId
      }
    )  
  };

  return (
    <div className="App">      
      <Header />
      <TodoContext.Provider value={{onCreate, todoList, onUpdate, onDelete}}>
        <TodoEditor />
        <TodoList />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
