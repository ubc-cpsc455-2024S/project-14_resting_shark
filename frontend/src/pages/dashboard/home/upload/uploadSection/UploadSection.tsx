import { LuFolderUp } from "react-icons/lu";
import s from "./UploadSection.module.css"

export default function UploadSection() {
  return (
     <div className={s.uploadSectionContainer}>
        <LuFolderUp />
        <div className={s.uploadFilePrompt}>
          <div>
            Click to upload&nbsp;
          </div>
          <div>
            or drag and drop
          </div>
        </div>
        
        <div>
          Maximum file size: 50mb
        </div>
     </div>
  )
}
