import Content from "./content/Content";
import GreetingAndSearch from "./header/greetingAndSearch/GreetingAndSearch";
import Header from "./header/Header";
import s from "./Home.module.css";
import * as React from "react";
import { useState } from "react";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("recent")

  return (
    <div className={`${s.homeContainer}`}>
      <GreetingAndSearch 
        searchValue={searchValue} 
        setSearchValue={setSearchValue}
        sortValue={sortValue}
        setSortValue={setSortValue}
      />
      <Header />
      <Content 
        searchValue={searchValue} 
        sortValue={sortValue} 
      />
    </div>
  );
}
