import React, { useState, useRef } from "react";
import { useRecoilState } from 'recoil';
import { TodoElement } from './Atom'

export default function Todo() {

    const [value, setValue] = useState("");
    const [list, setList] = useRecoilState(TodoElement);
    const [search, setSearch] = useState("")
    const [id, setId] = useState(1);
    const numberOfClicks = useRef(0)

    function captureInput(event) {
        setValue(event.target.value);
    }
    function addTodo() {
        const todoList = {
            id: id,
            name: value,
            isCompleted: false,
            isDeleted: false
        };
        setList([...list, todoList]);
 
        setId(id + 1);
        setValue("");
    }
    function deleteHandler(id) {
        const filteredItem = list.filter((e) => e.id !== id);
      
        setList(filteredItem);
    }
    function completeHandler(id) {
        const filteredItem = list.findIndex((e) => e.id === id);
        console.log(filteredItem);
        list[filteredItem].isCompleted = !list[filteredItem].isCompleted;
        setList([...list]);
    }
    function SearchTask(e) {
        
        setSearch(e.target.value)
    }
    
    localStorage.setItem('listKey', JSON.stringify(list))
   
    return (
        <div>
            <input type="text" placeholder="search here..." style={{ marginBottom: "10px" }} onChange={SearchTask} /> <br />
            <input
                type="text"
                placeholder="Enter here.."
                onChange={captureInput}
                value={value}
            />
            <button onClick={() => {
                addTodo();
                numberOfClicks.current = numberOfClicks.current + 1
                console.log(numberOfClicks.current)
            }}>Add</button>
            <ul>
                {list.filter(item => item.name.toLowerCase().includes(search)).map((item) => (
                    <div key={item.id} style={{ display: "flex" }}>
                        <li
                            style={{ textDecoration: item.isCompleted ? "line-through" : "" }}
                        >
                            {item.name}
                        </li>
                        <button onClick={() => deleteHandler(item.id)}>delete</button>
                        <button onClick={() => completeHandler(item.id)}>complete</button>
                        <input type="datetime-local" />
                    </div>
                ))}
            </ul>
        </div>
    );
}
