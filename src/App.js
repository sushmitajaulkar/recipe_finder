import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef } from "react";

function App() {
  const [ingredientList, updateIngreList] = useState([]);
  const [loading, setLoading] = useState([false]);
  const inputRef = useRef(null);
  const API_Key = "e6eece21cbe7192fb738160c507ba22d";
  const API_ID = "02bd7fc9";

  const search = () => {
    searchForRecipe(inputRef.current.value);
    inputRef.current.value = "";
  }

  const searchForRecipe = (query) => {
    setLoading(true);
    let url = `search?q=${query}&app_id=${API_ID}&app_key=${API_Key}`;
    fetch(url, { mode: "no-cors" })
      .then(response => {
        return response.json()
      })
      .then(res => {
        console.log(res.hits);
        updateIngreList(res.hits);
        setLoading(false);
      })
      .catch(err => {
        console.log("Error",err)
        setLoading(false);
      });
  }

  useEffect(() => { 
    searchForRecipe("Chicken");
   }, []);
  return (
    <div className="App">
      <header className="App-header">
        <div className='app-title'>
            <div>
               <p>Recipe Finder</p>
            </div>
        {/* for search recipes with ingredients */}
            <div className='searchInp'>
               <input ref={inputRef} placeholder='Search for recipe'></input>
               <button onClick={search}>Search</button>
            </div>
        </div>

        {/* for loading indicator */}
        {loading && <p>Loading...</p>}

        {/* showing recipes */}
        <div className='Wrapper'>
          {ingredientList.map(({recipe}) => {
            const {label, image, ingredientLines} = recipe;
            return(
              <div key={label} className='ingredient'>
                <span>{label}</span>
                <img src= {image}> </img>

                <div className='steps'>
                  {ingredientLines.map((step, index) => {
                    return <p key={index}>{step}</p>
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </header>
    </div>
  );
}

export default App;