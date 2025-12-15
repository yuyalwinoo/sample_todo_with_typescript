import axios from "axios";
import type { Todo } from "../types/todo";

const API_URL = import.meta.env.VITE_MODE === 'development' ? import.meta.env.VITE_LOCAL_API_URL : import.meta.env.VITE_API_URL;


// export const getAllTodos = async(): Promise<Todo[]>=>{
//     const response = await fetch(`${API_URL}/todos`);
//     const data = await response.json();
//     return data.todos;
// }

// export const addNewTodos = async(title:string): Promise<Todo>=>{
//     const response = await fetch(`${API_URL}/todos`,{
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({title})
//     });

//     const data = await response.json();
//     return data.todo;
// }

// export const deleteTodo = async(id:string)=>{
//     const response = await fetch(`${API_URL}/todos/${id}`,{
//         method: 'DELETE',
//     });

//     const data = await response.json();
//     return data;
// }

// export const updateTodo = async(title:string,id:string): Promise<Todo>=>{
//     const response = await fetch(`${API_URL}/todos/${id}`,{
//         method: 'PUT',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({title})
//     });

//     const data = await response.json();
//     return data.todo;
// }



///axios/////

export const getAllTodos = async(): Promise<Todo[]>=>{
    const {data} = await axios(`${API_URL}/todos`);
    return data.todos;
}

export const addNewTodos = async(title:string): Promise<Todo>=>{
    const {data} = await axios.post(`${API_URL}/todos`,{title});
    return data.todo;
}

export const deleteTodo = async(id:string)=>{
    const {data} = await axios.delete(`${API_URL}/todos/${id}`);
    return data;
}

export const updateTodo = async(title:string,id:string): Promise<Todo>=>{
    const {data} = await axios.put(`${API_URL}/todos/${id}`,{title});
    return data.todo;
}