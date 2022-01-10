import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [query, setquery] = useState("");
  const [listData, setlistData] = useState([]);
  const [healthLabels, sethealthLabels] = useState("vegan");
  const getApiData = async () => {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=${"0688fe8e"}&app_key=${"df1c9f2cf7659e7b50098f2529072f5d"}&from=0&to=30&health=${healthLabels}`
    );
    setlistData(response.data.hits);
  };

  const input_Handler = (e) => {
    e.preventDefault();
    if (!query) {
      alert("Please fill the item");
    } else {
      getApiData();
    }
  };

  return (
    <div className="App">
      <div className="search_Container">
        <input
          className="serach_Input"
          placeholder="Enter Your Recipe"
          type="text"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        <button className="search_Btn" onClick={input_Handler}>
          Search
        </button>
        <select className="selct_Box">
          <option onClick={() => sethealthLabels("vegas")}>Vegas</option>
          <option onClick={() => sethealthLabels("Kidney-Friendly")}>
            Kidney-Friendly
          </option>
          <option onClick={() => sethealthLabels("Vegetarian")}>
            Vegetarian
          </option>
          <option onClick={() => sethealthLabels("Pescatarian")}>
            Pescatarian
          </option>
          <option onClick={() => sethealthLabels("Wheat-Free")}>
            Wheat-Free
          </option>
          <option onClick={() => sethealthLabels("Shellfish-Free")}>
            Shellfish-Free
          </option>
          <option onClick={() => sethealthLabels("Dairy-Free")}>
            Dairy-Free
          </option>
        </select>
      </div>

      {query ? (
        <div className="main_Items">
          {listData.map((val, id) => {
            return (
              <div className="cards" key={id}>
                <img width="300px" height="300px" src={val.recipe.image} />
                <p>{val.recipe.label}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <h2>Items</h2>
        </>
      )}
    </div>
  );
};

export default App;
