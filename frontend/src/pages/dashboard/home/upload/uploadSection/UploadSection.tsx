import { useState } from "react";
import { LuFolderUp } from "react-icons/lu";
import s from "./UploadSection.module.css";
// import { requests } from "../../../../../api/requestTemplate";
import { BASE_URL } from "../../../../../constants/Config";

export default function UploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [extractedText, setExtractedText] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setUploadStatus("");
      console.log("Selected file:", selectedFile);
    } else {
      setUploadStatus("Please upload a valid PDF file.");
      console.log("Invalid file type selected");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("No file selected.");
      console.log("No file selected for upload");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const token = localStorage.getItem('jwtToken') ?? undefined;
      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
  
      const response = await fetch( BASE_URL + "/lesson/api/upload", {
        method: "POST",
        headers: headers,  // Note: Do not set 'Content-Type' header for FormData (Which I couldn't do with requestTemplate unless I modified the postRequest method)
        body: formData,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setUploadStatus("File uploaded successfully!");
        setExtractedText(result.text);
        console.log("Upload successful:", result);
      } else {
        setUploadStatus("File upload failed.");
        // Contains the converted text of the file
        console.error("Upload failed:", result);
      }
    } catch (error) {
      setUploadStatus("An error occurred during the upload.");
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className={s.uploadSectionContainer}>
      <label htmlFor="file-upload" className={s.fileLabel}>
        <LuFolderUp className={s.icon} />
        Upload
      </label>
      <input
        id="file-upload"
        type="file"
        accept="application/pdf"
        className={s.fileInput}
        onChange={handleFileChange}
      />
      <button onClick={handleUpload} className={s.uploadButton}>
        Upload PDF
      </button>
      {uploadStatus && <p className={s.uploadStatus}>{uploadStatus}</p>}
      {extractedText && (
        <textarea className={s.textArea} value={extractedText} readOnly />
      )}
    </div>
  );
}
