import LessonCard from "./LessonCard";

export default function Dashboard() {
  const lessons: any[] = [
    {
      name: "astronomy lesson",
      id: "astronomy-lesson-id",
    },
    {
      name: "test lesson",
      id: "test-lesson-id",
    },
  ];

  const lessonCards = lessons.map((item, key) => <LessonCard key={key} lesson={item}/>);

  return (
    <>
      {lessonCards}
    </>
  );
}
