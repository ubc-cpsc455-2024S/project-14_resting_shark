import Profile from "../../../../../components/picture/Profile";
import s from "./GreetingAndSearch.module.css";

export default function GreetingAndSearch() {
  return (
    <div className={`${s.greetingAndSearchContainer}`}>
      <div className={s.greetingContainer}>
        <Profile />
        <div className={s.greeting}>Good Morning, Let's Learn.</div>
      </div>
      <SearchBar />
    </div>
  );
}

function SearchBar() {
  return (
    <div className={s.searchContainer}>
      <div className={s.searchBar}>
        <input />
      </div>
    </div>
  );
}
