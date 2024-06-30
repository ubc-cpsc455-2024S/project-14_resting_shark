import s from "./FileSection.module.css";

export default function FileSection() {
  return (
    <div className={s.fileSectionContainer}>
      <span className={s.status}>No Files Attached</span>
      <button className={s.startButton}>Start From Scratch</button>
    </div>
  );
}
