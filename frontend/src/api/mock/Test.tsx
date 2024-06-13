import { useEffect, useState } from "react";
import { exampleApi } from "../exampleApi";


export default function Test() {
  const [testData, setTestData] = useState("hi");

  useEffect(() => {
    async function fetchLesson() {
      try {
        const response = await exampleApi.getMessage("jwtTokenPlaceholder");
        setTestData(response.data);
      } catch (e: any) {
        console.log("Test: " + e.message);
      }
    }
    fetchLesson();
  }, []);

  return (
    <div>{testData}</div>
  )
}