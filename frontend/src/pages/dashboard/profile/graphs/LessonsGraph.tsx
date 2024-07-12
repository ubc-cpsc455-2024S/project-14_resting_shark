import { areaElementClasses, LineChart } from "@mui/x-charts";
import s from "./LessonsGraph.module.css";
import DateSelect from "./dropdown/DateSelect";
import { useState } from "react";
import StatDisplay from "./stat/StatDisplay";

export default function LessonsGraph() {
  const otherSetting = {
    height: 300,
    grid: { horizontal: true },
  };

  const lessonData = [23, 1, 14, 7, 4, 9, 10];

  const weekData = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const [interval, setInterval] = useState("12 July - 19 July");

  const statData = [
    { num: 1, label: "Min. Complete", change: -1 },
    { num: 10, label: "Avg. Complete", change: 0 },
    { num: 23, label: "Max. Complete", change: 1 },
  ];

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1>Lessons Completed</h1>
        <DateSelect interval={interval} setInterval={setInterval} />
      </div>
      <div className={s.statDisplayContainer}>
        {statData.map((item) => (
          <StatDisplay num={item.num} label={item.label} change={item.change} />
        ))}
      </div>
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
      <div className={s.weekContainer}>
        {weekData.map((item) => (
          <span className={s.weekLabel}>{item}</span>
        ))}
      </div>
    </div>
  );
}
