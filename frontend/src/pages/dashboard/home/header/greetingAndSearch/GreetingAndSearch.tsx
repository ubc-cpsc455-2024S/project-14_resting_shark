import { LuSlidersHorizontal } from "react-icons/lu";
import Profile from "../../../../../components/picture/Profile";
import s from "./GreetingAndSearch.module.css";
import * as React from "react";

interface SearchProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  sortValue: string;
  setSortValue: (value: string) => void;
}


export default function GreetingAndSearch({ searchValue, setSearchValue, sortValue, setSortValue }: SearchProps) {
  return (
    <div className={`${s.greetingAndSearchContainer}`}>
      <div className={s.greetingContainer}>
        <Profile />
        <div className={s.greeting}>Good Morning, Let's Learn.</div>
      </div>
      <SearchBar 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        sortValue={sortValue}
        setSortValue={setSortValue}
      />
    </div>
  );
}

function SearchBar({ searchValue, setSearchValue, sortValue, setSortValue }: SearchProps) {

  function handleSearchInputChange(event: any) {
    setSearchValue(event.target.value);
  };

  function handleSort() {
    if (sortValue === "recent") {
      setSortValue("alphabetical");
    } else {
      setSortValue("recent");
    }
  }

  return (
    <div className={s.searchContainer}>
      <div className={s.searchBar}>
        <input 
          className={s.searchInput} 
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchInputChange} />
      </div>
      <button 
        className={s.sortButton}
        onClick={handleSort}
      >
        <LuSlidersHorizontal />
      </button>
    </div>
  );
}
