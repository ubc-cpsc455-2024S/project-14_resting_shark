import Content from "./content/Content";
import Header from "./header/Header";
import s from "./Home.module.css";

export default function Home() {
  return (
    <div className={`${s.homeContainer}`}>
      <Header />
      <Content />
    </div>
  );
}
