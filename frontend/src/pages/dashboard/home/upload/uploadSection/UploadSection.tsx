import { LuFolderUp } from "react-icons/lu";
import s from "./UploadSection.module.css";

export default function UploadSection() {
  return (
    <div className={s.uploadSectionContainer}>
      <LuFolderUp className={s.icon} />
      <div className={s.uploadFilePrompt}>
        <button className={s.uploadButton}>Click to upload</button>
        <div>or drag and drop</div>
      </div>

      <div className={s.maxFileSize}>Maximum file size: 50mb</div>
    </div>
  );
}
