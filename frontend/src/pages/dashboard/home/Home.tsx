import Content from "./content/Content";
import GreetingAndSearch from "./header/greetingAndSearch/GreetingAndSearch";
import Header from "./header/Header";
import s from "./Home.module.css";
import * as React from "react";

export default function Home() {
  return (
    <div className={`${s.homeContainer}`}>
      <GreetingAndSearch />
      <Header />
      <Content />
    </div>
  );
}
