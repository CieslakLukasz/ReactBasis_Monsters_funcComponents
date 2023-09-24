import { useState, useEffect } from "react";
import "./App.css";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [searchFiled, setSearchFiled] = useState("");
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchFiled)
    );
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchFiled]);

  const onSearchChange = (e) => {
    const searchFiledString = e.target.value.toLowerCase();
    setSearchFiled(searchFiledString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
        className="search-box--monsters"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
