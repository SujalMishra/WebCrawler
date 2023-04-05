import { useState,useEffect } from 'react';
import './App.css';
import Result from './components/Result.js';

import NavBar from './components/Navbar';


function App() {
  
  const [query,setQuery]  = useState("");
  const [num_results,setNumresults] = useState("5");
  const [results,setResults] = useState(null);



  const search = async () =>{
      // console.log(query);
      const api_key = 'AIzaSyAmGV4u57Ej4qC692Dome4MFxUI53Pdbe4'
    const search_engine_id = '727a51931420242ed'
    const url = `https://www.googleapis.com/customsearch/v1?key=${api_key}&cx=${search_engine_id}&q=${query}&num=${num_results}`;
  fetch(url)
     .then(response => response.json())
     .then(data => {
      setResults(data);
    //  console.log(data); 
   })
  .catch(error => console.error(error));
  }
 
  useEffect(() => {
    setQuery("");
  }, []);


  return (
    <div>
      <NavBar />
      <div className="App">
      <h1>DataDigger</h1>
        
        <div className='fields'> 
            <input placeholder='Search Something ??' id='search' onChange={(e)=>{
              setQuery(e.target.value)
            }} 
            type={"text"}>

          </input>
          <input placeholder='number' id='num' onChange={(e)=>{
              setNumresults(e.target.value)
            }} 
            type={"number"}>

          </input>
        </div>  
      
      <button className="btns" onClick={search}> Search </button>
      
      
      {results &&
              <div>
                  <div>
                  {/* <button className="btn">Download</button> */}
                  </div>
                  <Result {...results}/>
              </div>
      }
      </div>
     

      
    </div>
    
  );
}

export default App;
