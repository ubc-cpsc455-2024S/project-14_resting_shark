import React, { useEffect, useState } from "react";
import s from "./Explore.module.css";
import { useAppSelector } from "../../redux/hooks";
import { requests } from "../../api/requestTemplate";
import ExploreLesson from "./lessonCard/ExploreLesson";

interface Lesson {
  _id: string;
  name: string;
}

export default function Explore() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const token = useAppSelector((state) => state.auth.jwtToken);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await requests.getRequest(token, "/lesson/all");

        const lessonsData = await response;
        console.log(lessonsData);
        setLessons(lessonsData);
      } catch (error: any) {
        console.error("Error fetching lessons:", error.message);
      }
    };

    if (lessons.length === 0) {
      fetchLessons();
    }
  }, [lessons.length]);

  return (
    <div className={s.container}>
      <h1>Discover</h1>
      <div className={s.lessonsContainer}>
        {lessons.map((item, index) => (
          <ExploreLesson name={item.name} />
        ))}
      </div>
    </div>
  );
}
