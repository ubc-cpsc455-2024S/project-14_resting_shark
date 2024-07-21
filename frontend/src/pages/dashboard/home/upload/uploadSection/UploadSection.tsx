import { LuFolderUp } from "react-icons/lu";
import s from "./UploadSection.module.css";

export default function UploadSection() {
  return (
    <div className={s.uploadSectionContainer}>
      <LuFolderUp className={s.icon} />
      Upload
    </div>
  );
}
