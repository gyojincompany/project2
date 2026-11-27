import { useReducer, useRef } from 'react';
import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';

function reducer(state, action) { //상태 변화 함수
  switch(action.type) {
    case "CREATE":
      return [action.newItem, ...state]; //기존 할일 리스트에 새로운 할일 객체 추가

    case "UPDATE":
      return state.map((item)=> {
        if(item.id === action.targetId) {
          return {...item, isDone : !item.isDone};
        } else {
          return item;
        }
      });
    
    case "DELETE":
      return state.filter((item) =>
        item.id !== action.targetId 
      );  
      
    default:
      return state;
  }
}

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

  //const [todoList, setTodoList] = useState(mockTodo); //todoList->할일들의 리스트->할일 객체들의 배열
  
  //useState -> useReducer 스타일로 변경
  const [todoList, dispatch] = useReducer(reducer ,mockTodo);

  function onCreate(content) { //
    dispatch(
      {
        type:"CREATE",
        newItem : { //새로운 할일 객체
        id :idRef.current,
        content, //content: {content}
        isDone: false, //체크박스(초깃값 체크되지 않은 상태->false)
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
        targetId
      }
    )  
  };

  function onDelete(targetId) {
    dispatch(
      {
        type:"DELETE",
        targetId
      }
    )  
  };

  // //새 할일(객체)을 만들어주는 함수->할일 리스트에 추가
  // function onCreate(content) {
  //   const newItem = { //새로운 할일 객체
  //     id :idRef.current,
  //     content, //content: {content}
  //     isDone: false, //체크박스(초깃값 체크되지 않은 상태->false)
  //     createDate : new Date().getTime() //오늘 날짜시간
  //   };
  //   setTodoList([newItem, ...todoList]); //기존 할일 리스트에 새로운 할일 객체 추가
  //   idRef.current = idRef.current + 1; //할일 리스트에 넣은 후 id값 1증가 시킴->다음 할일 객체의 id값
  // }

  // //체크박스 수정 기능을 추가해주는 함수
  // //isDone 의 값을 false->true->false
  // function onUpdate(targetId) { //매개변수로 이벤트 핸들러를 호출한 할일객체(item)의 id값 선언
  //   //1) 이벤트가 발생한 할일 객체 찾기(targetId)
  //   //2) 이벤트가 발생한 할일 객체의 isDone 값 가져오기
  //   //3) isDone 값 반대로 바꾸기(!isDone)
  //   setTodoList(
  //     todoList.map((item)=>{
  //       if(item.id === targetId) { //참->이벤트가 발생한 할일 객체 찾기 성공
  //         //...item => id, content, isDone, createDate , isDone : !isDone
  //         return {...item, isDone : !item.isDone};
  //         //체크 이벤트가 발생한 할일 객체의 isDone값을 반대로 수정한 후에 새배열로 넣어주기 위한 반환
  //       } else {
  //         return item; //체크 이벤트가 발생하지 않은 할일 객체들은 그대로 새배열로 넣어주기 위한 반환
  //       }
  //     })
  //   );
  // };

  // //할일 객체 삭제 함수->삭제해야할 할일 객체를 제외하는 필터링 함수
  // function onDelete(targetId) {
  //   setTodoList(
  //     todoList.filter((item) =>
  //     item.id !== targetId //삭제해야할 아이디 할일 객체를 제외한 나머지 할일 객체만 배열로 생성
  //     )
  //   );
  // };


  return (
    <div className="App">      
      <Header />
      <TodoEditor onCreate={onCreate}/>
      <TodoList todoList={todoList} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
