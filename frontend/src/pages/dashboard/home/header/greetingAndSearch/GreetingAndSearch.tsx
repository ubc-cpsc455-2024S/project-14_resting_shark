import s from "./GreetingAndSearch.module.css"

export default function GreetingAndSearch() {
  return (
    <div className={`${s.greetingAndSearchContainer}`}>
      <div>
        <div>
          Image
        </div>
        <div>
          Good Morning, Let's Learn.
        </div>
      </div>
      <SearchBar />
    </div>
  )
}

function SearchBar() {
  return (
    <div>
      search
    </div>
  )
}
