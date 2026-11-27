import { useRef, useState } from 'react';
import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';

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

  const [todoList, setTodoList] = useState(mockTodo); //todoList->할일들의 리스트->할일 객체들의 배열

  //새 할일(객체)을 만들어주는 함수->할일 리스트에 추가
  function onCreate(content) {
    const newItem = { //새로운 할일 객체
      id :idRef.current,
      content, //content: {content}
      isDone: false, //체크박스(초깃값 체크되지 않은 상태->false)
      createDate : new Date().getTime() //오늘 날짜시간
    };
    setTodoList([newItem, ...todoList]); //기존 할일 리스트에 새로운 할일 객체 추가
    idRef.current = idRef.current + 1; //할일 리스트에 넣은 후 id값 1증가 시킴->다음 할일 객체의 id값
  }

  

  return (
    <div className="App">
      <Header />
      <TodoEditor onCreate={onCreate}/>
      <TodoList />
    </div>
  );
}

export default App;
