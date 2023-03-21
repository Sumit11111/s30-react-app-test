import axios from 'axios';
import { useState,useEffect } from 'react';
import './App.css';


function App() {
  const [data,setData]=useState([]);
  const [clicked,setClicked]=useState(true);

  async function getUser() {
    try {
      await axios.get('https://randomuser.me/api')
      .then((response)=>{
        //console.log(response.data.results);
        let results=[];
        response.data.results.forEach(element => {
          results.push({
            email:element.email,
            name:element.name
          })
        });
         //console.log("manipulated: ",results);
        setData(()=>{
          return [...results];
        })
      })
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    getUser();
  },[clicked]);

  
  return (
    <div className="App">
      <h1 style={{borderBottom:"2px solid black"}}>List of Results</h1>
      <div>
        <button onClick={()=>{setClicked(!clicked)}}>Refresh Data</button>
      </div>
      <ul style={{listStyleType:'none'}}>
      {/* {console.log(data) */}
      {
      data.map((result,index)=>{
        return <li key={index}>
          <div>
          <div><p>Name: {result.name.title+" "+ result.name.first+" "+ result.name.last}</p></div>
          <div><p>Email: {result.email}</p></div>
          </div>
          </li>
      })
      }
      </ul>
    </div>
  );
}

export default App;
