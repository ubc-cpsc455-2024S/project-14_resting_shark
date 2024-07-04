import FileSection from "./fileSection/FileSection";
import UploadSection from "./uploadSection/UploadSection";
import s from "./Upload.module.css"

export default function Upload() {
  return (
    <div className={s.uploadContainer}>
      <UploadSection />
      <FileSection />
    </div>
  );
}
