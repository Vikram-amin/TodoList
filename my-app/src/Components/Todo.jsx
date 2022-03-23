import React,{useState,useEffect} from 'react'
import TodoInput from './TodoInput'
import { v4 as uuid } from "uuid";

function Todo() {

  const [data,setData]  = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
      getTodos()
    },[page])

    const getTodos = () => {
      fetch(`http://localhost:3001/todos?_page=${page}&_limit=3`)
        .then((res) => res.json())
        .then((res) => {
           setData(res);
           setIsError(false);
        })
        .catch((err) => setIsError(true))
        .finally(() => setIsLoading(false));
    };

 const handleAdd = (title) => {
   const payload = {
     title,
     status: false,
   };

   const payLoadJSON = JSON.stringify(payload);

   setIsLoading(true);
   fetch(`http://localhost:3001/todoData`, {
     method: "POST",
     body: "payLoadJSON",
     headers: {
       "content-type": "application/json",
     },
   })
     .then(() => {
       getTodos();
     })
     .catch((err) => setIsError(true))
     .finally(() => setIsLoading(false));
  }
 

  return (
    <div>
      <TodoInput handleAddprops={handleAdd} />

      {data.map((item) => {
        return <div>{item.title}</div>;
      })}
    </div>
  );
}

export default Todo