import { useState } from "react";
import { LuFolderUp } from "react-icons/lu";
import s from "./UploadSection.module.css";
// import { requests } from "../../../../../api/requestTemplate";
import { BASE_URL } from "../../../../../constants/Config";
import LoadingScreen from "./LoadingScreen";
import { useNavigate } from "react-router-dom";
import * as React from "react";

export default function UploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false); // New state variable
  const navigate = useNavigate();

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setUploadStatus("");
    } else {
      setUploadStatus("Please upload a valid PDF file.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("jwtToken") ?? undefined;
      const headers: HeadersInit = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const uploadResponse = await fetch(BASE_URL + "/lesson/api/upload", {
        method: "POST",
        headers: headers, // Note: Do not set 'Content-Type' header for FormData (Which I couldn't do with requestTemplate unless I modified the postRequest method)
        body: formData,
      });

      const uploadResult = await uploadResponse.json();

      if (uploadResponse.ok) {
        setUploadStatus("File uploaded successfully!");
        setExtractedText(uploadResult.text);

        // Start loading screen before the second request
        setLoading(true);

        // Now make a second request to generate the lesson
        const lessonResponse = await fetch(BASE_URL + "/lesson", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: uploadResult.text }),
        });

        const lessonResult = await lessonResponse.json();

        if (lessonResponse.ok) {
          // Redirect to the new lesson
          navigate(`/lesson/${lessonResult._id}`);
        } else {
          console.error("Lesson generation failed:", lessonResult);
          setUploadStatus("Lesson generation failed.");
        }
      } else {
        setUploadStatus("File upload failed.");
        console.error("Upload failed:", uploadResult);
      }
    } catch (error) {
      setUploadStatus("An error occurred during the upload.");
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && (
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
      )}
    </>
  );
}
