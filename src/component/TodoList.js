import TodoItem from './TodoItem';
import './TodoList.css';

/*
    {
      id : 0,
      isDone : false,
      content: "React 복습하기!!",
      createDate: new Date().getTime()
    },
*/    
/* <TodoItem id={item.id} isDone={item.isDone} content={item.content} createDate={item.createDate} /> */

function TodoList({todoList}) {
    return (
        <div className="TodoList">
            <h4>Todo List 🌱</h4>            
            <input className='searchbar' placeholder="검색어를 입력하세요" />
            <div className='list_wrapper'>
                {
                    todoList.map((item) => (                        
                        <TodoItem key={item.id} {...item} />
                    ))
                }
            </div>
        </div>
    );
}

export default TodoList;