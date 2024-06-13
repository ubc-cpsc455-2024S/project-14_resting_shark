import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    async function fetchLesson() {
      try {
        const response = await axios.get("http://localhost:3000/users");
        console.log("Here is the GET Response: ", response)
        setTestData(response.data);
      } catch (e: any) {
        console.log("Test: " + e.message);
      }
    }
    fetchLesson();
  }, []);

// User
//   {
//     userid: String,
//     ...
//     streaks: Int,
//    [lessonName, life]
//     lessons: [["phys", 5],["bio", 5]],
//     lives: 5
//   }

//   5 lives
//   phys -> 3
//   bio = 5

  return (
    <div>
      <h1> Users </h1>
      {testData.map((user) => (
        <div key={user._id}>
          <p>Username: {user.userid} </p>
          <p>Name: {user.name} </p>
          <p>Email: {user.email} </p>
          <p>Streak: {user.streak} </p>
        </div>
      ))}
    </div>
  )
}

export default Dashboard

// export default function Dashboard() {
//   return (
//     <>
//       <button>
//         <Link to="/lesson">Start Lesson</Link>
//       </button>
//     </>
//   );
// }


// LessonSlice
import {redux, createAsyncThunk} from '@reduxjs/toolkit';

const initalState = []

export const fetchLesson = createAsyncThunk('/users', async () => {
  const response = await axios.get("http://localhost:3000/users");
  return response.data;
})

const lessonSlice = createSlice({
  ...
})


// GlobalLesson
const GlobalLesson = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLesson());
  }, [dispatch]);
}
