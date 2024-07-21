import UploadSection from "./uploadSection/UploadSection";
import s from "./Upload.module.css";
import CreateSection from "./uploadSection/CreateSection";

export default function Upload() {
  return (
    <div className={s.uploadContainer}>
      <CreateSection />
      <UploadSection />
    </div>
  );
}
