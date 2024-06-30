import Header from "./header/Header";
import s from "./Home.module.css";
import Upload from "./upload/Upload";

export default function Home() {
  return (
    <div className={`${s.homeContainer}`}>
      <Header />
      <Upload />
    </div>
  );
}
