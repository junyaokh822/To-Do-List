import React, {useState} from 'react'
import './App.css';

function App() {
  

    const [list,setList] = useState([]);
    const [input,setInput] = useState("");
    return(

    <div>
      <h1>Task List</h1>
      <input type="text" 
      value={input}  
      onChange={(e)=> setInput(e.target.value)}/>
      <button>Add</button>
    </div>
  );
}

export default App
