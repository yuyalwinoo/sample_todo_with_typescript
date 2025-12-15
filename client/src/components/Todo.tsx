import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import type { Todo } from "../types/todo";
import { addNewTodos, deleteTodo, getAllTodos, updateTodo } from "../services/todo";
import CreateTodo from "./CreateTodo";

function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todoTitle, setTodoTitle] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editID, setEditID] = useState('');
    useEffect(()=>{
        fetchAllTodos();
    },[refresh])

    const fetchAllTodos = async()=>{
        try {
          const data = await getAllTodos();
          setTodos(data);
        } catch (error) {
          throw new Error("Failed to fetch data.")
        }
    }

    const makeRefresh = ()=> setRefresh(!refresh);

    const todoTitleOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTodoTitle(e.target.value);
    };

    const SubmitHandler = async(e: FormEvent)=> {
      e.preventDefault();
      // console.log("todoTitle",todoTitle);
      if(todoTitle.trim() === ''){
        return;
      }

      try {
        if(editMode)
        {
          await updateTodo(todoTitle,editID);
          setEditMode(false);
          setEditID('');
        }else 
        {
          await addNewTodos(todoTitle);
        }
        
        setTodoTitle('');
        makeRefresh();
      } catch (error) {
        throw new Error("Failed to add todo")
      }
    }

    const handleDeleteTodo = async(id:string)=>{
      try {
        await deleteTodo(id);
        makeRefresh();
      } catch (error) {
         throw new Error("Failed to delete todo")
      }
    }

    const handleEditModeChange =async(title:string,id:string)=>{
      setEditMode(true);
      setTodoTitle(title);
      setEditID(id);
      // try {
      //   setEditMode(true);
      //   if(todoTitle.trim() === ''){
      //     return;
      //   }
      //   await updateTodo(todoTitle,id);
      //   setTodoTitle("");
      //   makeRefresh();
      // } catch (error) {
      //   throw new Error("Failed to update todo")
      // }
    }

  return (
    <div>
      <h2>Todos List</h2>
      <div>
        {
          todos.map(todo=>(
            <div key={todo._id}>
              {todo.title} 
              <button type="button" onClick={()=>handleDeleteTodo(todo._id)}>Delete</button>
              <button type="button" onClick={()=>handleEditModeChange(todo.title,todo._id)}>Edit</button>
            </div>
          ))
        }
      </div>

      <CreateTodo todoTitle={todoTitle} todoTitleOnChangeHandler={todoTitleOnChangeHandler} SubmitHandler={SubmitHandler} editMode={editMode}/>
    </div>
  )
}

export default TodoList