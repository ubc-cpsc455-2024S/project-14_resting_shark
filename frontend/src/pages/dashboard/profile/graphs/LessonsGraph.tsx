import { areaElementClasses, LineChart } from "@mui/x-charts";
import s from "./LessonsGraph.module.css";

export default function LessonsGraph() {
  const otherSetting = {
    height: 300,
    grid: { horizontal: true },
  };

  const lessonData = [23, 1, 14, 7, 4, 9, 10];

  return (
    <div className={s.container}>
      <h1>Lessons Completed</h1>
      <LineChart
        xAxis={[{ data: [0, 1, 2, 3, 4, 5, 6] }]}
        series={[{ data: lessonData, area: true, color: "#4369EE" }]}
        {...otherSetting}
        bottomAxis={null}
        sx={{
          [`& .${areaElementClasses.root}`]: {
            fill: "rgba(67, 105, 238, 0.2)",
          },
        }}
      />
    </div>
  );
}
