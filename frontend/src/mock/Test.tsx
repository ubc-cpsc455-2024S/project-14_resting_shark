import { useEffect, useState } from "react";


export default function Test() {
  const [testData, setTestData] = useState("hi");

  useEffect(() => {
    fetch("http://localhost:8080/test").then(response => response.json()).then((response: any) => setTestData(response.data)).catch((e:any) => console.log(e));
  }, []);

  return (
    <div>{testData}</div>
  )
}